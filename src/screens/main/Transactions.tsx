import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import AmountWithRupee from '../../components/AmountWithRupee';
import colors from '../../constants/colors';
import {fontSize} from '../../constants/fontSize';
import boxModelSize from '../../constants/boxModel';
import TransactionCard from '../../components/TransactionCard';
import {dummyTransaction} from '../../constants/dummyData';
import firestore from '@react-native-firebase/firestore';

const Transactions = ({navigation}) => {
  const pieData = [
    {value: 54, color: '#177AD5', text: '50'},
    {value: 40, color: '#79D2DE', text: '150'},
    {value: 20, color: '#ED6665', text: '500'},
  ];
  const getTransactions = async () => {
    const transactions = await firestore()
      .collection('Transactions')
      .doc('ABC')
      .get();
    console.log('transactions==>', transactions);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.spendings}>
        <Text style={styles.spendingTxt}>My Spendings :</Text>
        <AmountWithRupee customStyle={styles.spendingValue} amount={20900} />
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          donut
          showText
          textColor="black"
          radius={100}
          textSize={13}
          showTextBackground
          textBackgroundRadius={20}
          data={pieData}
        />
      </View>
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
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: boxModelSize.fifteen,
  },
  chartContainer: {
    // backgroundColor: colors.green100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  spendings: {
    marginVertical: boxModelSize.twenty,
  },
  spendingTxt: {
    fontSize: fontSize.p,
    color: colors.grayPrimary,
  },
  spendingValue: {
    fontSize: fontSize.h1,
    color: colors.black,
    fontWeight: 'bold',
  },
  recentTransactions: {
    fontSize: fontSize.h3,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: boxModelSize.ten,
    paddingVertical: boxModelSize.ten,
  },
});

export default Transactions;
