import { Container, Form, HeadeList, NumberOfPlayers } from "./styles";
import React, { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppError } from "../../Utils/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { EmptyList } from "../../components/EmptyList";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { HighLight } from "../../components/Highlights";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";
import { PlayerCard } from "../../components/PlayerCard";
import { PlayersStorageDTO } from "../../Storage/players/PlayerStorageDTO";
import { StringDecoder } from "string_decoder";
import { addPlayerbyGroup } from "../../Storage/players/addPlayerByGroup";
import { getPlayerbyGroup } from "../../Storage/players/getPlayersByGroup";
import { getPlayersByGroupAndTean } from "../../Storage/players/getPLayerByGroupAndTeam";
import { removeGroupByName } from "../../Storage/group/removeGroupByName";
import { removePlayerByGroup } from "../../Storage/players/removePlayerByGroup";

type RouteParams = {
    group: string
}

export function Players(){
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('TIME A') 
    const [teamsInGroup, setTeamsInGroup] = useState(['TIME A', 'TIME B'])
    const [players,setPlayers ] = useState<PlayersStorageDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true)
   
    const route =  useRoute();
    const {group} = route.params as RouteParams; 

    const newPlayerNameInputRef = useRef<TextInput>(null)

    const navigation = useNavigation()

   async function  handleAddPlayer(){
        
            if(newPlayerName.trim().length === 0){
                return Alert.alert('Novo Player', 'Inform o nome da pessoas')
            }

            const newPlayer= {
                name: newPlayerName,
                team
            }
        try {
            await addPlayerbyGroup(newPlayer,group);

            newPlayerNameInputRef.current?.blur()

            // fetchPlayersByTeam();
            setNewPlayerName('')

          

        } catch (error) {
              if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message)
              } else{
                console.log(error);
                Alert.alert('Nova pessoa','Nao foi possivel adicionar esta pessoa')
              }
            
        }
    }

    async function fetchPlayersByTeam () {
        try {
            // setIsLoading(true);

            const playersByTeam = await getPlayersByGroupAndTean(group, team);

            setPlayers(playersByTeam);

            
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Nao foi possivel carregar a lista')
        }finally{
            setIsLoading(false);
        }
        
    }

    async function handleRemovePlayer(playerName: string){
        try {
            await removePlayerByGroup(playerName,group)
            await fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            Alert.alert('Remover', 'nao foi possivel remover esta pessoa')
        }
        
    }
    
    async function groupRemove(){

        try {
            await removeGroupByName(group)
            navigation.navigate('groups')
        } catch (error) {
            throw error
        }
        
    }
    async function handleRemoveGroup(){
        
            Alert.alert('Remove Group', 'Tem certeza em deletar grupo ',[
                {text: 'Nao', style: 'cancel' },
                {text: 'Sim', onPress: () => groupRemove() }
            ])
      
    }

    useEffect(() =>{
        fetchPlayersByTeam()
    },[team,players])

    return (
        <Container>
            
            <Header showBackButton/>
            <HighLight title={group} subtitle={"Adicione a galera e separe os times"} />

            <Form>
            <Input
                placeholder='Nome da pessoa'
                autoCorrect= {false}
                onChangeText = {setNewPlayerName}
                value={newPlayerName}
                inputRef={newPlayerNameInputRef}
                onSubmitEditing={handleAddPlayer}
                returnKeyType='done'
            />
            <ButtonIcon 
            type='PRIMARY' 
            icon={"add"}
            onPress={handleAddPlayer}
            />
            </Form> 
            <HeadeList>
           
            <FlatList
                
                data={teamsInGroup}
                keyExtractor={item => item}
                renderItem = {({item}) => (
                    <Filter title={item}
                    isActive = {item === team}
                    onPress={() => setTeam(item)}
                     />
                    
                )}
                horizontal
            />

            <NumberOfPlayers>{players.length}</NumberOfPlayers>
            </HeadeList>
            {
               isLoading ? <Loading/> :  <FlatList
               data={players}
               keyExtractor={item => item.name}
               renderItem={({item}) =>  (<PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)}/>)}
               ListEmptyComponent={() => (
                   <EmptyList message="Nao tem ninguem neste time"/>
               )}
               showsVerticalScrollIndicator={false}
               contentContainerStyle={[
                   {paddingBottom: 100},
                   players.length === 0 && {flex:1}
               ]}
           />
            }
            
            <Button 
            title="Remover turma" 
            type="SECONDARY" 
            onPress={ handleRemoveGroup}
            />
        </Container>
    )
}   