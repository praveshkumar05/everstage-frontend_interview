
import axios from 'axios';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const CardCustom = () => {

    const [cardData, setCardData] = useState([]);

    const [nextLink, setNextLink] = useState(null);

    const [prevLink, setPrevLink] = useState(null);

    const [totalPage, setTotalPage] = useState(42);

    const navigate = useNavigate();



    useEffect(() => {
        axios.get("https://rickandmortyapi.com/api/character")
            .then((res) => {
                setNextLink(res.data.info.next);
                setPrevLink(res.data.info.prev);
                setCardData(res.data.results);
                setTotalPage(res.data.info.pages);
            })
            .catch((err) => console.log("error in fetching data", err));
    }, []);


    const handleClick = (page) => {

        axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((res) => {
                setNextLink(res.data.info.next);
                setPrevLink(res.data.info.prev);
                setCardData(res.data.results);
                setTotalPage(res.data.info.pages);
            })
            .catch((err) => console.log("error in fetching data", err));
    }
    const fetchPage = (whichPage) => {

        const commonLink = whichPage === "next" ? nextLink : prevLink;
        if (commonLink) {
            axios.get(commonLink)
                .then((res) => {
                    setNextLink(res.data.info.next);
                    setPrevLink(res.data.info.prev);
                    setCardData(res.data.results);
                })
                .catch((err) => console.log("error in fetching data", err));
        }
    }

    const handleClickMe = (id) => {
        // const id = e.target.key;

        navigate(`/blogs/${id}`)

    }


    return (
        <>
            {
                cardData.map((item) => {
                    return (
                        <>
                         <div class="grid">
                            <div className="g-col-4">

                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={item.image}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {item.species}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                                    <Typography variant="body2">
                                        {item.status}
                                        <br />

                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                            </div>
                           
                        </div>

                            
                        </>
                    )
                })
            }

            <span onClick={() => fetchPage("prev")} style={{ cursor: "pointer" }}>prev</span>

            {
                Array.from({ length: totalPage }, (_, index) => {
                    return (
                        <span
                            key={index + 1}
                            onClick={() => handleClick(index + 1)}
                        >
                            {`${index + 1} |`}
                        </span>
                    )
                })
            }

            <span onClick={() => fetchPage("next")} style={{ cursor: "pointer" }}>next</span>


        </>
    )

}
export default CardCustom;