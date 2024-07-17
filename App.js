import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, Image } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './screens/Login';
import Chat from './screens/Chat';
import Home from './screens/Home';
import Profil from './screens/Profil';
import PetCare from './screens/PetCare';
import ChatList from './screens/ChatList';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import Signup from './screens/Signup';
import OtherUserProfile from './screens/OtherUserProfile';
import Vaccination from './screens/Vaccination';
import CalendarModal from './screens/Calendar'; 
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2196f3",
    accent: "#e91e63",
  },
};

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='ChatList' 
        component={ChatList} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name='Chat' 
        component={Chat} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='HomeScreen' 
        component={Home} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name='OtherUserProfile' 
        component={OtherUserProfile} 
        options={{ headerShown: true, title: 'Kullanıcı Profili' }} 
      />
    </Stack.Navigator>
  );
}



function PetCareStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='PetCareScreen' 
        component={PetCare} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function VaccinationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='VaccinationScreen' 
        component={Vaccination} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function CustomTabBarIcon({ focused, iconName, isChatTab, isHomeTab, isPetCareTab, isProfilTab, isVaccinationTab }) {
  const iconSize = 50;

  if (isChatTab) {
    return <Image source={require('./assets/chatt.png')} style={{ width: iconSize, height: iconSize }} />;
  } else if (isHomeTab) {
    return <Image source={require('./assets/homee.png')} style={{ width: iconSize, height: iconSize }} />;
  } else if (isPetCareTab) {
    return <Image source={require('./assets/pets.png')} style={{ width: iconSize, height: iconSize }} />;
  } else if (isProfilTab) {
    return <Image source={require('./assets/user.png')} style={{ width: iconSize, height: iconSize }} />;
  } else if (isVaccinationTab) {
    return <Image source={require('./assets/aşı.png')} style={{ width: iconSize, height: iconSize }} />;
  } 

  return (
    <Icon name={focused ? iconName : `${iconName}-outline`} size={iconSize} color={focused ? 'tomato' : 'gray'} />
  );
}
function ProfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='ProfilScreen' 
        component={Profil} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name='ChangePasswordScreen' 
        component={ChangePasswordScreen} 
        options={{ headerShown: true, title: 'Şifreyi Değiştir' }} 
      />
      <Stack.Screen 
        name='PersonalInfoScreen' 
        component={PersonalInfoScreen} 
        options={{ headerShown: true, title: 'Kişisel Bilgiler' }} 
      />
      <Stack.Screen 
        name='OtherUserProfile' 
        component={OtherUserProfile} 
        options={{ headerShown: true, title: 'Kullanıcı Profili' }} 
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const [calendarVisible, setCalendarVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let isChatTab = false;
            let isHomeTab = false;
            let isPetCareTab = false;
            let isProfilTab = false;
            let isVaccinationTab = false;

            if (route.name === 'HomeTab') {
              iconName = 'home';
              isHomeTab = true;
            } else if (route.name === 'ChatTab') {
              iconName = 'chatbubbles';
              isChatTab = true;
            } else if (route.name === 'PetCareTab') {
              iconName = 'paw';
              isPetCareTab = true;
            } else if (route.name === 'ProfilTab') {
              iconName = 'person';
              isProfilTab = true;
            } else if (route.name === 'VaccinationTab') {
              iconName = 'medkit';
              isVaccinationTab = true;
            }

            return <CustomTabBarIcon focused={focused} iconName={iconName} isChatTab={isChatTab} isHomeTab={isHomeTab} isPetCareTab={isPetCareTab} isProfilTab={isProfilTab} isVaccinationTab={isVaccinationTab} />;
          },
          tabBarLabel: () => null,
          headerShown: false,
        })}
      >
        <Tab.Screen name='HomeTab' component={HomeStack} />
        <Tab.Screen name='ChatTab' component={ChatStack} />
        <Tab.Screen name='PetCareTab' component={PetCareStack} />
       
        <Tab.Screen name='VaccinationTab' component={VaccinationStack} />
        <Tab.Screen name='ProfilTab' component={ProfilStack} />
      </Tab.Navigator>
      <CalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        onSelectDate={(date) => console.log(date)}
      />
    </>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setIsLoading(false);
    });

    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name='LoginScreen' component={Login} />
            <Stack.Screen name='SignupScreen' component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </AuthenticatedUserProvider>
  );
}
