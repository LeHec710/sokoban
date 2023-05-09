import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import tileTarget from "../../assets/tiles/Environment/environment_02.png";

import { useMap } from '../hooks/mapContext';
import { useTarget } from '../hooks/targetContext';



const Target = ({ index, ...props }) => {
    const { mapInfo, setMapInfo } = useMap();
    const { targetInfo, setTargetInfo } = useTarget();
    const { grid, cols, tileSize } = mapInfo;

    const posX = useRef(new Animated.Value(0)).current;
    const posY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(!mapInfo.loaded) return
        targetInfo.map((target, i) => {
            if(index === i) {
                Animated.timing(posX, {
                    toValue: target.position.x * tileSize,
                    duration: 100,
                    useNativeDriver: true,
                }).start();
                Animated.timing(posY, {
                    toValue: target.position.y * tileSize,
                    duration: 100,
                    useNativeDriver: true,
                }).start();

                // check win
                
            }
        })
    }, [targetInfo])

    return (
        <>
            {targetInfo &&
                <Animatable.View duration={400} style={[styles.target, { width: tileSize, height: tileSize, translateX: posX, translateY: posY }]}>
                    <Image source={tileTarget} style={{ width: tileSize, height: tileSize }} />
                </Animatable.View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    target: {
        position: 'absolute',
        zIndex: 8
    }
});

export default Target;