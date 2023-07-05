import { ButtoniconTypeStyleProps, Container, Icon } from "./styles";

import {MaterialIcons} from "@expo/vector-icons";
import React from "react-native";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    type?: ButtoniconTypeStyleProps;
    icon: keyof typeof  MaterialIcons.glyphMap;
    
}
export function ButtonIcon ({ icon, type = 'PRIMARY', ...rest}:Props) {
    return(
        <Container {...rest}>
            <Icon name={icon}  type={type}/>
        </Container>
    )
}