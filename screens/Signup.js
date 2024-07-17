import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Alert, Image } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const onHandleSignup = async () => {
    if (email !== '' && password !== '' && nickname !== '') {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: nickname });

        await setDoc(doc(database, 'users', user.uid), {
          email: user.email,
          displayName: nickname,
          profileImage: "",
          importantInfo: "",
          animalName: "",
          animalDiet: "",
          animalType: "",
          vaccinationInfo: "",
          city: ""
        });

        navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert("Signup error", error.message);
      }
    } else {
      Alert.alert("Signup error", "All fields are required!");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Image source={require('../assets/figur2.png')} style={styles.logo} />
        <Text style={styles.title}>Kayıt Ol</Text>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#ea7495"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#ea7495"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#ea7495"
          autoCapitalize="none"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#ea7495', fontWeight: '600', fontSize: 14 }}>Hesabın Var Mı? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ color: '#ea7495', fontWeight: '600', fontSize: 14 }}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#ea7495",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    color: "#ea7495",
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#962b82',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
});
