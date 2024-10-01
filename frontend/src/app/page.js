// "use client";
import { lazy, Suspense } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";

const Blogs = dynamic(() => import('./blogs'), {
  ssr: false,
  loading: () => <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center">
    <CircularProgress/>
  </div> 
})
export default function Home(){
  return(
      <Blogs />
  )
}
