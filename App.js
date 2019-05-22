import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Items from './components/Items';

export default class App extends React.Component {

  render() {
    let items = {
      data: [
        { key: '1' }, { key: '2'}
      ]
    };
    return (
      <Items items={items}></Items>
    );
  }
}

