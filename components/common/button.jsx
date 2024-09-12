import { Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../styles/styles';

const Button = ({ text, color, onPress }) => {
    return (
        <TouchableOpacity style={[GlobalStyles.buttonStyle, { backgroundColor: color }]} onPress={onPress}>
            <Text style={GlobalStyles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;