import { getPlayerbyGroup } from "./getPlayersByGroup";

export async function getPlayersByGroupAndTean(group: string, team: string){

    try {
         const storage = await getPlayerbyGroup(group)

         const players = storage.filter((player) =>player.team === team);

         return players;
    } catch (error) {
        throw error;
    }
}