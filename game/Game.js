import { StyleSheet } from "react-native"
import { View } from "react-native-animatable"

import { MapProvider } from "./hooks/mapContext"
import { PlayerProvider } from "./hooks/playerContext"
import { TargetProvider } from "./hooks/targetContext"
import { BoxProvider } from "./hooks/boxContext"

import MapScreen from "./components/MapScreen"
import { SwipeProvider } from "./hooks/SwipeContext"

const Game = ({map, ...props}) => {
    return (
        <View style={styles.container}>
            <MapProvider map={map}>
                <TargetProvider>
                    <BoxProvider>
                        <PlayerProvider>
                            <SwipeProvider>
                                <MapScreen />
                            </SwipeProvider>
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
        flexDirection: 'column',
    }
});
export default Game