import { View, SafeAreaView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView, handlePressOutside } from "react-native";
import GlobalStyles from '../../styles/styles';
import scanStyles from './scanStyles';
import * as Color from '../../styles/colors';
import Button from '../common/button';
import ImageViewModal from '../common/imageViewModal';
import TextInputWithLabel from '../common/textInputWithLabel';

const PartReport = ({ setPartScanned, formData, partImageUrl, deviceImageUrl }) => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
                    <SafeAreaView style={GlobalStyles.safeAreaStyle}>
                        <View style={scanStyles.scanInputContainer}>
                            <View style={{ width: '100%', marginBottom: '10%' }}>
                                <View>
                                    <View style={{ marginBottom: '5%' }}>
                                        <ImageViewModal uri={deviceImageUrl} size={100} />
                                    </View>
                                    <TextInputWithLabel
                                        style={GlobalStyles.input_disabled}
                                        labelText="Įrangos pavadinimas"
                                        value={formData.partDeviceName}
                                        editable={false}
                                    />
                                    <TextInputWithLabel
                                        style={GlobalStyles.input_disabled_large}
                                        labelText="Įrankos papildoma informacija"
                                        value={formData.partDeviceNotes}
                                        editable={false}
                                        multiline={true}
                                        textAlignVertical='top'
                                    />
                                </View>
                                <View style={{ marginTop: "5%" }}>
                                    <View style={{ marginBottom: '5%' }}>
                                        <ImageViewModal uri={partImageUrl} size={100} />
                                    </View>
                                    <TextInputWithLabel
                                        style={GlobalStyles.input_disabled}
                                        labelText="Delatės pavadinimas"
                                        value={formData.name}
                                        editable={false}
                                    />
                                    <TextInputWithLabel
                                        style={GlobalStyles.input_disabled_large}
                                        labelText="Detalės papildoma informacija"
                                        value={formData.notes}
                                        editable={false}
                                        multiline={true}
                                        textAlignVertical='top'
                                    />
                                </View>
                            </View>
                            <View>
                                <Button text={'SKENUOTI IŠ NAUJO'} color={Color.BUTTON_GREY_BACKGROUND_COLOR} onPress={() => setPartScanned(false)} />
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default PartReport;