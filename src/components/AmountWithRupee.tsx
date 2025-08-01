// amount with inline rupee sign
import {Text} from 'react-native';

interface AmountWithRupeeProps {
  amount: number;
  customStyle: object;
}

const AmountWithRupee: React.FC<AmountWithRupeeProps> = ({amount, customStyle}) => {
  return (
    <Text style={customStyle}>
      <Text>&#x20B9;</Text>
      <Text>{amount}</Text>
    </Text>
  );
};

export default AmountWithRupee;
