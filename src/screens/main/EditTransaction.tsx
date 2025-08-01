import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import boxModelSize from '../../constants/boxModel';
import CustTextInputField from '../../components/CustTextInputField';
import CustButton from '../../components/CustButton';
import CustDropdown from '../../components/CustDropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  dummyCategoryExpense,
  dummyCategoryIncome,
} from '../../constants/dummyData';
import dayjs from 'dayjs';
import colors from '../../constants/colors';
import ConfirmationModal from '../../components/ConfirmationModal';
const EditTransaction = ({route}) => {
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
  const {
    type: initialType,
    category: initialCategory,
    notes: initialNotes,
    amount: initialAmount,
    date: initialDate,
  } = route.params;

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

  // validation: check amount should not be empty
  useEffect(() => {
    if (amount?.length === 0) {
      setDisableBtn(true);
      setAmountError('Field should not be empty');
    } else {
      setAmountError('');
      setDisableBtn(false);
    }
  }, [amount]);

  // set props value (default value)
  useEffect(() => {
    setAmount(initialAmount.toString());
    setNotes(initialNotes);
    setDate(dayjs(initialDate).format('DD/MM/YYYY'));
  }, []);
  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.input}>
        <CustDropdown
          label="Category"
          category={initialCategory}
          data={
            initialType === 'income'
              ? dummyCategoryIncome
              : dummyCategoryExpense
          }
        />
      </View>
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
        date={dayjs(initialDate).toDate()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.btnContainer}>
        <CustButton
          // isLoading={isLoading}
          title="Delete"
          style={styles.btnDelete}
          onPress={() => setDeleteModal(true)}
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
          onConfirm={() => setDeleteModal(false)}
          leftBtnTitle="Yes"
          rightBtnTitle="No"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: boxModelSize.fifteen,
    // paddingVertical: boxModelSize.ten,
  },
  input: {
    marginTop: boxModelSize.twenty,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: boxModelSize.twenty,
    marginTop: boxModelSize.thirty,
  },
  btnDelete: {
    flex: 1,
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  btnSave: {
    flex: 1,
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  disabledBtn: {
    opacity: 0.5,
  },
});

export default EditTransaction;
