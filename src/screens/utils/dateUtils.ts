// utils/dateUtils.ts
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const toFirestoreDate = (date: Date) => firestore.Timestamp.fromDate(date);
export const fromFirestoreDate = (timestamp: FirebaseFirestoreTypes.Timestamp) => timestamp.toDate();
export const formatDisplayDate = (date: Date | FirebaseFirestoreTypes.Timestamp) => {
  const jsDate = date instanceof Date ? date : date.toDate();
  return new Intl.DateTimeFormat('en-US').format(jsDate);
};