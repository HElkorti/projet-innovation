import React, { useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { COLORS, FONTS, SIZES, images } from "../constants/theme";
import Button from "../components/Button";


const emotions = {
  belly_pain: require("../../assets/images/pediatrie.png"),
  burping: require("../../assets/images/pediatrie.png"),
  discomfort: require("../../assets/images/pediatrie.png"),
  hungry: require("../../assets/images/hungry.png"),
  tired: require("../../assets/images/tired.png"),
};


const AnalyzeAudioScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickAudioFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: ["audio/wav", 'audio/x-wav'],
      });
      setSelectedFile(file);

      const formData = new FormData();
      formData.append("file", {
        uri: file.assets[0].uri,
        name: file.assets[0].name,
        type: file.assets[0].mimeType,
      });
      // Hna dir l'address ip dial l'ordinateur dyalak o f django dir l host howa 0.0.0.0
      const url = "http://10.1.4.52:8000/process_wav";
      setLoading(true);
      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          setPrediction(res.data);
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? <ActivityIndicator size="large" color="blue" /> : null}
      {/* <Text>Analyze Audio Screen1</Text> */}
      {/* <Button title="Select Audio File" onPress={pickAudioFile} /> */}
      <Button
            title="Select Audio File"
            // onPress={authHandler}
            // isLoading={isLoading}
            onPress={pickAudioFile}
            style={{
              width: SIZES.width - 32,
              marginVertical: 8,
            }}
          />
      {selectedFile && <Text>Selected File: {selectedFile.assets[0].name}</Text>}
      {prediction && (
        <View>
          <Image
            source={emotions[prediction.prediction]}
            style={{
              resizeMode: "cover",
              height: 200,
              width: 200,
            }}
          />
          <Text>Prediction: {prediction.prediction}</Text>
        </View>
      )}
    </View>
  );
};

export default AnalyzeAudioScreen;