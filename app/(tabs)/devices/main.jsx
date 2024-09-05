import { useState, useEffect, useRef } from 'react';
import { FetchDeviceDataFromFirestore } from '../../../components/firebase/data'
import DeviceList from '../../../components/devices/deviceList';
import { View, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toggle from '../../../components/common/toggle';
import styles from '../../../styles/styles';
import CreateDevice from '../../../components/create/createDevice';
import SearchBar from '../../../components/common/searchBar';

const Devices = () => {

    const [showList, setShowList] = useState(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuerySnapShot, setLastQuerySnapshot] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const signInAndFetchData = async () => {
            await FetchDeviceDataFromFirestore(({ setData, pageSize: 10, lastQuerySnapShot, setLastQuerySnapshot, setLoading, searchText }));
        };

        signInAndFetchData();
    }, [loading, searchText])

    toggleScreens = () => {
        setShowList(previousState => !previousState);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[styles.safeAreaStyle, { marginTop: '10%' }]}>
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
                        <DeviceList data={data} loading={loading} setLoading={setLoading}></DeviceList>
                    )
                    :
                    (
                        <CreateDevice></CreateDevice>
                    )
                }
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Devices;