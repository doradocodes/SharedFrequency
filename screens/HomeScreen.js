import Header from "../components/Header";
import {Button, View, StyleSheet} from "react-native";
import {getAccessToken, searchItem} from "../api/spotifyAPI";
export default function HomeScreen() {
    return <View style={styles.container}>
        <Header />
        <Button
            title={'Test Spotify'}
            onPress={async () => {
                // const response = await searchItem();
                // console.log('response', response.albums.items);
            }}
        />
        <View style={styles.background}></View>
    </View>
}

const styles = StyleSheet.create({
    background: {
        height: 500,
        width: '100%',
        backgroundColor: 'red',
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 200,
        borderTopRightRadius: 230,
        borderTopLeftRadius: 150,
        filter: 'blur(10px)',
    }
});