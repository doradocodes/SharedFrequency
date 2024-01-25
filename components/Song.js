import {PanGestureHandler} from "react-native-gesture-handler";
import {BounceIn, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {useEffect, useState} from "react";
import * as Haptics from "expo-haptics";
import {getTrack} from "../api/spotifyAPI";
// import SoundPlayer from 'react-native-sound-player';


export default function Song({ track, albumImage, setTimelineItems }) {
    const [trackData, setTrackData] = useState({});
    const [hideText, setHideText] = useState(false);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // useEffect(() => {
    //     if (!trackData) {
    //         getTrack(track.id).then(res => {
    //             setTrackData(res);
    //         })
    //     }
    // }, [trackData])

    const panGesture = useAnimatedGestureHandler({
        onActive: event => {
            console.log(event);
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        },
    });

    // const animatedStyle = useAnimatedStyle(() => {
    //     console.log('draggable', translateX.value, translateY.value);
    //     runOnJS(setHideText)(true);
    //     return {
    //         transform: [
    //             {
    //                 translateY: translateY.value,
    //             },
    //             {
    //                 translateX: translateX.value,
    //             }
    //         ]
    //     }
    // });

    return (
        <AnimatedView style={[styles.song]}>
            {/*<PanGestureHandler onGestureEvent={panGesture}>*/}
            {/*    <AnimatedView style={[styles.song, animatedStyle]}>*/}
            {/*        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />*/}
            {/*        {!hideText && <Text style={hideText}>Wading in Waist High Water</Text>}*/}
            {/*    </AnimatedView>*/}
            {/*</PanGestureHandler>*/}
            <Pressable
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    console.log(albumImage);
                    setTimelineItems((prev) => [...prev, {image: albumImage, title: track.name, id: track.id, track: track }]);
                }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View>
                    <Text style={styles.title}>{track.name}</Text>
                    {/*<Text style={styles.title}>{track.id}</Text>*/}
                    <Text style={styles.title}>{track.artists.map(artist => artist.name)}</Text>
                    {/*<Text style={styles.title}>{track.preview_url}</Text>*/}
                </View>

                <Button title={'Play preview'} onPress={() => {
                    // try {
                    //     SoundPlayer.playUrl(track.preview_url);
                    // } catch (e) {
                    //     console.log(`cannot play the sound file`, e)
                    // }
                }} />
            </Pressable>

        </AnimatedView>
    )
}

const styles = StyleSheet.create({
    song: {
        // position: 'absolute',
        overflow: 'hidden',
        fontSize: 20,
        padding: 10,
        // backgroundColor: 'white',
        // borderRadius: 10,
        shadowColor: 'black',
        marginBottom: 10,
    },
    title: {
        color: 'white',
    }
});