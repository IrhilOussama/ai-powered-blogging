"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea, CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Facebook } from '@mui/icons-material';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function MyCard({variant, id, categorie, title, text, image, author_name}){
  const router = useRouter();
  
  const shareMenu = async () => {
  //   await navigator.share({
  //     title: title,    // Blog title
  //     text: text,      // Blog text or description
  //     url: "/localhost:8000",        // Blog URL
  // });
  }

  return (
    <Card variant={variant}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {categorie}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            {title.substring(0, 20)}
          </Typography>
          <Typography variant="body2">
            {text.substring(0, 300)}...
          </Typography>
        </CardContent>
        <CardMedia
            component={"img"}
            sx={{ height: 200 }}
            src={API_URL + "/blogs/images/" + image.split(".")[0] + ".webp"}
            title="green iguana"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop in case backup URL also fails
              e.target.src = API_URL + "/blogs/backup-images/" + image;
          }}
        />
      </CardActionArea>

      <CardActions>
      <Button onClick={() => router.push("/blogs/" + id)} variant={"outlined"} size="small">Learn More</Button>
      <Button variant={"outlined"} onClick={() => {shareMenu()}} size="small">share<Facebook/> </Button>
      <Typography variant="body2">
        By {author_name}
      </Typography>
      </CardActions>
    </Card>
  )
}

function OutlinedCard({id, categorie, title, text, image, author_name}) {
  return (
    <Box sx={{ minWidth: 275, marginBottom: 5 }}>
      <MyCard id={id} variant="outlined" categorie={categorie} title={title} text={text} image={image} author_name={author_name} />
    </Box>
  );
}



export default function Blogs() {

  const [blogs, setBlogs] = useState([]);
  const url = API_URL + "/blogs";

  
  useEffect(() => {
    const fetchBlogs = async () => {
        const data = await axios.get(url);
        setBlogs(data.data);
    }
      fetchBlogs();
  }, [])

  const cardsNode = blogs.map((blog, i) => {
    return <OutlinedCard key={i} id={blog.id} title={blog.title} categorie={blog['categorie_title']} text={blog.description} image={blog.image} author_name={blog.name} />
  })
  return (
    <Container maxWidth="xs">
        <Suspense fallback={
            <div>
                loading blogs
            </div>
        }>
        {cardsNode}

        </Suspense>
    </Container>
  )
}