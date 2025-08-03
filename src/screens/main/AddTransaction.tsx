import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import boxModelSize from '../../constants/boxModel';
import CustTextInputField from '../../components/CustTextInputField';
import CustButton from '../../components/CustButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import colors from '../../constants/colors';
import CustDropdown from '../../components/CustDropdown';
import { getCategories, addTransaction } from '../../firestore';

const AddTransaction = ({ navigation, route }) => {
  const [categoryType, setCategoryType] = useState<'expense' | 'income'>('expense');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [focusedField, setFocusedField] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch categories based on type
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories(categoryType);
        setCategories(fetchedCategories);
        if (fetchedCategories.length > 0) {
          setSelectedCategory(fetchedCategories[0].id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [categoryType]);

  // Form validation
  useEffect(() => {
    const isValid = amount.length > 0 && selectedCategory && date;
    setDisableBtn(!isValid);
  }, [amount, selectedCategory, date]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (key: string, value: any) => {
    if (key === 'amount') {
      const cleanedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      setAmount(cleanedValue);
      setAmountError(cleanedValue.length === 0 ? 'Amount is required' : '');
    }
    if (key === 'notes') {
      setNotes(value.replace(/\s+/g, ' '));
    }
  };

  // Reset all form fields
  const resetForm = () => {
    setAmount('');
    setAmountError('');
    setNotes('');
    setDate(new Date());
    setFocusedField(null);
    setDisableBtn(true);
    setSelectedCategory('');
    // Note: We don't reset categoryType as it's the main filter
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await addTransaction({
        type: categoryType,
        category: selectedCategory,
        amount: parseFloat(amount),
        date,
        notes,
      });
      // reset form 
      resetForm();
      navigation.goBack();
    } catch (error) {
      console.error('Error adding transaction:', error);
      Alert.alert('Error', 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.btnContainer}>
        <CustButton
          title="Expense"
          style={[
            categoryType === 'expense'
              ? styles.btnExpenseSelected
              : styles.btnExpenseNotSelected,
          ]}
          onPress={() => setCategoryType('expense')}
        />
        <CustButton
          title="Income"
          style={[
            categoryType === 'income'
              ? styles.btnIncomeSelected
              : styles.btnIncomeNotSelected,
          ]}
          onPress={() => setCategoryType('income')}
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

      <View style={styles.input}>
        <CustDropdown
          label="Category"
          category={selectedCategory}
          // data={categories}
          data={categories.map(cat => ({
            id: cat.id,
            label: cat.label,
            value: cat.label,  // Consistent with EditTransaction
          }))}
          onSelect={(id) => setSelectedCategory(id)}
        />
      </View>

      <TouchableOpacity onPress={showDatePicker}>
        <CustTextInputField
          label="Date"
          containerStyles={styles.input}
          placeholder="Select Date"
          value={dayjs(date).format('DD/MM/YYYY')}
          isFocused={focusedField === 'date'}
          onFocus={() => handleFocus('date')}
          onBlur={handleBlur}
          disabled
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <CustButton
        disabled={disableBtn || loading}
        isLoading={loading}
        title="Save"
        style={[styles.btnSave, (disableBtn || loading) && styles.disabledBtn]}
        onPress={handleSubmit}
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
    flexDirection: 'row',
    marginTop: boxModelSize.ten,
    gap: boxModelSize.ten,
  },
  btnExpenseSelected: {
    flex: 1,
    backgroundColor: colors.red,
    borderColor: colors.red,
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
  },
  btnIncomeNotSelected: {
    flex: 1,
    backgroundColor: colors.green100,
    borderColor: colors.green100,
  },
  btnSave: {
    marginTop: boxModelSize.thirty,
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  disabledBtn: {
    opacity: 0.5,
  },
});

export default AddTransaction;