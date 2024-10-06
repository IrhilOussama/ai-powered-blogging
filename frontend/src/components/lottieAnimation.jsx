"use client";
import Lottie from 'lottie-react';
import animationData from '@/app/lotties/searching.json'; // Adjust the path accordingly

const LottieAnimation = () => {
    return (
        <Lottie
            autoplay
            loop
            animationData={animationData}
            style={{ height: '150px', width: '300px' }}
        />
    );
};

export default LottieAnimation;