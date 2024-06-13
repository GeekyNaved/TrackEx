import React, {useState} from 'react';
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [incomeName, setIncomeName] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleFocus = field => {
    setFocusedField(field);
  };
  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (key: string, value: any) => {
    if (key === 'income') {
      setIncomeName(value.replace(/\s+/g, ' '));
    }
  };
  const handleDelete = (value: number) => {
    console.log('value', value);
    setDeleteModal(true);
  };
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
            />
          );
        }}
      />
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
      <Modal
        style={styles.modal}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        isVisible={isModalVisible}>
        <View style={styles.modalInner}>
          <CustTextInputField
            label="Edit Income"
            placeholder="Edit"
            value={'Salary'}
            onChangeText={handleChange.bind(this, 'income')}
            isFocused={focusedField === 'income'}
            onFocus={() => handleFocus('income')}
            onBlur={handleBlur}
          />
          <CustButton
            disabled={disableBtn}
            // isLoading={isLoading}
            title="Save"
            style={[styles.btnSave, disableBtn && styles.disabledBtn]}
            onPress={toggleModal}
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
