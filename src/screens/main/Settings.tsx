import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import boxModelSize from '../../constants/boxModel';
import colors from '../../constants/colors';
import {fontSize} from '../../constants/fontSize';
import PageWrapper from '../../components/PageWrapper';
import BorderBox from '../../components/BorderBox';
import {
  AcademicCapIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
} from 'react-native-heroicons/outline';

const Settings = ({navigation}) => {
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
