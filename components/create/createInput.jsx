import { View, TextInput, Modal } from "react-native";
import Styles from '../../styles/styles';
import createStyles from "./createStyles";
import * as Color from '../../styles/colors';
import Button from "../common/button";
import { Image } from "react-native";
import ImageViewModal from "../common/imageViewModal";

const CreateInput = ({ name, notes, setName, setNotes, image, pickImage, takePicture }) => {
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
            <ImageViewModal uri={image} />
            <Button text={'Pridėti nuotrauką'} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={pickImage}></Button>
            <Button text={'Padaryti nuotrauką'} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={takePicture}></Button>
        </View>
    )
}

export default CreateInput;