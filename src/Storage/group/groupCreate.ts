import { AppError } from '../../Utils/AppError';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '../storageConfig';
import { getAllGroups } from './getAllGroups';

export async function  groupCreate(newGroup: string){
    try {
        const storedGroups = await getAllGroups()
        const groupAlreadyExists = storedGroups.includes(newGroup);

        if(groupAlreadyExists){
            throw new AppError('This group already exists')
        }

        await AsyncStorage.setItem(GROUP_COLLECTION ,JSON.stringify([...storedGroups, newGroup]));

    } catch (error) {
        throw error
    }
 }

