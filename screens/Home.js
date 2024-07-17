import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text, FlatList, Dimensions, Alert, TextInput, ActivityIndicator, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from '../firebase';
import { getFirestore, collection, onSnapshot, doc, setDoc, updateDoc, getDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');
const vetVisitRequiredAnimals = ['Kedi', 'Köpek', 'Tavşan', 'Bukalemun'];

const Home = () => {
    const [allUsersData, setAllUsersData] = useState([]);
    const [tempUserData, setTempUserData] = useState({});
    const [editing, setEditing] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [inputHeights, setInputHeights] = useState({});
    const [hasPost, setHasPost] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const userId = auth.currentUser?.uid;
    const firestore = getFirestore();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color="#888888" style={{ marginLeft: 15 }} />
            )
        });

        if (userId) {
            checkAndCreateUserDoc(userId);
        }

        const usersCollection = collection(firestore, 'users');
        const q = query(usersCollection, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAllUsersData(usersData.filter(user => user.selectedImage)); 
            const currentUserData = usersData.find(user => user.id === userId);
            setHasPost(currentUserData && currentUserData.selectedImage ? true : false);
        });

        return () => unsubscribe();
    }, [navigation, userId]);

    const checkAndCreateUserDoc = async (userId) => {
        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                displayName: auth.currentUser.displayName || auth.currentUser.email,
                selectedImage: "",
                importantInfo: "",
                animalName: "",
                animalDiet: "",
                animalType: "",
                vaccinationInfo: "",
                city: "",
                timestamp: new Date()
            });
        }
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
            setUploading(true);
            const uri = result.assets[0].uri;
            const imageName = `${userId}/${new Date().getTime()}.jpg`;
            const storage = getStorage();
            const storageRef = ref(storage, `images/${imageName}`);
    
            const response = await fetch(uri);
            const blob = await response.blob();
    
            const userDocRef = doc(firestore, 'users', userId);
            const userDoc = await getDoc(userDocRef);
    
            if (!userDoc.exists()) {
               
                await setDoc(userDocRef, {
                    displayName: auth.currentUser.displayName || auth.currentUser.email,
                    selectedImage: "",
                    importantInfo: "",
                    animalName: "",
                    animalDiet: "",
                    animalType: "",
                    vaccinationInfo: "",
                    city: "",
                    timestamp: new Date()
                });
            }
    
            await uploadBytes(storageRef, blob).then(async (snapshot) => {
                const downloadURL = await getDownloadURL(snapshot.ref);
                await updateDoc(userDocRef, {
                    selectedImage: downloadURL,
                    timestamp: new Date()
                });
                setTempUserData({ ...tempUserData, selectedImage: downloadURL });
                setEditing(true);
                setHasPost(true);
                setUploading(false);
            }).catch(error => {
                console.error("Error uploading image: ", error);
                setUploading(false);
            });
        }
    };

    const saveData = async () => {
        if (selectedUserId) {
            await updateDoc(doc(firestore, 'users', selectedUserId), {
                ...tempUserData,
                timestamp: new Date()
            });
        } else {
            await setDoc(doc(firestore, 'users', userId), {
                ...tempUserData,
                id: userId,
                displayName: auth.currentUser.displayName || auth.currentUser.email,
                timestamp: new Date()
            });
        }
        setEditing(false);
        setSelectedUserId(null);
        setTempUserData({});
        setHasPost(true);
        setModalVisible(false);
    };

    const deletePost = async () => {
        Alert.alert(
            "Gönderiyi Sil",
            "Bu gönderiyi silmek istediğinizden emin misiniz?",
            [
                { text: "İptal", style: "cancel" },
                {
                    text: "Sil",
                    onPress: async () => {
                        await deleteDoc(doc(firestore, 'users', selectedUserId));
                        setTempUserData({});
                        setEditing(false);
                        setSelectedUserId(null);
                        setHasPost(false);
                        setModalVisible(false);
                        setAllUsersData(allUsersData.filter(user => user.id !== selectedUserId));

                        Alert.alert("Başarılı", "Gönderi başarıyla silindi.");
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const handleInputChange = (key, value) => {
        setTempUserData({ ...tempUserData, [key]: value });
        setEditing(true);
    };

    const handlePress = (item) => {
        if (item.id === userId) {
            setSelectedUserId(item.id);
            setTempUserData({
                selectedImage: item.selectedImage,
                importantInfo: item.importantInfo,
                animalName: item.animalName,
                animalDiet: item.animalDiet,
                animalType: item.animalType,
                vaccinationInfo: item.vaccinationInfo,
                city: item.city
            });
            setModalVisible(true);
        }
    };

    const handleNamePress = (item) => {
        navigation.navigate('OtherUserProfile', { userId: item.id });
    };

    const handleContentSizeChange = (contentWidth, contentHeight, key) => {
        setInputHeights(prevHeights => ({
            ...prevHeights,
            [key]: contentHeight,
        }));
    };

    const renderItem = ({ item }) => {
        const isCurrentUser = item.id === userId;
        const isSelected = selectedUserId === item.id;

        return (
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.userContainer}>
                {item.selectedImage && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.selectedImage }} style={styles.userImage} />
                        {item.city ? (
                            <View style={styles.cityOverlay}>
                                <Text style={styles.cityText}>{item.city}</Text>
                            </View>
                        ) : null}
                        <TouchableOpacity onPress={() => handleNamePress(item)} style={styles.textOverlay}>
                            <Text style={styles.userName}>{item.displayName || item.email}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!isSelected && item.selectedImage && (
                    <>
                        {item.importantInfo && (
                            <View style={styles.cardImportant}>
                                <Text style={styles.infoText}>{item.importantInfo}</Text>
                            </View>
                        )}
                        <View style={styles.card}>
                            <Text style={styles.infoText}>{item.animalName}</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.infoText}>{item.animalDiet}</Text>
                        </View>
                        {vetVisitRequiredAnimals.includes(item.animalType) && (
                            <View style={styles.card}>
                                <Text style={styles.infoText}>{item.vaccinationInfo}</Text>
                            </View>
                        )}
                    </>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {!hasPost && (
                <TouchableOpacity style={styles.addButton} onPress={() => {
                    setSelectedUserId(userId);
                    setEditing(true);
                    setTempUserData({
                        selectedImage: "",
                        importantInfo: "",
                        animalName: "",
                        animalDiet: "",
                        animalType: "",
                        vaccinationInfo: "",
                        city: ""
                    });
                    setModalVisible(true);
                }}>
                    <Text style={styles.addButtonText}>Gönderi Ekle</Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={allUsersData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                keyboardShouldPersistTaps="handled"
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={pickImage} style={styles.changeImageButton}>
                            <Text style={styles.changeImageButtonText}>Fotoğraf Seç</Text>
                        </TouchableOpacity>
                        {uploading && (
                            <ActivityIndicator size="large" color="#0000ff" />
                        )}
                        <View style={styles.cardImportant}>
                            <Text style={styles.cardTitle}>Önemli Bilgi</Text>
                            <TextInput
                                style={[styles.input, { height: inputHeights['importantInfo'] || 40 }]}
                                value={tempUserData.importantInfo}
                                onChangeText={(text) => handleInputChange('importantInfo', text)}
                                multiline
                                scrollEnabled
                                onContentSizeChange={(e) =>
                                    handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height, 'importantInfo')
                                }
                            />
                        </View>
                        <View style={styles.card}>
                            <TextInput
                                style={[styles.input, { height: inputHeights['animalName'] || 40 }]}
                                value={tempUserData.animalName}
                                placeholder="Hayvanın Adı"
                                onChangeText={(text) => handleInputChange('animalName', text)}
                                multiline
                                scrollEnabled
                                onContentSizeChange={(e) =>
                                    handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height, 'animalName')
                                }
                            />
                        </View>
                        <View style={styles.card}>
                            <TextInput
                                style={[styles.input, { height: inputHeights['animalDiet'] || 40 }]}
                                value={tempUserData.animalDiet}
                                placeholder="Beslenme Şekli"
                                onChangeText={(text) => handleInputChange('animalDiet', text)}
                                multiline
                                scrollEnabled
                                onContentSizeChange={(e) =>
                                    handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height, 'animalDiet')
                                }
                            />
                        </View>
                        <View style={styles.card}>
                            <Picker
                                selectedValue={tempUserData.animalType}
                                style={styles.picker}
                                onValueChange={(itemValue) => handleInputChange('animalType', itemValue)}
                            >
                                <Picker.Item label="Hayvan Türünü Seçin" value="" />
                                <Picker.Item label="Kedi" value="Kedi" />
                                <Picker.Item label="Köpek" value="Köpek" />
                                <Picker.Item label="Tavşan" value="Tavşan" />
                                <Picker.Item label="Bukalemun" value="Bukalemun" />
                                <Picker.Item label="Hamster" value="Hamster" />
                                <Picker.Item label="Kertenkele" value="Kertenkele" />
                                <Picker.Item label="Diğer" value="Diğer" />
                            </Picker>
                        </View>
                        {vetVisitRequiredAnimals.includes(tempUserData.animalType) && (
                            <View style={styles.card}>
                                <TextInput
                                    style={[styles.input, { height: inputHeights['vaccinationInfo'] || 40 }]}
                                    value={tempUserData.vaccinationInfo}
                                    placeholder="Veteriner Bilgileri"
                                    onChangeText={(text) => handleInputChange('vaccinationInfo', text)}
                                    multiline
                                    scrollEnabled
                                    onContentSizeChange={(e) =>
                                        handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height, 'vaccinationInfo')
                                    }
                                />
                            </View>
                        )}
                        <TouchableOpacity onPress={saveData} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Kaydet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deletePost} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Sil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>İptal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    list: {
        width: '100%',
        paddingHorizontal: 20,
    },
    userContainer: {
        backgroundColor: '#fdfdfd',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        width: width - 40,
    },
    imageContainer: {
        position: 'relative',
        width: width - 40,
        height: width - 40,
        marginBottom: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    userImage: {
        width: '100%',
        height: '100%',
    },
    cityOverlay: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    cityText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        alignItems: 'center',
    },
    userName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '100%',
    },
    cardImportant: {
        backgroundColor: '#ffcccc',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '100%',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: '100%',
        textAlignVertical: 'top',
        borderColor: '#010709',
        backgroundColor: '#fff',
        color: 'black',
    },
    changeImageButton: {
        backgroundColor: '#a07bba',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    changeImageButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#a07bba',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#a07bba',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#a07bba',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    activityIndicator: {
        marginVertical: 10,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width - 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#a07bba',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
export default Home;
