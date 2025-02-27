"use client";
import NotFound from "@/app/not-found";
import { CircularProgress, generateUtilityClass, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import axios from "axios";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Blog({params}){
    const id = params.blog;
    const [status, setStatus] = useState('waiting');
    const [myBlog, setMyBlog] = useState({});
    
    useEffect(() => {
        const getBlog = async () => {
            try{
                const data = await axios.get(API_URL + "/blogs/" + id);
                setMyBlog(data.data);
                setStatus("success");
            }
            catch(error){
                setStatus("not_found");
            }
        }
        getBlog();
    }, [id]);

    if (status === 'success'){
        return(
            <Suspense fallback={
                <div>
                    Loading
                </div>
                }>
                    
                <Container>
                    <Typography variant="body1" color="success" >
                    {myBlog['categorie_title']}
                    </Typography>

                    <Typography variant="h4" component="h1" gutterBottom >
                    {myBlog.title}
                    </Typography>

                    <Typography >
                    {myBlog.description}
                    </Typography>
                    <div style={{height: "300px" ,position: "relative"}}>
                        <Image
                            src ={API_URL + "/blogs/images/" + myBlog.image.split(".")[0] + ".webp"}
                            onError={(e) => {
                                e.target.error = false;
                                e.target.src =API_URL + "/blogs/backup-images/" + myBlog.image
                            }}

                            fill sizes="100vw" alt="blog image" 
                            style={{objectFit: "contain"}} />
                    </div>
                    <Typography>
                        By {myBlog.name}
                    </Typography>
                </Container>
            </Suspense>
        )
    }            
    else if (status === 'waiting') {
        return <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <CircularProgress/>
      </div> 
    }
    else if(status === 'not_found'){
        return <NotFound />
    }
}