import React, { useState, useEffect } from "react"; // Importer useEffect depuis React
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Button from "../components/Button";
import { COLORS, FONTS, SIZES, images } from "../constants/theme";

const Sidebar = () => {
  return (
    <View style={styles.sidebar}>
      <View style={styles.iconContainer}>
        <Image source={require("../../assets/images/home.png")} style={styles.icon} />
        <Image source={require("../../assets/images/Hist.png")} style={styles.icon} marginLeft={90} />
      </View>
    </View>
  );
};

const Dashboard = ({ navigation }) => {
  
  const [temperature, setTemperature] = useState(39);
  const [heartRate, setHeartRate] = useState(118);
  const [oxygenSaturation, setOxygenSaturation] = useState(60);
  const [healthStatus, setHealthStatus] = useState("Normal");

  // Utilisation de useEffect pour mettre à jour le statut de santé en fonction des valeurs de température, fréquence cardiaque et saturation en oxygène
  useEffect(() => {
    const isMalade = temperature > 37.5 || heartRate > 120 || oxygenSaturation < 50;
    setHealthStatus(isMalade ? "Malade" : "Normal");
  }, [temperature, heartRate, oxygenSaturation]);

  return (
    <LinearGradient
      colors={["#BA00FF", "#fff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: .6 }}
      style={styles.container}
    >
      {/* <View style={styles.container}> */}
      <Text style={styles.babyName}>Adam est </Text>
      <Text style={[styles.healthStatus, { color: healthStatus === "Malade" ? "red" : "green" }]}>{healthStatus}</Text>

      <View style={[styles.item, styles.temperature]}>
        <Image source={require("../../assets/images/Temp.png")} />
        <Text style={styles.text}>{temperature} °C</Text>
      </View>
      <View style={[styles.item, styles.comment]}>
        <Text style={styles.comment}>Interpretation: Forte fièvre</Text>
      </View>
      <View style={[styles.item, styles.heartRate]}>
        <Image source={require("../../assets/images/heart.png")} />
        <Text style={styles.text}>{heartRate} bpm</Text>
      </View>
      <View style={[styles.item, styles.comment]}>
        <Text style={styles.comment}>Interpretation: légèrement élevée</Text>
      </View>
      <View style={[styles.item, styles.oxygenSaturation]}>
        <Image source={require("../../assets/images/O2.png")} />
        <Text style={styles.text}>{oxygenSaturation} rpm</Text>
      </View>
      <View style={[styles.item, styles.comment]}>
        <Text style={styles.comment}>Interpretation: Normale</Text>
      </View>
      {/* <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Analyse")}>
          <LinearGradient colors={["#BA00FF", "#FFC700"]} style={styles.button}>
            <Text style={styles.buttonText}>Analyser l'audio</Text>
          </LinearGradient>
        </TouchableOpacity>
        
      </View> */}
      <Button
            title="Analyser l'audio"
            // onPress={authHandler}
            // isLoading={isLoading}
            onPress={() => navigation.navigate("Analyse")}
            style={{
              width: SIZES.width - 32,
              marginVertical: 8,
            }}
          />
      <View style={styles.iconContainer}>
        <Sidebar />
      </View>
      {/* </View> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    width: 250,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 40,
    marginLeft: 10,
  },
  temperature: {
    backgroundColor: "#ff4d4d",
  },
  comment: {
    width: -100,
    margin: -10,
  },
  heartRate: {
    backgroundColor: "#ffb13d",
  },
  oxygenSaturation: {
    backgroundColor: "#91e152",
  },
  sidebar: {
    backgroundColor: "#BA00FF", //Color Likhademin bih
    height: 60,
    width: 450,
    //position: "absolute",
    bottom: -215,
    left: 0,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 70,
    height: 50,
    marginLeft: 100,
    padding: 30,
  },
  babyName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  healthStatus: {
    fontSize: 24,
  },
  button: {
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default Dashboard; 