import { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { FetchDataFromFirestore } from '../../components/firebase/data'
import List from '../../components/index/list';
import User from '../../components/common/user';

const Home = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuerySnapShot, setLastQuerySnapshot] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const signInAndFetchData = async () => {
            await FetchDataFromFirestore(({ setData, pageSize: 10, lastQuerySnapShot, setLastQuerySnapshot, setLoading, searchText }));
        };

        signInAndFetchData();
    }, [loading, searchText])

    return (
        <View style={{ flex: 1 }}>
            <User></User>
            <List data={data} loading={loading} setLoading={setLoading} setSearchText={setSearchText}></List>
        </View>
    )
}

export default Home;