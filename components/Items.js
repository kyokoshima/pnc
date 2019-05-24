
import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';


export default class Items extends React.Component {
  constructor(props) {
    super(props);
    // this.updateItemState = this.updateItemState.bind(this);
  }
  updateItemState(item) {
    this.props.handler(item);
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => item.key}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  } 
  _renderItem({ item, index }) {
    return (
        <TouchableHighlight 
          onPress={ this.updateItemState.bind(this, item) }
          underlayColor= { item.on ? '#fff' : '#444' }>
        <View style={styles.item}>
          <Text style={styles.itemName}>
            {item.name} {item.on}
          </Text>
        </View>
        </TouchableHighlight>
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
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'NotoSansJP',
  },
  itemName: {
    fontSize: 36,
    fontFamily: 'NotoSansJP',
  }
})