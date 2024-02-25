import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./screens/HomeScreen";
import {View, Text} from "react-native";
import MyPlaylists from "./screens/MyPlaylists";
import Builder from "./screens/Builder";
import Chat from "./screens/Chat";

const Drawer = createDrawerNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Chat">
                <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Drawer.Screen name="Builder" component={Builder} options={{headerShown: false}}/>
                <Drawer.Screen name="My Playlists" component={MyPlaylists} options={{headerShown: false}}/>
                <Drawer.Screen name="Chat" component={Chat} options={{headerShown: false, title: ''}}/>
            </Drawer.Navigator>
        </NavigationContainer>

    )
}

