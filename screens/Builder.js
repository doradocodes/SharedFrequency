import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {styles} from "../styles/styles";
import {BounceInDown, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Directions, Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import {searchResults} from "../data/data";
import Timeline from "../components/Timeline";
import {layout} from "../constants/constants";
import Card from "../components/Card";
import {useEffect, useState} from "react";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {searchItem} from "../api/spotifyAPI";
import Header from "../components/Header";
import * as Haptics from "expo-haptics";

export default function Builder() {
    const [timelineItems, setTimelineItems] = useState([]);
    const [searchText, setSearchText] = useState('Fleet Foxes');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // animation values
    const albumView = useSharedValue(layout.height );
    let activeIndex = useSharedValue(0);
    let songView = useSharedValue(0);

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
        if (songView.value < 1 && activeIndex.value > 0) {
            // songView.value = 0;
            activeIndex.value = withTiming(activeIndex.value - 1, [300])
            runOnJS(vibrate)();
        }
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart(() => {
            console.log('fling down', activeIndex.value)
            if (songView.value < 1 && activeIndex.value < searchResults.items.length - 1) {
                // songView.value = 0;
                activeIndex.value = withTiming(activeIndex.value + 1, [300]);
                runOnJS(vibrate)();
            }
        });

    const albumViewStyle = useAnimatedStyle(() => {
        return {
            // marginTop: albumView.value,
        };
    });

    return <GestureHandlerRootView style={[styles.container, {
    }]}>
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: layout.height * 0.5,
            overflow: 'hidden',
        }}>
            <View style={builderStyle.playlistCoverContainer}></View>
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}}
                   style={builderStyle.playlistCover}/>
        </View>

        <Header/>

        <View style={{
            // backgroundColor: 'blue',
        }}>
            <View style={{ padding: 10 }}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>Playlist name</Text>
                <Text style={{ color: 'white' }}>@author @author</Text>
            </View>
            <Timeline items={timelineItems}/>
            {/*<Button title="Add song" onPress={() => {*/}
            {/*    // setModalVisible(true)*/}
            {/*    albumView.value = withTiming(0, [100]);*/}
            {/*}}>Add song</Button>*/}
        </View>

        <AnimatedView style={[
            // albumViewStyle
        ]}>
            <TextInput
                style={styles.input}
                onChangeText={setSearchText}
                value={searchText}
                placeholder="Seach for a song"
            />

            <Text style={{
                opacity: 0.2,
                fontStyle: 'italic',
                textAlign: 'center',
                padding: 5,
            }}>{songView.value > 0 ? 'Tap to add song to playlist' : 'Press and hold to view songs'}</Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
                    <AnimatedView
                        style={[builderStyle.albumStack, albumViewStyle]}
                        pointerEvents="box-none"
                    >
                        {searchResults?.items?.map((c, index) => {
                            return (
                                <Card
                                    info={c}
                                    key={c.id}
                                    index={index}
                                    activeIndex={activeIndex}
                                    songView={songView}
                                    totalLength={searchResults.items.length - 1}
                                    setTimelineItems={setTimelineItems}
                                />
                            )
                        })}
                    </AnimatedView>
                </GestureDetector>

            </View>
        </AnimatedView>

    </GestureHandlerRootView>
}

const builderStyle = StyleSheet.create({
    albumStack: {
        height: layout.height,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    playlistCoverContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    playlistCover: {
        position: 'absolute',
        top: 0,
        left: 0,
        // zIndex: -1,
        height: '100%',
        width: '100%',
    },
    thumbnailImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    }
});