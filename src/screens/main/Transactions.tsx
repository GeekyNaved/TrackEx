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

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  notes?: string;
  amount: number;
  date: { toDate?: () => Date } | Date;
}

interface CategoryStat {
  value: number;
  color: string;
  text: string;
  category: string;
}

const Transactions = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
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
          text: showIncome ? data.income : data.expense,
          // text: data.label || categoryId,
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
  const filterTransactions = (transactions: Transaction[], incomeOnly: boolean) => {
    const filtered = incomeOnly
      ? transactions.filter(t => t.type === 'income')
      : transactions.filter(t => t.type === 'expense');
    setFilteredTransactions(filtered);
  };

  // Handle toggle switch change
  const handleToggleChange = (value: boolean) => {
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

  // Helper function to get unique colors for pie chart
  const getRandomColor = (() => {
    const incomeColors = [
      '#4CAF50', // Green
      '#8BC34A', // Light Green
      '#009688', // Teal
      '#00BCD4', // Cyan
      '#2196F3', // Blue
      '#3F51B5', // Indigo
      '#4DB6AC', // Teal 300
      '#81C784', // Green 300
      '#7CB342', // Light Green 600
      '#43A047', // Green 600
      '#00897B', // Teal 600
      '#00ACC1', // Cyan 600
      '#039BE5', // Light Blue 600
      '#1E88E5', // Blue 600
      '#3949AB', // Indigo 600
      '#26A69A', // Teal 400
    ];

    const expenseColors = [
      '#F44336', // Red
      '#E91E63', // Pink
      '#9C27B0', // Purple
      '#673AB7', // Deep Purple
      '#FF5722', // Deep Orange
      '#FF9800', // Orange
      '#EF5350', // Red 400
      '#EC407A', // Pink 400
      '#AB47BC', // Purple 400
      '#7E57C2', // Deep Purple 400
      '#FF7043', // Deep Orange 400
      '#FFA726', // Orange 400
      '#D81B60', // Pink 600
      '#8E24AA', // Purple 600
      '#5E35B1', // Deep Purple 600
      '#F4511E', // Deep Orange 600
    ];

    let currentIncomeIndex = 0;
    let currentExpenseIndex = 0;

    return () => {
      if (showIncome) {
        currentIncomeIndex = (currentIncomeIndex + 1) % incomeColors.length;
        return incomeColors[currentIncomeIndex];
      } else {
        currentExpenseIndex = (currentExpenseIndex + 1) % expenseColors.length;
        return expenseColors[currentExpenseIndex];
      }
    };
  })();

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
        // <View style={styles.chartContainer}>
        <>
          <View style={styles.chartWrapper}>
            {/* <View style={styles.donutContainer}> */}
              <PieChart
                donut
                showText
                textColor={colors.black}
                // radius={95}
                textSize={9}
                fontWeight="600"
                showTextBackground
                textBackgroundColor="rgba(255, 255, 255, 0.9)"
                textBackgroundRadius={15}
                data={categoryStats}
                innerRadius={55}
                innerCircleColor={colors.white}
                focusOnPress
                labelsPosition="outward"
                strokeColor={colors.white}
                strokeWidth={1}
                centerLabelComponent={() => (
                  <View style={styles.centerLabel}>
                    <Text style={styles.pieCenterText}>
                      {showIncome ? 'Income' : 'Expenses'}
                    </Text>
                    <Text style={[
                      styles.pieTotalAmount,
                      { color: showIncome ? colors.green : colors.red }
                    ]}>
                      ₹{showIncome ? balanceData.totalIncome : balanceData.totalExpense}
                    </Text>
                  </View>
                )}
              />
            {/* </View> */}
            <View style={styles.legendContainer}>
              {categoryStats.map((item, index) =>  (
                  <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText} numberOfLines={1}>
                    {item.category}
                  </Text>
                  {/* <AmountWithRupee
                    customStyle={styles.legendAmount}
                    amount={item.value}
                    /> */}
                </View>
              ))}
            </View>
          </View>
          </>
        // {/* </View> */}
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
              date={(item.date instanceof Date ? item.date : (item.date?.toDate?.() || new Date())).toISOString()}
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
    marginVertical: boxModelSize.twenty,
    paddingHorizontal: boxModelSize.ten,
  },
  chartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  legendContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: boxModelSize.ten,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: boxModelSize.eight,
    backgroundColor: colors.white,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.lightBlue,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: boxModelSize.eight,
  },
  legendText: {
    fontSize: fontSize.p,
    color: colors.black,
    flex: 1,
    marginRight: boxModelSize.five,
  },
  legendAmount: {
    fontSize: fontSize.p,
    color: colors.grayPrimary,
    fontWeight: '500',
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: boxModelSize.fifteen,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: boxModelSize.five,
  },
  pieCenterText: {
    fontSize: fontSize.p,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
  pieTotalAmount: {
    fontSize: fontSize.h3,
    fontWeight: 'bold',
    marginTop: boxModelSize.five,
    textAlign: 'center',
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