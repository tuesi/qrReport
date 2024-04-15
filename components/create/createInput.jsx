import { View, TextInput } from "react-native";
import Styles from '../../styles/styles';
import createStyles from "./createStyles";
import * as Color from '../../styles/colors';

const CreateInput = ({ name, notes, setName, setNotes }) => {
    return (
        <View style={createStyles.createInputContainer}>
            <TextInput
                style={Styles.input}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                placeholder="Įrangos pavadinimas"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={Styles.input_large}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                placeholder="Papildoma informacija"
                value={notes}
                multiline={true}
                textAlignVertical='top'
                onChangeText={text => setNotes(text)}
            />
        </View>
    )
}

export default CreateInput;