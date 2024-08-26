import { useState, useEffect, useRef } from 'react';
import { GetAllPartDevices, FetchPartsDataFromFirestore } from '../../../components/firebase/data'
import PartList from '../../../components/parts/partList';
import { View, SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CreatePart from '../../../components/parts/createPart';
import Toggle from '../../../components/common/toggle';
import styles from '../../../styles/styles';

const Devices = () => {

    const [showList, setShowList] = useState(true);
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sectionId, setSectionId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedSections = await GetAllPartDevices();
                const sectionData = fetchedSections.map(section => ({
                    id: section.value,
                    isPartsLow: section.label[1],
                    title: section.label[0],
                    data: [],
                    initialLoad: false,
                    lastQuerySnapShot: null,
                    hasMoreItems: true,
                }));
                setData(sectionData);
            } catch (error) {
                console.log('Failed to fetch device name list', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const handlePressSection = async (sectionId) => {
        const index = data.findIndex(s => s.id === sectionId);
        if (index === -1) return;
        await FetchPartsDataFromFirestore(({ deviceId: sectionId, setItems: updateSectionWithData, setData, pageSize: 10, lastQuerySnapShot: data[index].lastQuerySnapShot }));
    };

    const updateSectionWithData = ({ items, lastQuerySnapShot }) => {
        if (items.length > 0) {
            const index = data.findIndex(s => s.id === items[0].deviceId);
            if (index === -1) return;
            const newSections = [...data];
            newSections[index] = {
                ...newSections[index],
                data: newSections[index].initialLoad ? [...newSections[index].data, ...items] : items,
                initialLoad: true,
                lastQuerySnapShot: lastQuerySnapShot
            };
            setData(newSections);
            setLoading(false);
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
                {showList ?
                    (
                        <PartList data={data} loading={loading} setLoading={setLoading} handlePressSection={handlePressSection}></PartList>
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