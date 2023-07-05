import {GROUP_COLLECTION, PLAYER_COLLECTION} from '../storageConfig'

import AsyncStotage from '@react-native-async-storage/async-storage'
import { getAllGroups } from './getAllGroups'

export async function removeGroupByName(groupToDelete: string){
    try {
        
        const storedGroup = await getAllGroups()

        const groups = storedGroup.filter(group => group !== groupToDelete)  

        await AsyncStotage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        await AsyncStotage.removeItem(`${PLAYER_COLLECTION}-${groupToDelete}`)
    } catch (error) {
        throw error;
    }
}
