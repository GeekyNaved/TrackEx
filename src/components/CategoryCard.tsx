import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PencilIcon, TrashIcon} from 'react-native-heroicons/outline';
import boxModelSize from '../constants/boxModel';
import colors from '../constants/colors';
interface CategoryCardProps {
  id: number;
  category: string;
  onDelete: () => void;
}
const CategoryCard: React.FC<CategoryCardProps> = ({id, category, onDelete}) => {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   // console.log('name', name)
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <View style={styles.container}>
      <View style={styles.categoryNotesContainer}>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rightInner}>
        <TouchableOpacity onPress={() => Alert.alert('Edit')}>
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
