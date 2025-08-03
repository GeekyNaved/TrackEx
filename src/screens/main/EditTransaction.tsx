import { ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import boxModelSize from '../../constants/boxModel';
import CustTextInputField from '../../components/CustTextInputField';
import CustButton from '../../components/CustButton';
import CustDropdown from '../../components/CustDropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import colors from '../../constants/colors';
import ConfirmationModal from '../../components/ConfirmationModal';
import {
  getCategories,
  updateTransaction,
  deleteTransaction
} from '../../firestore';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const EditTransaction = ({ route }) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const {
    id: transactionId,
    type: initialType,
    category: initialCategory,
    notes: initialNotes,
    amount: initialAmount,
    date: initialDate,
  } = route.params;

  // Fetch categories based on transaction type
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories(initialType);
        setCategories(fetchedCategories);

        // Set the selected category after categories are loaded
        if (initialCategory && fetchedCategories.length > 0) {
          // Find the category object that matches initialCategory
          const categoryToSelect = fetchedCategories.find(cat => cat.label === initialCategory);
          if (categoryToSelect) {
            setSelectedCategory(categoryToSelect.label);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to load categories');
      }
    };

    fetchCategories();
  }, [initialType, initialCategory]); // Added initialCategory as dependency

  // Initialize form values
  useEffect(() => {
    setAmount(initialAmount.toString());
    setNotes(initialNotes);
    setDate(
      initialDate instanceof Date
        ? initialDate
        : initialDate?.toDate?.() || new Date(initialDate)
    );
    // Note: We now set selectedCategory in the fetchCategories effect
  }, [initialAmount, initialNotes, initialDate]);

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
      setAmount(value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
      setAmountError(value.length === 0 ? 'Amount is required' : '');
    }
    if (key === 'notes') {
      setNotes(value.replace(/\s+/g, ' '));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateTransaction(transactionId, {
        amount: parseFloat(amount),
        notes,
        date: firestore.Timestamp.fromDate(date), // Convert to Firestore timestamp
        category: selectedCategory,
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error updating transaction:', error);
      Alert.alert('Error', 'Failed to update transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTransaction(transactionId);
      setDeleteModal(false);
      navigation.goBack();
      // navigation.navigate('Home');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      Alert.alert('Error', 'Failed to delete transaction');
    } finally {
      setLoading(false);
    }
  };

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
          category={selectedCategory}
          data={categories.map(cat => ({
            id: cat.id,
            label: cat.label,
            value: cat.label,
          }))}
          onSelect={(value) => setSelectedCategory(value)}
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

      <View style={styles.btnContainer}>
        <CustButton
          title="Delete"
          style={styles.btnDelete}
          onPress={() => setDeleteModal(true)}
        />
        <CustButton
          disabled={disableBtn || loading}
          isLoading={loading}
          title="Save"
          style={[styles.btnSave, (disableBtn || loading) && styles.disabledBtn]}
          onPress={handleUpdate}
        />
      </View>

      <ConfirmationModal
        message="Are you sure you want to delete this transaction?"
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
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