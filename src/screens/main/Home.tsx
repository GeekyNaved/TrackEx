import {StyleSheet, View} from 'react-native';
import AccountBalanceHome from '../../components/AccountBalanceHome';
import boxModelSize from '../../constants/boxModel';

const Home = () => {
  return (
    <View style={styles.container}>
      <AccountBalanceHome />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: boxModelSize.fifteen,
    paddingVertical: boxModelSize.twenty,
  },
});
export default Home;
