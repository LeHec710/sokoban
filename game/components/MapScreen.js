import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Text } from 'react-native';

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
    const [grid, setGrid] = useState();
    const [rows, setRows] = useState();
    const [tileSize, setTileSize] = useState()

    useEffect(() => {
        if(!mapInfo) return
        if(mapInfo.loaded === false) return
        setGrid(mapInfo.grid);
        setRows(mapInfo.nbRows);
        setTileSize(mapInfo.tileSize);
    }, [mapInfo])

    useEffect(() => {
        if(!mapInfo) return
        if(mapInfo.loaded === false) return
        if("init" in mapInfo) return
        const boxes = []
        const targets = []
        const updatedGrid = mapInfo.grid.map((row) => {
            return row.map((tile) => {
                if (tile === 'P') {
                    const playerPosition = {
                        x: row.indexOf(tile),
                        y: mapInfo.grid.indexOf(row)
                    };
                    setPlayerInfo({ ...playerInfo, position: playerPosition, direction: "down" });
                } else if (tile === 'C') {
                    const box = {
                        id: boxes.length,
                        position: {
                            x: row.indexOf(tile),
                            y: mapInfo.grid.indexOf(row)
                        }
                    };
                    boxes.push(box)
                } else if (tile === 'X') {
                    const target = {
                        id: targets.length,
                        position: {
                            x: row.indexOf(tile),
                            y: mapInfo.grid.indexOf(row)
                        }
                    };
                    targets.push(target)
                }
                return tile
            });
        });

        setBoxInfo(boxes);
        setTargetInfo(targets);
        setGrid(updatedGrid)
        setMapInfo({ ...mapInfo, grid: updatedGrid, init: true });
    }, [mapInfo]);

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
        <View style={styles.container}>
            
            {mapInfo && tileSize &&
                <View style={{ height: rows * tileSize }}>
                    <FlatList
                        style={styles.map}
                        data={mapInfo.grid}
                        renderItem={renderRow}
                        keyExtractor={(row, index) => `row-${index}`}
                    />
                </View>
            }

            {mapInfo && <Player />}

            {mapInfo && boxInfo.map((box, i) => <Box index={i} key={box.id} />)}
            {mapInfo && targetInfo.map((target, i) => <Target index={i} key={target.id} />)}
         </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // position: "absolute",
        // bottom: 160,
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
