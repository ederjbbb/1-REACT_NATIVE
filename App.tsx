import {Roboto_400Regular, Roboto_700Bold, useFonts} from '@expo-google-fonts/roboto'

import { Loading } from './src/components/Loading';
import React from 'react';
import { Routes } from './src/components/routes';
import { StatusBar } from 'react-native';
import {ThemeProvider} from 'styled-components'
import theme from './src/theme/index'

export default function App() {


  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})


  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
      barStyle={'light-content'} 
      backgroundColor= 'transparent'
      translucent
      />
            

      {fontsLoaded ? <Routes/> : <Loading />}
    </ThemeProvider>
    
    
  );
}


