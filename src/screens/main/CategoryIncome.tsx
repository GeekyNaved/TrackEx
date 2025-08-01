import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import CustTextInputField from '../../components/CustTextInputField';
import boxModelSize from '../../constants/boxModel';
import colors from '../../constants/colors';
import CustButton from '../../components/CustButton';
import {fontSize} from '../../constants/fontSize';
import {dummyCategoryIncome} from '../../constants/dummyData';
import CategoryCard from '../../components/CategoryCard';
import ConfirmationModal from '../../components/ConfirmationModal';

const CategoryIncome = () => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [addCategory, setAddCategory] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [disableEditBtn, setDisableEditBtn] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editFieldErr, setEditFieldErr] = useState('');

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
    if (key === 'editIncome') {
      setEditCategory(value.replace(/\s+/g, ' '));
    }
    if (key === 'income') {
      setAddCategory(value.replace(/\s+/g, ' '));
    }
  };
  const handleDelete = (value: number) => {
    setDeleteModal(true);
  };
  const handleEditSubmit = () => {
    setEditModalVisible(false);
  };
  const handleAddSubmit = () => {
    setAddModalVisible(false);
  };

  // validation: check bottomsheet Edit field should not be empty
  useEffect(() => {
    if (editCategory?.length === 0) {
      setDisableEditBtn(true);
      setEditFieldErr('Field should not be empty');
    } else {
      setEditFieldErr('');
      setDisableEditBtn(false);
    }
  }, [editCategory]);

  // validation: check bottomsheet Add field should not be empty
  useEffect(() => {
    if (addCategory?.length === 0) {
      setDisableAddBtn(true);
    } else {
      setDisableAddBtn(false);
    }
  }, [addCategory]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={dummyCategoryIncome}
        keyExtractor={item => item._id.toString()} // Assuming each item has a unique `id`
        renderItem={({item}) => {
          return (
            <CategoryCard
              id={item._id}
              category={item.value}
              onDelete={() => handleDelete(item._id)}
              onEdit={() => {
                setEditCategory(item.value);
                setEditModalVisible(true);
              }}
            />
          );
        }}
      />
      {/* <CustBottomSheet isVisible={isAddModalVisible} /> */}
      <ConfirmationModal
        message="Are you sure you want to delete this category?"
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => setDeleteModal(false)}
        leftBtnTitle="Yes"
        rightBtnTitle="No"
      />
      <CustButton
        style={styles.addBtn}
        btnTxtStyles={styles.addBtnTxt}
        title="+"
        onPress={toggleModal}
      />
      {/* Add Category Bottomsheet */}
      <Modal
        isVisible={isEditModalVisible}
        style={styles.modal}
        onBackButtonPress={() => {
          setEditModalVisible(false);
        }}
        onBackdropPress={() => {
          setEditModalVisible(false);
        }}>
        <View style={styles.modalInner}>
          <CustTextInputField
            label="Edit Income"
            placeholder="Enter Income"
            value={editCategory}
            onChangeText={handleChange.bind(this, 'editIncome')}
            isFocused={focusedField === 'editIncome'}
            onFocus={() => handleFocus('editIncome')}
            onBlur={handleBlur}
            errorMsg={editFieldErr}
          />
          <CustButton
            disabled={disableEditBtn}
            // isLoading={isLoading}
            title="Save"
            style={[styles.btnSave, disableEditBtn && styles.disabledBtn]}
            onPress={handleEditSubmit}
            otherProps
          />
        </View>
      </Modal>

      {/* Add Category Bottomsheet */}
      <Modal
        isVisible={isAddModalVisible}
        style={styles.modal}
        onBackButtonPress={() => {
          setAddModalVisible(false);
        }}
        onBackdropPress={() => {
          setAddModalVisible(false);
        }}>
        <View style={styles.modalInner}>
          <CustTextInputField
            label="Add Income"
            placeholder="Enter category"
            value={addCategory}
            onChangeText={handleChange.bind(this, 'income')}
            isFocused={focusedField === 'income'}
            onFocus={() => handleFocus('income')}
            onBlur={handleBlur}
          />
          <CustButton
            disabled={disableAddBtn}
            // isLoading={isLoading}
            title="Save"
            style={[styles.btnSave, disableAddBtn && styles.disabledBtn]}
            onPress={handleAddSubmit}
            otherProps
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

export default CategoryIncome;
