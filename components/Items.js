
import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';


export default class Items extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items.data}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => item.key}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  } 
  _renderItem({ item, index }) {
    const swipeBtns = [{
      text: 'Aaaaaaa',
      backgroundColor: 'blue',
      underlayColor: 'rbga(0,0,0,1)',
      onPress: () =>  console.log('pressed') 
    }];
    return (
      <Swipeout
        right={swipeBtns}
        autoClose={true}>
        <TouchableHighlight>
        <View style={styles.item}>
          <Text style={styles.itemName}>
            {item.name}
          </Text>
        </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  },
  item: {
    height: 72,
    padding: 10,
    backgroundColor: '#f00',
  },
  itemName: {
    justifyContent: 'center',
    fontSize: 36,
  }
})