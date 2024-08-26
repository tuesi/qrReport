import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const PartDeviceRenderItem = ({ section, toggleSection, expandedSections, setLastSectionId, handlePressSection }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                toggleSection(section.id);
                if (!expandedSections[section.id]) {  // Only load data if the section is being expanded
                    setLastSectionId(section.id);
                    handlePressSection(section.id);
                }
            }}>
                <View style={styles.sectionContainer}>
                    <View>
                        <Text style={Styles.listItemHeaderText}>{section.title}</Text>
                    </View>
                    <View>
                        {section.isPartsLow && (
                            <Ionicons name="warning-outline" size={35} color="red" />
                        )}
                    </View>
                </View>
            </TouchableOpacity >
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: '5%',
        minHeight: '30%',
        width: '100%',
        marginBottom: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.BUTTON_GREY_BACKGROUND_COLOR,
        position: 'relative'
    },
})

export default PartDeviceRenderItem;