'use client';
import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/auth";
import axios from "axios";


export default function Account(){
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // errors 
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("Password must be at least 8 characters long.");
    const [emailMessage, setEmailMessage] = useState("this email is already in use");
    const [nameMessage, setNameMessage] = useState("Username must be at least 8 characters long.");

    
    useEffect(() => {
        if (isAuthenticated()){
            router.replace("/account/oussama");
        }
        else {
            setIsLoaded(true);
        }
    }, [router])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (username.length < 8) {
            setNameError(true);
            return;
        }
        setNameError(false);
        if (password.length < 8) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        setEmailError(false);

        const formData = new FormData();
        formData.append("name", username);
        formData.append("email", email);
        if (password.length < 8) {
            setPasswordError(true);
            return;
        }
        formData.append("password", password);
        try{
            const data = await axios.post("http://localhost:8000/api/sign_in", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            let token = data.data['access_token'];
            let username = data.data['username'];
            let email = data.data['email'];
            let user = {
                username: username,
                token: token,
                email: email,
                // isAuthenticated: true
            }
            localStorage.setItem("user", JSON.stringify(user));
            router.push('/account/user');
            // Cookies.set('token', token, { expires: 7, secure: true });  // Cookie expires in 7 days
        }
        catch(error){
            switch(error.response.data.message){
                case "email":
                    setEmailError(true);
                    break;
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
                    start your first blog
                </Typography>
                <Typography fontSize={26} sx={{fontWeight: 'bold'}}>
                    Sign Up To Blagus
                </Typography>
                <Box component={'form'} onSubmit={handleFormSubmit} sx={{textAlign: "center"}}>
                    <TextField error={nameError} helperText={nameError ? nameMessage : ''} fullWidth variant="outlined" size="small" label="username" type="text" margin="normal" required onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <TextField error={emailError} helperText={emailError ? emailMessage : ''} fullWidth variant="outlined" size="small" label="email" type="email" margin="normal" required onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <TextField error={passwordError} helperText={passwordError ? passwordMessage : ""} fullWidth variant="outlined" size="small" label="password" type="password" margin="normal" required onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <Button type="submit" sx={{margin: '10px auto 20px'}} color="secondary" size="small" variant="contained">
                        Create an account
                    </Button>
                </Box>
                <Typography fontSize={14} component="p">
                    Have an accound?
                    <Button sx={{fontSize: 14}}  color="primary" component="span" onClick={() => router.push("/account/sign_in")}>Sign In</Button>
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
