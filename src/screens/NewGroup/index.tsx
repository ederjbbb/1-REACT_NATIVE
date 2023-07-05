import { Container, Content, Icon } from "./styles";
import React, { Alert } from "react-native";

import { AppError } from "../../Utils/AppError";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { HighLight } from "../../components/Highlights";
import { Input } from "../../components/Input";
import { groupCreate } from "../../Storage/group/groupCreate";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function NewGroup(){

    const [group, setGroup] = useState('')

    const navigation = useNavigation()
    
    async function handleNew () {
        try {
            
            if(group.trim().length === 0){
                return Alert.alert('Novo Gruopo', 'Informe o nome do grupo')
            }
            await groupCreate(group);
        navigation.navigate('players',{ group })
        } catch (error) {
            
            if(error instanceof AppError){
                Alert.alert('Novo Groupo', error.message)
            }else{
                Alert.alert('Novo Groupo', 'Nao fio possivel criar grupo')

            }
        }
        
    }
    return(
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon/>
                <HighLight title={"Nova Turma"} subtitle={"Crie a turma para adicionar as pessoas"} />
                <Input placeholder="Nome da turma" 
                    onChangeText={setGroup}
                />

                <Button title={"Criar nova turma"}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}