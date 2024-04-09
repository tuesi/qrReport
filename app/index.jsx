import { useState, useEffect, useRef } from 'react';
import Auth from '../components/firebase/auth';
import { FetchDataFromFirestore } from '../components/firebase/data'
import List from '../components/index/list';

const Home = () => {

    const [data, setData] = useState([]);
    const [startAfterDate, setStartAfter] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let fetchUnsubscribe;

        const signInAndFetchData = async () => {
            await Auth();
            fetchUnsubscribe = await FetchDataFromFirestore(({ setData, pageSize: 10, startAfterDate, setLoading }));
        };

        signInAndFetchData();
    }, [startAfterDate])

    return (
        <List data={data} setStartAfter={setStartAfter} loading={loading} setLoading={setLoading}></List>
    )
}

export default Home;