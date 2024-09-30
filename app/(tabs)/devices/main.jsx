import { useState, useEffect } from 'react';
import { FetchDeviceDataFromFirestore } from '../../../components/firebase/data'
import DeviceList from '../../../components/devices/deviceList';
import { View, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toggle from '../../../components/common/toggle';
import GlobalStyles from '../../../styles/styles';
import CreateDevice from '../../../components/create/createDevice';
import SearchBar from '../../../components/common/searchBar';
import { GetDevices } from '../../../components/api/devices';

const Devices = () => {

    const [showList, setShowList] = useState(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuerySnapShot, setLastQuerySnapshot] = useState(null);
    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        const data = await GetDevices();
        setData(data);
    };

    useEffect(() => {
        fetchData();
    }, [])



    toggleScreens = () => {
        setShowList(previousState => !previousState);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[GlobalStyles.safeAreaStyle, { marginTop: '10%' }]}>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '5%' }}>
                    <Toggle isActive={!showList} setIsActive={setShowList} titles={['Įranga', 'Naujas']} />
                </View>
                {showList &&
                    <View style={{ width: "90%", alignItems: 'flex-end', justifyContent: 'center', marginBottom: '2%' }}>
                        <SearchBar setSearchText={setSearchText} />
                    </View>
                }
                {showList ?
                    (
                        <DeviceList data={data} loading={loading} setLoading={setLoading} updateListData={fetchData}></DeviceList>
                    )
                    :
                    (
                        <CreateDevice updateListData={fetchData}></CreateDevice>
                    )
                }
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Devices;