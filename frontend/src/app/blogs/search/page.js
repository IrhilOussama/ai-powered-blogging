'use client';
import { AppContext } from "@/app/home";
import LottieAnimation from "@/components/lottieAnimation";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

export default function Search(){
    const [question, setQuestion] = useState("");
    const [bottomNavValue, setBottomNavValue] = useContext(AppContext);
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        const getTitles = async () => {
            const data = await axios.get('http://100.97.112.28:8000/api/blogs?only=title');
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