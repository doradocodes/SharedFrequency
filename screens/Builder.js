import {View, Text, TextInput, Pressable, StyleSheet} from "react-native";
import Header from "../components/Header";
import {styles} from "../styles/styles";
import {runOnJS, useSharedValue, withTiming} from "react-native-reanimated";
import {Directions, Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import {albumCovers} from "../data/data";
import Timeline from "../components/Timeline";
import {layout} from "../constants/constants";
import Card from "../components/Card";
import {useState} from "react";
import Song from "../components/Song";

export default function Builder() {
    const [isAlbumsView, setIsAlbumsView] = useState(true);
    const [timelineItems, setTimelineItems] = useState([]);
    const dragPosX= useSharedValue(0);
    const dragPosY = useSharedValue(0);
    let activeIndex = useSharedValue(0);


    const flingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
        console.log('fling up', activeIndex.value)
        if (activeIndex.value > 0 ) {
            activeIndex.value = withTiming(activeIndex.value -1, [300])
        }
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart(() => {
            console.log('fling down', activeIndex.value)
            if (activeIndex.value < albumCovers.length - 1) {
                activeIndex.value = withTiming(activeIndex.value +1, [300], () => {
                });
            }

        });

    // const longPress = Gesture.LongPress().onBegin(() => {
    //     runOnJS(setIsAlbumsView)(false);
    // });

    const pan = Gesture.Pan()
        .onChange((event) => {
            if (!isAlbumsView) {
                console.log(event.x, event.y);
                dragPosX.value = withTiming(event.x, [300]);
                dragPosY.value = withTiming(event.y, [300]);
            }
        });


    return <GestureHandlerRootView style={styles.container}>
        <Header />

        <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
            <View>
                <View style={{
                    backgroundColor: 'white',
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ padding: 10, fontSize: 20}}>Playlist: [name]</Text>
                        <Text style={{ padding: 10, fontSize: 20}}>Playlist time: [time]</Text>
                    </View>

                    <Timeline items={timelineItems} />
                </View>
                <View>
                    {/*<TextInput*/}
                    {/*    style={styles.input}*/}
                    {/*    onChangeText={setText}*/}
                    {/*    value={text}*/}
                    {/*    placeholder="Seach for a song"*/}
                    {/*/>*/}

                    <View>
                        { isAlbumsView ?
                            <View
                                style={builderStyle.albumStack}
                                pointerEvents="box-none"
                            >
                                {albumCovers.map((c, index) => {
                                    return (
                                        <Card
                                            info={c}
                                            key={c.id}
                                            index={index}
                                            activeIndex={activeIndex}
                                            totalLength={albumCovers.length - 1}
                                            setIsAlbumsView={setIsAlbumsView}
                                        />
                                    )
                                })}
                            </View>
                            :
                            <View style={builderStyle.songsView}>
                                <Song>
                                    <Text>Song</Text>
                                </Song>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </GestureDetector>
    </GestureHandlerRootView>
}

const builderStyle = StyleSheet.create({
   albumStack: {
       // backgroundColor: 'red',
       height: layout.height,
       alignItems: 'center',
       // flex: 1,
       justifyContent: 'flex-end',
       // marginBottom: -layout.height / 5,
   },
    songsView: {
       height: layout.height,
    },

});