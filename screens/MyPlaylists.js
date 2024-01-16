import {View, Text} from "react-native";
import Header from "../components/Header";
import {styles} from "../styles/styles";

export default function MyPlaylists() {
    return (
        <View style={styles.container}>
            <Header />
            <Text>My Playlists</Text>
        </View>
    )
}