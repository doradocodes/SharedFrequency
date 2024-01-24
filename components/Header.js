import {View, Text, StyleSheet, Image} from "react-native";
import {StatusBar} from "expo-status-bar";
import Constants from "constants";

export default function Header() {
    return (
        <View style={styles.header}>
            <StatusBar/>
            {/*<Text style={styles.headerText}>[sf]</Text>*/}
            {/*<Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.avatar} />*/}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight || 40,
    },
    headerText: {
        fontSize: 32,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});