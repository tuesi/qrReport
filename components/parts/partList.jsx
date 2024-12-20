import { useState, useEffect } from 'react';
import { View, SectionList, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import PartRenderItem from './PartRenderListItem';
import PartSectionHeader from './PartSectionHeader';
import GlobalStyles from '../../styles/styles';
import PartInfo from '../modals/partInfo';

const PartList = ({ data, loading, handlePressSection, searchSections, refreshing, setRefreshing, expandedSections, setExpandedSections, changeExpandedSections }) => {

    const [lastSectionId, setLastSectionId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inSearch, setInSearch] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const [flatListHeight, setFlatListHeight] = useState(0);

    useEffect(() => {
        if (searchSections.length > 0) {
            changeExpandedSections(true);
            setInSearch(true);
        } else if (inSearch) {
            changeExpandedSections(false);
            setInSearch(false);
        }
    }, [searchSections])

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleRefresh = async () => {
        setRefreshing(true);
    }

    const renderSectionContent = (section) => {
        if (!expandedSections[section.id]) return null;

        return (
            <FlatList
                data={section.data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => PartRenderItem({ item, setSelectedItem, setModalVisible })}
                onEndReached={() => handlePressSection(section.id, true)}
                onEndReachedThreshold={0.5}
            />
        );
    }

    return (
        <View style={GlobalStyles.container}>
            {data && data.length > 0 && (
                <View style={{ flex: 1, width: '100%' }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item: section }) => (
                            <View>
                                {PartSectionHeader({ section, toggleSection, expandedSections, setLastSectionId, handlePressSection })}
                                {renderSectionContent(section)}
                            </View>
                        )}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                </View>
            )}
        </View>
    )
}

export default PartList;