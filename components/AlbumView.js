import {useEffect, useState} from "react";
import {
    FadeIn,
    FadeInUp,
    FadeOut,
    FadeOutDown,
    FadeOutUp,
    runOnJS,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {searchItem} from "../api/spotifyAPI";
import * as Haptics from "expo-haptics";
import {Directions, Gesture, GestureDetector} from "react-native-gesture-handler";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import Card from "./Card";
import {Dimensions, StyleSheet} from "react-native";
import {layout} from "../constants/constants";

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function AlbumView({toggleSongView}) {
    const [searchResults, setSearchResults] = useState([]);
    let activeIndex = useSharedValue(0);
    useEffect(() => {
        searchItem().then(res => {
            console.log('res', res);
            if (res?.albums) {
                setSearchResults(res.albums);
            }
        })
    }, []);
    const vibrate = () => {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
    };
    const flingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
        console.log('fling up', activeIndex.value)
        if (activeIndex.value > 0) {
            activeIndex.value = withTiming(activeIndex.value - 1, [300])
            runOnJS(vibrate)();
        }
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart(() => {
            console.log('fling down', activeIndex.value)
            if (activeIndex.value < searchResults.items.length - 1) {
                activeIndex.value = withTiming(activeIndex.value + 1, [300]);
                runOnJS(vibrate)();
            }
        });
    return <AnimatedView
        style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: 20,
            height: SCREEN_HEIGHT,
        }}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
    >
        <GestureDetector
            gesture={Gesture.Exclusive(flingUp, flingDown)}
        >
            <AnimatedView
                style={[style.albumStack]}
                pointerEvents="box-none"
            >
                {searchResults?.items?.map((c, index) => {
                    return (
                        <Card
                            info={c}
                            key={c.id}
                            index={index}
                            activeIndex={activeIndex}
                            totalLength={searchResults.items.length - 1}
                            toggleSongView={toggleSongView}
                        />
                    )
                })}
            </AnimatedView>
        </GestureDetector>
    </AnimatedView>;
}

const style = StyleSheet.create({
    albumStack: {
        height: layout.height,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})