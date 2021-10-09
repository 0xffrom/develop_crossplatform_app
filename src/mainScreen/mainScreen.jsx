import React, { useEffect, useState } from 'react'
import {Text, TextInput, TouchableOpacity, View, ScrollView, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const MainScreen =()=>{
    const [currentNote, setCorrentNote]=useState('')
    const [screen, setScreen]=useState('mainScreen')
    const [notes,setNotes]=useState([])

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@todo', JSON.stringify(value||notes))
          console.log('succeess')
        } catch (e) {
            console.log(e)
        }
      }
    const pushNewNote=(value)=>{
        setNotes(prev=> [...prev, {id:notes.length+1, title:value}])
        setScreen('mainScreen')
    }
    const changeNote=(id, value)=>{
        const copy=notes
        copy.map(e=>{if(e.id==id){e.title=value}})
        setNotes(copy)
        setScreen('mainScreen')
        storeData(notes)
    }
    const removeNote=(id)=>{
        setNotes(prev=>prev.filter(prev=>prev.id!==id))
        if(notes.length===1){setNotes([]),storeData([])}
    }
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@todo')
          if(value !== null) {
            setNotes(JSON.parse(value))
          }
        } catch(e) {
          // error reading value
        }
      }
    useEffect(()=>{if(notes.length>0){storeData(), console.log(notes)}}, [notes])
    useEffect(()=>{getData()},[])

return (
    <View style={{ flex:1, width:'90%', padding:20}}>
        {screen=='mainScreen'&&<>
        <Text style={{fontSize:20, flex:1, fontSize:22, fontWeight:'bold', textAlign:'center', textAlignVertical:'center'}}>Мои заметки</Text>
        <View style={{flex:6}}>
            <ScrollView>{notes.map((e,i)=>
                <TouchableOpacity activeOpacity={0.5} style={{flexDirection:'row'}} onPress={()=>{setScreen('viewMode'), setCorrentNote(e)}} key={e.id}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', flex:1}}>
                        <View style={{flex:1}}>
                        <Image style={{width:40, height:40}} source={require('../img/note.png')}/>
                        </View>
                    <View style={{paddingLeft:10, flex:5}}><Text style={{fontSize:20, fontWeight:'bold'}}>{e.title}</Text>
                    <Text style={{fontSize:18, paddingBottom:10}}>{e.title.substr(0,10)} ...</Text>
                    </View>
                    <TouchableOpacity style={{flex:1.5, justifyContent:'center'}} onPress={()=>removeNote(e.id)}><Text>Удалить</Text></TouchableOpacity>
</View>
                    
                </TouchableOpacity>)}
            </ScrollView>
            </View>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>setScreen('createNewNote')} style={{flex:1}}>
            <Text style={{fontSize:18, textAlign:'center', backgroundColor: '#1AB248', padding:15, color:'#fff', fontWeight:'bold'}}>Создать новую заметку</Text>
        </TouchableOpacity>
        </>||screen=='createNewNote'&&<CreateNewNote pushNewNote={pushNewNote} back={()=>setScreen('mainScreen')}/>||screen=='viewMode'&&<ViewMode changeNote={changeNote} currentNote={currentNote} back={()=>setScreen('mainScreen')}/>}
    </View>
)
}

const CreateNewNote =({back, pushNewNote})=>{
    const [text, onChangeText]=useState('')
    return (
        <View style={{flex:1}}>
      <Text style={{fontSize:20, flex:1, textAlign:'center', fontWeight:'bold', textAlignVertical:'center'}}>Создать заметку</Text>
        <View style={{flex:7}}>
        <TextInput 
        multiline={true}
        numberOfLines={10}
        placeholder='Напишите что нибудь ...'
        style={{borderWidth: 1, padding: 10, borderRadius:10, textAlignVertical:'top'}}
        value={text}
        onChangeText={onChangeText}
        />
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
        <TouchableOpacity activeOpacity={0.6} onPress={back}><Text style={{fontSize:18, color:'#fff', padding:15, backgroundColor: '#328FDE', fontWeight:'bold'}}>Назад</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={()=>pushNewNote(text)}><Text style={{fontSize:18, color:'#fff', padding:15, backgroundColor: '#1AB248', fontWeight:'bold'}}>Создать</Text></TouchableOpacity>
        </View>
       
        </View>)
}


  
const ViewMode=({currentNote, back, changeNote})=>{
    const [text, onChangeText]=useState(currentNote.title)
return (
    <View style={{flex:1}}>
        <Text style={{fontSize:20, flex:1, textAlign:'center', fontWeight:'bold', textAlignVertical:'center'}}>Изменить заметку</Text>
        <View style={{flex:7}}>
        <TextInput
        multiline={true}
        numberOfLines={10}
        placeholder='Напишите что нибудь ...'
        style={{borderWidth: 1, padding: 10, borderRadius:10, textAlignVertical:'top'}}
        value={text}
        onChangeText={onChangeText}
        />
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
        <TouchableOpacity onPress={back} activeOpacity={0.6}>
            <Text style={{fontSize:18, color:'#fff', fontWeight:'bold', padding:15, backgroundColor: '#1AB248'}}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>changeNote(currentNote.id, text)} activeOpacity={0.6}>
            <Text style={{fontSize:18, color:'#fff', fontWeight:'bold', padding:15, backgroundColor: '#328FDE'}}>Изменить</Text>
        </TouchableOpacity>
        </View>

        
    </View>
)
}