// components/EmptyState.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
import { fontSize } from '../constants/fontSize';

const EmptyState = ({ 
  imageSource, 
  title, 
  description, 
  actionText, 
  onAction 
}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionText && (
        <TouchableOpacity style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: boxModelSize.twenty,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: boxModelSize.twenty,
  },
  title: {
    fontSize: fontSize.h3,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: boxModelSize.ten,
    textAlign: 'center',
  },
  description: {
    fontSize: fontSize.h5,
    color: colors.greySecondary,
    textAlign: 'center',
    marginBottom: boxModelSize.twenty,
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: boxModelSize.twenty,
    paddingVertical: boxModelSize.ten,
    borderRadius: boxModelSize.five,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.h5,
  },
});

export default EmptyState;