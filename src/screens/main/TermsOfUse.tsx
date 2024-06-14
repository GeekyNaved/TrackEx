import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PageWrapper from '../../components/PageWrapper';
import boxModelSize from '../../constants/boxModel';
import colors from '../../constants/colors';
import {fontSize} from '../../constants/fontSize';

const TermsOfUse = () => {
  return (
    <PageWrapper>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>Terms and Conditions - TrackEx</Text>
        <Text style={styles.txt}>
          These Terms and Conditions govern your use of the TrackEx mobile
          application provided by TrackEx. By using the App, you agree to be
          bound by these terms. If you do not agree with these terms, please do
          not use the App.
        </Text>
      </View>

      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**1. App Usage:**</Text>
        <Text style={styles.txt}>
          The App is designed for customers of TrackEx to place orders for
          collection at the physical locations. It is not intended for delivery
          orders.
        </Text>
      </View>

      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**2. Ordering:**</Text>
        <Text style={styles.txt}>
          You can place orders through the App for pickup at either of our two
          existing locations. The availability of menu items is subject to
          change without notice.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**3. Points and Discounts:**</Text>
        <Text style={styles.txt}>
          Customers can accumulate points with each order made through the App.
          These points can be redeemed for discounts on future orders. The
          points system and discount rates are determined by TrackEx and are
          subject to change.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**4. Collection:**</Text>
        <Text style={styles.txt}>
          Orders placed through the App are for collection at the physical
          locations only. Orders will be ready for pickup at the estimated time
          provided during the ordering process.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**5. User Accounts:**</Text>
        <Text style={styles.txt}>
          To use the App, you may be required to create an account. You are
          responsible for maintaining the confidentiality of your account
          credentials and for any activities that occur under your account.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**6. Privacy:**</Text>
        <Text style={styles.txt}>
          We collect and process personal information in accordance with our
          Privacy Policy, which can be found on the App. By using the App, you
          consent to our collection and processing of personal information as
          described in the Privacy Policy.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>
          **7. Modification of App and Terms:**{' '}
        </Text>
        <Text style={styles.txt}>
          We reserve the right to modify, suspend, or discontinue the App at any
          time without notice. We also reserve the right to modify these terms
          at our discretion. Any changes will be effective upon posting on the
          App.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**8. Termination:**</Text>
        <Text style={styles.txt}>
          We reserve the right to terminate or suspend your access to the App
          without notice if we believe you have violated these terms or for any
          other reason.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**9. Limitation of Liability:**</Text>
        <Text style={styles.txt}>
          The Company shall not be liable for any damages, losses, or
          liabilities arising out of your use of the App.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**10. Governing Law:**</Text>
        <Text style={styles.txt}>
          This Agreement shall be governed by and construed in accordance with
          the laws of The United Kingdom, without regard to its conflict of law
          principles.
          {'\n'} {'\n'}
          By using the TrackEx mobile app, you agree to abide by these terms and
          conditions. If you have any questions about these terms, please
          contact us with the email provided.
          {'\n'}
          {'\n'}NK Ltd{'\n'}
          14/06/2024
        </Text>
      </View>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: boxModelSize.fifteen,
    marginBottom: boxModelSize.twenty,
  },
  txtContainer: {
    marginTop: boxModelSize.twenty,
  },
  heading: {
    fontSize: fontSize.h5,
    color: colors.black,
    // fontFamily: 'Poppins-Medium',
  },
  txt: {
    fontSize: fontSize.h6,
    color: colors.black,
    // fontFamily: 'Poppins-Regular',
  },
});
export default TermsOfUse;
