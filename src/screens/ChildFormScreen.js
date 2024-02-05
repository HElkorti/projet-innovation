import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView, Modal} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants/theme";
// import { validateInput } from "../utils/actions/formActions";
// import { reducer } from "../utils/reducers/formReducers";
import Input from "../components/input";
import Button from "../components/Button";
import DatePicker from 'react-native-modern-datepicker'
import { Picker } from "@react-native-picker/picker";
import image from "../constants/image";
import { getToday,getFormatedDate } from "react-native-modern-datepicker";
// import { signUp } from "../utils/actions/authActions";
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChildFormScreen = ({ navigation }) => {
    //   const [error, setError] = useState();
    //   const [isLoading, setIsLoading] = useState(false);
    //   const [formState, dispatchFormState] = useReducer(reducer, initialState);
    //   const dispatch = useDispatch();
    
    //   const inputChangedHandler = useCallback(
    //     (inputId, inputValue) => {
    //       const result = validateInput(inputId, inputValue);
    //       dispatchFormState({ inputId, validationResult: result, inputValue });
    //     },
    //     [dispatchFormState]
    //   );
    
    
      
    //   const authHandler = async ()=>{
    //     try{
    //       setIsLoading(true);
    //       const action = signUp(
    //         formState.inputValues.fullName, 
    //         formState.inputValues.email, 
    //         formState.inputValues.password
    //         )
    //       await dispatch(action);
    //       Alert.alert("Account Successfully created","Account Created!")
    //       setError(null)
    //       setIsLoading(false)
    //       navigation.navigate("Login")
         
    //     }catch(error){
    //       console.log(error);
    //       setIsLoading(false);
    //       setError(error.message)
    //     }
    //   }
    
    //   useEffect(() => {
    //     if (error) {
    //       Alert.alert("An error occured", error);
    //     }
    //   }, [error]);
    const [selectedGenre, setselectedGenre] = useState();
    const [open,setOpen]=useState(false)
    const [date,setDate]=useState(new Date())
    // const [mode,setMode]=useState('date')
    // const [text,setText]=useState('date')

      function handleOnPress() {
        setOpen(!open);
      }
      function handleChange(propDate) {
        setDate(propDate);
        console.log(propDate)
      }
      const getObjectFromStorage = async () => {
        try {
          const jsonString = await AsyncStorage.getItem('user');
          if (jsonString !== null) {
            const parsedObject = JSON.parse(jsonString);
            return parsedObject
          }
        } catch (error) {
          console.log('Erreur lors de la récupération de l\'objet : ', error);
        }
      };
      useEffect(()=>{
        console.log(getObjectFromStorage())
      })
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}
          >
            <Image
              source={image.baby}
              resizeMode="contain"
              style={{
                width: 150,
                height: 140,
                marginLeft: 0,
                marginBottom: 6
              }}
            />
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Ajouter le fils</Text>
            <Text style={{ ...FONTS.body2, color: COLORS.black }}>
              Entrez les informations de votre fils.
            </Text>
            <View style={{ marginVertical: 22 }}>
              <Input
                id="Nom"
                // onInputChanged={inputChangedHandler}
                // errorText={formState.inputValidities["fullName"]}
                placeholder="Nom"
                placeholderTextColor={COLORS.gray}
              />
              <Input
                id="Prenom"
                // onInputChanged={inputChangedHandler}
                // errorText={formState.inputValidities["fullName"]}
                placeholder="Prénom"
                placeholderTextColor={COLORS.gray}
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
                  <Picker.Item label="Garçon" value="garcon" />
                  <Picker.Item label="Fille" value="fille" />
                </Picker>
              </View>
              <Button
                title="Ajouter un enfant"
                onPress={() => navigation.navigate("Rechcercher bracelet")}
                // onPress={authHandler}
                // isLoading={isLoading}
                style={{
                  width: SIZES.width - 32,
                  marginVertical: 8,
                }}
              />
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
    
export default ChildFormScreen;