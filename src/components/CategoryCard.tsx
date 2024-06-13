import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PencilIcon, TrashIcon} from 'react-native-heroicons/outline';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
interface CategoryCardProps {
  category: string;
  onEdit: () => void;
  onDelete: () => void;
}
const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryNotesContainer}>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rightInner}>
        <TouchableOpacity onPress={onEdit}>
          <PencilIcon color={colors.black} size={boxModelSize.twenty} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <TrashIcon color={colors.black} size={boxModelSize.twenty} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: boxModelSize.five,
    paddingHorizontal: boxModelSize.ten,
    paddingVertical: boxModelSize.twenty,
    marginVertical: boxModelSize.five,
    marginHorizontal: boxModelSize.ten,
    // for android
    elevation: 5,
  },
  categoryNotesContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  category: {
    fontWeight: 'bold',
    color: colors.black,
  },
  rightInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: boxModelSize.twenty,
  },
});
export default CategoryCard;
