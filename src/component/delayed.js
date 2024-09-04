import axios from "axios";
import { useEffect, useState } from "react"
import {  useParams } from 'react-router-dom';


export const Delayed = () => {

    const [detailedCardData, setDetailedCardData] = useState({});

    const {id} = useParams();
    useEffect(() => {
        
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => setDetailedCardData(res.data))
        .catch((err) => console.log("error in fetching data", err));

    }, []);


    return (
        <>
           <h3> {detailedCardData.name}</h3>
        </>
    )
}

