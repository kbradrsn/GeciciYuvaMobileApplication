import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Alert, Image } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { AuthenticatedUserContext } from '../App';
import { Portal, Dialog, Button } from "react-native-paper";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { setUser } = useContext(AuthenticatedUserContext);

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Login success");
          setUser(userCredential.user);
          navigation.navigate("MainTabs");
        })
        .catch((err) => {
          console.error("Login error: ", err);
          Alert.alert("Hata", "Yanlış şifre ya da e-posta adresi girdiniz.");
        });
    }
  };

  const onHandlePasswordReset = () => {
    if (resetEmail !== "") {
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          Alert.alert("Şifre sıfırlama bağlantısı gönderildi", "Lütfen e-postanızı kontrol edin.");
          setIsDialogVisible(false);
        })
        .catch((err) => Alert.alert("Hata", err.message));
    } else {
      Alert.alert("Hata", "Lütfen e-posta adresinizi girin.");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Image source={require('../assets/figur2.png')} style={styles.logo} />
        <Text style={styles.title}>Giriş</Text>
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
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDialogVisible(true)} style={{ marginTop: 20, alignSelf: 'center' }}>
          <Text style={{ color: '#ea7495', fontWeight: '600', fontSize: 14 }}>Şifremi Unuttum</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#ea7495', fontWeight: '600', fontSize: 14 }}>Hesabın Yok Mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={{ color: '#ea7495', fontWeight: '600', fontSize: 14 }}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Şifre Sıfırlama</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="E-posta adresinizi girin"
              value={resetEmail}
              onChangeText={(text) => setResetEmail(text)}
              style={styles.dialogInput}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)} mode="contained" style={{ backgroundColor: "#962b82" }}>
              İptal
            </Button>
            <Button onPress={onHandlePasswordReset} mode="contained" style={{ backgroundColor: "#962b82" }}>
              Gönder
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  dialogInput: {
    backgroundColor: "#F6F7FB",
    height: 40,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 8,
    color: "#000",
  },
});