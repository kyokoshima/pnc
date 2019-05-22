import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import { Font } from 'expo';
import Icon from '@expo/vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

import Items from './components/Items';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      modalVisible: false,
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
        <ActionButton
            onPress={() => {this.setState({modalVisible: true})}}>
            <Icon name="md-create" style={styles.fab}/>
         </ActionButton>
         <Modal 
            isVisible={this.state.modalVisible}
            >
           <View style={{ fles: 1}}>
             <Text>Hello</Text>
             <TouchableHighlight
               onPress={()=> {
                 this.setState({modalVisible: !this.state.modalVisible});
               }}>
                <View>
                <Text>Hide modal!!!</Text>
                <TextInput editable={true}>

                </TextInput>
                </View>
             </TouchableHighlight>
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
  }
})
