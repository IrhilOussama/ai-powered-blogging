import { Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function notFound(){
    return(
        <Container sx={{}}>
            <Typography sx={{position: "absolute", top: '40%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
                <Image alt="not found" width={200} height={100} src={"/imgs/404.png"}  />
                Oops, It sounds like you missed your page!, go 
                <Typography component={'span'} color="primary" sx={{fontWeight: "bold"}}>
                    <Link href="/">
                        {" Home"}
                    </Link>
                </Typography>
            </Typography>
        </Container>
    )
}