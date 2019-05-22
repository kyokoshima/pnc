import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Items from './components/Items';

export default class App extends React.Component {

  render() {
    let data = ['アイロン','こたつ','エアコン','テレビ','施錠','身分証明書','サイフ','ケータイ']
    .map((v, i) => {
      return { name: v, key: `${i}`};
    });
    let items = {
      data: data,
    };
    return (
      <Items items={items}></Items>
    );
  }
}

