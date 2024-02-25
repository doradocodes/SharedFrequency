import {Dimensions, StyleSheet} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {useEffect} from "react";

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function SplitView({
                                        children,
                                        aboveDraggableContainerStyle,
                                        aboveDraggableContainer,
                                        draggableContainer,
                                        collapseSheet,
                                        onPan,
                                    }) {
    const translateY = useSharedValue(0);
    const context = useSharedValue(0);
    const height = useSharedValue(SCREEN_HEIGHT - 200);

    // useEffect(() => {
    //     if (!collapseSheet) {
    //         translateY.value = withSpring(0);
    //     }
    // }, [collapseSheet]);

    const pan = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        }).onUpdate((event) => {
            translateY.value = withSpring(context.value.y + event.translationY, { damping: 15});
            if(onPan) {
                runOnJS(onPan)(event);
            }
        });

    // const flingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
    //     translateY.value = withSpring(0, {damping: 20});
    // });
    // const flingDown = Gesture.Fling().direction(Directions.DOWN).onStart(() => {
    //     translateY.value = withSpring(COLLAPSED_TRANSLATE_Y, {damping: 50});
    // });

    const rAboveDraggableContainerStyle = useAnimatedStyle(() => {
        height.value = SCREEN_HEIGHT - 200 + translateY.value;
        // if (height.value > 100) {
        //     return {
        //         height: SCREEN_HEIGHT - 200 + translateY.value,
        //     }
        // }
        return {
            height: height.value,
        };
    });
    return <AnimatedView style={[styles.bottomSheetContainer]}>
        <AnimatedView
            style={[aboveDraggableContainerStyle, styles.aboveDraggableContainer, rAboveDraggableContainerStyle]}
        >
            {aboveDraggableContainer}
        </AnimatedView>

        <AnimatedView
            style={[styles.belowDraggableContainer]}
        >
            <GestureDetector gesture={pan}>
                <AnimatedView>
                    {draggableContainer}
                </AnimatedView>
            </GestureDetector>
            {children}
        </AnimatedView>

    </AnimatedView>

}

const styles = StyleSheet.create({
    bottomSheetContainer: {},
    aboveDraggableContainer: {
        overflow: 'hidden',
        // height: SCREEN_HEIGHT - 200,
        backgroundColor: 'blue'
    },
    draggableContainer: {},
    belowDraggableContainer: {
        width: '100%',
    }
});
