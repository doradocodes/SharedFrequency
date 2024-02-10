import {Dimensions, StyleSheet} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {useEffect} from "react";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const COLLAPSED_TRANSLATE_Y = SCREEN_HEIGHT / 2;
export default function BottomSheet({
                                        children,
                                        aboveDraggableContainerStyle,
                                        aboveDraggableContainer,
                                        draggableContainer,
                                        collapseSheet
                                    }) {
    const translateY = useSharedValue(0);
    const context = useSharedValue(0);
    const height = useSharedValue(SCREEN_HEIGHT - 200);

    useEffect(() => {
        if (!collapseSheet) {
            translateY.value = withSpring(0, {damping: 50});
        }
    }, [collapseSheet]);

    const pan = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        }).onUpdate((event) => {
            translateY.value = withSpring(context.value.y + event.translationY, {damping: 50});
        });

    // const flingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
    //     translateY.value = withSpring(0, {damping: 20});
    // });
    // const flingDown = Gesture.Fling().direction(Directions.DOWN).onStart(() => {
    //     translateY.value = withSpring(COLLAPSED_TRANSLATE_Y, {damping: 50});
    // });

    const rAboveDraggableContainerStyle = useAnimatedStyle(() => {
        height.value = SCREEN_HEIGHT - 200 + translateY.value;
        if (height.value > 100) {
            return {
                height: SCREEN_HEIGHT - 200 + translateY.value,
            }
        }
        return {};
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
    },
    draggableContainer: {},
    belowDraggableContainer: {
        width: '100%',
    }
});