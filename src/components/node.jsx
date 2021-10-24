import React, {useEffect, useState} from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {changeTodo, getTodos, removeTodo, setTodos} from '../redux/todos'
import {ViewMode} from 'viewMode'
import {MainScreen} from 'mainScreen'

const CreateNewNote = ({back, pushNewNote}) => {
  const [text, onChangeText] = useState('')
  return (<View style={{
      flex: 1
    }}>
    <Text style={{
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        textAlignVertical: 'center'
      }}>Создать заметку</Text>
    <View style={{
        flex: 7
      }}>
      <TextInput multiline={true} numberOfLines={10} placeholder='Напишите что нибудь ...' style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          textAlignVertical: 'top'
        }} value={text} onChangeText={onChangeText}/>
    </View>
    <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
      <TouchableOpacity activeOpacity={0.6} onPress={back}>
        <Text style={{
            fontSize: 18,
            color: '#fff',
            padding: 15,
            backgroundColor: '#328FDE',
            fontWeight: 'bold'
          }}>Назад</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={() => pushNewNote(text)}>
        <Text style={{
            fontSize: 18,
            color: '#fff',
            padding: 15,
            backgroundColor: '#1AB248',
            fontWeight: 'bold'
          }}>Создать</Text>
      </TouchableOpacity>
    </View>

  </View>)
}
