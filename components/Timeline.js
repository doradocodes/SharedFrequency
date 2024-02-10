import {View, Text, Image, StyleSheet, ScrollView} from "react-native";
import {colors, layout} from "../constants/constants";
import {useEffect, useRef, useState} from "react";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {interpolate, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {Slider} from "@rneui/base";
import * as Haptics from "expo-haptics";

export default function Timeline({ items = [] }) {
    const [timelineLocation, setTimelineLocation] = useState(0);
    const timelineRef = useRef(null);
    const listRef = useRef(null);
    // const activeIndex = useSharedValue(0);
    // const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        console.log("items", items);
        if (items.length > 0) {
            setTimelineLocation(items.length - 1);
            // timelineRef.current.scrollTo({x: (items.length - 1) * 80, animated: true});
            // listRef.current.scrollTo({y: (items.length - 1) * 15, animated: true});
        }
    }, [items]);

    // const animatedItemStyle = useAnimatedStyle((i) => {
    //     if (i === timelineLocation) {
    //         return {
    //             transform: [
    //                 {
    //                     scale: interpolate(activeIndex.value, [i - 1, i, i + 1], [0.95, 1, 1.1]),
    //                 }
    //             ],
    //         }
    //     }
    //     return {};
    // });

    const convertMsToMinutes = (ms) => {
        if (!ms) return '0:00';
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return <View>
        <View style={{
        }}>
            <ScrollView
                ref={timelineRef}
                horizontal={true}
                style={styles.container}
                showsHorizontalScrollIndicator={true}
            >
                {items.map((item, i) => {
                    return <View style={styles.item(i, i === 0, i === timelineLocation)}>
                        <Image source={{ uri: item.image }} style={[styles.image(i === timelineLocation)]} />
                    </View>
                })}
            </ScrollView>
        </View>

        {/*<Slider*/}
        {/*    value={0}*/}
        {/*    animationType="timing"*/}
        {/*    maximumTrackTintColor="white"*/}
        {/*    maximumValue={items.length}*/}
        {/*    minimumTrackTintColor={'black'}*/}
        {/*    minimumValue={0}*/}
        {/*    onValueChange={(value) => {*/}
        {/*        if (value < items.length) {*/}
        {/*            setTimelineLocation(value);*/}
        {/*            timelineRef.current.scrollTo({x: value * 80, animated: true});*/}
        {/*            listRef.current.scrollTo({y: value * 30, animated: true});*/}
        {/*        }*/}
        {/*    }}*/}
        {/*    orientation="horizontal"*/}
        {/*    step={1}*/}
        {/*    style={styles.slider}*/}
        {/*    thumbStyle={{height: 25, width: 25}}*/}
        {/*    thumbTintColor={'black'}*/}
        {/*    thumbTouchSize={{width: 40, height: 40}}*/}
        {/*    trackStyle={{height: 10}}*/}
        {/*    onSlidingComplete={() => {*/}
        {/*        Haptics.selectionAsync();*/}
        {/*    }}*/}
        {/*/>*/}

        {/*<View>*/}
        {/*    <AnimatedView style={[styles.trackList]}>*/}
        {/*        <ScrollView ref={listRef} style={{ height: 100 }}>*/}
        {/*            {items.map((item, i) => {*/}
        {/*                return <View style={styles.trackListItem(timelineLocation === i)}>*/}
        {/*                    <Text style={styles.trackListItemText(timelineLocation === i)}>{i + 1}. {item.title} - {item.track?.artists[0].name}</Text>*/}
        {/*                    <Text style={styles.trackListItemText(timelineLocation === i)}>{convertMsToMinutes(item.track?.duration_ms)}</Text>*/}
        {/*                </View>*/}
        {/*            })}*/}
        {/*        </ScrollView>*/}
        {/*    </AnimatedView>*/}
        {/*</View>*/}


    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: 110,
    },
    slider: {
        marginTop: -15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
    item: (i, isFirstItem, isSelectedItem) => ({
        width: 80,
        height: 80,
        marginLeft: !isSelectedItem ? -10 : 0,
        shadowOpacity: isSelectedItem ? 1 : 0,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: 'black',
        zIndex: isSelectedItem ? 1 : 0,
    }),
    image: (isSelectedItem) => ({
        width: '100%',
        height: '100%',
        zIndex: isSelectedItem ? 10 : 0,
        transform: [
            {
                scale: isSelectedItem ? 1.25 : 1,
            },
            {
                translateY: isSelectedItem ? -8 : 0,
            }
        ],
        transformOrigin: 'bottom bottom',
    }),
    trackList: {
        width: layout.width,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    trackListItem: (isSelectedItem) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5,
        opacity: isSelectedItem ? 1 : 0.1,
    }),
    trackListItemText: (isSelectedItem) => ({
        fontWeight: isSelectedItem ? 'bold': 'normal',
    })
});