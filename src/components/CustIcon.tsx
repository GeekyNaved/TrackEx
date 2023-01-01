import React from 'react'
import { verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
type IconSizeProps = {
    iconSizes: keyof typeof IconSizes;
};
export interface IconProps {
    size: IconSizeProps['iconSizes'];
    name: string;
    color: string;
}

export const IconSizes = {
    small: verticalScale(15),
    medium:  verticalScale(20),
    large: verticalScale(25),
    extraLarge:  verticalScale(30),
  };

const CustIcon = ({ size, name, color }: IconProps) => {
    return (
        <Icon name={name} size={IconSizes[size]} color={color} />
        // <Icon name="eye-off" size={120} color="#900" />
    )
}

export default CustIcon