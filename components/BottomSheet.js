import {Dimensions, StyleSheet, Text, View} from "react-native";
import {Directions, Gesture, GestureDetector} from "react-native-gesture-handler";
import {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {useEffect} from "react";

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function BottomSheet({
                                        style,
                                      children,
                                      aboveDraggableContainerStyle,
                                      aboveDraggableContainer,
                                      draggableContainer,
                                      collapseSheet
                                  }) {
    const translateY = useSharedValue(0);
    const context = useSharedValue(0);

    // const flingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
    //     // translateY.value = withSpring(0, {damping: 20});
    //     console.log('fling up')
    // });
    // const flingDown = Gesture.Fling().direction(Directions.DOWN).onStart(() => {
    //     // translateY.value = withSpring(500, {damping: 50});
    //     console.log('fling down')
    // });

    const pan = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        }).onUpdate((event) => {
            if ((context.value.y + event.translationY) < 0) {
                translateY.value = withSpring(context.value.y + event.translationY, {damping: 15});
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value,
                }
            ]
        }
    });

    return <AnimatedView style={[style, styles.bottomSheetContainer, animatedStyle]}>
        <GestureDetector gesture={pan} >
            <View style={styles.dragIndicatorContainer}>
                <View style={styles.dragIndicator} />
            </View>
        </GestureDetector>
        {children}
    </AnimatedView>

}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        backgroundColor: '#DEDEDE',
        minHeight: SCREEN_HEIGHT,
    },
    dragIndicatorContainer: {
        width: '100%',
        padding: 10,
    },
    dragIndicator: {
        width: 50,
        height: 5,
        backgroundColor: '#ABB0BA',
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
