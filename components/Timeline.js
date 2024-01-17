import {View, Text, Image, StyleSheet, ScrollView} from "react-native";
import {colors, layout} from "../constants/constants";
import {useEffect, useRef, useState} from "react";
import Slider from "@react-native-community/slider";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {interpolate, useAnimatedStyle, useSharedValue} from "react-native-reanimated";

export default function Timeline({ items = [] }) {
    const [timelineLocation, setTimelineLocation] = useState(0);
    const timelineRef = useRef(null);
    const activeIndex = useSharedValue(0);

    useEffect(() => {
        setTimelineLocation(items.length - 1);
        timelineRef.current.scrollTo({ x: (items.length - 1) * 80, animated: true});
    }, [items]);

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

    return <View>
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

        <View>
            <AnimatedView style={[styles.selectedItem]}>
                <Text>{items[timelineLocation]?.title}</Text>
            </AnimatedView>
        </View>

        <Slider
            style={{width: layout.width, marginLeft: 'auto', marginRight: 'auto'}}
            value={timelineLocation}
            onValueChange={(value) => {
                console.log('value', value);
                setTimelineLocation(value);
                timelineRef.current.scrollTo({ x: value * 80, animated: true});
            }}
            step={1}
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
    image: (isSelectedItem) => ({
        borderRadius: 5,
        width: '100%',
        height: '100%',
        transformOrigin: '50% 50%',
        transform: [
            {
                scale: isSelectedItem ? 1.1 : 1,
            }
        ],
    }),
    selectedItem: {
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 10,
        width: layout.width,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});