import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useEffect, useReducer, useState, Alert } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import image from "../constants/image";
// import { validateInput } from "../utils/actions/formActions";
// import { reducer } from "../utils/reducers/formReducers";
import Input from "../components/input";
import Button from "../components/Button";
// import { signIn } from "../utils/actions/authActions";
import { useDispatch} from "react-redux"
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {signInWithEmailAndPassword} from 'firebase/auth'
// const isTestMode = true;

// const initialState = {
//   inputValues: {
//     email: isTestMode ? "example@gmail.com" : "",
//     password: isTestMode ? "**********" : "",
//   },
//   inputValidities: {
//     email: false,
//     password: false,
//   },
//   formIsValid: false,
// };

const Login = ({ navigation }) => {
//   const [error, setError] = useState();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth=FIREBASE_AUTH;

  const signIn = async () => {
    setIsLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth,email,password);
      console.log(response);
      navigation.navigate("Ajouter un enfant")
      console.log("Done")
    }catch (error){
      console.log(error)
      Alert.alert("rafik boubkir")
    }finally{
      setIsLoading(false)
    }
  }
//   const [formState, dispatchFormState] = useReducer(reducer, initialState);
//   const dispatch = useDispatch()

//   const inputChangedHandler = useCallback(
//     (inputId, inputValue) => {
//       const result = validateInput(inputId, inputValue);
//       dispatchFormState({ inputId, validationResult: result, inputValue });
//     },
//     [dispatchFormState]
//   );

  const authHandler = async () => {
    console.log("Login")
//     try {
//         setIsLoading(true)
//         const action = signIn(
//             formState.inputValues.email,
//             formState.inputValues.password
//         )
//         await dispatch(action)
//         setError(null)
//         Alert.alert("Login successful","Successfully signed")
//         setIsLoading(false)
//     } catch (error) {
//         console.log(error)
//         setIsLoading(false)
//         setError(error.message)
//     }
}

//   useEffect(() => {
//     if (error) {
//       Alert.alert("An error occured", error);
//     }
//   }, [error]);

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
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Se connecter</Text>
        <Text style={{ ...FONTS.body2, color: COLORS.black }}>
        Connectez-vous maintenant pour accéder aux informations de vos enfants.
        </Text>
        <View style={{ marginVertical: 22 }}>
          <Input
            id="email"
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities["email"]}
            placeholder="Email Address"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
            value={email}
            autoCapitalize="none"
            onChangeText={(text)=> setEmail(text)}
          />
          <Input
            // onInputChanged={inputChangedHandler}
            // errorText={formState.inputValidities["password"]}
            autoCapitalize="none"
            id="password"
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            value={password}
            secureTextEntry={true}
            onChangeText={(text)=> setPassword(text)}
          />
          <Button
            title="Connecter"
            onPress={signIn}
            isLoading={isLoading}
            style={{
              width: SIZES.width - 32,
              marginVertical: 8,
            }}
          />
          <View
            style={styles.bottomContainer}>
            <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                Vous n'avez pas de compte ? {" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("S'inscrire")}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>S'inscrire</Text>
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
});

export default Login;