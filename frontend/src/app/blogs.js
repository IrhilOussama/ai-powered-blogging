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

function MyCard({variant, id, categorie, title, text, image}){
  const router = useRouter();
  return (
    <Card variant={variant}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {categorie}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2">
            {text}
          </Typography>
        </CardContent>
        <CardMedia
            sx={{ height: 200 }}
            image={"http://localhost:8000/storage/" + image}
            title="green iguana"
        />
      </CardActionArea>

      <CardActions>
      <Button onClick={() => router.push("/blogs/" + id)} variant={"outlined"} size="small">Learn More</Button>
      <Button variant={"outlined"} size="small">share</Button>
      </CardActions>
    </Card>
  )
}

function OutlinedCard({id, categorie, title, text, image}) {
  return (
    <Box sx={{ minWidth: 275, marginBottom: 5 }}>
      <MyCard id={id} variant="outlined" categorie={categorie} title={title} text={text} image={image} />
    </Box>
  );
}



export default function Blogs() {

  const [blogs, setBlogs] = useState([]);
  const url = "http://localhost:8000/api/blogs";

  const fetchBlogs = async () => {
      const data = await axios.get(url);

      setBlogs(data.data);
  }

  useEffect(() => {
      fetchBlogs();
  }, [])

  const cardsNode = blogs.map((blog, i) => {
    return <OutlinedCard key={i} id={blog.id} categorie={blog['categorie_title']} text={blog.description} image={blog.image} />
  })
  return (
    <Container maxWidth="xs">
        <Suspense fallback={
            <div>
                aaaa
            </div>
        }>
        {cardsNode}

        </Suspense>
    </Container>
  )
}