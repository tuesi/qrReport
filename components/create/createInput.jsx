import { View, TextInput, Modal } from "react-native";
import Styles from '../../styles/styles';
import createStyles from "./createStyles";
import * as Color from '../../styles/colors';
import Button from "../common/button";
import { Image } from "react-native";
import ImageViewModal from "../common/imageViewModal";

const CreateInput = ({ name, notes, setName, setNotes, image }) => {
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
            <View style={{ height: image ? "25%" : 0, marginTop: '5%' }}>
                <ImageViewModal uri={image} />
            </View>
        </View>
    )
}

export default CreateInput;