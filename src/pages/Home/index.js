import React, {useContext,useState, useEffect} from "react";
import firebase from "../../services/firebaseConnection";
import { Alert } from '@react-native'
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import HistoricoList from "../../components/HistoricoList";
import {format, isBefore, isPast} from 'date-fns'
import { Background, Container, Nome, Saldo, Title } from './styles'

export default function Home(){

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0)
  const { user } = useContext(AuthContext)
  const uid = user && user.uid

  useEffect(()=>{
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
        setSaldo(snapshot.val().saldo)
      })

      await firebase.database().ref('historico').child(uid).orderByChild('date').equalTo(format(new Date, 'dd/MM/yyyy')).limitToLast(10).on('value', (snapshot)=>{
        setHistorico([])

        snapshot.forEach((childItem)=>{
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date,
          }

          setHistorico(oldArray => [...oldArray, list].reverse())
        })
      })
    }

    loadList()
  },[])

  function handleDelete(data){

    const [diaItem, mesItem, anoItem] = data.date.split('/')
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`)

    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy')
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/')
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`)


    if(isBefore(dateItem, dateHoje)){
      if( isPast(new Date(data.date))){
        alert('Você não pode excluir um registro antigo')
        return;
      }
    }

    Alert.alert(
      'Cuidando Atenção',
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]      
    )

  }

  function handleDeleteSuccess(data){
    firebase.database().ref('historico').child(uid).child(data.key).remove()
    .then(async () => {
      let saldoAtual = saldo
      data.tipo === 'despesas' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor)

      await firebase.database().ref('users').child(uid).set(saldoAtual)
    })
    .catch(error => console.log(error))
  }

  return(
    <Background>
      <Header/>
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo> R$ {saldo.toFixed(2)}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>

      <List
      showVerticalScrollIndicator={false}
      data={historico}
      keyExtractor={item => item.key}
      renderItem={ ({item}) => ( <HistoricoList data={item} deleteItem={handleDelete}/>)}
       />
    </Background>
  )
}
