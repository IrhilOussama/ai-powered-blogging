"use client";
import { useRouter } from "next/navigation";

export default function Account(){
    const router = useRouter();
    router.replace("/account/sign_in");
}
