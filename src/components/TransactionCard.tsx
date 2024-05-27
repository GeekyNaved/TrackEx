import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PencilIcon,
} from 'react-native-heroicons/outline';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
import AmountWithRupee from './AmountWithRupee';
import {fontSize} from '../constants/fontSize';
interface TransactionCardProps {
  type: string;
  category: string;
  notes: string;
  amount: number;
  date: string;
}
const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  category,
  notes,
  amount,
  date,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    // console.log('name', name)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftInner}>
        <View style={styles.iconContainer}>
          {type == 'income' ? (
            <ArrowDownTrayIcon
              color={colors.green}
              size={boxModelSize.twenty}
            />
          ) : (
            <ArrowUpTrayIcon color={colors.red} size={boxModelSize.twenty} />
          )}
        </View>
        <View style={styles.categoryNotesContainer}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.notes}>{notes}</Text>
        </View>
      </View>
      <View style={styles.rightInner}>
        <View>
          <AmountWithRupee
            amount={amount}
            customStyle={
              type == 'income' ? styles.amountGreen : styles.amountRed
            }
          />
          <Text style={styles.date}>Date: {date}</Text>
        </View>
        {/* <EditTransactionDialog isOTexten={open} onClose={handleClose}> */}
        <TouchableOpacity onPress={handleClickOpen}>
          <View style={styles.editContainer}>
            <PencilIcon color={colors.black} size={boxModelSize.twenty} />
          </View>
        </TouchableOpacity>
        {/* </EditTransactionDialog> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // color: colors.white,
    // borderWidth: 1,
    // borderColor: colors.gray,
    backgroundColor: colors.white,
    borderRadius: boxModelSize.ten,
    paddingHorizontal: boxModelSize.ten,
    paddingVertical: boxModelSize.fifteen,
    marginVertical: boxModelSize.ten,
    marginHorizontal: boxModelSize.five,
    // for android
    elevation: 5,
  },
  leftInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: boxModelSize.five,
  },
  iconContainer: {
    padding: boxModelSize.five,
    backgroundColor: colors.lightGray,
    borderRadius: boxModelSize.five,
  },
  categoryNotesContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  category: {
    fontWeight: '500',
  },
  notes: {
    fontSize: fontSize.p,
  },
  rightInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: boxModelSize.five,
  },
  date: {
    fontWeight: '500',
    fontSize: fontSize.p,
  },
  amountGreen: {
    color: colors.green,
  },
  amountRed: {
    color: colors.red,
  },
});

export default TransactionCard;
