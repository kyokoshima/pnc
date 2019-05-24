import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableHighlight, Button } from 'react-native';
import Modal from 'react-native-modal';
import { Font } from 'expo';
import Icon from '@expo/vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import UUID from 'uuid/v1';
import Items from './components/Items';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      modalVisible: false,
      items: []
    }
    this.toggleItemState = this.toggleItemState.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'NotoSansJP': require('./assets/fonts/NotoSansJP-Black.otf'),
    });
    this.setState({ ready: true });
    let items = ['アイロン','こたつ','エアコン','テレビ','施錠','身分証明書','サイフ','ケータイ']
    .map((v, i) => {
      return { name: v, key: UUID(), on: false};
    });
    // this.setState({items: items});
  }
  toggleItemState(item) {
    let items = this.state.items.slice();
    items = items.map((v) => {
      if (v.key === item.key) {
        v.on = !v.on;
      }
      return v;
    });
    this.setState({items: items});
  }
  render() {
    if (!this.state.ready) {
      return <View><Text>Loading/¥...</Text></View>
    }
    
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View>
          <Text>Safe area</Text>
        </View>
        <Items items={this.state.items} handler={this.toggleItemState}/> 
        <ActionButton
            onPress={() => {this.setState({modalVisible: true})}}>
            <Icon name="md-create" style={styles.fab}/>
         </ActionButton>
         <Modal 
            isVisible={this.state.modalVisible}
            >
           <View style={styles.modalContent}>
             <Text>Hello</Text>
             <TextInput placeholder='Item name' editable={true} maxLength={40}
              style={{borderBottomWidth: 2}}
             ></TextInput>
             <Button title="Hide modal" onPress={() => this.setState({modalVisible: false})} />
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
    padding: 20
  }
})
