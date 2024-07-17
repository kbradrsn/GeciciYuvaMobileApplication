import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';
import { Provider as PaperProvider, Dialog, Portal, Button } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthenticatedUserContext } from '../App';

const profile_picture = require('../assets/figur.png');
const logoutIcon = require('../assets/cikis.png');
const deleteIcon = require('../assets/hesabisil.png');
const personalInfoIcon = require('../assets/kisisel2.png');
const changePasswordIcon = require('../assets/sifre.png');
const profilguncelle = require('../assets/profil2.png');
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196f3',
    accent: '#e91e63',
  },
};

const Profil = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [profileImage, setProfileImage] = useState(profile_picture);
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = auth.currentUser.uid;
      const firestore = getFirestore();
      const userDoc = doc(firestore, 'users', userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (userData.profileImage) {
          setProfileImage({ uri: userData.profileImage });
        }
        if (userData.displayName) {
          setDisplayName(userData.displayName);
        }
        if (userData.city) {
          setCity(userData.city);
        }
        if (userData.email) {
          setEmail(userData.email);
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        console.error("Çıkış yaparken hata oluştu: ", error);
        Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      });
  };

  const deleteAccount = () => {
    setIsDialogVisible(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const userId = auth.currentUser.uid;
      const firestore = getFirestore();
      const userDoc = doc(firestore, 'users', userId);

      await deleteDoc(userDoc);
      const user = auth.currentUser;
      await deleteUser(user);

      console.log('Hesap silindi');
      setUser(null);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Hesap silinirken hata oluştu:', error);
      Alert.alert('Hata', 'Hesap silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsDialogVisible(false);
    }
  };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const navigateToPersonalInfo = () => {
    navigation.navigate('PersonalInfoScreen');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Galeriye erişim izni gereklidir!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const userId = auth.currentUser.uid;
      const imageName = `${userId}/${new Date().getTime()}.jpg`;
      const storage = getStorage();
      const storageRef = ref(storage, `images/${imageName}`);

      const response = await fetch(uri);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        setProfileImage({ uri: downloadURL });

        const firestore = getFirestore();
        const userDoc = doc(firestore, 'users', userId);
        await setDoc(userDoc, { profileImage: downloadURL }, { merge: true });
      }).catch(error => {
        console.error("Error uploading image: ", error);
      });
    }
  };

  const updateProfileData = async () => {
    const userId = auth.currentUser.uid;
    const firestore = getFirestore();
    const userDoc = doc(firestore, 'users', userId);

    try {
      await updateDoc(userDoc, { displayName, city, email });
      Alert.alert('Başarılı', 'Profil bilgileri güncellendi.');
    } catch (error) {
      console.error("Profil bilgileri güncellenirken hata oluştu: ", error);
      Alert.alert('Hata', 'Profil bilgileri güncellenirken bir hata oluştu.');
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView>
            <View style={styles.topSection}>
              <TouchableOpacity style={styles.propicArea} onPress={pickImage}>
                <Image source={profileImage} style={styles.propic} />
              </TouchableOpacity>
              <TextInput
                style={styles.nameInput}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Kullanıcı Adı"
              />
              <TextInput
                style={styles.cityInput}
                value={city}
                onChangeText={setCity}
                placeholder="Şehir"
              />
              <TextInput
                style={styles.emailInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Eposta"
              />
            </View>

            <View style={styles.buttonList}>
              <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9} onPress={updateProfileData}>
                <View style={styles.buttonArea}>
                  <View style={styles.iconArea}>
                    <Image source={profilguncelle} style={styles.iconStyle} resizeMode="contain" />
                  </View>
                  <Text style={styles.buttonName}>Profili Güncelle</Text>
                </View>
                <View style={styles.sp}></View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9} onPress={handleLogout}>
                <View style={styles.buttonArea}>
                  <View style={styles.iconArea}>
                    <Image source={logoutIcon} style={styles.iconStyle} resizeMode="contain" />
                  </View>
                  <Text style={styles.buttonName}>Çıkış Yap</Text>
                </View>
                <View style={styles.sp}></View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9} onPress={deleteAccount}>
                <View style={styles.buttonArea}>
                  <View style={styles.iconArea}>
                    <Image source={deleteIcon} style={styles.iconStyle} resizeMode="contain" />
                  </View>
                  <Text style={styles.buttonName}>Hesabı Sil</Text>
                </View>
                <View style={styles.sp}></View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.buttonSection, styles.changePasswordButton]} activeOpacity={0.9} onPress={navigateToChangePassword}>
                <View style={styles.buttonArea}>
                  <View style={styles.iconArea}>
                    <Image source={changePasswordIcon} style={styles.iconStyle} resizeMode="contain" />
                  </View>
                  <Text style={styles.buttonName}>Şifreyi Değiştir</Text>
                </View>
                <View style={styles.sp}></View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9} onPress={navigateToPersonalInfo}>
                <View style={styles.buttonArea}>
                  <View style={styles.iconArea}>
                    <Image source={personalInfoIcon} style={styles.iconStyle} resizeMode="contain" />
                  </View>
                  <Text style={styles.buttonName}>Kişisel Bilgiler</Text>
                </View>
                <View style={styles.sp}></View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}
          >
            <Dialog.Title>Hesabı Sil</Dialog.Title>
            <Dialog.Content>
              <Text>Hesabınızı silmek istediğinizden emin misiniz?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsDialogVisible(false)} mode="contained" style={{ backgroundColor: "#a07bba", color: 'white' }}>
                İptal
              </Button>
              <Button onPress={confirmDeleteAccount} mode="contained" style={{ backgroundColor: "#a07bba", color: 'white' }}>
                Sil
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propicArea: {
    width: 100,
    height: 100,
    borderRadius: 85,
    borderWidth: 4,
    borderColor: 'black',
  },
  propic: {
    width: '100%',
    height: '100%',
    borderRadius: 85,
  },
  nameInput: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cityInput: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: '80%',
  },
  emailInput: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: '80%',
  },
  buttonList: {
    marginTop: 10,
  },
  buttonSection: {
    height: 80,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  buttonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  iconArea: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  buttonName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});

export default Profil;
