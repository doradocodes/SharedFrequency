import {Image, Pressable, StyleSheet, Text} from 'react-native'
import {colors, layout, maxVisibleItems} from "../constants/constants";
import {styles} from "../styles/styles";
import {Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import Song from "./Song";
import * as Haptics from "expo-haptics";


export default function Card({
                                 info,
                                 index,
                                 totalLength,
                                 activeIndex,
                                 songView,
                                 setTimelineItems,
                             }) {
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
            opacity: interpolate(activeIndex.value + 1, [index - 1, index, index + 1], [1 - 1 / maxVisibleItems, 1, 1]),
            shadowOpacity: interpolate(activeIndex.value, [index - 1, index, index + 1], [0, 0.3, 0.5], {extrapolateLeft: Extrapolate.CLAMP}),
            transform: [
                {
                    translateY: interpolate(activeIndex.value, [index - 1, index, index + 1], [-layout.cardsGap, 0, layout.height * 0.5]),
                },
                {
                    scale: interpolate(activeIndex.value, [index - 1, index, index + 1], [0.95, 1, 0.94], {extrapolateRight: Extrapolate.CLAMP}),
                },
            ]
        }
    });

    const songListStyle = useAnimatedStyle(() => {
        if (index === Math.round(activeIndex.value)) {
            return {
                opacity: songView.value,
            }
        }
        return {};
    });

    return (
        <AnimatedView style={[cardStyle.album, animatedStyle]}>
            <Pressable
                onLongPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    songView.value = withTiming(1, [100]);
                }}
                style={[styles.imageContainer]}>
                <Image source={{uri: info.image}} style={[styles.locationImage]}/>
                <AnimatedView style={[cardStyle.songList, songListStyle]}>
                    {info.song && <Song
                        title={info.song.title}
                        image={info.image}
                        setTimelineItems={setTimelineItems}
                    />}
                </AnimatedView>
            </Pressable>
        </AnimatedView>
    )
}

const cardStyle = StyleSheet.create({
    album: {
        position: 'relative',
        borderRadius: layout.borderRadius,
        width: layout.width,
        height: layout.width,
        backgroundColor: colors.light,
        overflow: 'hidden',
    },
    songList: {
        position: 'absolute',
        opacity: 0,
        padding: 10,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})