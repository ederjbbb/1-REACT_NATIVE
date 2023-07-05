import { Container, SubTitle, Title } from "./styles";

import React from "react";

type Props = {
    title: string;
    subtitle: string;
}
export function HighLight( {title, subtitle}: Props){
    return(
        <Container>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
        </Container>
    )
}