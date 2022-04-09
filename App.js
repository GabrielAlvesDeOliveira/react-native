import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity, FlatList, Keyboard } from 'react-native'
import firebase, { database } from "./src/firebaseConnection";
import { ref, set, remove, push, child, get, update } from "firebase/database";
import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";
import { Feather } from "@expo/vector-icons";

export default function App() {

  const [user, setUser] = useState(null)

  const inputRef = useRef(null)
  const [tasks, setTasks] = useState([])

  const [newTask, setNewTask] = useState('')
  const [key, setKey] = useState('')

  useEffect(()=>{
    
    function getUser(){

      if(!user){
        return;
      }

      const listTarefas = child(ref(database), `tasks/${user}`)
      get(listTarefas).then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            const { name } = childSnapshot.val()
            const key = childSnapshot.key
            setTasks(prevState => [...prevState, { name, key }])
          })
        } else {
          console.log("No data available");
        }      
      }).catch(error => {
        console.error(error)
      })

    }

    getUser()

  },[user])

  function handleAdd() {
    if (newTask === '') {
      return;
    }

    if(key !== ''){
      console.log(key)
      const postData = { name: newTask }
      const updates = {}
      updates[`tasks/${user}/${key}`] = postData
      update(ref(database), updates).then(() => {
        const tasksIndex = tasks.findIndex( item => item.key === key)
        let taskClone = tasks
        taskClone[tasksIndex].name = newTask

        setTasks([...taskClone])
      })
      
      Keyboard.dismiss()
      setKey('')
      setNewTask('')
      return;
    }
    
    let tarefas = child(ref(database), user)
    let chave = push(tarefas).key

    set(ref(database, `tasks/${tarefas.key}/${chave}`), { name: newTask }).then(() => {
      const data = {
        key: chave,
        name: newTask
      }

      setTasks(oldTasks => [...oldTasks, data])
    }).catch(err => {
      console.log(err)
    })

    Keyboard.dismiss()
    setNewTask('')

  }

  function handleDelete(key) {
    remove(ref(database, `tasks/${user}/${key}`)).then(() => {
      setTasks(oldTasks => oldTasks.filter(task => task.key !== key))
    }).catch(err => {
      console.log(err)
    })
  }

  function handleEdit(data) {
    setKey(data.key)
    setNewTask(data.name)
    inputRef.current.focus()

  }

  function cancelEdit(){
    setKey('')
    setNewTask('')
    Keyboard.dismiss()
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <SafeAreaView style={styles.container}>

      { key.length > 0 && (
        <View style={{flexDirection: 'row', marginBottom: 8}}>
        <TouchableOpacity onPress={cancelEdit}>
          <Feather name="x-circle" size={20} color="#FF0000"/>
        </TouchableOpacity>
        <Text style={{marginLeft: 5, color: '#FF0000'}}>
          Você está editando uma tarefa 
        </Text>
      </View>
      )}

      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={tasks} keyExtractor={(item) => item.key} renderItem={({ item }) => (<TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />)} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC'
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45
  },
  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  }
})
