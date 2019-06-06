
import React from 'react';
import { FlatList, View, Text, 
  StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Swipeout from 'react-native-swipeout';


export default class Items extends React.Component {
  constructor(props) {
    super(props);
    // this.updateItemState = this.updateItemState.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }
  updateItemState(item) {
    this.props.updateItem(item);
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.key}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  } 
  renderItem({ item, index }) {
    const btns = [
      { text: 'Button' }
    ];
    return (
      <Swipeout right={btns}>
        <TouchableHighlight 
          onPress={ this.updateItemState.bind(this, item) }
          >
        <View style={[styles.item, 
            {backgroundColor: item.on ? '#fff' : '#444'},
            {height: Dimensions.get('window').height / 5}]}>
          <Text style={styles.itemName}>
            {item.name} {item.on ? 'on' : 'off'}
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