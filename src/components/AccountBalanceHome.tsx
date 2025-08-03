// Account Balance full details with income, expense and remaining amount: used in home
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AmountWithRupee from './AmountWithRupee';
import MoneyCard from './MoneyCard';
import boxModelSize from '../constants/boxModel';
import {fontSize} from '../constants/fontSize';
import colors from '../constants/colors';

const AccountBalanceHome: React.FC = ({income, expense, balance}) => {
  return (
    <View>
      <Text style={styles.accountBalance}>Account Balance</Text>
      <AmountWithRupee customStyle={styles.amount} amount={balance} />
      <View style={styles.moneyCardContainer}>
        <MoneyCard title="Income" amount={income} />
        <MoneyCard title="Expenses" amount={expense} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accountBalance: {
    textAlign: 'center',
    fontSize: fontSize.h3,
    color: colors.grayPrimary,
  },
  amount: {
    textAlign: 'center',
    fontSize: fontSize.h1,
    color: colors.black,
    fontWeight: 'bold',
  },
  moneyCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: boxModelSize.twenty,
  },
});

export default AccountBalanceHome;
