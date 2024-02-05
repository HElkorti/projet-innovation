import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import ChildFormScreen from './src/screens/ChildFormScreen';
import SignupScreen from './src/screens/SignupScreen'
import SearchDevice from './src/screens/SearchDevice';
import Dashboard from './src/screens/Dashboard';
import ProfilChildScreen from './src/screens/ProfilChildScreen';
import ProfilDeviceScreen from './src/screens/ProfilDeviceScreen';
import ProfilUserScreen from './src/screens/ProfilUserScreen';
import VoiceScreen from './src/screens/VoiceScreen';
import AnalyzeAudioScreen from './src/screens/AnalyzeAudioScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function AppNavigation() {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const HomeTabs = () => {
      return (
          <Tab.Navigator
          screenOptions={({route})=>({
            tabBarIcon:({focused, color, size})=>{
              let iconName;
    
              if (route.name === 'Accueil') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Paramètres') {
                iconName = focused ? 'sound' : 'sound-outline';
              } else if (route.name === 'Appareil') {
                iconName = focused ? 'baby' : 'baby-outline';
              } else if (route.name === 'Enfant') {
                iconName = focused ? 'ios-settings' : 'ios-settings-outline';
              }
    
              // Return an icon component based on the iconName
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
          tabBarOptions={{
            labelStyle: { fontSize: 10, textAlign: 'center' }, // Label text style
            style: {
                backgroundColor: 'lightgray', // Background color
                borderTopWidth: 1, // Top border width
                borderTopColor: 'gray', // Top border color
            }
          }
          }
          >
            <Tab.Screen name="Accueil" component={Dashboard}/>
            <Tab.Screen name="Appareil" component={ProfilDeviceScreen} /> 
            <Tab.Screen name="Enfant" component={ProfilChildScreen} />
            <Tab.Screen name="Paramètres" component={VoiceScreen} />
          </Tab.Navigator>
      );
    };
    return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#f4511e', // Set the background color
                },
                headerTintColor: '#fff', // Set the text color
                headerTitleStyle: {
                  fontWeight: 'bold', // Set the font weight of the title
                },
              }}
        >
        <Stack.Screen name="Connecter" component={LoginScreen} />
        <Stack.Screen name="S'inscrire" component={SignupScreen} />
        <Stack.Screen name="Ajouter un enfant" component={ChildFormScreen} />
        <Stack.Screen name="Rechcercher bracelet" component={SearchDevice} />
        <Stack.Screen name="Accueil" component={HomeTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="Analyze" component={AnalyzeAudioScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    );
}
