import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Keyboard, FlatList, StatusBar, ToastAndroid, Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import Header from './components/Header'
import TodoItem from './components/TodoItem'

export default function todoApp() {
  const [list, setList] = useState(getArray) //Creates the list state, wich starts either with the savedList or an empty Array
  const [inputData, setInputData] = useState('') // creates the TextInput state

  async function getArray(){
    try{
      const retrievedData = await AsyncStorage.getItem('savedList') //Retrieves data from storage

      setList(JSON.parse(retrievedData) || []) //If the data is different than null, set the state to teh data retrived, if not, set to an empty array
    }catch(err){
      Alert.alert('Erro ao carregar seus dados','Por favor, reabra o seu aplicativo!!')
    }
  }

  function addItem(){
    Keyboard.dismiss()

    if(inputData.length > 0){
      random = Math.random().toString()
    
      //New object that will be puhed to the 'list' array
      let newItem = {
        name: inputData,
        key: inputData + random
      }

      //push newItem to the begining of array
      list.unshift(newItem)
    }
    else{
      Alert.alert('Nova tarefa', 'Por favor, digite algo antes de adicionar sua tarefa')
    }

    saveToStorage(list) //Saves the list to Storage
    setInputData('')
  }

  function deleteItem(key){
    let newList = list.filter(item => item.key !== key)

    setList(newList)
    ToastAndroid.show('Tarefa removida!!', ToastAndroid.SHORT) //print a message indicating that the task was removed
    saveToStorage(newList) //Saves the array to storage
  }

  async function saveToStorage(dataToSave){
    try{
      await AsyncStorage.setItem('savedList', JSON.stringify(dataToSave)) //Set the key value pair in the storage
    }catch(err){
      Alert.alert('Erro ao salvar', 'Por favor, tente adicionar a tarefa novamente.')
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#2e2eb8' />
      <Header />
      <View style={styles.container}>
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent = {() => <View style={{height: 10, backgroundColor: '#FFF'}}/>}
          ListFooterComponent = {() => 
            <View style={{height: 100, backgroundColor: '#FFF'}} />
          }
          renderItem={({item, index}) => 
              <TodoItem
                title={item.name}
                key = {index}
                onPress={() => deleteItem(item.key)}
              />
          }
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder='Nova tarefa'
            value={inputData}
            onChangeText={text => setInputData(text)}
          />
          <TouchableOpacity style={styles.touch} onPress={addItem}>
            <MaterialIcon name='send' size={24} color='#FFF'/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}


//Styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#FFF'
  },
  inputArea: {
    flexDirection: 'row',
    width: '93%',
    height: 50,
    backgroundColor: '#2e2eb8',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8,
    paddingRight: 0,
    margin: 12,
    position: 'absolute',
    bottom: 5,
    borderRadius: 10
  },
  input: {
    width: '85%',
    padding: 6,
    paddingLeft: 14,
    borderRadius: 8,
    fontSize: 18,
    backgroundColor: '#FFF'
  },
  touch: {
    flex: 1,
    backgroundColor: '#2e2eb8',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
