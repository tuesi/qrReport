import { useState, useEffect } from 'react';
import { View, SectionList, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import PartRenderItem from './PartRenderListItem';
import PartSectionHeader from './PartSectionHeader';
import GlobalStyles from '../../styles/styles';
import PartInfo from '../modals/partInfo';

const PartList = ({ partData, loading, handlePressSection, searchSections, refreshing, setRefreshing, expandedSections, setExpandedSections, changeExpandedSections }) => {

    const [lastSectionId, setLastSectionId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inSearch, setInSearch] = useState(false);
    const [stickyHeaderIndices, setStickyHeaderIndices] = useState([]);

    useEffect(() => {
        if (searchSections.length > 0) {
            changeExpandedSections(true);
            setInSearch(true);
        } else if (inSearch) {
            changeExpandedSections(false);
            setInSearch(false);
        }
    }, [searchSections])

    useEffect(() => {
        const parsedData = parseData(partData);
        const headerIndices = parsedData.reduce((acc, item, index) => {
            if (item.title && expandedSections[item.id]) acc.push(index);
            return acc;
        }, []);
        setStickyHeaderIndices(headerIndices);
    }, [partData, parseData, expandedSections]);

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleRefresh = async () => {
        setRefreshing(true);
    }

    const renderSectionContent = ({ section }) => {
        if (!expandedSections[section.deviceId]) return null;

        return (
            <FlatList
                data={section.data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => PartRenderItem({ item, setSelectedItem, setModalVisible })}
                onEndReached={() => { handlePressSection(section.deviceId, true); console.log('end reached'); }}
                onEndReachedThreshold={0.5}
            />
        );
    }

    const renderItems = ({ item }) => {
        if (item.id) {
            return PartSectionHeader({ section: item, toggleSection, expandedSections, setLastSectionId, handlePressSection })
        }
        return renderSectionContent({ section: item });
    }

    const parseData = (partData) => {
        const parsed = partData.flatMap((item) => {
            const { data: itemData, id, ...rest } = item;
            return [{ id, ...rest }, { _id: `subItem-${id}`, deviceId: id, data: itemData || [] }];
        });
        return parsed;
    };

    return (
        <View style={GlobalStyles.container}>
            {partData && partData.length > 0 && (
                <View style={{ flex: 1, width: '100%' }}>
                    <FlatList
                        data={parseData(partData)}
                        keyExtractor={(item) => item.id || item._id}
                        renderItem={renderItems}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        stickyHeaderIndices={stickyHeaderIndices}
                    />
                    {modalVisible && (
                        <PartInfo
                            setModalVisible={setModalVisible}
                            selectedItem={selectedItem}
                        ></PartInfo>
                    )}
                </View>
            )}
        </View>
    )
}

export default PartList;