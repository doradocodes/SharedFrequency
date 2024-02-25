import {ImageBackground, StyleSheet, TextInput, View, Text, Image} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useState} from "react";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {BlurView} from "expo-blur";
import SongView from "../components/SongView";
import AlbumView from "../components/AlbumView";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import SplitView from "../components/SplitView";

export default function Builder() {
    const [timelineItems, setTimelineItems] = useState([]);
    const [collapseSearchView, setCollapseSearchView] = useState(true);
    const [searchText, setSearchText] = useState('Fleet Foxes');
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const toggleSongView = (id) => {
        if (id) {
            setSelectedAlbum(id);
        } else {
            setSelectedAlbum('');
        }
    }

    return <GestureHandlerRootView style={[styles.container]}>
        <ImageBackground source={{uri: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}}>
            <View
                style={{
                    height: '100%',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(0, 0, 0, 1)'
                }}
                keyboardShouldPersistTaps='handled'
            >
                <Header/>

                <SplitView
                    aboveDraggableContainerStyle={styles.playlistContainer}
                    aboveDraggableContainer={<View>
                        <View style={styles.playlistInfo}>
                            <Image
                                source={{uri: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}}
                                style={styles.playlistCover}
                            />
                            <View style={{padding: 10}}>
                                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Playlist name</Text>
                                <Text style={{}}>@author @author</Text>
                            </View>
                        </View>
                        <Timeline
                            items={timelineItems}
                        />
                    </View>}
                    collapseSheet={collapseSearchView}
                    draggableContainer={<>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSearchText}
                            value={searchText}
                            placeholder="Seach for a song"
                            // onFocus={() => {
                            //     setCollapseSearchView(!collapseSearchView);
                            // }}
                        />
                    </>}
                >
                    <AnimatedView style={[
                        styles.searchContainer
                    ]}>
                        {selectedAlbum ?
                            <SongView
                                albumId={selectedAlbum}
                                toggleSongView={toggleSongView}
                                setTimelineItems={setTimelineItems}
                            />
                            :
                            <AlbumView
                                toggleSongView={toggleSongView}
                            />
                        }
                    </AnimatedView>
                </SplitView>
            </View>
        </ImageBackground>
    </GestureHandlerRootView>
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    playlistContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 25,
        paddingBottom: 10,
    },
    playlistInfo: {
        flexDirection: 'row',
        gap: 5,
        padding: 20,
    },
    playlistCover: {
        width: 100,
        height: 100,
    },
    searchContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'relative',
        overflow: 'hidden',
    },
    input: {
        textAlign: 'center',
        // color: 'white',
        backgroundColor: 'rgba(255,255,255,1)',
        height: 40,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 0,
        marginLeft: 0,
        fontSize: 16,
        padding: 10,
    },
});