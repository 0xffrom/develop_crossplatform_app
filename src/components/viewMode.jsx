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
import {MainScreen} from 'mainScreen'
import {CreateNewNote} from 'node'

const ViewMode = ({currentNote, back, changeNote}) => {
  const [text, onChangeText] = useState(currentNote.title)
  return (<View style={{
      flex: 1
    }}>
    <Text style={{
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        textAlignVertical: 'center'
      }}>Изменить заметку</Text>
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
      <TouchableOpacity onPress={back} activeOpacity={0.6}>
        <Text style={{
            fontSize: 18,
            color: '#fff',
            fontWeight: 'bold',
            padding: 15,
            backgroundColor: '#1AB248'
          }}>Назад</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeNote(currentNote.id, text)} activeOpacity={0.6}>
        <Text style={{
            fontSize: 18,
            color: '#fff',
            fontWeight: 'bold',
            padding: 15,
            backgroundColor: '#328FDE'
          }}>Изменить</Text>
      </TouchableOpacity>
    </View>
  </View>)
}
