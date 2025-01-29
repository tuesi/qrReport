import { useState, useEffect, useRef } from 'react';
import PartList from '../../../components/parts/partList';
import { View, SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CreatePart from '../../../components/parts/createPart';
import Toggle from '../../../components/common/toggle';
import GlobalStyles from '../../../styles/styles';
import SearchBar from '../../../components/common/searchBar';
import { GetAllPartDevices, GetParts } from '../../../components/api/parts';

const Devices = () => {

    const [expandedSections, setExpandedSections] = useState({});
    const [showList, setShowList] = useState(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [sections, setSections] = useState([]);
    const [searchSections, setSearchSections] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedSections = await GetAllPartDevices();
                const sectionData = fillAvailableSections(fetchedSections);
                setSections(sectionData);
                setData(sectionData);
                changeExpandedSections(false);
            } catch (error) {
                console.log('Failed to fetch device name list', error);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        };
        fetchData();
    }, [refreshing])


    //TODO when stoped searching close all opened sections (now if you search again the section just closes because it was opened on first search)
    // useEffect(() => {
    //     const getSeachResults = async () => {
    //         if (searchText !== '' && searchText !== null) {
    //             await FetchPartsDataFromFirestore(({ deviceId: null, setItems: updateSectionWithData, setData, pageSize: 10, lastQuerySnapShot: null, searchText }));
    //         } else {
    //             setSearchSections([]);
    //             setData(sections);
    //         }
    //     };
    //     getSeachResults();
    // }, [searchText])

    const changeExpandedSections = (state) => {
        const updatedSections = {};
        Object.keys(expandedSections).forEach(key => {
            updatedSections[key] = state;
        });
        setExpandedSections(updatedSections);
    }

    const handlePressSection = async (sectionId, loadMore) => {
        const index = data.findIndex(s => s.id === sectionId);
        if (index === -1 || (searchText !== '' && searchText !== null)) return;

        if (!loadMore && data[index].data.length > 0) return;

        const partData = await GetParts(sectionId, data[index].lastCreatedDate);
        updateSectionWithData(partData, partData[partData.length - 1].created, false);
    };

    const fillAvailableSections = (fetchedSections) => {
        return fetchedSections.map(section => ({
            id: section.value,
            isPartsLow: section.label.hasLowAmount,
            title: section.label.name,
            data: [],
            lastCreatedDate: null,
            hasMoreItems: true,
            isSearch: false
        }));
    }

    const updateSectionWithData = (items, lastCreatedDate, isSearch) => {
        if (items.length > 0) {
            //when is search i need to only show sections that are in the items
            if (isSearch) {
                const newSections = [...sections];
                items.forEach(item => {
                    const index = sections.findIndex(s => s.id === item.deviceId);
                    if (index === -1) return;
                    newSections[index] = {
                        ...newSections[index],
                        data: newSections[index].isSearch ? [...newSections[index].data, item] : [item],
                        lastCreatedDate: lastCreatedDate,
                        isSearch: true
                    };
                });

                //Show only sections with data when searching
                const filteredSections = newSections.filter(section => section.data.length > 0);
                //Set sections to be opened when searching
                const sectionIds = filteredSections.map(section => section.id);
                setSearchSections(sectionIds);
                setData(filteredSections);
                setLoading(false);
                return;
            } else {
                const index = data.findIndex(s => s.id === items[0].deviceId);
                if (index === -1) return;
                const newSections = [...data];
                newSections[index] = {
                    ...newSections[index],
                    data: newSections[index].lastCreatedDate ? [...newSections[index].data, ...items] : items,
                    lastCreatedDate: lastCreatedDate,
                    isSearch: false
                };
                setSearchSections([]);
                setData(newSections);
                setLoading(false);
            }
        }
    }

    toggleScreens = () => {
        setShowList(previousState => !previousState);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[GlobalStyles.safeAreaStyle, { marginTop: '10%' }]}>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '5%' }}>
                    <Toggle isActive={!showList} setIsActive={setShowList} titles={['Dalys', 'Naujas']} />
                </View>
                {showList &&
                    <View style={{ width: "90%", alignItems: 'flex-end', justifyContent: 'center', marginBottom: '2%' }}>
                        <SearchBar setSearchText={setSearchText} />
                    </View>
                }
                {showList ?
                    (
                        <PartList
                            partData={data}
                            loading={loading}
                            setLoading={setLoading}
                            handlePressSection={handlePressSection}
                            searchSections={searchSections}
                            refreshing={refreshing}
                            setRefreshing={setRefreshing}
                            setSections={setSections}
                            expandedSections={expandedSections}
                            setExpandedSections={setExpandedSections}
                            changeExpandedSections={changeExpandedSections}
                        >
                        </PartList>
                    )
                    :
                    (
                        <CreatePart></CreatePart>
                    )
                }
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Devices;