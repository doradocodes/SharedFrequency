import {Dimensions} from "react-native";

const { width } = Dimensions.get('window')

export const colors = {
    primary: '#ffffff',
    light: '#fff',
    dark: '#111',
}

export const duration = 1000;

export const _size = width * 0.9;

export const layout = {
    borderRadius: 16,
    width: _size,
    height: _size * 1.27,
    spacing: 12,
    cardsGap: 22,
};

export const maxVisibleItems = 6;
