import React, { Component } from 'react';
import api from '../services/api'
import io from 'socket.io-client'

import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import camera from '../assets/icons/camera.png'
import more from '../assets/icons/more.png'
import like from '../assets/icons/like.png'
import send from '../assets/icons/send.png'
import comment from '../assets/icons/comment.png'

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New') }>
        <Image source={camera}/>
      </TouchableOpacity>
    )
  })

  state = {
    feed: []
  }

  registerToSocket = () => {
    /**
     * o socket.io, quando utilizado em aplicação mobile, tenta utilizar um WebSocket que não existe
     * no ambiente mobile. Nada que possa prejudicar o desenvolvimento ou a aplicação.
     * Podemos descartar esse aviso import o 'YelloBox' do react-native e ignorando esse aviso. 
     * No `index.js`, dentro da pasta src, faça:
     * 
     * import { YellowBox } from 'react-native'
     * 
     * YellowBox.ignoreWarnings([
     *  'Unrecognized WebSocket'
     * ])
     */
    const socket = io('http://10.0.3.2:3333')

    socket.on('post', newPost => {
       this.setState({ feed: [newPost, ...this.state.feed ] })
     })

     socket.on('like', likedPost => {
       this.setState({
         feed: this.state.feed.map(post => post._id === likedPost._id ? likedPost : post)
       })
     })
  }

  async componentDidMount() {
    this.registerToSocket()

    const { data } = await api.get('posts')

    this.setState({ feed: data })
  }

  handleLike = id => {
    api.post(`/posts/${id}/like`)
  }

  render() {
    return (
      <View style="styles.container">
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>

              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>

                <Image source={more}/>
              </View>

              <Image style={styles.feedImage} source={{ uri: `http://10.0.3.2:3333/files/${item.image}` }} />

              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id)}>
                    <Image source={like} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={comment} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.likes}>{item.likes} curtidas</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>

            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // react-native utiliza o flex-box para alinhar os seus itens, ou seja, o 'display: flex' já é definido por padrão.
  container: {
    flex: 1
  },

  feedItem: {
    marginTop: 20
  },

  feedItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 15
  },

  name: {
    fontSize: 14,
    color: '#000'
  },

  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },

  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },

  feedItemFooter: {
    paddingHorizontal: 15
  },

  actions: {
    flexDirection: 'row'
  },

  action: {
    marginRight: 8
  },

  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000'
  },

  description: {
    lineHeight: 18,
    color: '#000'
  },

  hashtags: {
    color: '#7159c1'
  }
})