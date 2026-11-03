import type { GuestMessage } from '../shared/multiplayer';
import type { GuestRow,GuestStore } from './guests';
import { STALE_MS,ROOM_LIMIT } from '../shared/multiplayer';
interface Statement {bind(...args:unknown[]):Statement;run():Promise<{meta:{changes?:number}}>;first<T>():Promise<T|null>;all<T>():Promise<{results:T[]}>}
export interface GuestDatabase {prepare(query:string):Statement}
interface Row {id:string;token:string;room:string;payload:string;updated_at:number}
const unpack=(row:Row):GuestRow=>({id:row.id,token:row.token,room:row.room,pose:JSON.parse(row.payload),updatedAt:row.updated_at});
export class D1GuestStore implements GuestStore {
 constructor(private db:GuestDatabase){}
 async create(r:GuestRow){const result=await this.db.prepare('INSERT INTO guest_presence (id,token,room,payload,updated_at) SELECT ?,?,?,?,? WHERE (SELECT COUNT(*) FROM guest_presence WHERE room=? AND updated_at>?)<? AND (SELECT COUNT(*) FROM guest_presence WHERE updated_at>?)<512').bind(r.id,r.token,r.room,JSON.stringify(r.pose),r.updatedAt,r.room,r.updatedAt-STALE_MS,ROOM_LIMIT,r.updatedAt-STALE_MS).run();return result.meta.changes===1;}
 async get(token:string){const r=await this.db.prepare('SELECT * FROM guest_presence WHERE token=?').bind(token).first<Row>();return r?unpack(r):null;}
 async update(r:GuestRow){await this.db.prepare('UPDATE guest_presence SET payload=?,updated_at=? WHERE token=?').bind(JSON.stringify(r.pose),r.updatedAt,r.token).run();}
 async list(room:string,since:number){const r=await this.db.prepare('SELECT * FROM guest_presence WHERE room=? AND updated_at>? ORDER BY id LIMIT ?').bind(room,since,ROOM_LIMIT).all<Row>();return r.results.map(unpack);}
 async remove(token:string){await this.db.prepare('DELETE FROM guest_presence WHERE token=?').bind(token).run();}
 async messages(room:string,since:number){const r=await this.db.prepare('SELECT id,room,guest_id AS guestId,name,text,created_at AS createdAt FROM guest_chat WHERE room=? AND created_at>? ORDER BY created_at DESC,id DESC LIMIT 30').bind(room,since).all<GuestMessage>();return r.results.reverse();}
 async chat(m:GuestMessage){const r=await this.db.prepare('INSERT INTO guest_chat (id,room,guest_id,name,text,created_at) SELECT ?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM guest_chat WHERE guest_id=? AND created_at>?)').bind(m.id,m.room,m.guestId,m.name,m.text,m.createdAt,m.guestId,m.createdAt-1200).run();return r.meta.changes===1;}
 async prune(before:number){await this.db.prepare('DELETE FROM guest_presence WHERE updated_at<?').bind(before).run();await this.db.prepare('DELETE FROM guest_chat WHERE created_at<?').bind(before-300_000).run();}
}
