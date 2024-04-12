import { useState, useEffect, useRef } from 'react';
import { FetchDeviceDataFromFirestore } from '../components/firebase/data'
import DeviceList from '../components/devices/deviceList';

const Devices = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuerySnapShot, setLastQuerySnapshot] = useState(null);

    useEffect(() => {
        const signInAndFetchData = async () => {
            await FetchDeviceDataFromFirestore(({ setData, pageSize: 10, lastQuerySnapShot, setLastQuerySnapshot, setLoading }));
        };

        signInAndFetchData();
    }, [loading])

    return (
        <DeviceList data={data} loading={loading} setLoading={setLoading}></DeviceList>
    )
}

export default Devices;