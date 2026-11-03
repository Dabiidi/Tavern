import { sqliteTable,text,integer,index,uniqueIndex } from 'drizzle-orm/sqlite-core';
export const guestPresence=sqliteTable('guest_presence',{
 id:text('id').primaryKey(),token:text('token').notNull(),room:text('room').notNull(),payload:text('payload').notNull(),updatedAt:integer('updated_at').notNull()
},table=>[uniqueIndex('guest_presence_token_idx').on(table.token),index('guest_presence_room_time_idx').on(table.room,table.updatedAt),index('guest_presence_time_idx').on(table.updatedAt)]);

export const guestChat=sqliteTable('guest_chat',{
 id:text('id').primaryKey(),room:text('room').notNull(),guestId:text('guest_id').notNull(),name:text('name').notNull(),text:text('text').notNull(),createdAt:integer('created_at').notNull()
},table=>[index('guest_chat_room_time_idx').on(table.room,table.createdAt),index('guest_chat_guest_time_idx').on(table.guestId,table.createdAt)]);
