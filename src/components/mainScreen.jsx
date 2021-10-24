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
import {CreateNewNote} from 'node'

export const MainScreen = () => {
  const [currentNote, setCorrentNote] = useState('')
  const [screen, setScreen] = useState('mainScreen')
  const notes = useSelector(state => state.todos.value)
  const dispatch = useDispatch()

  const pushNewNote = (value) => {
    dispatch(setTodos({
      id: notes.length + 1,
      title: value
    }))
    setScreen('mainScreen')
  }
  const changeNote = (id, value) => {
    dispatch(changeTodo(id, value))
    setScreen('mainScreen')
  }
  const removeNote = (id) => {
    dispatch(removeTodo(id))
  }
  useEffect(() => {
    dispatch(getTodos())
  }, [])

  return (<View style={{
      flex: 1,
      width: '90%',
      padding: 20
    }}>
    {
      screen == 'mainScreen' && <> < Text style = {{ fontSize: 20, flex: 1, fontSize: 22, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' }} > Мои заметки</Text> < View style = {{ flex: 6 }} > <ScrollView>{
          notes.map((e, i) => <TouchableOpacity activeOpacity={0.5} style={{
              flexDirection: 'row'
            }} onPress={() => {
              setScreen('viewMode'),
              setCorrentNote(e)
            }} key={e.id}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1
              }}>
              <View style={{
                  flex: 1
                }}>
                <Image style={{
                    width: 40,
                    height: 40
                  }} source={require('../img/note.png')}/>
              </View>
              <View style={{
                  paddingLeft: 10,
                  flex: 5
                }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}>{e.title}</Text>
                <Text style={{
                    fontSize: 18,
                    paddingBottom: 10
                  }}>{e.title}
                  ...</Text>
              </View>
              <TouchableOpacity style={{
                  flex: 1.5,
                  justifyContent: 'center'
                }} onPress={() => removeNote(e.id)}>
                <Text>Удалить</Text>
              </TouchableOpacity>
            </View>

          </TouchableOpacity>)
        }
      </ScrollView>
    </View>
    <TouchableOpacity activeOpacity={0.5} onPress={() => setScreen('createNewNote')} style={{
        flex: 1
      }}>
      <Text style={{
          fontSize: 18,
          textAlign: 'center',
          backgroundColor: '#1AB248',
          padding: 15,
          color: '#fff',
          fontWeight: 'bold'
        }}>Создать новую заметку</Text>
    </TouchableOpacity>
  </> || screen == 'createNewNote' && <CreateNewNote pushNewNote={pushNewNote} back={() => setScreen('mainScreen')}/> || screen == 'viewMode' && <ViewMode changeNote={changeNote} currentNote={currentNote} back={() => setScreen('mainScreen')}/>
    }
  </View>)
}
