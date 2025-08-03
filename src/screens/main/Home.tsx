import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import AccountBalanceHome from '../../components/AccountBalanceHome';
import boxModelSize from '../../constants/boxModel';
import TransactionCard from '../../components/TransactionCard';
import colors from '../../constants/colors';
import { fontSize } from '../../constants/fontSize';
import { NavigationProp, ParamListBase, useFocusEffect } from '@react-navigation/native';
import { getTransactions, getMonthlySummary } from '../../firestore';
import EmptyState from '../../components/EmptyState'; // Create this component

const Home: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({
  navigation,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balanceData, setBalanceData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const summary = await getMonthlySummary(currentMonth, currentYear);
  //       const recentTransactions = await getTransactions({
  //         month: currentMonth,
  //         year: currentYear,
  //         limit: 5
  //       });

  //       setBalanceData(summary);
  //       setTransactions(recentTransactions || []);
  //     } catch (error) {
  //       console.error('Error fetching home data:', error);
  //       // Set empty state
  //       setBalanceData({
  //         totalIncome: 0,
  //         totalExpense: 0,
  //         balance: 0
  //       });
  //       setTransactions([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const summary = await getMonthlySummary(currentMonth, currentYear);
      const recentTransactions = await getTransactions({
        month: currentMonth,
        year: currentYear,
        limit: 5
      });
      setBalanceData(summary);
      setTransactions(recentTransactions || []);
    } catch (error) {
      console.error('Error fetching home data:', error);
      // Set empty state
      setBalanceData({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
      });
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTransactions();
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.black} />
      <AccountBalanceHome
        income={balanceData.totalIncome}
        expense={balanceData.totalExpense}
        balance={balanceData.balance}
      />

      <Text style={styles.recentTransactions}>Recent Transactions</Text>

      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              id={item.id}
              navigation={navigation}
              type={item.type}
              category={item.category}
              notes={item.notes}
              amount={item.amount}
              // date={item.date}
              date={item.date?.toDate?.() || new Date()}
            />
          )}
        />
      ) : (
        <EmptyState
          imageSource={require('../../assets/images/no-transactions.png')}
          title="No Transactions Yet"
          description="Start adding your income and expenses to see them here"
          actionText="Add Transaction"
          onAction={() => navigation.navigate('AddTransaction')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: boxModelSize.fifteen,
    paddingVertical: boxModelSize.twenty,
    backgroundColor: colors.white,
    flex: 1,
  },
  recentTransactions: {
    fontSize: fontSize.h3,
    fontWeight: 'bold',
    color: colors.black,
    paddingVertical: boxModelSize.ten,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default Home;