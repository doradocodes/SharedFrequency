import {View, Text, Image, StyleSheet, ScrollView} from "react-native";
import {layout} from "../constants/constants";
import {useEffect, useRef, useState} from "react";
import Slider from "@react-native-community/slider";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {interpolate, useAnimatedStyle, useSharedValue} from "react-native-reanimated";

export default function Timeline({ items }) {
    const [timelineLocation, setTimelineLocation] = useState(0);
    const timelineRef = useRef(null);
    const activeIndex = useSharedValue(0);
    // useEffect(() => {
    //     timelineRef.current.scrollToEnd({ animated: true});
    // }, [items]);


    const animatedItemStyle = useAnimatedStyle((i) => {
        if (i === timelineLocation) {
            return {
                transform: [
                    {
                        scale: interpolate(activeIndex.value, [i - 1, i, i + 1], [0.95, 1, 1.1]),
                    }
                ],
            }
        }
        return {};
    });

    return <View style={{
        // height: 110,
        // backgroundColor: 'red',
    }}>
        <View style={{
            height: 100,
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
            style={{width: layout.width, marginLeft: 'auto', marginRight: 'auto'}}
            value={timelineLocation}
            onValueChange={(value) => {
                timelineRef.current.scrollTo({ x: value * 80, animated: true});
            }}
            // step={1}
            minimumValue={0}
            maximumValue={items.length - 1}
            minimumTrackTintColor="black"
            maximumTrackTintColor="#eeeeee"
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        paddingLeft: 10,
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
    image: (isLastItem) => ({
        marginTop: isLastItem? 12 : 12.25,
        borderRadius: 5,
        width: '100%',
        height: '100%',
        // transform: [
        //     {
        //         scale: isLastItem ? 1.2 : 1,
        //     }
        // ],
        transformOrigin: '50% 50%',
    })
});