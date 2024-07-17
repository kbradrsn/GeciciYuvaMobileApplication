import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'; 

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();
  const auth = getAuth();

  const reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  }

  const changePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Hata', 'Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    reauthenticate(currentPassword).then(() => {
      var user = auth.currentUser;
      updatePassword(user, newPassword).then(() => {
        Alert.alert('Başarılı', 'Şifreniz başarıyla değiştirildi.');
        navigation.goBack();
      }).catch((error) => {
        console.error("Şifre değiştirme hatası: ", error);
        Alert.alert('Hata', 'Şifre değiştirilirken bir hata oluştu. Lütfen tekrar deneyin.');
      });
    }).catch((error) => {
      console.error("Yeniden kimlik doğrulama hatası: ", error);
      Alert.alert('Hata', 'Mevcut şifre yanlış. Lütfen tekrar deneyin.');
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Mevcut Şifre"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Yeni Şifre"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.changePasswordButton} onPress={changePassword}>
        <Text style={styles.buttonText}>Şifreyi Değiştir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  changePasswordButton: {
    backgroundColor: '#a07bba',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ChangePasswordScreen;
