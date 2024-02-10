import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://api.spotify.com/v1/'
const redirectUrl = 'exp://192.168.12.108:8082';
const CLIENT_ID = '1a3d222385ec4a25b746289543c6bd59';
const CLIENT_SECRET = '9d38a38ec3434dafa2d6f0aae4b1d869';

const tokenEndpoint = 'https://accounts.spotify.com/api/token';

// Encoding Client ID and Client Secret
const credentials = base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`);

export const get = async (endpoint, token) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export async function getLocalAccessToken() {
    const storedAccessToken = await AsyncStorage.getItem('spotify-access-token');
    if (storedAccessToken) {
        return storedAccessToken;
    }
}

export async function getAccessToken(refreshToken = false) {
    if (!refreshToken) {
        const localAccessToken = await getLocalAccessToken();
        if (localAccessToken) {
            return localAccessToken;
        }
    }

    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        console.log('accessToken response', data);

        if (data.access_token) {
            await AsyncStorage.setItem('spotify-access-token', data.access_token);
            return data.access_token;
        } else {
            throw new Error('Failed to retrieve access token');
        }
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        throw error;
    }
}

export const searchItem = async (searchStr, type) => {
    const token = await getAccessToken();
    const testEndpoint = 'https://api.spotify.com/v1/search?q=fleet+foxes&type=album';

    try {
        const response = await fetch(testEndpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('searchItem response:', data);
        if (data.error) {
            await getAccessToken(true);
            await searchItem();
        } else {
            return data;
        }
        return data;
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        throw error;
    }
}

export const getAlbum = async (id) => {
    const token = await getAccessToken();
    const testEndpoint = `https://api.spotify.com/v1/albums/${id}`;

    try {
        const response = await fetch(testEndpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        // if (data.error) {
        //     await getAccessToken(true);
        //     await getAlbum(id);
        // } else {
        //     return data;
        // }
        return data;
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        throw error;
    }
}

export const getTrack = async (id) => {
    const token = await getAccessToken();
    const testEndpoint = `https://api.spotify.com/v1/tracks/${id}`;

    try {
        const response = await fetch(testEndpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.error) {
            await getAccessToken(true);
            await getTrack(id);
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        throw error;
    }
}