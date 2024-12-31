'use client';
import { AppContext } from "@/app/home";
import LottieAnimation from "@/components/lottieAnimation";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Search(){
    const [question, setQuestion] = useState("");
    const [bottomNavValue, setBottomNavValue] = useContext(AppContext);
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        const getTitles = async () => {
            const data = await axios.get(API_URL + '/blogs?only=title');
            setTitles(data.data.map(titleObj => titleObj['title']))
        }
        getTitles();

    }, [])
    
    useEffect(() => {
        setBottomNavValue(1);
    }, [setBottomNavValue])

    function handleKeyDown(event){
        if (event.key === 'Enter'){
        }
    }

    return (
        <div className="w-fit mx-auto">
            <LottieAnimation />
            <Autocomplete
            onKeyDown={handleKeyDown}
                disablePortal
                options={titles}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search for Blogs" />}
            />
        </div>
    )
}