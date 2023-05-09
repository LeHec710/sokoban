import { StyleSheet } from "react-native"
import { View } from "react-native-animatable"

import { MapProvider } from "./hooks/mapContext"
import { PlayerProvider } from "./hooks/playerContext"
import { TargetProvider } from "./hooks/targetContext"
import { BoxProvider } from "./hooks/boxContext"

import MapScreen from "./components/MapScreen"

const Game = () => {
    return (
        <View style={styles.container}>
            <MapProvider>
                <TargetProvider>
                    <BoxProvider>
                        <PlayerProvider>
                            <MapScreen />
                        </PlayerProvider>
                    </BoxProvider>
                </TargetProvider>
            </MapProvider>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#738b8d',
        flexDirection: 'column',
    }
});
export default Game