import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, TextInput, Alert } from 'react-native';
import CalendarModal from './Calendar';
import { database, auth } from '../firebase'; 

const petTypes = [
  { type: 'Köpek', icon: require('../assets/köpekk.png') },
  { type: 'Kedi', icon: require('../assets/catt2.png') },
  { type: 'Tavşan', icon: require('../assets/tav.png') },
  { type: 'Civciv', icon: require('../assets/civ.png') },
  { type: 'Solucan', icon: require('../assets/solucan.png') },
  { type: 'Kaplumbağa', icon: require('../assets/turtle.png') },
  { type: 'Balık', icon: require('../assets/balik.png') },
  { type: 'Yılan', icon: require('../assets/snake2.png') },
  { type: 'Kuş', icon: require('../assets/kus1.png') },
  { type: 'Salyangoz', icon: require('../assets/slyanzog.png') },
  { type: 'Bukalemun', icon: require('../assets/buka.png') },
];

const breeds = {
  'Köpek': ['Golden Retriever', 'Labrador', 'Beagle', 'Bulldog', 'Poodle', 'Dachshund', 'Boxer', 'Rottweiler', 'Yorkshire Terrier', 'Shih Tzu', 'Cocker Spaniel', 'Doberman', 'Great Dane', 'Pug', 'Siberian Husky', 'Chihuahua', 'Akita', 'Dalmatian', 'Maltese', 'Border Collie', 'Saint Bernard', 'Bichon Frise'],
  'Kedi': ['Van Kedisi', 'Siyam', 'British Shorthair', 'Scottish Fold', 'Persian', 'Maine Coon', 'Ragdoll', 'Bengal', 'Birman', 'Sphynx', 'Abyssinian', 'Russian Blue', 'Norwegian Forest', 'Turkish Angora', 'Savannah', 'Oriental Shorthair', 'Devon Rex', 'Siberian', 'Manx', 'American Shorthair', 'Balinese'],
  'Tavşan': ['Holland Lop', 'Mini Rex', 'Lionhead', 'Netherland Dwarf', 'Flemish Giant', 'Angora', 'English Lop', 'French Lop', 'Polish', 'Mini Lop', 'Dutch', 'Himalayan', 'Satin', 'Silver Marten'],
  'Civciv': ['Ameraucana', 'Leghorn', 'Silkie', 'Rhode Island Red', 'Orpington', 'Plymouth Rock', 'Sussex', 'Cochin', 'Wyandotte', 'Brahma', 'Dominique', 'Ancona', 'Barnevelder'],
  'Solucan': ['Toprak Solucanı', 'Kompost Solucanı', 'Kırmızı Solucan', 'Mavi Solucan', 'Gri Solucan', 'Afrika Solucanı', 'Kara Solucan'],
  'Kaplumbağa': ['Su Kaplumbağası', 'Kara Kaplumbağası', 'Kırmızı Yanaklı Kaplumbağa', 'Yumuşak Kabuklu Kaplumbağa', 'Deniz Kaplumbağası', 'Spur Thighed Kaplumbağa', 'Leopar Kaplumbağa'],
  'Balık': ['Japon Balığı', 'Beta Balığı', 'Melek Balığı', 'Guppy', 'Tetra', 'Moli Balığı', 'Plati Balığı', 'Discus', 'Oscar Balığı', 'Neon Tetra', 'Zebra Danio', 'Kardinal Tetra', 'Gökkuşağı Balığı', 'Corydoras', 'Melek Balığı'],
  'Yılan': ['Top Piton', 'Mısır Yılanı', 'Boa Yılanı', 'Kral Yılanı', 'Tayvan Güney Yılanı', 'Yeşil Ağaç Pitonu', 'Karbon Pitonu'],
  'Kuş': ['Muhabbet Kuşu', 'Papağan', 'Kanarya', 'Saka Kuşu', 'Zebra İspinozu', 'Sultan Papağanı', 'Jako Papağanı'],
  'Salyangoz': ['Bahçe Salyangozu', 'Dev Afrika Salyangozu', 'Kertenkele Salyangozu', 'Konik Salyangoz', 'Tatlısu Salyangozu'],
  'Bukalemun': ['Panter Bukalemunu', 'Yemen Bukalemunu', 'Jackson Bukalemunu', 'Meller Bukalemunu', 'Beyaz Dudak Bukalemunu']
};

const genders = ['Erkek', 'Dişi'];

const dogImages = [
  { uri: require('../assets/figur.png') },
  { uri: require('../assets/kopek3.png') },
  { uri: require('../assets/resim.png') },
  { uri: require('../assets/cat3.png') },
  { uri: require('../assets/yilan3.png') },
  { uri: require('../assets/solucan4.png') },
  { uri: require('../assets/balik3.png') },
  { uri: require('../assets/kaplumbaga3.png') },
  { uri: require('../assets/civciv3.png') },
  { uri: require('../assets/bukalemun3.png') },
  { uri: require('../assets/salyangoz2.png') },
  { uri: require('../assets/kus3.png') },
  { uri: require('../assets/tavsan3.png') },
];

