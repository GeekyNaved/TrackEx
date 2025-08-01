import React, { useState } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import boxModelSize from '../../constants/boxModel';
import colors from '../../constants/colors';
import { fontSize } from '../../constants/fontSize';
import PageWrapper from '../../components/PageWrapper';
import BorderBox from '../../components/BorderBox';
import {
  AcademicCapIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
} from 'react-native-heroicons/outline';
import ConfirmationModal from '../../components/ConfirmationModal';
import auth from '@react-native-firebase/auth';
import { removeItem } from '../../constants/asyncStorage';

const Settings = ({ navigation }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // To log out and remove user data
  const handleLogOut = async () => {
    try {
      await auth().signOut();
      await removeItem('@user');
      console.log('User logged out and data cleared');
      navigation.navigate('AuthStack');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };
  return (
    <PageWrapper>
      <View style={styles.subContainer}>
        <Text style={styles.heading}>Help & Policies</Text>
        <BorderBox
          leftIcon={
            <QuestionMarkCircleIcon
              color={colors.black}
              size={boxModelSize.twenty}
            />
          }
          title="Help"
          containerStyles={styles.borderBoxContainer}
          onPress={() => Linking.openURL('mailto:navedahmed040@gmail.com')}
        />
        <BorderBox
          leftIcon={
            <ClipboardDocumentListIcon
              color={colors.black}
              size={boxModelSize.twenty}
            />
          }
          rightIcon={
            <ChevronRightIcon color={colors.black} size={boxModelSize.twenty} />
          }
          title="Terms of Use"
          containerStyles={styles.borderBoxContainer}
          onPress={() => navigation.navigate('TermsOfUse')}
        />
        <BorderBox
          leftIcon={
            <AcademicCapIcon color={colors.black} size={boxModelSize.twenty} />
          }
          rightIcon={
            <ChevronRightIcon color={colors.black} size={boxModelSize.twenty} />
          }
          title="Privacy Policies"
          containerStyles={styles.borderBoxContainer}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.heading}>Account</Text>

        <BorderBox
          leftIcon={
            <ClipboardDocumentListIcon
              color={colors.black}
              size={boxModelSize.twenty}
            />
          }
          rightIcon={
            <ChevronRightIcon color={colors.black} size={boxModelSize.twenty} />
          }
          title="Delete Account"
          containerStyles={styles.borderBoxContainer}
          onPress={() => setDeleteModal(true)}
        />
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setLogoutModal(true)}>
          <Text style={styles.logoutTxt}>Logout</Text>
        </TouchableOpacity>
        <ConfirmationModal
          message="Are you sure you want to delete the account?"
          visible={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={() => setDeleteModal(false)}
          leftBtnTitle="Proceed"
          rightBtnTitle="Cancel"
        />
        <ConfirmationModal
          message="Are you sure you want to logout?"
          visible={logoutModal}
          onClose={() => setLogoutModal(false)}
          onConfirm={handleLogOut}
          leftBtnTitle="Yes"
          rightBtnTitle="No"
        />
      </View>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    // fontFamily: 'Poppins-Medium',
    fontSize: fontSize.twenty,
    color: colors.black,
    fontWeight: '500',
  },
  subContainer: {
    paddingTop: boxModelSize.twenty,
  },
  title: {
    paddingHorizontal: boxModelSize.twenty,
    paddingVertical: boxModelSize.twenty,
    // fontFamily: 'Poppins-Medium',
    fontSize: fontSize.h4,
    textAlign: 'center',
    color: colors.black,
  },
  borderBoxContainer: {
    paddingVertical: boxModelSize.twentyFive,
    marginTop: boxModelSize.ten,
  },
  logoutBtn: {
    alignSelf: 'center',
    marginTop: boxModelSize.thirty,
  },
  logoutTxt: {
    // fontFamily: 'Poppins-Medium',
    fontSize: fontSize.h5,
    color: colors.red,
  },
});

export default Settings;
