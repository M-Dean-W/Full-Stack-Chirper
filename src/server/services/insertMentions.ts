import db from "../db";

async function insertMentions(body: string, chirp_id: number) {
    const mentionPattern = /@\w+/g;
    const mentionedUsers = body.match(mentionPattern);

    if (mentionedUsers) {
        const users = await db.users.getALLUsers();

        await db.mentions.deleteForChirp(chirp_id);

        for await (const userMention of mentionedUsers) {
            const foundUser = users.find((u) => u.handle!.toLowerCase() === userMention.replace("@", "").toLowerCase());

            if (foundUser) {
                await db.mentions.insertMention(chirp_id, foundUser.id!);
            }
        }
    }
}

export default insertMentions;