import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*';
    
    let characters = '';
    if (useUppercase) characters += upper;
    if (useLowercase) characters += lower;
    if (useNumbers) characters += numbers;
    if (useSpecial) characters += special;

    if (characters === '') {
      setPassword('Selecione pelo menos uma opção!');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(password);
    alert('Senha copiada!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.password}>{password || 'Clique em Gerar'}</Text>
      <Slider
        minimumValue={6}
        maximumValue={50}
        step={1}
        value={length}
        onValueChange={setLength}
      />
      <Text>Comprimento: {length}</Text>
      <View style={styles.option}>
        <Text>Letras Maiúsculas</Text>
        <Switch value={useUppercase} onValueChange={setUseUppercase} />
      </View>
      <View style={styles.option}>
        <Text>Letras Minúsculas</Text>
        <Switch value={useLowercase} onValueChange={setUseLowercase} />
      </View>
      <View style={styles.option}>
        <Text>Números</Text>
        <Switch value={useNumbers} onValueChange={setUseNumbers} />
      </View>
      <View style={styles.option}>
        <Text>Caracteres Especiais</Text>
        <Switch value={useSpecial} onValueChange={setUseSpecial} />
      </View>
      <Button title="Gerar Senha" onPress={generatePassword} />
      {password && <Button title="Copiar" onPress={copyToClipboard} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  password: { fontSize: 20, marginBottom: 20 },
  option: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginVertical: 10 },
});
