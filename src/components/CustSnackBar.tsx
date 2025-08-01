import Snackbar from 'react-native-snackbar';

const CustSnackBar = (message: string, callBack?: () => void) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    // fontFamily: 'Poppins-Medium',
    // textColor: colors.white,
    // backgroundColor: colors.blue,
  });
  setTimeout(() => {
    if (callBack) {
      callBack();
    }
  }, 5000);
};

export default CustSnackBar;
