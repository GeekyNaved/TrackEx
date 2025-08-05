import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, Switch } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import AmountWithRupee from '../../components/AmountWithRupee';
import colors from '../../constants/colors';
import { fontSize } from '../../constants/fontSize';
import boxModelSize from '../../constants/boxModel';
import TransactionCard from '../../components/TransactionCard';
import { getTransactions, getMonthlySummary, getCategoryStats } from '../../firestore';
import { NavigationProp, ParamListBase, useFocusEffect } from '@react-navigation/native';
import EmptyState from '../../components/EmptyState';

const Transactions = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryStats, setCategoryStats] = useState([]);
  const [balanceData, setBalanceData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });
  const [showIncome, setShowIncome] = useState(false); // Toggle state

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [summary, recentTransactions, stats] = await Promise.all([
        getMonthlySummary(currentMonth, currentYear),
        getTransactions({
          month: currentMonth,
          year: currentYear,
          limit: 50 // Show more transactions
        }),
        getCategoryStats(currentMonth, currentYear)
      ]);

      setBalanceData(summary);
      setTransactions(recentTransactions || []);
      filterTransactions(recentTransactions || [], showIncome);

      // Convert category stats to pie chart data
      const pieData = Object.entries(stats)
        .filter(([_, data]) => showIncome ? data.income > 0 : data.expense > 0)
        .map(([categoryId, data]) => ({
          value: showIncome ? data.income : data.expense,
          color: getRandomColor(),
          text: data.label || categoryId,
          category: data.label || categoryId
        }));

      setCategoryStats(pieData);
    } catch (error) {
      console.error('Error fetching transactions data:', error);
      // Set empty states
      setBalanceData({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
      });
      setTransactions([]);
      setFilteredTransactions([]);
      setCategoryStats([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter transactions based on toggle state
  const filterTransactions = (transactions, incomeOnly) => {
    const filtered = incomeOnly
      ? transactions.filter(t => t.type === 'income')
      : transactions.filter(t => t.type === 'expense');
    setFilteredTransactions(filtered);
  };

  // Handle toggle switch change
  const handleToggleChange = (value) => {
    setShowIncome(value);
    filterTransactions(transactions, value);

    // Update pie chart data
    if (categoryStats.length > 0) {
      const updatedStats = categoryStats.map(item => ({
        ...item,
        value: value ? item.value * 2 : item.value / 2 // Example adjustment
      }));
      setCategoryStats(updatedStats);
    }
  };

  // Helper function to generate random colors for pie chart
  const getRandomColor = () => {
    const colors = showIncome
      ? ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'] // Green/yellow shades for income
      : ['#F44336', '#E91E63', '#9C27B0', '#673AB7']; // Red/purple shades for expenses
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Refresh data when screen comes into focus or toggle changes
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [showIncome])
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
      <View style={styles.header}>
        <View style={styles.customToggleWrapper}>
          <Text style={[
            styles.toggleLabel,
            !showIncome && styles.toggleLabelActive
          ]}>Expense</Text>
          <View style={styles.switchBackground}>
            <Switch
              trackColor={{ false: colors.gray, true: colors.green }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.gray}
              onValueChange={handleToggleChange}
              value={showIncome}
              style={styles.toggleSwitch}
            />
          </View>
          <Text style={[
            styles.toggleLabel,
            showIncome && styles.toggleLabelActive
          ]}>Income</Text>
        </View>
      </View>

      <View style={styles.spendings}>
        <Text style={styles.spendingTxt}>
          Total {showIncome ? 'Income' : 'Spendings'}:
        </Text>
        <AmountWithRupee
          customStyle={styles.spendingValue}
          amount={showIncome ? balanceData.totalIncome : balanceData.totalExpense}
        />
      </View>

      {categoryStats.length > 0 ? (
        <View style={styles.chartContainer}>
          <PieChart
            donut
            showText
            textColor="black"
            radius={100}
            textSize={13}
            showTextBackground
            textBackgroundRadius={20}
            data={categoryStats}
            centerLabelComponent={() => (
              <Text style={styles.pieCenterText}>
                {showIncome ? 'Income' : 'Expenses'}
              </Text>
            )}
          />
        </View>
      ) : (
        <View style={styles.chartPlaceholder}>
          <Text style={styles.noDataText}>
            No {showIncome ? 'income' : 'expense'} data available
          </Text>
        </View>
      )}

      <Text style={styles.recentTransactions}>
        Recent {showIncome ? 'Income' : 'Expenses'}
      </Text>

      {filteredTransactions.length > 0 ? (
        <FlatList
          data={filteredTransactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              id={item.id}
              navigation={navigation}
              type={item.type}
              category={item.category}
              notes={item.notes}
              amount={item.amount}
              date={item.date?.toDate?.() || new Date()}
            />
          )}
        />
      ) : (
        <EmptyState
          imageSource={require('../../assets/images/no-transactions.png')}
          title={`No ${showIncome ? 'Income' : 'Expense'} Transactions`}
          description={`Start adding ${showIncome ? 'income' : 'expenses'} to see them here`}
          actionText={`Add ${showIncome ? 'Income' : 'Expense'}`}
          onAction={() => navigation.navigate('AddTransaction', { type: showIncome ? 'income' : 'expense' })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: boxModelSize.fifteen,
    paddingVertical: boxModelSize.fifteen,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: boxModelSize.fifteen,
  },
  headerTitle: {
    fontSize: fontSize.h2,
    fontWeight: 'bold',
    color: colors.black,
  },
  customToggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlack,
    borderRadius: 20,
    paddingHorizontal: boxModelSize.ten,
    paddingVertical: boxModelSize.five,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  switchBackground: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 2,
    marginHorizontal: boxModelSize.five,
  },
  toggleLabel: {
    fontSize: fontSize.p,
    color: colors.white,
    marginHorizontal: boxModelSize.five,
    fontWeight: '500',
  },
  toggleLabelActive: {
    color: colors.green,
    fontWeight: 'bold',
  },
  toggleSwitch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    marginHorizontal: 2,
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: boxModelSize.twenty,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieCenterText: {
    fontSize: fontSize.p,
    fontWeight: 'bold',
    color: colors.black,
  },
  noDataText: {
    fontSize: fontSize.p,
    color: colors.grayPrimary,
  },
  spendings: {
    marginVertical: boxModelSize.twenty,
  },
  spendingTxt: {
    fontSize: fontSize.p,
    color: colors.grayPrimary,
  },
  spendingValue: {
    fontSize: fontSize.h1,
    color: colors.black,
    fontWeight: 'bold',
  },
  recentTransactions: {
    fontSize: fontSize.h3,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: boxModelSize.ten,
    paddingVertical: boxModelSize.ten,
  },
});

export default Transactions;