import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {useSelector} from 'react-redux';
import { Feather } from "@expo/vector-icons";

import Home from "../screens/Home";
import HomeCourierScreen from "./../screens/HomeCourierScreen";
import Login from "./../screens/Login";
import Orders from "../screens/Orders";
import Tasks from "../screens/Tasks";
import History from "../screens/History";
import SearchOrder from "./../screens/SearchOrder";
import Search from "./../screens/Scan";
import ScanCourier from "./../screens/ScanCourier";
import Evidence from "./../screens/Evidence";
import Instruction from "./../screens/Instruction";
import Order from "./../screens/Order";
import ClientOrders from "./../screens/ClientOrders";
import OrdersCategory from "./../screens/OrdersCategory";

import Profile from "./../screens/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import i18n from 'i18next';

export const HomeStackScreen = () => {
  return (
    <Stack.Navigator   >
      <Stack.Screen 
        name="Home2" 
        component={Home}       
        options={{
          title: '139 Express',
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#E3000E',
        }} 
      />
      <Stack.Screen name="Scan" component={Search} />
      <Stack.Screen name="ClientOrders" component={ClientOrders} />
      <Stack.Screen name="Instruction" component={Instruction} />
    </Stack.Navigator>
  );
}

export const HomeCourier = () => {
  return (
    <Stack.Navigator   >
      <Stack.Screen 
        name="Home2" 
        component={HomeCourierScreen}       
        options={{
          title: '139 Express',
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#E3000E',
        }} 
      />
      <Stack.Screen name="ScanCourier" component={ScanCourier} />
      <Stack.Screen name="Evidence" component={Evidence} />
      <Stack.Screen name="Instruction" component={Instruction} />
    </Stack.Navigator>
  );
}

export const LoginStackScreen = () => {
  return (
    <Stack.Navigator   >
      <Stack.Screen 
        name="Login2" 
        component={Login}       
        options={{
          title: 'Login',
          headerShown:false,
        }} />
      {/* <Stack.Screen name="Conditions" component={Conditions} /> */}
    </Stack.Navigator>
  );
}

export const OrdersStackScreen = () => {
  return (
    <Stack.Navigator   >
      <Stack.Screen 
        name="Orders2" 
        component={Orders}       
        options={{
          title: 'Заказы',
          // headerShown:false,
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,          
          },
          headerTintColor: '#E3000E',
        }} />
      <Stack.Screen 
        name="Order" 
        component={Order}  
      />
      <Stack.Screen 
        name="OrdersCategory" 
        component={OrdersCategory}  
        options={{
          headerStyle: {
            // backgroundColor: '#f2f2f2',
          }
        }}
      />
      <Stack.Screen 
        name="SearchOrder" 
        component={SearchOrder}     
        options={{
          title: 'Поиск заказа',
          headerStyle: {
            // backgroundColor: '#f2f2f2',
          }
        }}
      />
    </Stack.Navigator>
  );
}

export const TasksStackScreen = () => {

  const useI18n = () => {
    const language = useSelector(state => state.user.lang);
  
    return (text) => i18n.t(text, language.code);
  }
  
  // And then use it like
  
  const t = useI18n();

  return (
    <Stack.Navigator   >
      <Stack.Screen 
        name="Tasks2" 
        component={Tasks}       
        options={{
          title: 'Tasks',
          // headerShown:false,
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,          
          },
          headerTintColor: '#E3000E',
        }} />
      <Stack.Screen 
        name="History" 
        component={History}  
      />
      <Stack.Screen 
        name="Order" 
        component={Order}  
      />
      <Stack.Screen 
        name="OrdersCategory" 
        component={OrdersCategory}  
        options={{
          headerStyle: {
            // backgroundColor: '#f2f2f2',
          }
        }}
      />
      <Stack.Screen 
        name="SearchOrder" 
        component={SearchOrder}     
        options={{
          title: 'Поиск заказа',
          headerStyle: {
            // backgroundColor: '#f2f2f2',
          }
        }}
      />
    </Stack.Navigator>
  );
}

