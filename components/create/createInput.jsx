import { View, TextInput } from "react-native";
import Styles from '../../styles/styles';

const CreateInput = ({ name, notes, setName, setNotes }) => {
    return (
        <View style={Styles.createInputContainer}>
            <TextInput
                style={Styles.input}
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={Styles.input}
                placeholder="Notes"
                value={notes}
                onChangeText={text => setNotes(text)}
            />
        </View>
    )
}

export default CreateInput;