import React, {useState} from 'react' 
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'

import axios from 'axios' // Gerenciador de requisicoes HTTP

export default function App() {

    const [cep,setCep] = useState('')
    const [endereco, setEndereco] = useState(null)

    const BuscarCep = async ()=>{
        try{
            const cepNumerico = cep.replace(/\D/g, '')
            if(cepNumerico.length !== 8){
                console.error("CEP Invalido")
                return
            }

            const res = await axios.get(`https://viacep.com.br/ws/${cepNumerico}/json`)

            if(res.data.erro){
                console.error("CEP NAO ENCONTRADO")
                return
            }

            setEndereco(res.data)
        } catch (error){
            console.error("Erro ao buscar CEP: ", error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}> Consulte seu CEP </Text>

            <TextInput
             style={styles.input}
             placeholder='Seu CEP aqui!'
             value={cep}
             onChangeText={setCep}
             keyboardType='numeric'
             maxLength={8}
             />


             <Button title="Buscar" onPress={BuscarCep} />



            {endereco && (
            <View style={styles.results} >
                <Text style = {styles.item}> CEP: {endereco.cep}</Text>
                <Text style = {styles.items}> Logradouro: {endereco.logradouro}</Text>
                <Text style = {styles.items}> Cidade: {endereco.localidade}</Text>
                <Text style = {styles.items}> Estado: {endereco.estado}</Text>

            </View>
            )}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    mainText: {
        fontSize: 18,
        fontWeight: '700',
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
    },
    results: {
        marginTop: 20,
        padding: 10,
        fontSize: 15,
        fontWeight: 500,
    },
    item: {
        marginTop: 5
    }
})