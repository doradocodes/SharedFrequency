import {PanGestureHandler} from "react-native-gesture-handler";
import {runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {Image, Pressable, StyleSheet, Text} from "react-native";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {useState} from "react";
import * as Haptics from "expo-haptics";

export default function Song({ image, title, setTimelineItems }) {
    const [hideText, setHideText] = useState(false);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGesture = useAnimatedGestureHandler({
        onActive: event => {
            console.log(event);
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        console.log('draggable', translateX.value, translateY.value);
        runOnJS(setHideText)(true);
        return {
            transform: [
                {
                    translateY: translateY.value,
                },
                {
                    translateX: translateX.value,
                }
            ]
        }
    });

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
                    setTimelineItems((prev) => [...prev, {image, title}])
                }}
            >
                <Text>{title}</Text>
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
        backgroundColor: 'white',
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: 'black',
    }
});