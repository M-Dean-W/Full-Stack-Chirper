import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IChirpsRow extends RowDataPacket {
    id:number;
    user_id:number;
    body:string;
    location:string;
    created_at:Date;
}

export function getALLChirps() {
    return SelectQuery<IChirpsRow>('SELECT * FROM chirps;')
}

export function getOneChirp(id:number) {
    return SelectQuery<IChirpsRow>('SELECT * FROM chirps WHERE id = ?;', [id])
}

export function insertChirp(user_id:number, body:string, location:string) {
    return ModifyQuery('INSERT INTO chirps (user_id, body, location) VALUE (?, ?, ?);', [user_id, body, location])
}
