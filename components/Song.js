import {PanGestureHandler} from "react-native-gesture-handler";
import {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {StyleSheet, Text} from "react-native";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";

export default function Song({ children }) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGesture = useAnimatedGestureHandler({
        onActive: event => {
            console.log(event);
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        }
    });

    const animatedStyle = useAnimatedStyle(() => {
        console.log('draggable', translateX.value, translateY.value);
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
        <AnimatedView>
            <PanGestureHandler onGestureEvent={panGesture}>
                <AnimatedView style={animatedStyle}>{children}</AnimatedView>
            </PanGestureHandler>
        </AnimatedView>
    )
}

const styles = StyleSheet.create({
    song: {
        borderWidth: 1,
        position: 'absolute',
        fontSize: 20,
        padding: 20,
        backgroundColor: 'white',
        // top: 10,
        // left: 10,
        // zIndex: 1,
        borderRadius: 15,
    }
});