"use client";
import { useRouter } from 'next/navigation';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { useState } from "react";
import Link from 'next/link';

// Bottom Navigation
export default function SimpleBottomNavigation() {
    const [value, setValue] = useState(0);
    const router = useRouter();
  
    return (
      <Box sx={{ width: 1, position: "fixed", left: 0, bottom: 0, height: 50}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction onClick={() => {router.push("/")}} label="home" icon={<HomeRoundedIcon />} />
          <BottomNavigationAction onClick={() => {router.push("/search")}} label="search" icon={<SearchIcon />} />
          <BottomNavigationAction onClick={() => {router.push("/account/sign_in")}} label="account" icon={<PersonRoundedIcon />} />

    </BottomNavigation>
      </Box>
    );
  }
