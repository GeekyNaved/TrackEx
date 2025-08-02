import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Type Definitions
type Category = {
  id?: string;
  type: 'income' | 'expense';
  label: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
};

type Transaction = {
  id?: string;
  type: 'income' | 'expense';
  category: string; // category ID
  amount: number;
  date: Date;
  notes?: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
};

type MonthlySummary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

type CategoryStats = Record<string, {
  income: number;
  expense: number;
}>;

// Helper to get current user's document reference
const getUserRef = () => {
  const userId = auth().currentUser?.uid;
  if (!userId) throw new Error('User not authenticated');
  return firestore().collection('users').doc(userId);
};

// ================== CATEGORY OPERATIONS ==================
export const getCategories = async (type?: 'income' | 'expense'): Promise<Category[]> => {
  try {
    const userRef = getUserRef();
    let query = userRef.collection('categories');
    
    if (type) {
      query = query.where('type', '==', type);
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() as Omit<Category, 'id'>
    }));
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

export const addCategory = async (category: Omit<Category, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const userRef = getUserRef();
    const docRef = await userRef.collection('categories').add({
      ...category,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

export const updateCategory = async (categoryId: string, updates: Partial<Category>): Promise<void> => {
  try {
    const userRef = getUserRef();
    await userRef.collection('categories').doc(categoryId).update(updates);
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    const userRef = getUserRef();
    await userRef.collection('categories').doc(categoryId).delete();
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// ================== TRANSACTION OPERATIONS ==================
export const getTransactions = async (params: {
  month?: number;
  year?: number;
  startDate?: Date;
  endDate?: Date;
  type?: 'income' | 'expense';
  limit?: number;
}): Promise<Transaction[]> => {
  try {
    const userRef = getUserRef();
    let query = userRef.collection('transactions').orderBy('date', 'desc');
    
    if (params.type) {
      query = query.where('type', '==', params.type);
    }
    
    if (params.month && params.year) {
      const start = new Date(params.year, params.month - 1, 1);
      const end = new Date(params.year, params.month, 0, 23, 59, 59);
      query = query.where('date', '>=', start).where('date', '<=', end);
    }
    
    if (params.startDate && params.endDate) {
      query = query.where('date', '>=', params.startDate)
                  .where('date', '<=', params.endDate);
    }
    
    if (params.limit) {
      query = query.limit(params.limit);
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Transaction, 'id'>
    }));
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw error;
  }
};

export const addTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const userRef = getUserRef();
    const docRef = await userRef.collection('transactions').add({
      ...transaction,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (
  transactionId: string,
  updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>
): Promise<void> => {
  try {
    const userRef = getUserRef();
    await userRef.collection('transactions').doc(transactionId).update(updates);
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId: string): Promise<void> => {
  try {
    const userRef = getUserRef();
    await userRef.collection('transactions').doc(transactionId).delete();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// ================== DASHBOARD STATS ==================
export const getMonthlySummary = async (month: number, year: number): Promise<MonthlySummary> => {
  try {
    const userRef = getUserRef();
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    
    const [incomeSnapshot, expenseSnapshot] = await Promise.all([
      userRef.collection('transactions')
        .where('type', '==', 'income')
        .where('date', '>=', start)
        .where('date', '<=', end)
        .get(),
      userRef.collection('transactions')
        .where('type', '==', 'expense')
        .where('date', '>=', start)
        .where('date', '<=', end)
        .get()
    ]);
    
    const totalIncome = incomeSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
    const totalExpense = expenseSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
    
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  } catch (error) {
    console.error('Error getting monthly summary:', error);
    throw error;
  }
};

export const getCategoryStats = async (month: number, year: number): Promise<CategoryStats> => {
  try {
    const userRef = getUserRef();
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    
    const snapshot = await userRef.collection('transactions')
      .where('date', '>=', start)
      .where('date', '<=', end)
      .get();
    
    const stats: CategoryStats = {};
    
    snapshot.docs.forEach(doc => {
      const { category, amount, type } = doc.data();
      if (!stats[category]) {
        stats[category] = { income: 0, expense: 0 };
      }
      stats[category][type] += amount;
    });
    
    return stats;
  } catch (error) {
    console.error('Error getting category stats:', error);
    throw error;
  }
};