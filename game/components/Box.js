import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useMap } from '../hooks/mapContext';
import { useBox } from '../hooks/boxContext';
import { useTarget } from '../hooks/targetContext';

import tileBox from "../../assets/tiles/box.png";



const Box = ({ index, ...props }) => {
    const { mapInfo, setMapInfo } = useMap();
    const { boxInfo, setBoxInfo } = useBox();
    const { targetInfo, setTargetInfo } = useTarget()
    const [tileSize, setTileSize] = useState()

    const posX = useRef(new Animated.Value(0)).current;
    const posY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(!mapInfo) return
        setTileSize(mapInfo.tileSize);
    }, [mapInfo])

    useEffect(() => {
        if(!mapInfo.loaded) return
        boxInfo.map((box, i) => {
            if (index === i) {
                Animated.timing(posX, {
                    toValue: box.position.x * mapInfo.tileSize,
                    duration: 100,
                    useNativeDriver: true,
                }).start();
                Animated.timing(posY, {
                    toValue: box.position.y * mapInfo.tileSize,
                    duration: 100,
                    useNativeDriver: true,
                }).start();
            }

            // check win
            // on check la victoire lorsqu'une boîte est déplacée
            // pour ne pas le faire à chaque fois que la map es re-rendue
            let wins = 0;
            targetInfo.forEach(target => {
                const matchingBox = boxInfo.find(box => box.position.x === target.position.x && target.position.y === target.position.y);
                if(matchingBox) wins++
            });
            if(wins === targetInfo.length) {
                alert('bravo !')
                setMapInfo({ ...mapInfo, win: true });
            }
        })
    }, [boxInfo])

    return (
        <>
            {boxInfo && posX && posY &&
                <Animatable.View duration={400} style={[styles.box, { width: tileSize, height: tileSize, translateX: posX, translateY: posY }]}>
                    {/* <Text>{posX} - {posY}</Text> */}
                    <Image source={tileBox} style={{ width: tileSize, height: tileSize }} />
                </Animatable.View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        position: 'absolute',
        zIndex: 10
    }
});

export default Box;