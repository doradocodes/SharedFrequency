import {Image, Pressable, StyleSheet} from 'react-native'
import {colors, layout, maxVisibleItems} from "../constants/constants";
import {styles} from "../styles/styles";
import {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";


export default function Card({
                                 info,
                                 index,
                                 totalLength,
                                 activeIndex,
                                 setIsAlbumsView,
                             }) {
    const animatedStyle = useAnimatedStyle(() => {
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


    // const draggableStyle = useAnimatedStyle(() => {
    //     console.log('draggable', dragPosX.value, dragPosY.value);
    //     if (dragPosX.value > 0 && dragPosY.value > 0) {
    //         return {
    //             transform: [
    //                 {
    //                     translateX: dragPosX.value,
    //                 },
    //                 {
    //                     translateY: dragPosY.value,
    //                 }
    //             ]
    //         }
    //     }
    //     return {};
    // });


    return (
        <AnimatedView style={[cardStyle.album, animatedStyle]}>
            <Pressable
                onLongPress={() => setIsAlbumsView(false)}
                style={[styles.imageContainer]}>
                <Image source={{uri: info.image}} style={[styles.locationImage]}/>
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
        // padding: layout.spacing,
        backgroundColor: colors.light,
        overflow: 'hidden',
    },

})