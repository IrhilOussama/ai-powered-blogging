"use client";
import { lazy, Suspense, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import { AppContext } from "./home";
import Head from "next/head";

const Blogs = dynamic(() => import('./blogs'), {
  ssr: false,
  loading: () => <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center">
    <CircularProgress/>
  </div> 
})
export default function Home(){
  const [bottomNavValue, setBottomNavValue] = useContext(AppContext);
  useEffect(() => {
    setBottomNavValue(0);

  }, [setBottomNavValue])
  return(
    <>
        <Head>
        <title>My page title</title>
      </Head>
      <Blogs />
    </>
  )
}