export const ProfileStackScreen = () => {

  const useI18n = () => {
    const language = useSelector(state => state.user.lang);
  
    return (text) => i18n.t(text, language.code);
  }
  
  // And then use it like
  
  const t = useI18n();
  return (
    <Stack.Navigator   >
      <Stack.Screen 
        name="Profile2" 
        component={Profile}
        options={{ 
          title: 'Account Settings',
          // headerTintColor: '#E3000E',
          tabBarLabel: t("bottom_tab.profile"),
          // headerShown:false,
          tabBarIcon: makeIconRender("user") 
        }} />
        <Stack.Screen 
          name="Instruction" 
          component={Instruction}  
        />
    </Stack.Navigator>
  );
}

const NavigationProvider = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const loggedUserType = useSelector(state => state.user.user.type);

  const useI18n = () => {
    const language = useSelector(state => state.user.lang);
  
    return (text) => i18n.t(text, language.code);
  }
  
  const t = useI18n();

  return (
    <NavigationContainer style={{width:"100%",backgroundColor: '#d00020'}}>
      {
        isLoggedIn ? (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              tabBarActiveTintColor: "#d00020",
              tabBarInactiveTintColor: "#000000",
              tabBarActiveBackgroundColor: "#ffffff",
              tabBarInactiveBackgroundColor: "#ffffff",
              tabBarStyle: [
                {
                  "display": "flex"
                },
                null
              ]
            }}
          >
            {loggedUserType == 'c' && (
              <>
                <Stack.Screen
                  key="home"
                  name="Home"
                  component={HomeCourier}
                  options={{
                    tabBarLabel: t("bottom_tab.home"),
                    tabBarIcon: makeIconRender("home", 12),
                    headerShown: false,
                    elevation: 0,
                    shadowOpacity: 0,
                    headerShadowVisible: false,
                  }}
                />
                <Stack.Screen
                  key="tasks"
                  name="Tasks"
                  component={TasksStackScreen}
                  options={{
                    tabBarLabel: t("bottom_tab.tasks"),
                    tabBarIcon: makeIconRender("list"), 
                    headerShown: false,
                    elevation: 0,
                    shadowOpacity: 0,
                    headerShadowVisible: false
                  }}
                />
                <Stack.Screen
                  key="account"
                  name="Profile"
                  component={ProfileStackScreen}
                  options={{ 
                    title: 'Настройки профиля',
                    headerShown:false,
                    headerTintColor: '#007aff',
                    tabBarLabel: t("bottom_tab.profile"),
                    // headerShown:false,
                    tabBarIcon: makeIconRender("user") 
                  }}
                />
              </>
            )}
            {loggedUserType == 'p' && (
              <>
                <Stack.Screen
                  key="home"
                  name="Home"
                  component={HomeStackScreen}
                  options={{
                    tabBarLabel: t("bottom_tab.home"),
                    tabBarIcon: makeIconRender("home", 12),
                    headerShown: false,
                    elevation: 0,
                    shadowOpacity: 0,
                    headerShadowVisible: false,
                  }}
                />
                <Stack.Screen
                  key="orders"
                  name="Orders"
                  component={OrdersStackScreen}
                  options={{
                    tabBarLabel: t("bottom_tab.stock"),
                    tabBarIcon: makeIconRender("box"), 
                    headerShown: false,
                    elevation: 0,
                    shadowOpacity: 0,
                    headerShadowVisible: false
                  }}
                />
                <Stack.Screen
                  key="account"
                  name="Profile"
                  component={ProfileStackScreen}
                  options={{ 
                    title: 'Настройки профиля',
                    headerShown:false,
                    headerTintColor: '#007aff',
                    tabBarLabel: t("bottom_tab.profile"),
                    // headerShown:false,
                    tabBarIcon: makeIconRender("user") 
                  }}
                />
              </>
            )}
          </Tab.Navigator> 
        )
        : 
        (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}   
              options={{
                title: 'Login',
                headerShown:false,
              }}
            />
          </Stack.Navigator>
        )
      }

    </NavigationContainer>
  )
};

export default NavigationProvider;

function makeIconRender(name) {
  return ({ color, size }) => (
    <Feather name={name} color={color} size={22} />
  );
}