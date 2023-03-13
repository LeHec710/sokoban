import { Image, StyleSheet, View, Text, Button } from "react-native";
import player_head from "../assets/tiles/playerFace.png";
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Level 1', value: '1' },
    { label: 'Level 2', value: '2' },
    { label: 'Level 3', value: '3' },
    { label: 'Level 4', value: '4' },
    { label: 'Level 5', value: '5' },
    { label: 'Level 6', value: '6' },
    { label: 'Level 7', value: '7' },
    { label: 'Level 8', value: '8' },
];


const Home = () => {


    return (
        <View style={styles.container}>
            <Image style={styles.image} source={player_head}></Image>
            <Text>Sokoban</Text>
            <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                onChange={item => {

                }}

            />
            <Button
                //   onPress={onPressLearnMore}

                title="Play"
                color="blue"
                accessibilityLabel="Play button"
            />

        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },

    image: {
        width: 150,
        height: 150
    },

    dropdown: {
        width: 300
    },


})