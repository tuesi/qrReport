import { Stack } from 'expo-router';
import { View, SafeAreaView, Alert, TouchableWithoutFeedback, TextInput, Button, Keyboard } from "react-native";
import Styles from '../../styles/styles';
import { FormDataModel } from './FormDataModel';
import { useNavigation } from '@react-navigation/native';
import { AddNewReport } from '../firebase/data';

const ReportInput = ({ setScanned, formData, setFormData }) => {

    const navigation = useNavigation();

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handleAddReport = async () => {
        try {
            await AddNewReport(formData);
            setScanned(false);
            Alert.alert('Success', 'Report has beeen issued!');
            setFormData(new FormDataModel());
            navigation.navigate('index')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#91a8bd" }}>
                <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: "#91a8bd" },
                        headerShadowVisible: false,
                        headerTitle: ''
                    }}
                />
                <View style={Styles.container}>
                    <TextInput
                        style={Styles.input}
                        placeholder="Name"
                        value={formData.name}
                        editable={false}
                    />
                    <TextInput
                        style={Styles.input}
                        placeholder="Notes"
                        value={formData.notes}
                        editable={false}
                    />
                    <TextInput
                        style={Styles.input_large}
                        placeholder="Message"
                        value={formData.message}
                        onChangeText={(text) => setFormData({ ...formData, message: text })}
                        multiline={true}
                    />
                    <Button
                        title="Report"
                        onPress={() => handleAddReport()}
                    />
                    <Button
                        title="Scan again"
                        onPress={() => setScanned(false)}
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ReportInput;