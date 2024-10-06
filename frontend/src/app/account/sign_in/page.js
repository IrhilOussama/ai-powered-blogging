"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Account(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    // errors
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("Password must be at least 8 characters long.");

    useEffect(() => {
        if (isAuthenticated()){
            router.replace("/account/user");
        }
        else {
            setIsLoaded(true);
        }
    }, [router])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (password.length < 8) {
            setPasswordError(true);
            return;
        }
        else {
            setPasswordError(false);
        }
        setEmailError(false);
        try {
            const myForm = new FormData();
            myForm.append("email", email);
            myForm.append("password", password);
            const response = await axios.post("http://100.97.112.28:8000/api/login", myForm,{
                headers: {
                        'Content-Type': 'multipart/form-data',
                    },
            });
            if (response.status === 200){
                localStorage.setItem("user", JSON.stringify(response.data));
                    router.push("/account/user");
            }
        } catch (error) {
            console.error(error);
            if(error.response.data.message === 'email'){
                setEmailError(true);
                setEmailMessage("undefined email");
                setPasswordError(false);
            }
            else if (error.response.data.message === 'wrong password'){
                setPasswordError(true);
                setPasswordMessage("incorrect password");
                setEmailError(false);
            }
        }
    }

    if (isLoaded){
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

                <Box sx={{textAlign: "center"}} component={'form'} onSubmit={handleFormSubmit}>
                    <TextField error={emailError} helperText={emailError ? emailMessage : ""} fullWidth variant="outlined" size="small" label="email"  type="email" margin="normal" required onChange={event => {
                        setEmail(event.target.value)
                    }} />
                    <TextField error={passwordError} helperText={passwordError ? passwordMessage : ""} fullWidth variant="outlined" size="small" label="password" type="password" margin="normal" required onChange={event => {
                        setPassword(event.target.value);
                    }}  />
                    <Button type="submit" sx={{margin: '10px auto 20px'}} size="small" variant="contained">
                        Sign Up
                    </Button>
                </Box>
                
                <Typography fontSize={14} component="p">
                    Don&apos;t have an account? 
                    <Button sx={{fontSize: 14}} onClick={() => router.push("/account/sign_up")} color="primary" component="span"> Sign Up</Button>
                </Typography>
            </Container>
        )
    }
    else {
        return <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <CircularProgress/>
    </div> 
    }
}
