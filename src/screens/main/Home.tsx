import React from 'react'
import { Text, View, Button } from 'react-native'
const Home = ({navigation}) => {
    return (
        <View
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 700 }}>
            <Text>Home</Text>
            <Button title="Know your Impact" onPress={() => navigation.navigate("Impact")}>Click</Button>
        </View>
    )
}

export default Home