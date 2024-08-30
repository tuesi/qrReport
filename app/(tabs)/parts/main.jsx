import { useState, useEffect, useRef } from 'react';
import { GetAllPartDevices, FetchPartsDataFromFirestore } from '../../../components/firebase/data'
import PartList from '../../../components/parts/partList';
import { View, SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CreatePart from '../../../components/parts/createPart';
import Toggle from '../../../components/common/toggle';
import styles from '../../../styles/styles';
import SearchBar from '../../../components/common/searchBar';

const Devices = () => {

    const [showList, setShowList] = useState(true);
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sectionId, setSectionId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [sections, setSections] = useState([]);
    const [searchSections, setSearchSections] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedSections = await GetAllPartDevices();
                const sectionData = fillAvailableSections(fetchedSections);
                setSections(sectionData);
                setData(sectionData);
            } catch (error) {
                console.log('Failed to fetch device name list', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])


    //TODO when stoped searching close all opened sections (now if you search again the section just closes because it was opened on first search)
    useEffect(() => {
        const getSeachResults = async () => {
            if (searchText !== '' && searchText !== null) {
                await FetchPartsDataFromFirestore(({ deviceId: null, setItems: updateSectionWithData, setData, pageSize: 10, lastQuerySnapShot: null, searchText }));
            } else {
                setData(sections);
            }
        };
        getSeachResults();
    }, [searchText])

    const handlePressSection = async (sectionId) => {
        const index = data.findIndex(s => s.id === sectionId);
        if (index === -1 || (searchText !== '' && searchText !== null)) return;
        await FetchPartsDataFromFirestore(({ deviceId: sectionId, setItems: updateSectionWithData, setData, pageSize: 10, lastQuerySnapShot: data[index].lastQuerySnapShot, searchText: null }));
    };

    const fillAvailableSections = (fetchedSections) => {
        return fetchedSections.map(section => ({
            id: section.value,
            isPartsLow: section.label[1],
            title: section.label[0],
            data: [],
            initialLoad: false,
            lastQuerySnapShot: null,
            hasMoreItems: true,
            isSearch: false
        }));
    }

    const updateSectionWithData = ({ items, lastQuerySnapShot, isSearch }) => {
        if (items.length > 0) {
            //when is search i need to only show sections that are in the items
            if (isSearch) {
                const newSections = sections;
                items.forEach(item => {
                    const index = sections.findIndex(s => s.id === item.deviceId);
                    if (index === -1) return;
                    newSections[index] = {
                        ...newSections[index],
                        data: items,
                        initialLoad: false,
                        lastQuerySnapShot: lastQuerySnapShot,
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
                    data: newSections[index].initialLoad ? [...newSections[index].data, ...items] : items,
                    initialLoad: true,
                    lastQuerySnapShot: lastQuerySnapShot,
                    isSearch: false
                };
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
            <SafeAreaView style={[styles.safeAreaStyle, { marginTop: '10%' }]}>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '5%' }}>
                    <Toggle isActive={!showList} setIsActive={setShowList} titles={['Dalys', 'Naujas']} />
                </View>
                <View style={{ width: "90%", alignItems: 'flex-end', justifyContent: 'center', marginBottom: '2%' }}>
                    <SearchBar setSearchText={setSearchText} />
                </View>
                {showList ?
                    (
                        <PartList data={data} loading={loading} setLoading={setLoading} handlePressSection={handlePressSection} searchSections={searchSections}></PartList>
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