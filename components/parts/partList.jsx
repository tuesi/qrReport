import { useState } from 'react';
import { View, SectionList, ActivityIndicator } from 'react-native';
import PartRenderItem from './PartRenderListItem';
import PartDeviceRenderItem from './PartDeviceRenderListItem';
import Styles from '../../styles/styles';
import PartInfo from '../modals/partInfo';

const PartList = ({ data, loading, handlePressSection }) => {

    const [lastSectionId, setLastSectionId] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    return (
        <View style={Styles.container}>
            {data && data.length > 0 && (
                <View style={{ flex: 1, width: '100%' }}>
                    <SectionList
                        sections={data.map(section => ({
                            ...section,
                            data: expandedSections[section.id] ? section.data : []
                        }))}
                        keyExtractor={(item, index) => item.id + index}
                        renderItem={({ item }) => PartRenderItem({ item, setSelectedItem, setModalVisible })}
                        renderSectionHeader={({ section }) => PartDeviceRenderItem({ section, toggleSection, expandedSections, setLastSectionId, handlePressSection })}
                        ListFooterComponent={() => {
                            if (loading) return <ActivityIndicator size="large" />;
                            return null;
                        }}
                        onEndReached={() => handlePressSection(lastSectionId)}
                        onEndReachedThreshold={0.5}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    />
                </View>
            )}
            {modalVisible && (
                <PartInfo
                    setModalVisible={setModalVisible}
                    selectedItem={selectedItem}
                ></PartInfo>
            )}
        </View>
    )
}

export default PartList;