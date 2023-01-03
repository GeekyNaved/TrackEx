import React from 'react'
import { Text, View, Button, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { decNumber, incNumber } from '../../Redux/Actions';
const Home = ({ navigation }: any) => {
    // let {count, setCount} = useSelector(counterReducer)
    const changeTheNumber = useSelector(state => state.changeTheNumber);

    const dispatch = useDispatch();
    return (
        <View
            style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Home</Text>

            <Button title="DEC" onPress={() => dispatch(decNumber())} />
            <Text>{changeTheNumber}</Text>
            <Button title="INC" onPress={() => dispatch(incNumber())} />

            <Button title="Know your Impact" onPress={() => navigation.navigate("Impact")}>Click</Button>
        </View>
    )
}

export default Home