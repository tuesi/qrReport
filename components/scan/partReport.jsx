import { useState } from 'react';
import { View, SafeAreaView, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import Styles from '../../styles/styles';
import scanStyles from './scanStyles';
import * as Color from '../../styles/colors';
import Button from '../common/button';
import ImageViewModal from '../common/imageViewModal';

const PartReport = ({ setPartScanned, formData, deviceImageUrl }) => {

    const { width, height } = Dimensions.get('window');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
                    <SafeAreaView style={Styles.safeAreaStyle}>
                        <View style={scanStyles.scanInputContainer}>
                            <View style={width > 500 ? scanStyles.reportContainerLarge : scanStyles.reportContainerSmall}>
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        style={Styles.input_disabled}
                                        placeholder="Įrangos pavadinimas"
                                        value={formData.name}
                                        editable={false}
                                    />
                                    <View style={{ width: width > 500 ? '80%' : '70%' }}>
                                        <TextInput
                                            style={Styles.input_disabled_large}
                                            placeholder="Papildoma informacija"
                                            value={formData.notes}
                                            editable={false}
                                            multiline={true}
                                            textAlignVertical='top'
                                        />
                                    </View>
                                </View>
                                <View style={{ marginLeft: width > 500 ? '-18%' : '-25%', marginTop: width < 500 ? '22%' : '' }}>
                                    <ImageViewModal uri={deviceImageUrl} size={width > 500 ? 100 : 70} />
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