const Vaccination = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [breedModalVisible, setBreedModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [note, setNote] = useState('');
  const [selectedImage, setSelectedImage] = useState(dogImages[0].uri);
  const [petDetailsList, setPetDetailsList] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        fetchPetDetails(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  const fetchPetDetails = async (userId) => {
    const petDetailsSnapshot = await database.collection('pets').where('userId', '==', userId).get();
    const petDetails = petDetailsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (petDetails.length > 0) {
      const lastPet = petDetails[petDetails.length - 1];
      setPetName(lastPet.petName);
      setPetType(lastPet.petType);
      setBreed(lastPet.breed);
      setGender(lastPet.gender);
      setSelectedDate(lastPet.selectedDate);
      setNote(lastPet.note);
      setSelectedImage(lastPet.image);
    }
    setPetDetailsList(petDetails);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.petTypeButton} onPress={() => {
      setPetType(item.type);
      setBreed('');
      setGender('');
      setModalVisible(false);
    }}>
      <Image source={item.icon} style={styles.petTypeIcon} />
      <Text style={styles.petTypeText}>{item.type}</Text>
    </TouchableOpacity>
  );

  const renderBreedItem = ({ item }) => (
    <TouchableOpacity style={styles.petTypeButton} onPress={() => {
      setBreed(item);
      setBreedModalVisible(false);
    }}>
      <Text style={styles.petTypeText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderGenderItem = ({ item }) => (
    <TouchableOpacity style={styles.petTypeButton} onPress={() => {
      setGender(item);
      setGenderModalVisible(false);
    }}>
      <Text style={styles.petTypeText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderImageItem = ({ item }) => (
    <TouchableOpacity style={styles.petTypeButton} onPress={() => {
      setSelectedImage(item.uri);
      setImageModalVisible(false);
    }}>
      <Image source={item.uri} style={styles.petTypeIcon} />
    </TouchableOpacity>
  );

  const handleSelectDate = ({ date, note }) => {
    setSelectedDate(date);
    setNote(note);
  };

  const savePetDetails = () => {
    if (!petName || !petType || !breed || !gender) {
      Alert.alert('Hata', 'Lütfen tüm bilgileri doldurun.');
      return;
    }

    const petDetails = {
      petName,
      petType,
      breed,
      gender,
      selectedDate,
      note,
      image: selectedImage,
      userId: currentUser.uid, 
    };

    database.collection('pets')
      .add(petDetails)
      .then((docRef) => {
        Alert.alert('Başarılı', 'Hayvan bilgileri başarıyla kaydedildi.');
        setPetDetailsList([...petDetailsList, { id: docRef.id, ...petDetails }]); 
      })
      .catch((error) => {
        Alert.alert('Hata', 'Hayvan bilgileri kaydedilirken bir hata oluştu: ' + error.message);
      });
  };

  const deletePetDetails = (id) => {
    database.collection('pets').doc(id).delete()
      .then(() => {
        Alert.alert('Başarılı', 'Hayvan bilgileri başarıyla silindi.');
        setPetDetailsList(petDetailsList.filter(item => item.id !== id));
      })
      .catch((error) => {
        Alert.alert('Hata', 'Hayvan bilgileri silinirken bir hata oluştu: ' + error.message);
      });
  };

  const renderPetDetailsItem = ({ item }) => (
    <View style={styles.petDetailsCard}>
      <Image source={item.image} style={styles.petDetailsImage} />
      <View style={styles.petDetailsInfo}>
        <Text style={styles.petDetailsText}>Adı: {item.petName}</Text>
        <Text style={styles.petDetailsText}>Tür: {item.petType}</Text>
        <Text style={styles.petDetailsText}>Irk: {item.breed}</Text>
        <Text style={styles.petDetailsText}>Cinsiyet: {item.gender}</Text>
        <Text style={styles.petDetailsText}>Tarih: {item.selectedDate || 'Belirtilmedi'}</Text>
        <Text style={styles.petDetailsText}>Not: {item.note || 'Belirtilmedi'}</Text>
        <TouchableOpacity onPress={() => deletePetDetails(item.id)}>
          <Text style={styles.deleteButtonText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={petDetailsList}
        renderItem={renderPetDetailsItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <TouchableOpacity style={styles.addButton} onPress={() => setCalendarVisible(true)}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                <Image source={selectedImage} style={styles.image} />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={petName}
                onChangeText={setPetName}
                placeholder="Hayvan Adı"
              />
            </View>
            <View style={styles.infoContainer}>
              <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.infoButtonText}>Tür</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infoButton} onPress={() => setBreedModalVisible(true)}>
                <Text style={styles.infoButtonText}>Irk</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infoButton} onPress={() => setGenderModalVisible(true)}>
                <Text style={styles.infoButtonText}>Cinsiyet</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        contentContainerStyle={styles.petDetailsList}
      />
      
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={savePetDetails}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={petTypes}
              renderItem={renderItem}
              keyExtractor={(item) => item.type}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={breedModalVisible}
        onRequestClose={() => setBreedModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={breeds[petType]}
              renderItem={renderBreedItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity onPress={() => setBreedModalVisible(false)}>
              <Text style={styles.modalClose}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={genderModalVisible}
        onRequestClose={() => setGenderModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={genders}
              renderItem={renderGenderItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity onPress={() => setGenderModalVisible(false)}>
              <Text style={styles.modalClose}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lütfen bir resim seçiniz</Text>
            <FlatList
              data={dogImages}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={() => setImageModalVisible(false)}>
              <Text style={styles.modalClose}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        onSelectDate={handleSelectDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  addButton: {
    backgroundColor: '#a07bba',
    borderRadius: 20,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: 'white',
  },
  saveButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: '#a07bba',
    borderRadius: 20,
    padding: 10,
    width: '100%', 
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  card: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  infoButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    width: 80,
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  petDetailsList: {
    marginTop: 20,
  },
  petDetailsCard: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  petDetailsImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  petDetailsInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  petDetailsText: {
    fontSize: 14,
    color: '#333',
  },
  deleteButtonText: {
    fontSize: 14,
    color: 'red',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  petTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  petTypeIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
  petTypeText: {
    fontSize: 16,
  },
  modalClose: {
    fontSize: 16,
    color: '#2196f3',
    marginTop: 20,
  },
});

export default Vaccination;
