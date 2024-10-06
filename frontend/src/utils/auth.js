"use client";
export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('user');
      return !!token; // returns true if the token exists, otherwise false
    }
    return false;
  };