import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
import { fontSize } from '../constants/fontSize';
import { CheckCircleIcon } from 'react-native-heroicons/outline';

interface CategoryItem {
  id: string;
  label: string;
  value: string; // This should match what's stored in transactions
}

interface CustDropdownProps {
  label: string;
  data: CategoryItem[];
  category: string; // This should be the category ID/value stored in transactions
  onSelect: (value: string) => void;
}

const CustDropdown: React.FC<CustDropdownProps> = ({
  label,
  data,
  category,
  onSelect,
}) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    // Set initial value from props
    if (category) {
      setValue(category);
    }
  }, [category]);

  const renderItem = (item: CategoryItem) => {
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
        valueField="value" // This must match what's stored in transactions
        placeholder="Select category"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item: CategoryItem) => {
          setValue(item.value);
          onSelect(item.value); // Pass the value back to parent
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
