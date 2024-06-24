import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IMentionsRow extends RowDataPacket {
    chirp_id:number;
    user_id:number;
}

export function getALLMentions() {
    return SelectQuery<IMentionsRow>('SELECT * FROM mentions;')
}

export function insertMention(chirp_id:number, user_id:number) {
    return ModifyQuery('INSERT INTO mentions (chirp_id, user_id) VALUES (?,?);', [chirp_id, user_id])
}

export function deleteForChirp(chirp_id: number) {
    return ModifyQuery("DELETE FROM mentions WHERE chirp_id = ? ", [chirp_id]);
}