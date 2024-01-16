import {StyleSheet} from "react-native";
import Constants from "constants";
import {colors, layout} from "../constants/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: Constants.statusBarHeight || 60,
        backgroundColor: colors.primary,
        // padding: layout.spacing
    },
    pressableContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red'
    },

    title: { fontSize: 32, fontWeight: '600' },
    subtitle: {},
    cardContent: {
        gap: layout.spacing,
        marginBottom: layout.spacing,
    },
    locationImage: {
        // flex: 1,
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        columnGap: layout.spacing / 2,
        alignItems: 'center',
    },
    icon: {},
    input: {
        backgroundColor: 'white',
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
})