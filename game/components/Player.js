import { Animated, Image, ImageBackground, StyleSheet, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useEffect, useRef } from 'react';

import { useMap } from '../hooks/mapContext';
import { usePlayer } from '../hooks/playerContext';

import tilePlayer from "../../assets/tiles/Player/player_01.png";


const Player = () => {
    const { mapInfo, setMapInfo } = useMap();
    const { playerInfo, setPlayerInfo } = usePlayer();
    const { grid, cols, tileSize } = mapInfo;

    const posX = useRef(new Animated.Value(0)).current;
    const posY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!mapInfo.loaded) return
        Animated.timing(posX, {
            toValue: playerInfo.position.x * tileSize,
            duration: 300,
            useNativeDriver: true,
        }).start();
        Animated.timing(posY, {
            toValue: playerInfo.position.y * tileSize,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [playerInfo])

    return (
        <>
            {playerInfo && playerInfo.position &&
                <Animatable.View duration={400} style={[styles.player, { width: tileSize, height: tileSize, transform: [{ translateX: posX }, { translateY: posY }]}]}>
                    <Image source={tilePlayer} style={[styles.playerTile, {width: tileSize, height: tileSize}]} />
                </Animatable.View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    player: { 
        position: 'absolute',
        zIndex: 10,
    }
});

export default Player;