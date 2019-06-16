import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, 
  TouchableHighlight, Button, AsyncStorage,
  Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Font } from 'expo';
import Icon from '@expo/vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import UUID from 'uuid/v1';
import Items from './components/Items';
import {IntlProvider, FormattedMessage} from 'react-intl';

export default class App extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      ready: false,
      modalVisible: false,
      items: [],
      newItemName: ''
    }
    this.updateAllItems = this.updateAllItems.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  async loadFont() {
    try {
      // Load custom font
      await Font.loadAsync({
        'NotoSansJP': require('./assets/fonts/NotoSansJP-Black.otf'),
      });
      console.log('loading font');
    } catch(err) {
      console.log(err);
    }
    this.setState({ready: true});
  }
  async loadStoredItems() {
    let items = await JSON.perse(AsyncStorage.getItem('items'));
    if (items) {
      this.updateAllItems(items);
    }
  }
  componentDidMount() {
    this.loadFont();
    // let items = ['アイロン','こたつ','エアコン','テレビ','施錠','身分証明書','サイフ','ケータイ']
    // .map((v, i) => {
    //   return { name: v, key: UUID(), on: false};
    // });
    
    
  }
  componentWillUnmount() {
  
  }
  /**
   * Remove item from the state
   * @param {object} item 
   */
  removeItem(item) {

  }
  /**
   * Add item to the state
   */
  addItem() {
    let itemName = this.state.newItemName;
    if (itemName && itemName.length) {
      let newItem = {name: itemName, key:UUID(), on: false};
      this.updateAllItems(this.state.items.concat(newItem));
      this.setState({newItemName: ''})
    }
    this.setState({modalVisible: false});
  }
  /**
   * Update single item in the state
   * @param {object} item 
   */
  updateItem(item) {
    // console.log(this.state.items);
    if (item != undefined) {
      let items = this.state.items.slice();
      items = items.map((v) => {
        if (v.key === item.key) {
          v.on = !v.on;
        }
        return v;
      });
      this.updateAllItems(items);
    }
  }
  /**
   * Update all items in the state
   * @param {Array} items 
   */
  async updateAllItems(items) {
    console.log('updating');
    this.setState({items: items});
    try {
    await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log('render');
    if (!this.state.ready) {
      console.log('loading');
      return <View><Text>Loading...</Text></View>
    }

    return (
      <SafeAreaView style={{ flex: 1}}>
        <View>
          <Text>Safe area</Text>
        </View>
        <Items items={this.state.items} 
          updateItem={this.updateItem} 
          addItem={this.addItem}
          removeItem={this.removeItem} 
          updateAllItems={this.updateAllItems}/> 
        <ActionButton onPress={() => {this.setState({modalVisible: true})}}>
          <Icon name="md-add" style={styles.fab}/>
        </ActionButton>
         
         <Modal 
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setState({modalVisible: false})}
            >
           <View style={styles.modalContent}>
             <Text>Hello</Text>
             <TextInput 
              name='newItemName'
              placeholder='Item name' 
              maxLength={40}
              style={styles.itemInput}
              onChangeText={(text) => this.setState({newItemName: text})}
              value={this.state.newItemName}
             ></TextInput>
             <Button title="Add item" onPress={this.addItem} />
           </View>
         </Modal>
      </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  fab: {
    fontSize: 20,
    height: 22,
    color: '#fff'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 50,
    height: Dimensions.get('window').height / 3
  },
  itemInput: {
    fontSize: 24,
    borderBottomWidth: 2
  } 
})
