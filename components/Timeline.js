import {View, Text, Image, StyleSheet, ScrollView} from "react-native";
import {colors, layout} from "../constants/constants";
import {useEffect, useRef, useState} from "react";
import Slider from "@react-native-community/slider";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {interpolate, useAnimatedStyle, useSharedValue} from "react-native-reanimated";

export default function Timeline({ items = [] }) {
    const [timelineLocation, setTimelineLocation] = useState(0);
    const timelineRef = useRef(null);
    const listRef = useRef(null);
    // const activeIndex = useSharedValue(0);
    // const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setTimelineLocation(items.length - 1);
        timelineRef.current.scrollTo({ x: (items.length - 1) * 80, animated: true});
        listRef.current.scrollTo({ y: (items.length - 1) * 15, animated: true});
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

    return <View>
        <View style={{
            // height: 150,
            // backgroundColor: 'blue',
        }}>
            <ScrollView ref={timelineRef} horizontal={true} style={styles.container} showsHorizontalScrollIndicator={true}>
                {items.map((item, i) => {
                    return <View style={styles.item(i === 0, i === (items.length -1))}>
                        <Image source={{ uri: item.image }} style={[styles.image(i === timelineLocation)]} />
                    </View>
                })}
            </ScrollView>
        </View>

        <Slider
            style={{
                width: '100%',
                marginTop: -35,
            }}
            value={timelineLocation}
            onValueChange={(value) => {
                setTimelineLocation(value);
                timelineRef.current.scrollTo({ x: value * 80, animated: true});
                listRef.current.scrollTo({ y: value * 15, animated: true});
            }}
            step={1}
            minimumValue={0}
            maximumValue={items.length - 1}
            minimumTrackTintColor="black"
            maximumTrackTintColor="#eeeeee"
        />

        <View>
            <AnimatedView style={[styles.trackList]}>
                <ScrollView ref={listRef} style={{ height: 50 }}>
                    {items.map((item, i) => {
                        return <Text style={{ fontWeight: timelineLocation == i ? 'bold': 'normal'}}>{item.title}</Text>;
                    })}
                </ScrollView>
            </AnimatedView>
        </View>


    </View>
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 10,
        height: 120,
    },
    item: (isFirstItem, isLastItem) => ({
        width: 80,
        height: 80,
        marginLeft: !isFirstItem ? -10 : 0,
        marginRight: isLastItem ? 20 : 0,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: 'black',

    }),
    image: (isSelectedItem) => ({
        borderRadius: 10,
        width: '100%',
        height: '100%',
        // transformOrigin: '50% 50%',
        zIndex: isSelectedItem ? 10 : 0,
        transform: [
            {
                scale: isSelectedItem ? 1.5 : 1,
            }
        ],
    }),
    trackList: {
        width: layout.width,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});