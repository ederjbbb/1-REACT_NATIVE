import { Container, Icon, Name } from "./styles";

import { ButtonIcon } from "../ButtonIcon";
import React from "react";

type Props = {
    name: string;
    onRemove: () => void;
}
export function PlayerCard ({name, onRemove} : Props) {
    return (
        <Container>
            <Icon name="person"/>
            <Name>{name}</Name>
            <ButtonIcon icon={'delete'} type='SECONDARY' onPress={onRemove}/>
        </Container>
    )
}