import {useEffect, useRef, useState} from "react";
import {Button, Image, ImageBackground, Pressable, ScrollView, StyleSheet, View} from "react-native";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {layout} from "../constants/constants";
import {FadeIn, FadeInUp, FadeOut, FadeOutDown, FadeOutUp} from "react-native-reanimated";
import {BlurView} from "expo-blur";
import {getAlbum} from "../api/spotifyAPI";
import Song from "./Song";

export default function SongView({toggleSongView, albumId, setTimelineItems}) {
    const songViewRef = useRef(null);
    const [albumData, setAlbumData] = useState(null);
    const [albumImage, setAlbumImage] = useState('null');

    useEffect(() => {
        if (albumId && !albumData) {
            getAlbum(albumId).then(res => {
                setAlbumData(res.tracks.items);
                setAlbumImage(res.images[0].url);
            });
        }
    }, [albumData]);

    return <AnimatedView
        style={styles.songView}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
    >
        <ImageBackground
            style={styles.backgroundImage}
            source={{uri: albumImage}}
        >
            <BlurView intensity={30}>
                <View
                    style={styles.songListContainer}>
                    <Button
                        title={'Back'}
                        onPress={() => {
                            toggleSongView();
                        }}
                    />
                    <ScrollView ref={songViewRef}>
                        {albumData && albumData.map((track) => {
                            return <Song
                                track={track}
                                albumImage={albumImage}
                                setTimelineItems={setTimelineItems}
                            />
                        })}
                    </ScrollView>
                </View>
            </BlurView>
        </ImageBackground>
    </AnimatedView>;
}

const styles = StyleSheet.create({
    songView: {
        width: '100%',
        height: layout.height,
    },
    backgroundImage: {
        // borderTopLeftRadius: 35,
        // borderTopRightRadius: 35,
        // overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    songListContainer: {
        // backgroundColor: 'red',
        height: '100%',
        width: '100%',
    },
    albumCover: {
        width: layout.width,
        height: layout.width,
        borderRadius: layout.borderRadius,
        backgroundColor: 'white',
    }
});