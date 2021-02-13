import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from './src/components/screens/Main';
import SettingsScreen from './src/components/screens/Settings';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import initiateStore from './src/redux/store';
//@ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';

const {store, persistor} = initiateStore();

const Tab = createBottomTabNavigator();

import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

function MyTabBar({navigation}: any) {
  const window = useWindowDimensions();
  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity
        style={{...styles.tab, width: window.width / 2}}
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate('Main');
        }}>
        <Icon size={33} name="clockcircleo" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.tab, width: window.width / 2, borderLeftWidth: 0.5}}
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate('Settings');
        }}>
        <Icon size={35} name="setting" />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
            tabBarOptions={{
              tabStyle: {backgroundColor: '#3385ff', borderLeftWidth: 1},
              showLabel: false,
              adaptive: false,
            }}
            initialRouteName="Main">
            <Tab.Screen name="Main" component={MainScreen} />
            <Tab.Screen component={SettingsScreen} name="Settings" />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3385ff',
    borderColor: '#000',
  },
});
