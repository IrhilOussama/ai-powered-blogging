"use client";
import { useRouter } from 'next/navigation';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { useContext, useState } from "react";
import Link from 'next/link';
import { AppContext } from '@/app/home'; 

// Bottom Navigation
export default function SimpleBottomNavigation() {
  const [value, setValue] = useContext(AppContext);
    const router = useRouter();
  
    return (
      <Box sx={{ width: 1, position: "fixed", left: 0, bottom: 0, height: 50}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log(value)
            setValue(newValue);
          }}
        >
          <BottomNavigationAction onClick={() => {router.push("/")}} label="home" icon={<HomeRoundedIcon />} />
          <BottomNavigationAction onClick={() => {router.push("/blogs/search")}} label="search" icon={<SearchIcon />} />
          <BottomNavigationAction onClick={() => {router.push("/account/sign_in")}} label="account" icon={<PersonRoundedIcon />} />

    </BottomNavigation>
      </Box>
    );
  }
