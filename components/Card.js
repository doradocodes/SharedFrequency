import {Button, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import {colors, layout, maxVisibleItems} from "../constants/constants";
import {styles} from "../styles/styles";
import {
    Extrapolate,
    FadeOut,
    FadeIn,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import Song from "./Song";
import * as Haptics from "expo-haptics";
import {useEffect, useRef, useState} from "react";
import {getAlbum} from "../api/spotifyAPI";
import {Directions, Gesture, GestureDetector} from "react-native-gesture-handler";
const { width } = Dimensions.get('window');


export default function Card({
                                 info,
                                 index,
                                 totalLength,
                                 activeIndex,
                                 toggleSongView
                             }) {
    const [albumData, setAlbumData] = useState(null);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            zIndex: totalLength - index,
            opacity: interpolate(activeIndex.value + 1, [index - 1, index, index + 1], [0.95 - (1 / maxVisibleItems), 1, 1]),
            shadowOpacity: interpolate(activeIndex.value, [index - 1, index, index + 1], [0, 0.5, 0.5], {extrapolateLeft: Extrapolate.CLAMP}),
            transform: [
                {
                    translateY: interpolate(activeIndex.value, [index - 1, index, index + 1], [-layout.cardsGap - 10, 0, layout.height * 0.5]),
                },
                {
                    scale: interpolate(activeIndex.value, [index - 1, index, index + 1], [0.9, 1, 0.94], {extrapolateRight: Extrapolate.CLAMP}),
                },
            ]
        }
    });

    const getAlbumInfo = () => {
        getAlbum(info.id).then(res => {
            console.log('getAlbum', res);
            setAlbumData(res.tracks.items);
        });
    }

    return (
        <AnimatedView style={[cardStyle.album, animatedStyle]}>
            <AnimatedView style={{
                width: '100%',
                height: '100%',
            }}>
                <Pressable
                    onLongPress={() => {
                        console.log('long press');
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        toggleSongView(info.id);
                    }}
                    style={[cardStyle.imageContainer]}>
                    <Image source={{uri: info.images[0].url}} style={[cardStyle.albumImage]}/>
                </Pressable>
            </AnimatedView>
        </AnimatedView>
    )
}




const cardStyle = StyleSheet.create({
    album: {
        width: layout.width,
        height: layout.width,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: 'black',
    },
    imageContainer: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: layout.borderRadius,
        position: 'relative',
    },
    albumImage: {
        width: '100%',
        height: '100%',
    },
    songList: {
        position: 'absolute',
        opacity: 1,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.75)',
        // backgroundColor: 'red',
        gap: 5,
    }
})