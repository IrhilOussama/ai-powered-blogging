"use client";
import { Cookie } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Account(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", username);
        formData.append("email", email);
        formData.append("password", password);
        try{
            const data = await axios.post("http://localhost:8000/api/sign_in", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            let token = data.data['access_token'];
            console.log(data)
            // localStorage.setItem("token", token);
            Cookies.set('token', token, { expires: 7, secure: true });  // Cookie expires in 7 days
        }
        catch{
        }
        
    }
    console.log(Cookies.get("token"))
    return (
        <Container sx={{
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)",
            width: '80%'
        }}>
            <Typography color="textSecondary" variant="caption" gutterBottom>
                start your first blog and join us
            </Typography>
            <Typography fontSize={26} sx={{fontWeight: 'bold'}}>
                Sign In To Blagus
            </Typography>
            <Box component={'form'} onSubmit={handleFormSubmit} sx={{textAlign: "center"}}>
                <TextField fullWidth variant="outlined" size="small" label="username" type="text" margin="normal" required onChange={(e) => {
                    setUsername(e.target.value)
                }} />
                <TextField fullWidth variant="outlined" size="small" label="email" type="email" margin="normal" required onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <TextField fullWidth variant="outlined" size="small" label="password" type="password" margin="normal" required onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <Button type="submit" sx={{margin: '10px auto 20px'}} color="secondary" size="small" variant="contained">
                    Create an account
                </Button>
            </Box>
            <Typography fontSize={14} component="p">
                Don&apos;t have an account? 
                <Button sx={{fontSize: 14}} onClick={() => router.push("/account/sign_up")} color="primary" component="span"> Sign Up</Button>
            </Typography>
        </Container>
    )
}
