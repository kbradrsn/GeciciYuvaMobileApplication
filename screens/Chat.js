import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return unsubscribeAuth;
  }, [auth]);

  useEffect(() => {
    const docRef = doc(firestore, "chats", route.params.chatId);
    const unsubscribeMessages = onSnapshot(docRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data && data.messages) {
          setMessages(data.messages.map(msg => ({
            ...msg,
            createdAt: msg.createdAt.toDate ? msg.createdAt.toDate() : new Date(msg.createdAt),
          })).sort((a, b) => b.createdAt - a.createdAt));
        }
      }
    });
    return unsubscribeMessages;
  }, [route.params.chatId, firestore]);

  const onSend = async (newMessages = []) => {
    const docRef = doc(firestore, "chats", route.params.chatId);
    await updateDoc(docRef, {
      messages: arrayUnion(...newMessages.map(msg => ({
        ...msg,
        createdAt: new Date(),
        user: {
          _id: user.uid,
          name: user.displayName,
        },
      }))),
    });
  };

  const handleDeleteMessage = async (messageId) => {
    const docRef = doc(firestore, "chats", route.params.chatId);
    const messageToDelete = messages.find(msg => msg._id === messageId);
    
    if (messageToDelete.user._id === user.uid) {
      await updateDoc(docRef, {
        messages: arrayRemove(messageToDelete),
      });
    } else {
      Alert.alert("Bu mesajı silemezsiniz.");
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#f5c6cb", 
          },
          left: {
            backgroundColor: "#e2e3e3", 
          },
        }}
        textStyle={{
          right: {
            color: "#000000",
          },
          left: {
            color: "#000000", 
          },
        }}
        onLongPress={() => {
          if (props.currentMessage.user._id === user.uid) {
            Alert.alert(
              "Mesajı Sil",
              "Bu mesajı silmek istediğinizden emin misiniz?",
              [
                { text: "İptal", style: "cancel" },
                {
                  text: "Sil",
                  onPress: () => handleDeleteMessage(props.currentMessage._id),
                  style: "destructive"
                }
              ],
              { cancelable: true }
            );
          }
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: user?.uid ?? '',
          name: user?.displayName ?? '',
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

/*kubra dursun

 */
export default Chat;
