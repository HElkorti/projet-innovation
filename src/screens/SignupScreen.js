import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants/theme";
// import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../../utils/reducers/formReducers";
import Input from "../components/input";
import Button from "../components/Button";
import image from "../constants/image";
import DatePicker from 'react-native-modern-datepicker'
import { Picker } from "@react-native-picker/picker";
// import { getToday,getFormatedDate } from "react-native-modern-datepicker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { signUp } from "../utils/actions/authActions";
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isTestMode = true;

const initialState = {
  inputValues: {
    fullName: isTestMode ? "John Doe" : "",
    email: isTestMode ? "example@gmail.com" : "",
    password: isTestMode ? "**********" : ""
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false
  },
  formIsValid: false,
};

const Signup = ({ navigation }) => {
//   const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
//   const dispatch = useDispatch();
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );


  
  const authHandler = ()=>{
    console.log("Authentifier")
    navigation.navigate("Ajouter un enfant")
    // try{
    //   setIsLoading(true);
    //   const action = signUp(
    //     formState.inputValues.fullName, 
    //     formState.inputValues.email, 
    //     formState.inputValues.password
    //     )
    //   await dispatch(action);
    //   Alert.alert("Account Successfully created","Account Created!")
    //   setError(null)
    //   setIsLoading(false)
    //   navigation.navigate("Login")
     
    // }catch(error){
    //   console.log(error);
    //   setIsLoading(false);
    //   setError(error.message)
    // }
  }

//   useEffect(() => {
//     if (error) {
//       Alert.alert("An error occured", error);
//     }
//   }, [error]);

const [open,setOpen]=useState(false)
const [date,setDate]=useState(new Date())
const [nom,setNom]=useState("")
const [prenom,setPrenom]=useState("")
const [selectedGenre, setselectedGenre] = useState("");
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [Cpassword,setCPassword]=useState("")
const [selectedSF, setselectedSF] = useState("");
// const [mode,setMode]=useState('date')
// const [text,setText]=useState('date')
const onChangePrenom = (newText) => {
  setPrenom(newText);
};
const onChangeNom = (newText) => {
  setNom(newText);
};
const onChangeEmail = (newText) => {
  setEmail(newText);
};

function generateRandomNumber() {
  return Math.floor(Math.random() * 900000) + 100000; // pour garantir six chiffres
}

// Générer l'ID avec le préfixe "par-" suivi du nombre aléatoire
function generateID() {
  var randomNumber = generateRandomNumber();
  return "par-" + randomNumber;
}
const inscrire=async ()=>{
  const user={
    id:generateID(),
    nom:nom,
    prenom:prenom,
    genre: selectedGenre,
    dateNaissance:date,
    email:email,
    password:password
  }
  console.log(user)
  const jsonUser = JSON.stringify(user);
  try {
    await AsyncStorage.setItem('user', jsonUser);
    console.log('Objet enregistré avec succès !');
  } catch (error) {
    console.log('Erreur lors de l\'enregistrement de l\'objet : ', error);
  }
  navigation.navigate("Ajouter un enfant")
}
  function handleOnPress() {
    setOpen(!open);
  }
  function handleChange(propDate) {
    setDate(propDate);
    console.log(propDate)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}
      >
        <Image
          source={image.logo}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            marginLeft: 0,
            marginBottom: 6
          }}
        />
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>S'inscrire</Text>
        <Text style={{ ...FONTS.body2, color: COLORS.black }}>
        Inscrivez-vous maintenant gratuitement, connectez à votre bracelet pour surveiller l'état de votre fils.
        </Text>
        <View style={{ marginVertical: 22 }}>
          <Input
            id="Nom"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["fullName"]}
            placeholder="Nom"
            placeholderTextColor={COLORS.gray}
            value={nom}
            onChangeText={onChangeNom}
          />
          <Input
            id="Prenom"
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities["fullName"]}
            placeholder="Prénom"
            placeholderTextColor={COLORS.gray}
            value={prenom}
            onChangeText={onChangePrenom}

          />
          <TouchableOpacity onPress={handleOnPress}>
            {/* <Text style={styles.title}>Date de naissance</Text> */}
            <Input
            id="dn"
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities["fullName"]}
            placeholder="Date de naissance"
            placeholderTextColor={COLORS.gray}
            value={date}
            
          />
          </TouchableOpacity>
          <Modal
           animationType="slide"
           transparent={true}
           visible={open} 
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <DatePicker
                mode="calender"
                selected={date}
                onDateChange={handleChange}
              />
              <TouchableOpacity onPress={handleOnPress}>
                <Text>Fermer</Text>
              </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.container}>
          <Text style={styles.title}>Genre:</Text>
            <Picker
              selectedValue={selectedGenre}
              onValueChange={(itemValue, itemIndex) =>
                setselectedGenre(itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Homme" value="homme" />
              <Picker.Item label="Femme" value="femme" />
            </Picker>
          </View>
          <View style={styles.container}>
          <Text style={styles.title}>Situation familiale:</Text>
            <Picker
              selectedValue={selectedSF}
              onValueChange={(itemValue, itemIndex) =>
                setselectedSF(itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Marié(e)" value="marie" />
              <Picker.Item label="Célébataire" value="celebataire" />
            </Picker>
          </View>
          <Input
            id="email"
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities["email"]}
            placeholder="Email Address"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
          />
          <Input
            id="password"
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities["email"]}
            placeholder="Mot de passe"
            placeholderTextColor={COLORS.gray}
            keyboardType="Mot-de-passe"
            secureTextEntry={true}

          />
          <Input
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities["password"]}
            id="passwordConfirmation"
            placeholder="Confirmer mot de passe"
            placeholderTextColor={COLORS.gray}
            secureTextEntry={true}
            
          />
          <Button
            title="S'inscrire"
            // onPress={authHandler}
            // isLoading={isLoading}
            onPress={inscrire}
            style={{
              width: SIZES.width - 32,
              marginVertical: 8,
            }}
          />
          <View
            style={styles.bottomContainer}>
            <Text style={{ ...FONTS.body3, color: COLORS.black }}>
              Vous avez déjà un compte ?
            </Text>
            <TouchableOpacity
            onPress={inscrire}
            >
              <Text style={{ ...FONTS.h3, color: COLORS.white }}> Connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* <Image source={images.cover} resizeMode="contain" style={styles.cover} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  cover: {
    width: SIZES.width,
    position: "absolute",
    bottom: 0,
  },
  container: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginVertical: 16,
    flexDirection: 'colone',
  },
  picker: {
    flex: 1,
    marginLeft: SIZES.padding, // Adjust as needed
    marginRight: SIZES.padding, // Adjust as needed
    color: COLORS.black, // Adjust text color
  },
  title: {
    marginBottom: 6,
    fontSize: 18,
    fontFamily: 'regular',
    color: COLORS.black, // Adjust text color
  },
  centeredView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:22,
  },
  modalView:{
    margin:20,
    backgroundColor:'white',
    borderRadius:20,
    width:"90%",
    padding:35,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5,
  },
});

export default Signup;