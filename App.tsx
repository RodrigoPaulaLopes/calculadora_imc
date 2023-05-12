import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function App(): JSX.Element {

  const [peso, setPeso] = useState<string>()
  const [altura, setAltura] = useState<string>()
  const [imc, setImc] = useState<string>();
  const [message, setMessage] = useState("")

  const calcularImc = () => {
    if (!peso || !altura) {
      setMessage('Por favor, preencha o peso e a altura');
      return;
    }

    const pesoEmKg = parseFloat(peso);
    const alturaEmMetros = parseFloat(altura) / 100;

    if (isNaN(pesoEmKg) || isNaN(alturaEmMetros)) {
      setMessage('Por favor, preencha o peso e a altura com valores válidos');
      return;
    }

    const imcCalculado = pesoEmKg / (alturaEmMetros * alturaEmMetros);
    setImc(imcCalculado.toFixed(1))

    if(imcCalculado >= 40.0){
      setMessage("Você está com obesidade grave")
    }else if( imcCalculado >= 30.0 && imcCalculado <= 39.9){
      setMessage("Você está com obesidade")
    }else if(imcCalculado >= 25.0 && imcCalculado <= 29.9 ){
      setMessage("Você está sobrepeso")
    }else if(imcCalculado >= 18.5 && imcCalculado <= 24.9 ){
      setMessage("Você está com o peso normal")
    }else{
      setMessage("Você está com magreza")
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.title}>Calculadora de IMC</Text>
          </View>

          <View style={styles.form_control}>
            <Text style={styles.text}>Altura</Text>
            <TextInput
              placeholder="Ex: 1,71"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#1c1c1e"
              value={altura}
              onChangeText={text => setAltura(text)}></TextInput>
          </View>

          <View style={styles.form_control}>
            <Text style={styles.text}>Peso</Text>
            <TextInput
              placeholder="Ex: 80"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#1c1c1e"
              value={peso}
              onChangeText={text => setPeso(text)}
              ></TextInput>
            
          </View>
          <View style={styles.form_control}>
            <TouchableOpacity style={styles.button} onPress={calcularImc}>
              <Text style={styles.textButton}>Calcular o IMC</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewImc}>
            <Text>Seu imc é de  <Text style={styles.imc}>{imc}</Text></Text>
            <Text>{message}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  form: {
    width: '90%',
    height: '80%',
  },
  form_control: {
    marginBottom: 5,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: '#1c1c1e',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: "#5ac8fa",
    width: "100%",
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  textButton: {
    fontSize: 16,
    fontWeight: "400",
    color: '#1c1c1e',

  },
  viewImc: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  imc: {
    color: "#5ac8fa"
  }
});

export default App;
