"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";

export default function User(){
    const router = useRouter();
    return (
        <Container >
            <Box sx={{
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                marginTop: 5
                }}>
                <Image alt="user image" width={50} height={50} src={"/imgs/profiles/default.png"} />
                <Typography fontSize={20} sx={{marginLeft: 5}} fontWeight={"bold"}>
                    {JSON.parse(localStorage.getItem('user')).username}
                </Typography>
            </Box>
            <Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 5}}>
                    <Typography>
                        Create a new Blog
                    </Typography>
                    <Button onClick={() => {router.push("/blogs/add")}}>
                        <AddIcon />
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}