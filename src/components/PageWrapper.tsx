import React from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';

const PageWrapper = ({scrollViewStyles, containerStyles, children}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            backgroundColor: colors.white,
          },
          scrollViewStyles,
        ]}>
        <View style={[styles.container, containerStyles]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: boxModelSize.fifteen,
    marginBottom: boxModelSize.twenty,
  },
});

export default PageWrapper;
