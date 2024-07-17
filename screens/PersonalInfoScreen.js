import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from '../firebase'; 

const PersonalInfoScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name || '');
          setAddress(userData.address || '');
          setPhoneNumber(userData.phoneNumber || '');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        name,
        address,
        phoneNumber
      }, { merge: true });

      Alert.alert('Başarılı', 'Kişisel bilgileriniz kaydedildi.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ad"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adres"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#a07bba',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalInfoScreen;
