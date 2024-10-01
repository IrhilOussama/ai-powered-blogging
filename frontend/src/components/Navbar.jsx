import { AppBar, Toolbar } from "@mui/material";
import Link from "next/link";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TemporaryDrawer from "@/components/myDrawer";
import Image from "next/image";

export default function Navbar(){

    return(
        <AppBar sx={{
            height: '60px',
            position: 'fixed'
        }} className=" fixed flex justify-center ">
            <Toolbar 
            className="flex justify-around items-center"
            >
                <Link href="/"> <Image className="mt-2" width={50} height={50} alt="blogs" src="/logos/blog.png" /> </Link>
                <TemporaryDrawer />
                {/* <Link href={{
                    pathname: "/blogs",
                    query: {
                        author: "oussama"
                    }
                }}>Blogs List</Link>
                <Link href="/blogs/1">cat</Link> */}
            </Toolbar>
        </AppBar>
    )
}