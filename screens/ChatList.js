import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  List,
  Avatar,
  Divider,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
} from "react-native-paper";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, onSnapshot, addDoc, updateDoc, doc, arrayUnion, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import * as Clipboard from 'expo-clipboard';

const plusIcon = require('../assets/plus.png'); 

const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      setEmail(user?.email ?? "");
    });
    return unsubscribeAuth;
  }, [auth]);

  useEffect(() => {
    if (email) {
      const q = query(collection(firestore, "chats"), where("users", "array-contains", email));
      const unsubscribeChats = onSnapshot(q, querySnapshot => {
        setChats(querySnapshot.docs.filter(doc => !doc.data().usersDeleted?.includes(email)));
      });
      return unsubscribeChats;
    }
  }, [email, firestore]);

  useEffect(() => {
    const pasteFromClipboard = async () => {
      const clipboardContent = await Clipboard.getStringAsync();
      setUserEmail(clipboardContent);
    };
    if (isDialogVisible) {
      pasteFromClipboard();
    }
  }, [isDialogVisible]);

  const createChat = async () => {
    if (!email || !userEmail) return;
    setIsLoading(true);

    const q = query(collection(firestore, "chats"), where("users", "array-contains", email));
    const querySnapshot = await getDocs(q);
    let existingChat = null;

    querySnapshot.forEach((doc) => {
      if (doc.data().users.includes(userEmail)) {
        existingChat = doc;
      }
    });

    if (existingChat) {
      setIsLoading(false);
      setIsDialogVisible(false);
      navigation.navigate("Chat", { chatId: existingChat.id });
    } else {
      const response = await addDoc(collection(firestore, "chats"), {
        users: [email, userEmail],
        messages: [],
        usersDeleted: [],
      });
      setIsLoading(false);
      setIsDialogVisible(false);
      navigation.navigate("Chat", { chatId: response.id });
    }
  };

  const handleDeleteChat = async (chatId) => {
    Alert.alert(
      "Sohbeti Sil",
      "Bu sohbeti silmek istediğinizden emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          onPress: async () => {
            const docRef = doc(firestore, "chats", chatId);
            await updateDoc(docRef, {
              usersDeleted: arrayUnion(email),
            });
            Alert.alert("Sohbet silindi!");
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  const handleAvatarPress = (chatId) => {
    Alert.alert(
      "Seçenekler",
      "Ne yapmak istersiniz?",
      [
        { text: "Sohbeti Sil", onPress: () => handleDeleteChat(chatId), style: "destructive" },
        { text: "İptal", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {chats.map((chat) => (
        <React.Fragment key={chat.id}>
          <List.Item
            title={chat.data().users.find((x) => x !== email)}
            description={(chat.data().messages ?? [])[0]?.text ?? undefined}
            left={() => (
              <TouchableOpacity onPress={() => handleAvatarPress(chat.id)}>
                <Avatar.Text
                  label={chat
                    .data()
                    .users.find((x) => x !== email)
                    .split(" ")
                    .reduce((prev, current) => prev + current[0], "")
                    .toUpperCase()} 
                  size={56}
                  style={{ backgroundColor: '#a07bba' }} 
                  labelStyle={{ color: 'white', fontWeight: 'bold' }}
                />
              </TouchableOpacity>
            )}
            onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
          />
          <Divider inset />
        </React.Fragment>
      ))}

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Yeni Sohbet</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Kullanıcı emaili girin"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => setIsDialogVisible(false)} 
              mode="contained" 
              style={styles.dialogButton}
            >
              İptal
            </Button>
            <Button 
              onPress={createChat} 
              loading={isLoading} 
              mode="contained" 
              style={styles.dialogButton}
              icon="plus"
            >
              Kaydet
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon={() => <Image source={plusIcon} style={styles.fabIcon} />}
        style={styles.fab}
        onPress={() => setIsDialogVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: '#a07bba',
  },
  fabIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dialogButton: {
    backgroundColor: '#a07bba',
  },
});

export default ChatList;