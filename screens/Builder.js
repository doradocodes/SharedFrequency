import {StyleSheet, Text, TextInput, View} from "react-native";
import Header from "../components/Header";
import {styles} from "../styles/styles";
import {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Directions, Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import {albumCovers} from "../data/data";
import Timeline from "../components/Timeline";
import {layout} from "../constants/constants";
import Card from "../components/Card";
import {useState} from "react";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";

export default function Builder() {
    const albumView = useSharedValue(1);
    const [timelineItems, setTimelineItems] = useState([]);
    const [searchText, setSearchText] = useState('');

    // animation values
    let activeIndex = useSharedValue(0);
    let songView = useSharedValue(0);


    const flingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
        console.log('fling up', activeIndex.value)
        if (albumView.value > 0 && activeIndex.value > 0) {
            songView.value = 0;
            activeIndex.value = withTiming(activeIndex.value - 1, [300])
        }
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart(() => {
            console.log('fling down', activeIndex.value)
            if (albumView.value > 0 && activeIndex.value < albumCovers.length - 1) {
                songView.value = 0;
                activeIndex.value = withTiming(activeIndex.value + 1, [300], () => {
                });
            }
        });

    const albumViewStyle = useAnimatedStyle(() => {
        return {
            opacity: albumView.value,
            zIndex: albumView.value > 0 ? 1 : -1,
        };
    });

    return <GestureHandlerRootView style={styles.container}>
        <Header/>

        <View>
            <View style={{
                backgroundColor: 'white',
            }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{padding: 10, fontSize: 20}}>Playlist: [name]</Text>
                    <Text style={{padding: 10, fontSize: 20}}>Playlist time: [time]</Text>
                </View>

                <Timeline items={timelineItems}/>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setSearchText}
                    value={searchText}
                    placeholder="Seach for a song"
                />


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
                        <AnimatedView
                            style={[builderStyle.albumStack, albumViewStyle]}
                            pointerEvents="box-none"
                        >
                            {albumCovers.map((c, index) => {
                                return (
                                    <Card
                                        info={c}
                                        key={c.id}
                                        index={index}
                                        activeIndex={activeIndex}
                                        songView={songView}
                                        totalLength={albumCovers.length - 1}
                                        setTimelineItems={setTimelineItems}
                                    />
                                )
                            })}
                        </AnimatedView>
                    </GestureDetector>

                </View>
            </View>
        </View>
    </GestureHandlerRootView>
}

const builderStyle = StyleSheet.create({
    albumStack: {
        height: layout.height,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        position: 'absolute',
        zIndex: -1,
    },
    thumbnailImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    }
});