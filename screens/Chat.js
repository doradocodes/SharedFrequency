import {Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import SearchContainer from "../components/SearchContainer";
import SplitView from "../components/SplitView";
import BottomSheet from "../components/BottomSheet";

export default function Chat() {
    const chatContainerRef = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [chat, setChat] = useState([
        {
            from: 'me',
            message: 'Hey, how are you?'
        },
        {
            from: 'you',
            message: 'I am good, how are you?'
        },
        {
            from: 'me',
            message: 'I am good too, thanks for asking'
        },
        {
            from: 'me',
            message: 'I am good too, thanks for asking'
        },
        {
            from: 'me',
            message: 'I am good too, thanks for asking'
        },
        {
            from: 'me',
            message: 'I am good too, thanks for asking'
        }
    ]);

    useEffect(() => {
        if (chat.length > 5) {
            setTimeout(() => {
                chatContainerRef.current.scrollToEnd({animated: true});
            }, 1);
        }
    }, [chat])

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={'always'}
        >
            <Header/>

            {chat.length < 5 ?
                <View style={styles.chatContainer}>
                    {chat && chat.map(({from, message}) => {
                        return <Track from={from}/>
                    })}
                </View>
                :
                <ScrollView ref={chatContainerRef} style={styles.chatScrollContainer}
                            scrollToOverflowEnabled={true}>
                    {chat && chat.map(({from, message}) => {
                        return <Track from={from}/>
                    })}
                </ScrollView>
            }

            <BottomSheet>
                <SearchContainer
                    searchText={searchText}
                    setSearchText={setSearchText}
                    sendMessage={() => {
                        setChat([...chat, {
                            from: 'me',
                            message: searchText
                        }]);
                    }}
                />
            </BottomSheet>



            {/*<SplitView*/}
            {/*    aboveDraggableContainerStyle={{}}*/}
            {/*    aboveDraggableContainer={chat.length < 5 ?*/}
            {/*        <View style={styles.chatContainer}>*/}
            {/*            {chat && chat.map(({from, message}) => {*/}
            {/*                return <Track from={from}/>*/}
            {/*            })}*/}
            {/*        </View>*/}
            {/*        :*/}
            {/*        <ScrollView ref={chatContainerRef} style={styles.chatScrollContainer}*/}
            {/*                    scrollToOverflowEnabled={true}>*/}
            {/*            {chat && chat.map(({from, message}) => {*/}
            {/*                return <Track from={from}/>*/}
            {/*            })}*/}
            {/*        </ScrollView>*/}
            {/*    }*/}
            {/*    draggableContainer={<View style={{*/}
            {/*        width: 40,*/}
            {/*        height: 5,*/}
            {/*        backgroundColor: '#ABB0BA',*/}
            {/*        borderRadius: 5,*/}
            {/*        marginLeft: 'auto',*/}
            {/*        marginRight: 'auto',*/}
            {/*        margin: 10,*/}
            {/*    }}/>}*/}
            {/*    onPan={(event) => {*/}
            {/*        setTimeout(() => {*/}
            {/*            chatContainerRef.current.scrollToEnd({animated: true});*/}
            {/*        }, 1);*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <SearchContainer*/}
            {/*        searchText={searchText}*/}
            {/*        setSearchText={setSearchText}*/}
            {/*        sendMessage={() => {*/}
            {/*            setChat([...chat, {*/}
            {/*                from: 'me',*/}
            {/*                message: searchText*/}
            {/*            }]);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</SplitView>*/}


        </KeyboardAvoidingView>
    )
}


const Track = ({from}) => {
    return (
        <View style={{
            alignSelf: from === 'me' ? 'flex-end' : 'flex-start',
            justifySelf: 'flex-end',
            shadowOpacity: 0.25,
            shadowRadius: 10,
            shadowColor: 'black',
            shadowOffset: {height: 0, width: 0},
            marginBottom: 40,
            marginTop: -90,
        }}>
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Shore_%28Fleet_Foxes%29.png'}}
                   style={{width: 190, height: 190, borderRadius: 10,}}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        // height: '100%',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        paddingBottom: 20,
    },
    chatContainer: {
        // flex: 1,
        backgroundColor: 'white',
        padding: 20,
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        height: '70%'
    },
    chatScrollContainer: {
        // flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        // flexDirection: 'column',
        height: '70%'
    },

});
