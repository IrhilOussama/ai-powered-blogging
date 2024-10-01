"use client";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

export default function Blog({params}){
    const id = params.blog;
    const [myBlog, setMyBlog] = useState({id: 0});

    const getBlog = async () => {
        const response = await fetch("/json/blogs.json");
        const blogs = await response.json();
        let blog;
        blogs.forEach(b =>{
            if (b.id == id) blog = b;
        });
        setMyBlog(blog);
    }

    useEffect(() => {
        getBlog();
    }, [])

    // if (myBlog.id !== 0){
        return(

            <Suspense fallback={
                <div>
                    Loading
                </div>
                }>
                    
                <Container>
                    <Typography variant="body1" color="success" >
                    {myBlog.categorie}
                    </Typography>

                    <Typography variant="h4" component="h1" gutterBottom >
                    {myBlog.title}
                    </Typography>

                    <Typography >
                    {myBlog.text}
                    </Typography>
                    <div style={{height: "300px" ,position: "relative"}}>
                        <Image src ={"/imgs/" + myBlog.image} fill sizes="100vw" alt="blog image" style={{objectFit: "contain"}} />
                    </div>
                </Container>
            </Suspense>
        )
    // }            
    // else {
    //     return(
    //         <div>
    //             wait a moment...
    //         </div>
            
    //     )
    // }
}