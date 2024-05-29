import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
import {fontSize} from '../constants/fontSize';
import {CheckCircleIcon} from 'react-native-heroicons/outline';

const CustDropdown = ({label, data, category}) => {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <CheckCircleIcon
            style={styles.icon}
            color={colors.black}
            size={boxModelSize.twenty}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    setValue(category);
  }, [category]);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select items"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CustDropdown;

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: '500',
    marginBottom: boxModelSize.five,
  },
  dropdown: {
    borderWidth: boxModelSize.one,
    borderRadius: boxModelSize.four,
    paddingVertical: boxModelSize.ten,
    paddingHorizontal: boxModelSize.fifteen,
    borderColor: colors.gray,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  placeholderStyle: {
    fontSize: fontSize.h5,
    color: colors.black,
  },
  selectedTextStyle: {
    color: colors.black,
    fontSize: fontSize.h5,
  },
  iconStyle: {
    width: boxModelSize.twenty,
    height: boxModelSize.twenty,
    color: colors.black,
  },
  inputSearchStyle: {
    color: colors.black,
    fontSize: fontSize.h5,
  },
});
