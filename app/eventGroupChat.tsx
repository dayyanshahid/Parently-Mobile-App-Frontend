import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventMat from "../components/EventMat";

interface Message {
  id: string;
  text: string;
  time: string;
  sender: "me" | "other";
  name?: string;
  avatar?: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "🎉 Hey everyone! I'm organising a birthday party for my son, Harry Looker! We're planning something fun this weekend with games, cake, and lots of excitement. Would love for the kids to join and celebrate with us! 🎂🎈",
    time: "2h ago",
    sender: "other",
    name: "Sarah Balmer",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    text: "Sounds lovely! Count Lily in 🎉",
    time: "7:12 Am",
    sender: "me",
  },
  {
    id: "3",
    text: "Oliver’s excited already! 🥳",
    time: "7:12 Am",
    sender: "other",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "4",
    text: "That sounds wonderful! Harry’s going to have the best time. Just let me know the exact time and if you'd like me to help with anything—snacks, decorations, or setting up. Looking forward to it! 🎂🎈",
    time: "7:12 Am",
    sender: "me",
  },
];


export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(initialMessages);
  const flatListRef = useRef<FlatList>(null);


  
const handleSend = () => {
  if (!input.trim()) return;

  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const newMessage: Message = {
    id: Date.now().toString(),
    text: input,
    time: formattedTime, // <-- real time
    sender: "me",
  };

  setChatMessages([...chatMessages, newMessage]);
  setInput("");

  // scroll to bottom after sending
  setTimeout(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, 100);
};


  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === "me";
    return (
      <View style={[styles.messageRow, isMe && { justifyContent: "flex-end" }]}>
        {!isMe && item.avatar && (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        )}
        <View style={{ maxWidth: "75%" }}>
          {item.name && <Text style={styles.name}>{item.name}</Text>}
          <View
            style={[
              styles.messageBubble,
              isMe ? styles.myBubble : styles.otherBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    );
  };

  
  return (
    <EventMat title="Group Chat">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 140}
      >
        {/* Chat list */}
        <FlatList
          ref={flatListRef}
          data={chatMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingTop: 26 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity>
            <Ionicons name="happy-outline" size={26} color="#555" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Hi! How do you?"
            placeholderTextColor="#888"
            onSubmitEditing={handleSend} // send on Enter
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </EventMat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 18,
    backgroundColor: "transparent",
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    marginTop: 4,
  },
  name: {
    fontWeight: "600",
    marginBottom: 2,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: "#DADFFF",
    borderTopRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "#F1F1F1",
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    marginLeft: 4,
  },
  inputBar: {
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: "#E94057",
    padding: 12,
    borderRadius: 24,
  },
});
