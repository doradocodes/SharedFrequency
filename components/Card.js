import {Button, Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import {colors, layout, maxVisibleItems} from "../constants/constants";
import {styles} from "../styles/styles";
import {Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import Song from "./Song";
import * as Haptics from "expo-haptics";
import {useEffect, useRef, useState} from "react";
import {getAlbum} from "../api/spotifyAPI";
import {Directions, Gesture, GestureDetector} from "react-native-gesture-handler";


export default function Card({
                                 info,
                                 index,
                                 totalLength,
                                 activeIndex,
                                 songView,
                                 setTimelineItems,
                             }) {
    const [albumData, setAlbumData] = useState(null);
    const [showSongList, setShowSongList] = useState(false);
    // useEffect(() => {
    //     if (!albumData) {
    //         getAlbum(info.id).then(res => {
    //             setAlbumData(res.tracks.items);
    //         });
    //     }
    // }, [info]);
    const animatedStyle = useAnimatedStyle(() => {
        if (songView.value > 0) {
            if (index === Math.round(activeIndex.value)) {
                return {
                    transform: [
                        {
                            translateY: -layout.height * 0.15 * songView.value,
                        },
                    ]
                }
            }
            return {
                opacity: 0
            }
        }
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

    const songListStyle = useAnimatedStyle(() => {
        return {
            opacity: songView.value,
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
            <Pressable
                onLongPress={() => {
                    console.log('long press');
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    songView.value = withTiming(1, [100], () => {
                        runOnJS(setShowSongList)(true);
                        runOnJS(getAlbumInfo)();
                    });
                }}
                style={[cardStyle.imageContainer]}>

                <Image source={{uri: info.images[0].url}} style={[cardStyle.albumImage]}/>
                <AnimatedView style={[cardStyle.songList, songListStyle]}>
                    <Button title={'Back'} onPress={() => {
                        songView.value = withTiming(0, [100], () => {
                            runOnJS(setShowSongList)(false);
                        });
                    }}/>
                    { showSongList && <SongView
                        albumData={albumData}
                        albumImage={info.images[0].url}
                        setTimelineItems={setTimelineItems}
                    />}
                </AnimatedView>
            </Pressable>
        </AnimatedView>
    )
}


const SongView = ({albumData, albumImage, setTimelineItems}) => {
    const songViewRef = useRef(null);
    const flingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
        // runOnJS(songViewRef.current.scrollTo({ x: (albumData.length.length - 1) * 100, animated: true}))();
    });
    return <ScrollView ref={songViewRef}>
        {albumData && albumData.map((track, index) => {
            return <Song
                track={track}
                albumImage={albumImage}
                setTimelineItems={setTimelineItems}
            />
        })}
    </ScrollView>;
        // <GestureDetector gesture={Gesture.Exclusive(flingUp)}>

        // </GestureDetector>
}

const cardStyle = StyleSheet.create({
    album: {
        position: 'relative',
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