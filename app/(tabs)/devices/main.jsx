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
import { GetItemUpdates, DisconnectSockets } from '../../socket/sockets';
import { DEVICE_SOCKET_NAME } from '../../../constants';

const Devices = () => {

    const [showList, setShowList] = useState(true);
    const [data, setData] = useState([]);
    const devicesRef = useRef(data);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [lastCreatedDate, setLastCreatedDate] = useState(null);

    const fetchData = async (lastCreatedDate) => {
        const data = await GetDevices(lastCreatedDate);
        if (data.length > 0) {
            setData(currentData => lastCreatedDate ? [...currentData, ...data] : data);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        setLastCreatedDate(null);
        fetchData(null);
    }, [refreshing])

    useEffect(() => {
        if (lastCreatedDate !== null) {
            fetchData(lastCreatedDate);
        }
    }, [lastCreatedDate])

    useEffect(() => {
        GetItemUpdates(devicesRef.current, setData, DEVICE_SOCKET_NAME);

        return () => {
            DisconnectSockets();
        };

    }, [])

    useEffect(() => {
        devicesRef.current = data; //Keep ref updated without re-rendering
    }, [data]);

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
                        <DeviceList
                            data={data}
                            loading={loading}
                            setLoading={setLoading}
                            updateListData={fetchData}
                            refreshing={refreshing}
                            setRefreshing={setRefreshing}
                            setLastCreatedDate={setLastCreatedDate}
                        ></DeviceList>
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