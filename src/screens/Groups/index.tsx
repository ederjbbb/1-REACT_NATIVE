import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Button } from '../../components/Button';
import { Container } from './styles';
import { EmptyList } from '../../components/EmptyList';
import { GroupCard } from '../../components/GroupCard';
import { Header } from '../../components/Header';
import {HighLight} from '../../components/Highlights';
import { getAllGroups } from '../../Storage/group/getAllGroups';

export  function Groups() {

 
  const [groups, setGroups] = useState<string[]>([]) 
  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups(){

    try {
      const data = await getAllGroups()
      setGroups(data)
    } catch (error) {
        console.log(error)
    }
      
  }

  function handleOpenGroup (group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  },[]));

  return (
    <Container >
      <Header />
      <HighLight title='Turmas' subtitle='Jogue com a sua turma'/>
      
      <FlatList

        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard title={item}
          onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={{flex:1}}
        ListEmptyComponent={() => (
          <EmptyList message = 'Cadastre uma truma'/>
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}


