"use client";
import { Button, Container, Input, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function AddBlog(){
    const [blogTitle, setBlotTitle] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    
    

    async function handlePublichBtn(){
        // const myUrl = ""
    }

    return(
        <Container sx={{textAlign: "center"}} >
            <Typography fontSize={22} fontWeight={600} sx={{margin: "20px 0 40px"}}>
                Create a new Blog
            </Typography>
            <Input autoFocus color="primary" placeholder="blog title" required onChange={(e) => setBlotTitle(e.target.value)} />
            <Input multiline minRows={6} disableUnderline placeholder="type what are you thing of" onChange={(e) => setBlogDescription(e.target.value)} sx={{
                marginTop: 7,
                marginBottom: 5,
                borderLeft: "1px solid #ddd",
                borderBottom: "1px solid #ddd",
                borderRight: "1px solid #ddd",
                padding: 3,
                display: "block",
                fontSize: 14
            }} />
            <Button color="secondary" variant="contained" sx={{fontSize: 12}} onClick={handlePublichBtn}>
                Publish
            </Button>
        </Container>
    )
}