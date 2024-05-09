import { useState } from 'react';
import { View, TouchableOpacity, Text, SectionList, ActivityIndicator, Button } from 'react-native';
import PartRenderItem from './PartRenderListItem';
import PartDeviceRenderItem from './PartDeviceRenderListItem';
import Styles from '../../styles/styles';

const PartList = ({ data, loading, handlePressSection }) => {

    const [lastSectionId, setLastSectionId] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]  // Toggle the current state
        }));
    };

    return (
        <View style={Styles.container}>
            {data && data.length > 0 && (
                <SectionList
                    sections={data.map(section => ({
                        ...section,
                        data: expandedSections[section.id] ? section.data : []  // Only pass data if expanded
                    }))}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item }) => PartRenderItem({ item })}
                    renderSectionHeader={({ section }) => PartDeviceRenderItem({ section, toggleSection, expandedSections, setLastSectionId, handlePressSection })}
                    ListFooterComponent={() => {
                        if (loading) return <ActivityIndicator size="large" />;
                        return null;
                    }}
                    onEndReached={() => handlePressSection(lastSectionId)}
                    onEndReachedThreshold={0.5}
                    style={{ width: '100%' }}
                />
            )}
        </View>
    )
}

export default PartList;