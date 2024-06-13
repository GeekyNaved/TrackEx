import React from 'react';
import {Modal, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import boxModelSize from '../constants/boxModel';
import {fontSize} from '../constants/fontSize';
import colors from '../constants/colors';

const ConfirmationModal = ({
  visible,
  message,
  leftBtnTitle,
  rightBtnTitle,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>{leftBtnTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>{rightBtnTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: boxModelSize.five,
    backgroundColor: colors.lightBlack,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: boxModelSize.five,
    padding: boxModelSize.twenty,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.h6,
    fontFamily: 'Poppins-Medium',
    marginBottom: boxModelSize.twenty,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.greenSecondary,
    borderRadius: boxModelSize.five,
    paddingHorizontal: boxModelSize.twenty,
    paddingVertical: boxModelSize.ten,
    marginHorizontal: boxModelSize.ten,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.p,
    fontFamily: 'Poppins-Medium',
  },
});

export default ConfirmationModal;
