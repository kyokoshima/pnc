import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Font } from 'expo';

import Items from './components/Items';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'NotoSansJP': require('./assets/fonts/NotoSansJP-Black.otf'),
    });
    this.setState({ ready: true });
  }
  render() {
    if (!this.state.ready) {
      return <View><Text>Loading/¥...</Text></View>
    }
    let data = ['アイロン','こたつ','エアコン','テレビ','施錠','身分証明書','サイフ','ケータイ']
    .map((v, i) => {
      return { name: v, key: `${i}`};
    });
    let items = {
      data: data,
    };
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View>
          <Text>Safe area</Text>
        </View>
        <Items items={items} /> 
      </SafeAreaView>
      );
  }
}

