import { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import List from '../../components/index/list';
import { SetNotifications } from '../../components/notifications/setNotifications';
import { ActivityIndicator } from 'react-native';
import { GetReports } from '../../components/api/reports';
import { GetItemUpdates, DisconnectSockets } from '../socket/sockets';
import { REPORT_SOCKET_NAME } from '../../constants';

const Home = () => {
    const [data, setData] = useState([]);
    const reportsRef = useRef(data);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [lastCreatedDate, setLastCreatedDate] = useState(null);

    const fetchData = async (lastCreatedDate) => {
        const data = await GetReports(lastCreatedDate);
        if (data.length > 0) {
            setData(currentData => lastCreatedDate ? [...currentData, ...data] : data);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        const appInit = async () => {
            //await Auth();
            await SetNotifications();
        };
        appInit();

        GetItemUpdates(reportsRef.current, setData, REPORT_SOCKET_NAME);

        return () => {
            DisconnectSockets();
        };

    }, [])

    useEffect(() => {
        setLastCreatedDate(null);
        fetchData(null);
    }, [refreshing, triggerUpdate])

    useEffect(() => {
        if (lastCreatedDate !== null) {
            fetchData(lastCreatedDate);
        }
    }, [lastCreatedDate])

    useEffect(() => {
        reportsRef.current = data; //Keep ref updated without re-rendering
    }, [data]);

    return (
        <View style={{ flex: 1 }}>
            <List
                data={data}
                loading={loading}
                setLoading={setLoading}
                setSearchText={setSearchText}
                refreshing={refreshing}
                setRefreshing={setRefreshing}
                setLastCreatedDate={setLastCreatedDate}>
            </List>
            {!data || data.length == 0 && (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'start'
                }}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    )
}

export default Home;