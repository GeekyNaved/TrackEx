/* eslint-disable react/react-in-jsx-scope */
// Income and Expense Card: used in home screen
import AmountWithRupee from './AmountWithRupee';
import {StyleSheet, Text, View} from 'react-native';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from 'react-native-heroicons/outline';
import colors from '../constants/colors';
import boxModelSize from '../constants/boxModel';
import {fontSize} from '../constants/fontSize';

interface MoneyCardProps {
  title: string;
  amount: number;
}

const MoneyCard: React.FC<MoneyCardProps> = ({title, amount}) => {
  return (
    <View
      style={[
        title === 'Income'
          ? {backgroundColor: colors.green}
          : {backgroundColor: colors.red},
        styles.container,
      ]}>
      <View style={styles.iconContainer}>
        {title == 'Income' ? (
          <ArrowDownTrayIcon color={colors.green} size={boxModelSize.twenty} />
        ) : (
          <ArrowUpTrayIcon color={colors.red} size={boxModelSize.twenty} />
        )}
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <AmountWithRupee amount={amount} customStyle={styles.amount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: boxModelSize.ten,
    alignItems: 'center',
    color: colors.white,
    borderRadius: boxModelSize.fifteen,
    paddingHorizontal: boxModelSize.twentyTwo,
    paddingVertical: boxModelSize.fifteen,
  },
  iconContainer: {
    padding: boxModelSize.five,
    backgroundColor: colors.white,
    borderRadius: boxModelSize.five,
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.white,
  },
  amount: {
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default MoneyCard;
