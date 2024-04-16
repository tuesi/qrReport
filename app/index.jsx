import { useState, useEffect, useRef } from 'react';
import { FetchDataFromFirestore } from '../components/firebase/data'
import List from '../components/index/list';

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
        <List data={data} loading={loading} setLoading={setLoading} setSearchText={setSearchText}></List>
    )
}

export default Home;