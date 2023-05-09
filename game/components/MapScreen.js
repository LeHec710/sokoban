import React, { useEffect } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';

import tileGround from "../../assets/tiles/ground.png";
import tileWall from "../../assets/tiles/wall.png";

import { useMap } from '../hooks/mapContext';
import { usePlayer } from '../hooks/playerContext';
import { useBox } from '../hooks/boxContext';
import { useTarget } from '../hooks/targetContext';

import Player from './Player';
import Box from './Box';
import Target from './Target';


const MapScreen = () => {
    const { mapInfo, setMapInfo } = useMap();
    const { playerInfo, setPlayerInfo } = usePlayer();
    const { boxInfo, setBoxInfo } = useBox();
    const { targetInfo, setTargetInfo } = useTarget();
    const { grid, rows, tileSize } = mapInfo;

    useEffect(() => {
        const boxes = []
        const targets = []
        const updatedGrid = grid.map((row) => {
            return row.map((tile) => {
                if (tile === 'P') {
                    const playerPosition = {
                        x: row.indexOf(tile),
                        y: grid.indexOf(row)
                    };
                    setPlayerInfo({ ...playerInfo, position: playerPosition, direction: "down" });
                } else if (tile === 'C') {
                    const box = {
                        id: boxes.length,
                        position: {
                            x: row.indexOf(tile),
                            y: grid.indexOf(row)
                        }
                    };
                    boxes.push(box)
                } else if (tile === 'X') {
                    const target = {
                        id: targets.length,
                        position: {
                            x: row.indexOf(tile),
                            y: grid.indexOf(row)
                        }
                    };
                    targets.push(target)
                }
                return tile
            });
        });

        setBoxInfo(boxes);
        setTargetInfo(targets);
        setMapInfo({ ...mapInfo, grid: updatedGrid, tileSize });
    }, []);

    const renderRow = ({ item: row, index: rowIndex }) => (
        <View style={[styles.row, { height: tileSize }]} key={`row-${rowIndex}`}>
            {row.map((tile, colIndex) => (
                <View
                    key={`col-${colIndex}`}
                    style={[styles.tile, { width: tileSize, height: tileSize }]}
                >
                    <Image source={tileGround} style={[styles.tileTexture, { width: tileSize, height: tileSize }]} />
                    {tile === '#' &&
                        <Image source={tileWall} style={[styles.tileTexture, { width: tileSize, height: tileSize }]} />
                    }
                </View>
            ))}
        </View>
    );

    return (
        <>
            {mapInfo.loaded &&
                <View style={[styles.test, { height: rows * tileSize }]}>
                    <FlatList
                        style={styles.map}
                        data={grid}
                        renderItem={renderRow}
                        keyExtractor={(row, index) => `row-${index}`}
                    />
                </View>
            }

            <Player />

            {boxInfo.map((box, i) => <Box index={i} key={box.id} />)}

            {targetInfo.map((target, i) => <Target index={i} key={target.id} />)}
         </>
    );
};

const styles = StyleSheet.create({
    test: {
        backgroundColor: 'blue'
    },
    row: {
        flexDirection: 'row',
    },
    tile: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tileTexture: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});

export default MapScreen;
