import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function Account(){


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
            <Box sx={{textAlign: "center"}}>
                <TextField fullWidth variant="outlined" size="small" label="username" type="text" margin="normal" required />
                <TextField fullWidth variant="outlined" size="small" label="email" type="email" margin="normal" required />
                <TextField fullWidth variant="outlined" size="small" label="password" type="password" margin="normal" required  />
                <Button sx={{margin: '10px auto 20px'}} color="secondary" size="small" variant="contained">
                    <Link href={"/account/user"}>Create an account</Link>
                    </Button>
            </Box>
            <Typography fontSize={14} component="p">
                Don&apos;t have an account? 
                <Typography fontSize={14} color="primary" component="span"> <Link href={"/account/sign_up"}> Sign Up </Link> </Typography>
            </Typography>
        </Container>
    )
}
