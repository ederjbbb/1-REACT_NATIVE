import styled, {css} from 'styled-components/native'

import { SafeAreaView } from "react-native-safe-area-context";

export const Container  = styled(SafeAreaView)`
    
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};

    padding: 24px;
    
`

export const Form  = styled.View`
    width: 100%;
    max-height: 56px;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    flex-direction: row;

    border-radius: 6px;
    
`
export const HeadeList = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;

    margin: 32px 0 12px;

`

export const NumberOfPlayers = styled.Text`
    color: ${({theme}) => theme.COLORS.GRAY_200};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;

`
