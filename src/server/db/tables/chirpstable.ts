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
    return SelectQuery<IChirpsRow>('SELECT users.handle, chirps.* FROM chirps JOIN users ON chirps.user_id = users.id;')
}

export function getOneChirp(id:number) {
    return SelectQuery<IChirpsRow>('SELECT users.handle, chirps.* FROM chirps JOIN users ON chirps.user_id = users.id WHERE chirps.id = ?;', [id])
}

export function insertChirp(user_id:number, body:string, location:string) {
    return ModifyQuery('INSERT INTO chirps (user_id, body, location) VALUE (?, ?, ?);', [user_id, body, location])
}

export function updateChirp(user_id:number, body:string, location:string, id:number) {
    return ModifyQuery('UPDATE chirps SET user_id = ?, body = ?, location = ? WHERE id = ?;', [user_id, body, location, id])
}

export function deleteChirp(id:number) {
    return ModifyQuery('DELETE FROM chirps WHERE id = ?;', [id])
}

export function getMentions(user_id:number) {
    return SelectQuery<IChirpsRow>('SELECT c.*, u.handle FROM chirps c JOIN users u ON c.user_id = u.id JOIN mentions m ON m.chirp_id = c.id  WHERE m.user_id = ?', [user_id])
}