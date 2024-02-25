import {Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {BlurView} from "expo-blur";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {
    runOnJS,
    SlideInDown,
    SlideOutDown,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import BottomSheet from "./BottomSheet";

export default function SearchContainer({searchText, setSearchText, sendMessage}) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showListView, setShowListView] = useState(false);
    const [showSelectedView, setShowSelectedView] = useState(false);
    const [selectedSong, setSelectedSong] = useState('null');

    const [searchResults, setSearchResults] = useState([{
        id: 1,
        image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'
    }, {
        id: 2,
        image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'
    }, {
        id: 3,
        image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'
    }, {
        id: 4,
        image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'
    },
        {
            id: 4,
            image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'
        },
        {
            id: 4,
            image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'
        },
        {
            id: 4,
            image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'
        },
    ]);

    return <View
        style={styles.searchContainer(isCollapsed)}
    >
        { showSelectedView ?
            <AnimatedView entering={SlideInDown.duration(300)} exiting={SlideOutDown.duration(300)}>
                <SelectedSongView onPress={() => {
                    sendMessage()
                    setTimeout(() => {
                        setShowSelectedView(false);
                    }, 500);
                }}/>
            </AnimatedView>
            :
            <>
                <TextInput
                    style={styles.input}
                    onChangeText={setSearchText}
                    value={searchText}
                    placeholder="Seach for a song"
                    onEndEditing={() => {
                        console.log("searchText", searchText)
                    }}
                    onFocus={() => {
                        setIsCollapsed(false);
                    }}
                    onBlur={() => {
                        setIsCollapsed(true);
                    }}
                />

                {showListView && <ListView items={searchResults} onPress={() => {
                    setIsCollapsed(true);
                    setShowListView(false);
                    setShowSelectedView(true);
                }}/>}

                <Text style={styles.label}>Albums</Text>

                <ScrollView
                    style={styles.searchResultsContainer}
                    horizontal={true}
                    onScroll={(event) => {
                        // const percentScrolled = event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width;
                        // console.log("activeIndex", Math.floor(percentScrolled * 100 / 25));
                        // setActiveIndex(Math.floor(percentScrolled * 100 / 25));
                        console.log("event.nativeEvent.contentOffset.x", event.nativeEvent.contentOffset.x);
                    }}
                >
                    {searchResults.map((result, i) => {
                        return <Album
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                console.log("pressed", result.id);
                                setShowListView(true);
                            }}
                        />
                    })}
                </ScrollView>

                <Text style={styles.label}>Songs</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: 10,
                        gap: 10,
                    }}
                >
                    <Song
                        track={{title: 'Title', artist: 'Artist'}}
                        albumImage={'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}
                        onPress={(e) => {
                            setShowSelectedView(true);
                        }}
                    />
                    <Song
                        track={{title: 'Title', artist: 'Artist'}}
                        albumImage={'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}
                        onPress={(e) => {
                            console.log(e)
                        }}
                    />
                    <Song
                        track={{title: 'Title', artist: 'Artist'}}
                        albumImage={'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}
                        onPress={(e) => {
                            console.log(e)
                        }}
                    />
                    <Song
                        track={{title: 'Title', artist: 'Artist'}}
                        albumImage={'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}
                        onPress={(e) => {
                            console.log(e)
                        }}
                    />
                    <Song
                        track={{title: 'Title', artist: 'Artist'}}
                        albumImage={'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}
                        onPress={(e) => {
                            console.log(e)
                        }}
                    />
                </View>
            </>
        }
    </View>
};

const SelectedSongView = ({selectedSong, onPress}) => {
    const transformValue = useSharedValue(1);
    const animateSendButton = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: transformValue.value,
                }
            ]
        }
    });
    return <View>
        <Pressable
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                // transformValue.value = withTiming(1.1, {duration: 300});
                runOnJS(onPress)();
            }}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 15,
            }}
        >
            <Image
                source={{uri: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    shadowColor: 'black',
                    shadowOffset: {height: 0, width: 0},
                    transform: [
                        { scale: 1.1 }
                    ]
                }}
            />
            <View
                style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                    flexDirection: 'column',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    flex: 1,
                }}
            >
                <Text style={{ fontSize: 20, }}>Title</Text>
                <Text>Artist</Text>
                <Text>Album</Text>
            </View>
        </Pressable>


        <TextInput
            style={styles.input}
            // onChangeText={setSearchText}
            // value={searchText}
            placeholder="Add note"
            onEndEditing={() => {
                console.log("searchText", searchText)
            }}
            onFocus={() => {
                // setIsCollapsed(false);
            }}
            onBlur={() => {
                // setIsCollapsed(true);
            }}
        />
    </View>
}

