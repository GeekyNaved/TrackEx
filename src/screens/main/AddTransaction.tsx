import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import boxModelSize from '../../constants/boxModel';
import CustTextInputField from '../../components/CustTextInputField';
import CustButton from '../../components/CustButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  dummyCategoryExpense,
  dummyCategoryIncome,
} from '../../constants/dummyData';
import dayjs from 'dayjs';
import colors from '../../constants/colors';
import ConfirmationModal from '../../components/ConfirmationModal';
const AddTransaction = ({route}) => {
  const [categoryType, setCategoryType] = useState<string>('Expense');
  const [categoriesData, setCategoriesData] = useState(dummyCategoryExpense);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const selectedDate = dayjs(date).format('DD/MM/YYYY');
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleFocus = field => {
    setFocusedField(field);
  };
  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (key: string, value: any) => {
    if (key === 'amount') {
      setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
    }
    if (key === 'notes') {
      setNotes(value.replace(/\s+/g, ' '));
    }
    if (key === 'date') {
      setDate(value);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.btnContainer}>
        <CustButton
          title="Expense"
          style={[
            disableBtn && styles.disabledBtn,
            categoryType === 'Expense'
              ? styles.btnExpenseSelected
              : styles.btnExpenseNotSelected,
          ]}
          onPress={() => {
            setCategoryType('Expense');
            setCategoriesData(dummyCategoryExpense);
          }}
          otherProps
        />
        <CustButton
          title="Income"
          style={[
            disableBtn && styles.disabledBtn,
            categoryType === 'Income'
              ? styles.btnIncomeSelected
              : styles.btnIncomeNotSelected,
          ]}
          onPress={() => {
            setCategoryType('Income');
            setCategoriesData(dummyCategoryIncome);
          }}
          otherProps
        />
      </View>
      <CustTextInputField
        label="Amount"
        containerStyles={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={handleChange.bind(this, 'amount')}
        isFocused={focusedField === 'amount'}
        onFocus={() => handleFocus('amount')}
        onBlur={handleBlur}
        keyboardType="numeric"
        errorMsg={amountError}
      />
      <CustTextInputField
        label="Notes"
        containerStyles={styles.input}
        placeholder="Enter Notes"
        value={notes}
        onChangeText={handleChange.bind(this, 'notes')}
        isFocused={focusedField === 'notes'}
        onFocus={() => handleFocus('notes')}
        onBlur={handleBlur}
      />

      <TouchableOpacity onPress={showDatePicker}>
        <CustTextInputField
          label="Date"
          containerStyles={styles.input}
          placeholder="Enter Date"
          value={date}
          onChangeText={handleChange.bind(this, 'date')}
          isFocused={focusedField === 'date'}
          onFocus={() => handleFocus('date')}
          onBlur={handleBlur}
          disabled
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={dayjs().toDate()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <CustButton
        disabled={disableBtn}
        // isLoading={isLoading}
        title="Save"
        style={[styles.btnSave, disableBtn && styles.disabledBtn]}
        // onPress={onSubmitRegister}
        otherProps
      />
      <ConfirmationModal
        message="Are you sure you want to delete this transaction?"
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        onLogout={() => setDeleteModal(false)}
        leftBtnTitle="Yes"
        rightBtnTitle="No"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: boxModelSize.fifteen,
  },
  input: {
    marginTop: boxModelSize.twenty,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: boxModelSize.ten,
  },
  btnExpenseSelected: {
    flex: 1,
    backgroundColor: colors.red,
    borderColor: colors.red,
    color: colors.black,
  },
  btnExpenseNotSelected: {
    flex: 1,
    backgroundColor: colors.red100,
    borderColor: colors.red100,
  },
  btnIncomeSelected: {
    flex: 1,
    backgroundColor: colors.green,
    borderColor: colors.green,
    color: colors.black,
  },
  btnIncomeNotSelected: {
    flex: 1,
    backgroundColor: colors.green100,
    borderColor: colors.green100,
  },
  btnSave: {
    marginTop: boxModelSize.thirty,
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  disabledBtn: {
    opacity: 0.5,
  },
});

export default AddTransaction;
