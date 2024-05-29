import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import boxModelSize from '../../constants/boxModel';
import CustTextInputField from '../../components/CustTextInputField';
import CustButton from '../../components/CustButton';
import CustDropdown from '../../components/CustDropdown';
import {
  dummyCategoryExpense,
  dummyCategoryIncome,
} from '../../constants/dummyData';
const EditTransaction = ({route}) => {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  // const {type, category, notes, amount, date} = route.params;
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

  useEffect(() => {
    setAmount(initialAmount.toString());
    setNotes(initialNotes);
    setDate(initialDate);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <CustTextInputField
        label="Amount"
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={handleChange.bind(this, 'amount')}
        isFocused={focusedField === 'amount'}
        onFocus={() => handleFocus('amount')}
        onBlur={handleBlur}
        keyboardType="numeric"
        // errorMsg={mobileNumError}
      />
      <CustTextInputField
        label="Notes"
        style={styles.input}
        placeholder="Enter Notes"
        value={notes}
        onChangeText={handleChange.bind(this, 'notes')}
        isFocused={focusedField === 'notes'}
        onFocus={() => handleFocus('notes')}
        onBlur={handleBlur}
        // errorMsg={mobileNumError}
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
      <CustTextInputField
        label="Date"
        style={styles.input}
        placeholder="Enter Date"
        value={date}
        onChangeText={handleChange.bind(this, 'date')}
        isFocused={focusedField === 'date'}
        onFocus={() => handleFocus('date')}
        onBlur={handleBlur}
        // errorMsg={mobileNumError}
      />
      <CustButton
        // disabled={disableBtn}
        // isLoading={isLoading}
        title="Save"
        // style={[styles.button, disableBtn && styles.disabledBtn]}
        // onPress={onSubmitRegister}
        otherProps
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: boxModelSize.fifteen,
    paddingVertical: boxModelSize.ten,
  },
  input: {
    marginBottom: boxModelSize.twenty,
  },
});

export default EditTransaction;
