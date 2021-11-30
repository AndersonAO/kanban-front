import React from 'react';

import { Container } from './styles'

export default function Header(){
  return (
   <Container>
     <h1> Kanban </h1>
     <a href="/logout">Sair</a>
   </Container>
  )
}