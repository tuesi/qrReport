import { Text, TouchableOpacity } from 'react-native';
import Styles from '../../styles/styles';

const Button = ({ text, color, onPress }) => {
    return (
        <TouchableOpacity style={[Styles.buttonStyle, { backgroundColor: color }]} onPress={onPress}>
            <Text style={Styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;