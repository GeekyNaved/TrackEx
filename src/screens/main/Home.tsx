import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AccountBalanceHome from '../../components/AccountBalanceHome';
import boxModelSize from '../../constants/boxModel';
import TransactionCard from '../../components/TransactionCard';
import {dummyTransaction} from '../../constants/dummyData';
import colors from '../../constants/colors';
import {fontSize} from '../../constants/fontSize';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
const Home: React.FC<{navigation: NavigationProp<ParamListBase>}> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <AccountBalanceHome />
      <Text style={styles.recentTransactions}>Recent Transactions</Text>
      <FlatList
        data={dummyTransaction}
        keyExtractor={item => item._id.toString()} // Assuming each item has a unique `id`
        renderItem={({item}) => {
          return (
            <TransactionCard
              navigation={navigation}
              type={item.type}
              category={item.category}
              notes={item.notes}
              amount={item.amount}
              date={item.date}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: boxModelSize.fifteen,
    paddingVertical: boxModelSize.twenty,
    backgroundColor: colors.white,
    flex: 1,
  },
  recentTransactions: {
    fontSize: fontSize.h3,
    fontWeight: 'bold',
    color: colors.black,
    paddingVertical: boxModelSize.ten,
  },
});
export default Home;
