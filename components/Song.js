import {PanGestureHandler} from "react-native-gesture-handler";
import {BounceIn, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {useEffect, useState} from "react";
import * as Haptics from "expo-haptics";
import {getTrack} from "../api/spotifyAPI";
// import SoundPlayer from 'react-native-sound-player';


export default function Song({ track, albumImage, setTimelineItems }) {

    return (
        <AnimatedView style={[styles.song]}>
            <Pressable
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    const newItem = {image: albumImage, title: track.name, id: track.id};
                    console.log('newItem', newItem)
                    setTimelineItems((prev) => [...prev, newItem]);
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
                    {/*<Text style={styles.title}>{track.artists.map(artist => artist.name)}</Text>*/}
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        // backgroundColor: 'white',
        // borderRadius: 10,
        shadowColor: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
    },
    title: {
        color: 'white',

    }
});