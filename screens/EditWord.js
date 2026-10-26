import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants";
import { playSound } from "../services/soundHandler";

export default function EditWord({ route, navigation }) {
  const wordData = route.params.wordData;
  const [phonetics, setPhonetics] = useState(wordData.phonetics || "");
  const [partOfSpeech, setPartOfSpeech] = useState(wordData.partOfSpeech || "");
  const [meaning, setMeaning] = useState(wordData.meaning || "");

  const onSave = () => {
    navigation.navigate({
      name: "AllWords",
      params: {
        wordData: { ...wordData, phonetics, partOfSpeech, meaning },
        originalWord: wordData.word,
        action: "edit",
      },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/edit.png")} style={styles.image} />
      <View style={styles.heading}>
        <Text style={styles.word}>{wordData.word}</Text>
        {!!wordData.audio && (
          <Pressable onPress={() => playSound(wordData.audio)}>
            <Ionicons name="volume-medium-outline" size={28} color={COLORS.primary900} />
          </Pressable>
        )}
      </View>
      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>phonetics:</Text>
          <TextInput style={styles.input} value={phonetics} onChangeText={setPhonetics} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>part of speech:</Text>
          <TextInput style={styles.input} value={partOfSpeech} onChangeText={setPartOfSpeech} />
        </View>
      </View>
      <Text style={styles.label}>meaning:</Text>
      <TextInput
        style={[styles.input, styles.meaning]}
        value={meaning}
        onChangeText={setMeaning}
        multiline
        textAlignVertical="top"
      />
      <Pressable style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, paddingTop: 110 },
  image: { width: 100, height: 100, alignSelf: "center", marginBottom: 28 },
  heading: { flexDirection: "row", alignItems: "center", gap: 18, marginBottom: 14 },
  word: { fontSize: 28, color: COLORS.black },
  row: { flexDirection: "row", gap: 10 },
  field: { flex: 1 },
  label: { color: COLORS.grey600, fontSize: 12, marginBottom: 4 },
  input: {
    borderColor: COLORS.primary200,
    borderWidth: 1,
    borderRadius: 5,
    color: COLORS.black,
    padding: 8,
    marginBottom: 12,
  },
  meaning: { minHeight: 100 },
  button: {
    backgroundColor: COLORS.primary900,
    borderRadius: 5,
    alignItems: "center",
    padding: 8,
  },
  buttonText: { fontSize: 24, color: COLORS.white },
});
