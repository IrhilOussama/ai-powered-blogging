'use client';
import { useContext, useEffect } from "react";
import { AppContext } from "../home";
export default function AccountLayout({children}){
    const [value, setValue] = useContext(AppContext);
    useEffect(() => {
        setValue(2)

    }, [setValue])
    return(
        <div>
            
            {children}
        </div>
    )
}
