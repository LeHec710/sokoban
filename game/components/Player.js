import { Animated, Image, ImageBackground, StyleSheet, View, Text, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useEffect, useRef } from 'react';

import { useMap } from '../hooks/mapContext';
import { usePlayer } from '../hooks/playerContext';

import tilePlayerUp from "../../assets/player/player_up.png";
import tilePlayerDown from "../../assets/player/player_down.png";
import tilePlayerRight from "../../assets/player/player_right.png";
import tilePlayerLeft from "../../assets/player/player_left.png";


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
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease
        }).start();
        Animated.timing(posY, {
            toValue: playerInfo.position.y * tileSize,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease
        }).start();
    }, [playerInfo])

    return (
        <>
            {playerInfo && playerInfo.position &&
                <Animatable.View duration={200} style={[styles.player, { width: tileSize, height: tileSize, transform: [{ translateX: posX }, { translateY: posY }] }]}>
                    {playerInfo.direction === "left" &&
                        <Image source={tilePlayerLeft} style={[styles.playerTile, { width: tileSize, height: tileSize }]} />
                    }
                    {playerInfo.direction === "right" &&
                        <Image source={tilePlayerRight} style={[styles.playerTile, { width: tileSize, height: tileSize }]} />
                    }
                    {playerInfo.direction === "down" &&
                        <Image source={tilePlayerDown} style={[styles.playerTile, { width: tileSize, height: tileSize }]} />
                    }
                    {playerInfo.direction === "up" &&
                        <Image source={tilePlayerUp} style={[styles.playerTile, { width: tileSize, height: tileSize }]} />
                    }
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