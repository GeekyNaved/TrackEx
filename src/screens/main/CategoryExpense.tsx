import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import Modal from 'react-native-modal';
import CustTextInputField from '../../components/CustTextInputField';
import boxModelSize from '../../constants/boxModel';
import colors from '../../constants/colors';
import CustButton from '../../components/CustButton';
import {fontSize} from '../../constants/fontSize';
import CategoryCard from '../../components/CategoryCard';
import ConfirmationModal from '../../components/ConfirmationModal';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../firestore';

const CategoryExpense = () => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [addCategoryName, setAddCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [disableEditBtn, setDisableEditBtn] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState('');
  const [editFieldErr, setEditFieldErr] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch expense categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const expenseCategories = await getCategories('expense');
      setCategories(expenseCategories);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch expense categories');
      console.error('Error fetching expense categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleModal = () => {
    setAddModalVisible(!isAddModalVisible);
  };

  const handleFocus = field => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (key: string, value: any) => {
    if (key === 'editExpense') {
      setEditCategoryName(value.replace(/\s+/g, ' '));
    }
    if (key === 'expense') {
      setAddCategoryName(value.replace(/\s+/g, ' '));
    }
  };

  const handleDelete = (id: string) => {
    setDeleteCategoryId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(deleteCategoryId);
      fetchCategories(); // Refresh list after deletion
      setDeleteModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete expense category');
      console.error('Error deleting expense category:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateCategory(editCategoryId, {
        label: editCategoryName,
        value: editCategoryName.toLowerCase().replace(/\s+/g, '-')
      });
      fetchCategories(); // Refresh list after update
      setEditModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update expense category');
      console.error('Error updating expense category:', error);
    }
  };

  const handleAddSubmit = async () => {
    try {
      await addCategory({
        type: 'expense',
        label: addCategoryName,
        value: addCategoryName.toLowerCase().replace(/\s+/g, '-')
      });
      fetchCategories(); // Refresh list after addition
      setAddCategoryName('');
      setAddModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense category');
      console.error('Error adding expense category:', error);
    }
  };

  // Validation for edit field
  useEffect(() => {
    if (editCategoryName?.length === 0) {
      setDisableEditBtn(true);
      setEditFieldErr('Field should not be empty');
    } else {
      setEditFieldErr('');
      setDisableEditBtn(false);
    }
  }, [editCategoryName]);

  // Validation for add field
  useEffect(() => {
    if (addCategoryName?.length === 0) {
      setDisableAddBtn(true);
    } else {
      setDisableAddBtn(false);
    }
  }, [addCategoryName]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <CategoryCard
              id={item.id}
              category={item.label}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => {
                setEditCategoryName(item.label);
                setEditCategoryId(item.id);
                setEditModalVisible(true);
              }}
            />
          );
        }}
      />

      <ConfirmationModal
        message="Are you sure you want to delete this expense category?"
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={confirmDelete}
        leftBtnTitle="Yes"
        rightBtnTitle="No"
      />

      <CustButton
        style={styles.addBtn}
        btnTxtStyles={styles.addBtnTxt}
        title="+"
        onPress={toggleModal}
      />

      {/* Edit Category Modal */}
      <Modal
        isVisible={isEditModalVisible}
        style={styles.modal}
        onBackButtonPress={() => setEditModalVisible(false)}
        onBackdropPress={() => setEditModalVisible(false)}>
        <View style={styles.modalInner}>
          <CustTextInputField
            label="Edit Expense"
            placeholder="Enter Expense"
            value={editCategoryName}
            onChangeText={handleChange.bind(this, 'editExpense')}
            isFocused={focusedField === 'editExpense'}
            onFocus={() => handleFocus('editExpense')}
            onBlur={handleBlur}
            errorMsg={editFieldErr}
          />
          <CustButton
            disabled={disableEditBtn}
            isLoading={loading}
            title="Save"
            style={[styles.btnSave, disableEditBtn && styles.disabledBtn]}
            onPress={handleEditSubmit}
          />
        </View>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        isVisible={isAddModalVisible}
        style={styles.modal}
        onBackButtonPress={() => setAddModalVisible(false)}
        onBackdropPress={() => setAddModalVisible(false)}>
        <View style={styles.modalInner}>
          <CustTextInputField
            label="Add Expense"
            placeholder="Enter category"
            value={addCategoryName}
            onChangeText={handleChange.bind(this, 'expense')}
            isFocused={focusedField === 'expense'}
            onFocus={() => handleFocus('expense')}
            onBlur={handleBlur}
          />
          <CustButton
            disabled={disableAddBtn}
            isLoading={loading}
            title="Save"
            style={[styles.btnSave, disableAddBtn && styles.disabledBtn]}
            onPress={handleAddSubmit}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
  },
  addBtnTxt: {
    fontSize: fontSize.h3,
  },
  addBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: boxModelSize.twentyTwo,
    paddingVertical: boxModelSize.fifteen,
    borderRadius: boxModelSize.fifty,
  },
  modalInner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: boxModelSize.ten,
    paddingTop: boxModelSize.twenty,
    paddingBottom: boxModelSize.thirty,
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

export default CategoryExpense;