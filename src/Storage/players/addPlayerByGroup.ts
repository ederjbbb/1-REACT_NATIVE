import { Alert } from "react-native";
import { AppError } from "../../Utils/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "../storageConfig";
import { PlayersStorageDTO } from "./PlayerStorageDTO";
import { getPlayerbyGroup } from "./getPlayersByGroup";

export async function addPlayerbyGroup(newPlayer: PlayersStorageDTO, group: string){
        try {
          const storedPlayers = await getPlayerbyGroup(group);

          const playerAlreadyExist = storedPlayers.filter(player => player.name === newPlayer.name)

            if(playerAlreadyExist.length > 0){
                throw new AppError('Player ja cadastrad o')
            }

            const storage = JSON.stringify([...storedPlayers, newPlayer])

            
                
            await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
        } catch (error) {
            throw(error)
        }
}
