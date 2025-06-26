import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const VideoPlayerWithOrientation = ({ videoSource, thumbnail }) => {
    const [paused, setPaused] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);

    const toggleFullscreen = () => {
        if (isFullscreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
        setIsFullscreen(!isFullscreen);
    };

    return (
        <View style={isFullscreen ? styles.fullscreenContainer : styles.normalContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setPaused(false)}
                style={styles.videoWrapper}
            >
                <Video
                    ref={videoRef}
                    source={videoSource}
                    style={styles.video}
                    controls
                    paused={paused}
                    resizeMode="contain"
                />

                {paused && (
                    <Image source={thumbnail} style={[styles.video, styles.thumbnail]} />
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleFullscreen} style={styles.fullscreenButton}>
                <MaterialIcons name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default VideoPlayerWithOrientation;

const styles = StyleSheet.create({
    normalContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#000',
        marginBottom: 20,
        position: 'relative',
    },
    fullscreenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width,
        backgroundColor: '#000',
        zIndex: 999,
    },
    videoWrapper: {
        flex: 1,
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
    thumbnail: {
        resizeMode: 'cover',
        zIndex: 1,
    },
    fullscreenButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 6,
        zIndex: 10,
    },
});
