/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import App from './App';
import { name as appName } from './app.json';
import playerService from './src/Component/Service';

const Root = () => (
    <SafeAreaProvider>
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#341551' }} // change bg if you want
            edges={['top', 'bottom']}                       // protect top & bottom
        >
            <App />
        </SafeAreaView>
    </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Root);
TrackPlayer.registerPlaybackService(() => playerService);