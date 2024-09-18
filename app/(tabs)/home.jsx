import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { FetchDataFromFirestore, FetchSearchDataFromFirestore } from '../../components/firebase/data'
import List from '../../components/index/list';
import { Auth } from "../../components/firebase/auth";
import { SetNotifications } from '../../components/notifications/setNotifications';
import { ActivityIndicator } from 'react-native';

const Home = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [lastQuerySnapShot, setLastQuerySnapshot] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [lastSearchText, setLastSearchText] = useState('');
    const [lastSearchQuerySnapShot, setLastSearchQuerySnapshot] = useState(null);
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        const appInit = async () => {
            await Auth();
            await SetNotifications();
        };

        appInit();

    }, [])

    useEffect(() => {
        const signInAndFetchData = async () => {
            await FetchDataFromFirestore(({ setData, pageSize: 10, lastQuerySnapShot, setLastQuerySnapshot, setLoading }));
        };

        signInAndFetchData();
    }, [loading])

    useEffect(() => {
        const fetchSearchData = async () => {
            if (searchText != lastSearchText) {
                setLastSearchQuerySnapshot(null);
                setLastSearchText(searchText);
            }
            await FetchSearchDataFromFirestore(({ setSearchData, pageSize: 5, lastSearchQuerySnapShot, setLastSearchQuerySnapshot, searchText }));
        };

        fetchSearchData();
    }, [searchLoading, searchText])

    return (
        <View style={{ flex: 1 }}>
            <List data={searchText ? searchData : data} loading={loading} setLoading={searchText ? setSearchLoading : setLoading} setSearchText={setSearchText}></List>
            {data.length == 0 && (
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