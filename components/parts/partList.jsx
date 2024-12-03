import { useState, useEffect } from 'react';
import { View, SectionList, ActivityIndicator } from 'react-native';
import PartRenderItem from './PartRenderListItem';
import PartDeviceRenderItem from './PartDeviceRenderListItem';
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

    return (
        <View style={GlobalStyles.container}>
            {data && data.length > 0 && (
                <View style={{ flex: 1, width: '100%' }}>
                    <SectionList
                        sections={data.map(section => ({
                            ...section,
                            data: expandedSections[section.id] ? section.data : []
                        }))}
                        keyExtractor={(item, index) => item._id + index}
                        renderItem={({ item }) => PartRenderItem({ item, setSelectedItem, setModalVisible })}
                        renderSectionHeader={({ section }) => PartDeviceRenderItem({ section, toggleSection, expandedSections, setLastSectionId, handlePressSection })}
                        ListFooterComponent={() => {
                            if (loading) return <ActivityIndicator size="large" />;
                            return null;
                        }}
                        onEndReached={() => {
                            if (contentHeight > flatListHeight && expandedSections[lastSectionId]) {
                                handlePressSection(lastSectionId, true);
                            }
                        }}
                        onEndReachedThreshold={0.5}
                        contentContainerStyle={{ paddingBottom: 80 }}

                        refreshing={refreshing}
                        onRefresh={handleRefresh}

                        onContentSizeChange={(contentWidth, contentHeight) => setContentHeight(contentHeight)}
                        onLayout={({ nativeEvent }) => {
                            const { height } = nativeEvent.layout;
                            setFlatListHeight(height);
                        }}
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