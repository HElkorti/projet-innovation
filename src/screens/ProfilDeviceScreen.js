import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS, SIZES } from '../constants/theme';
import themeColors from '../constants/theme1';


const profil= require("../../assets/images/BRACLET.png");
const nomLogo = require("../../assets/images/id-card.png");
const idLogo = require("../../assets/images/fingerprint.png");
const calender = require("../../assets/images/calendar.png");
const mother = require("../../assets/images/mother.png");
const father = require("../../assets/images/father.png");



const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.topSection} className="flex-1 bg-white">
          <View style={styles.propicArea}>
            <Image source={profil} style={styles.propic} />
          </View>
        </View>


        <View style={styles.buttonList}  className="flex-1 bg-white px-8 pt-8">
        <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
          <View style={styles.buttonArea}>
          <View style={styles.iconArea}>
            <Image source={idLogo} style={styles.iconStyle} resizeMode="contain" />
          </View>
          <Text style={styles.buttonName}>App-12345678</Text>
          </View>
          <View style={styles.sp}></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
          <View style={styles.buttonArea}>
          <View style={styles.iconArea}>
            <Image source={nomLogo} style={styles.iconStyle} resizeMode="contain" />
          </View>
          <Text style={styles.buttonName}>App name</Text>
          </View>
          <View style={styles.sp}></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
          <View style={styles.buttonArea}>
          <View style={styles.iconArea}>
            <Image source={calender} style={styles.iconStyle} resizeMode="contain" />
          </View>
          <Text style={styles.buttonName}>2024-31-01</Text>
          </View>
          <View style={styles.sp}></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
          <View style={styles.buttonArea}>
          <View style={styles.iconArea}>
            <Image source={father} style={styles.iconStyle} resizeMode="contain" />
          </View>
          <Text style={styles.buttonName}>Par-1234316</Text>
          </View>
          <View style={styles.sp}></View>
        </TouchableOpacity>

        </View>


      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.themeColors,
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white, 
  },
  propicArea: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 4,
    borderColor: '#FFBB3B',
    padding: 10,
  },
  propic: {
    width: '100%',
    height: '100%'
  },
  name: {
    marginTop: 20,
    color: 'white',
    fontSize: 32,
  },
  membership: {
    color: '#FFBB3B',
    fontSize: 18,
  },
  buttonList: {
    marginTop: -50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex:0,
  },
  buttonSection: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,

  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconArea: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  buttonName: {
    width: 300,
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
  },
  sp: {
    width: "100%",
    marginTop: 10,
    height: 1,
    backgroundColor: '#BA00FF'
  }
});