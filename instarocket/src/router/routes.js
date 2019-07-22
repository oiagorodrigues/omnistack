import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Image } from 'react-native'

import Feed from '../pages/Feed'
import New from '../pages/New'

import Logo from '../assets/icons/logo.png'

export default createAppContainer(
  createStackNavigator({
    Feed,
    New
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#000',
      headerTitle: <Image style={{ marginHorizontal: 20 }} source={Logo}/>,
      headerBackTitle: null // esse atributo com valor nulo impede que, no ios, o botão de "voltar" mostre um texto ao invés do icone
    },
    mode: 'modal' // esse atributo seta a animação de transição entre páginas. Modal -> de baixo pra cima. Parece que esse é o efeito padrão no android.
  })
)
