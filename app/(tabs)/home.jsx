import { useState, useEffect } from 'react';
import { View } from 'react-native';
import List from '../../components/index/list';
import { Auth } from "../../components/firebase/auth";
import { SetNotifications } from '../../components/notifications/setNotifications';
import { ActivityIndicator } from 'react-native';
import { GetReports } from '../../components/api/reports';
import { useSelector, useDispatch } from 'react-redux';
import { reportTriggerReset } from '../../store';

const Home = () => {

    const dispatch = useDispatch();
    const triggerUpdate = useSelector((state) => state.report.triggerUpdate);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        const data = await GetReports();
        setData(data);
        setRefreshing(false);
    };

    useEffect(() => {
        const appInit = async () => {
            await Auth();
            await SetNotifications();
        };

        appInit();

    }, [])

    useEffect(() => {
        console.log('useEffect');
        fetchData();
        dispatch(reportTriggerReset);
    }, [refreshing, triggerUpdate])

    return (
        <View style={{ flex: 1 }}>
            <List data={data} loading={loading} setLoading={setLoading} setSearchText={setSearchText} refreshing={refreshing} setRefreshing={setRefreshing} updateListData={fetchData}></List>
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