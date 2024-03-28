import { useState, useEffect, useRef } from 'react';
import Auth from '../components/firebase/auth';
import { FetchDataFromFirestore } from '../components/firebase/data'
import List from '../components/index/list';

const Home = () => {

    const [data, setData] = useState([]);
    const [startAfterItem, setStartAfter] = useState(null);

    const isMounted = useRef(true);
    const unsubscribe = useRef(null);

    const signInAndFetchData = async () => {
        await Auth();
        if (isMounted.current) {
            unsubscribe.current = await FetchDataFromFirestore(({ setData, pageSize: 10, startAfterItem }));
        }
    };

    useEffect(() => {
        signInAndFetchData();
    }, [startAfterItem])

    return (
        <List data={data} setStartAfter={setStartAfter}></List>
    )
}

export default Home;