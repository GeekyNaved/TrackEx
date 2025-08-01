import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PageWrapper from '../../components/PageWrapper';
import boxModelSize from '../../constants/boxModel';
import colors from '../../constants/colors';
import {fontSize} from '../../constants/fontSize';

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>Privacy Policy - TrackEx</Text>
        <Text style={styles.txt}>
          This Privacy Policy explains how TrackEx collects, uses, and protects
          your personal information when you use the TrackEx mobile application.
          By using the App, you consent to the practices described in this
          Policy.
        </Text>
      </View>

      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**1. Information We Collect:**</Text>
        <Text style={styles.txt}>
          We may collect personal information you provide when creating an
          account, placing an order, or using certain features of the App. This
          information may include your name, contact information, and order
          history.
        </Text>
      </View>

      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**2. Usage of Information:**</Text>
        <Text style={styles.txt}>
          We use the collected information to process orders, provide customer
          support, and improve our services. Your order history and preferences
          may be used to offer personalized experiences and promotions.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**3. Points and Rewards:**</Text>
        <Text style={styles.txt}>
          The information you provide allows us to track and manage your points
          and rewards for orders placed through the App.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**4. Data Sharing:**</Text>
        <Text style={styles.txt}>
          We may share your information with third- party service providers who
          assist us in delivering our services, such as payment processors and
          order fulfillment partners. We do not sell or rent your personal
          information to third parties.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**5. Security:**</Text>
        <Text style={styles.txt}>
          We implement security measures to protect your personal information
          from unauthorized access, disclosure, or alteration. However, no data
          transmission over the internet can be guaranteed as completely secure.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**6. Changes and Access:**</Text>
        <Text style={styles.txt}>
          You can access, update, or delete your personal information by logging
          into your account. You can also contact us to make such requests. We
          may retain certain information for legal and business purposes.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**7. Cookies and Tracking:**</Text>
        <Text style={styles.txt}>
          We may use cookies and similar technologies to track user activity
          within the App and improve your experience. You can adjust your
          browser settings to disable cookies, but this may affect your ability
          to use certain features of the App.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**8. Children's Privacy:**</Text>
        <Text style={styles.txt}>
          The App is not intended for use by individuals under the age of 13. We
          do not knowingly collect personal information from children. If you
          are a parent or guardian and believe your child has provided us with
          personal information, please contact us.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**9. Changes to this Policy:**</Text>
        <Text style={styles.txt}>
          We reserve the right to modify this Privacy Policy at any time.
          Changes will be effective when posted on the App. We encourage you to
          review this Policy periodically for updates.
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.heading}>**10. Contact Us:**</Text>
        <Text style={styles.txt}>
          If you have questions or concerns about this Privacy Policy or your
          personal information, please contact us with the phone number/ email
          provided. By using the TrackEx mobile app, you acknowledge and agree
          to the practices outlined in this Privacy Policy.
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
export default PrivacyPolicy;
