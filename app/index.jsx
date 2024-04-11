import { useState, useEffect, useRef } from 'react';
import Auth from '../components/firebase/auth';
import { FetchDataFromFirestore } from '../components/firebase/data'
import List from '../components/index/list';

const Home = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastQuerySnapShot, setLastQuerySnapshot] = useState(null);

    useEffect(() => {
        const signInAndFetchData = async () => {
            await Auth();
            await FetchDataFromFirestore(({ setData, pageSize: 10, lastQuerySnapShot, setLastQuerySnapshot, setLoading }));
        };

        signInAndFetchData();
    }, [loading])

    return (
        <List data={data} loading={loading} setLoading={setLoading}></List>
    )
}

export default Home;