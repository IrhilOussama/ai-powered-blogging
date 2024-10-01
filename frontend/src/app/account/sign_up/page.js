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
                start your first blog
            </Typography>
            <Typography fontSize={26} sx={{fontWeight: 'bold'}}>
                Sign Up To Blagus
            </Typography>
            <Box sx={{textAlign: "center"}}>
                <TextField fullWidth variant="outlined" size="small" label="email" type="email" margin="normal" required />
                <TextField fullWidth variant="outlined" size="small" label="password" type="password" margin="normal" required  />
                <Button sx={{margin: '10px auto 20px'}} size="small" variant="contained">
                    <Link href={"/account/user"}>Sign Up</Link>
                </Button>
            </Box>
            <Typography fontSize={14} component="p">
                Have an accound?
                <Typography fontSize={14} color="primary" component="span"> <Link href={"sign_in"}> Sign In </Link> </Typography>
            </Typography>
        </Container>
    )
}
