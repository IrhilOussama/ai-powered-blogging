'use client'
import SimpleBottomNavigation from "@/components/bottomNavigation";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { createContext, useState } from "react";
export const AppContext = createContext();

export default function Home({children}){
    const bottomNavigationValue = useState(0);
    const myTheme = createTheme({
        palette: {
        primary: {
            main: "#2700b6"
        },
        secondary: {
            main: "#1c931d"
        }
        },
        typography: {
        fontFamily: [
            // '--font-montserrat'
        ].join(','),
        },
    })

    return (
    <>
        <ThemeProvider theme={myTheme}>
          <AppContext.Provider value={bottomNavigationValue} >

            <Navbar />
            <div className="h-24"></div>
            {children}
            <div className="h-16"></div>
            <SimpleBottomNavigation />

          </AppContext.Provider>
        </ThemeProvider>
    </>
    )
}