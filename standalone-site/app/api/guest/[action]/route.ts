import { env } from 'cloudflare:workers';
import { guestRequest } from '../../../../lib/game/server/guests';
import { D1GuestStore } from '../../../../lib/game/server/d1-guests';
export const dynamic='force-dynamic';
export async function POST(request:Request){
 if(!env.DB)return Response.json({error:'Guest server is not configured'},{status:503});
 try{return await guestRequest(request,new D1GuestStore(env.DB));}catch{return Response.json({error:'Guest server unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});}
}

export async function OPTIONS(request:Request){if(!env.DB)return new Response(null,{status:503});return guestRequest(request,new D1GuestStore(env.DB));}