const ListView = ({items, onPress}) => {
    return <AnimatedView
        style={listViewStyles.listView}
        entering={SlideInDown.duration(300)}
        exiting={SlideOutDown.duration(300)}
    >
        <ImageBackground
            style={[listViewStyles.listViewBackgroundImage]}
            source={{uri: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}}>
            <BlurView style={listViewStyles.listViewBlurView}>
                <ScrollView
                    style={listViewStyles.listViewScrollView}
                >
                    {items.map((result, i) => {
                        return <Pressable
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                onPress();
                            }}
                            style={listViewStyles.item}
                        >
                            <Text style={listViewStyles.title}>Title</Text>
                        </Pressable>
                    })}
                </ScrollView>
            </BlurView>
        </ImageBackground>
    </AnimatedView>
}

const listViewStyles = StyleSheet.create({
    listView: {
        position: 'absolute',
        bottom: 0,
        minHeight: 500,
        zIndex: 1,
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    listViewBackgroundImage: {},
    listViewBlurView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    listViewScrollView: {
        // padding: 20,
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
    },
    title: {
        fontSize: 20,
        color: 'white'
    }
});

const Album = ({onPress, style}) => {
    return (
        <Pressable
            style={[albumStyles.albumContainer, style]}
            onPress={onPress}
        >
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}}
                   style={albumStyles.albumImage(false)}/>
            <Text style={albumStyles.albumTitle}>Title</Text>
        </Pressable>
    )
}

const albumStyles = StyleSheet.create({
    albumContainer: {
        position: 'relative',
    },
    albumImage: (isFirstChild) => ({
        // width: isFirstChild ? 90 : 70,
        // height: isFirstChild ? 90 : 70,
        width: 100,
        height: 100,
        borderRadius: 10,
        // marginTop: isFirstChild ? 0 : 10,
        // marginLeft: isFirstChild ? 0 : -10,
        marginRight: 10,
        zIndex: isFirstChild ? 1 : 0,
        paddingLeft: isFirstChild ? 10 : 0,
    }),
    albumTitle: {
        position: 'absolute',
        bottom: 15,
        left: 5,
        fontSize: 16,
        color: 'white',
        // backgroundColor: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))',
    }
});

const Song = ({track, albumImage, onPress }) => {
    return <Pressable
        style={{
            minWidth: 180,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0.1)',
        }}
        onPress={onPress}
    >
        <Image
            source={{uri: albumImage}}
            style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 10,
                marginRight: 10,
                shadowOpacity: 1,
                shadowRadius: 5,
                shadowColor: 'black',
                shadowOffset: {height: 0, width: 0},
            }}
        />
        <View>
            <Text style={{ fontSize: 16, }}>{track.title}</Text>
            <Text style={{ }}>{track.artist}</Text>
        </View>

    </Pressable>
}

const styles = StyleSheet.create({
    searchContainer: (isCollapsed) => ({
        width: '100%',
        paddingBottom: isCollapsed ? 30 : 10,

        position: 'relative',
        // minHeight: isCollapsed ? 250 : 100,
    }),
    searchResultsContainer: {
        // marginBottom: 10,
        height: 110,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        // width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    label: {
        padding: 10,
        color: '#898A8D',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#898A8D',
    }
});
