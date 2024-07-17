import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator, TouchableOpacity, Alert, FlatList } from 'react-native';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

const OtherUserProfile = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [petData, setPetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const firestore = getFirestore();
      const userDoc = await getDoc(doc(firestore, 'users', userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        await fetchPetData(userId); 
      }
      setLoading(false);
    };

    const fetchPetData = async (userId) => {
      const firestore = getFirestore();
      const petsCollection = collection(firestore, 'pets');
      const q = query(petsCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const pets = querySnapshot.docs.map(doc => doc.data());
      setPetData(pets);
    };

    fetchUserData();
  }, [userId]);

  const handleEmailPress = async (email) => {
    await Clipboard.setStringAsync(email);
    Alert.alert("E-posta adresi kopyalandı!");
  };

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  const defaultImage = require('../assets/figur.png');

  const renderPetItem = ({ item }) => (
    <View style={styles.petCard}>
      <Text style={styles.petText}>Tür: {item.petType}</Text>
      <Text style={styles.petText}>Irk: {item.breed}</Text>
      <Text style={styles.petText}>Cinsiyet: {item.gender}</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.headerContainer}>
          {userData && (
            <>
              <Image
                source={userData.profileImage ? { uri: userData.profileImage } : defaultImage}
                style={styles.profileImage}
              />
              <Text style={styles.userName}>{userData.displayName || 'Username'}</Text>
              <Text style={styles.messageText}>Mesaj Göndermek için Eposta Adresinin Üzerine Tıklayınız</Text>
              <TouchableOpacity onPress={() => handleEmailPress(userData.email)}>
                <Text style={styles.userEmail}>{userData.email ? userData.email : 'E-posta'}</Text>
              </TouchableOpacity>
             
              <Text style={styles.petTitle}>Hayvan Bilgileri</Text>
            </>
          )}
        </View>
      )}
      data={petData}
      renderItem={renderPetItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.petList}
      style={styles.background}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff', 
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },

  petTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  petList: {
    width: '100%',
    backgroundColor: '#ffffff', 
  },
  petCard: {
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  petText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  background: {
    backgroundColor: '#ffffff', 
  },
});

export default OtherUserProfile;
