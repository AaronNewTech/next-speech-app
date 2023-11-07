"use client"
import 'regenerator-runtime/runtime';
import Image from 'next/image'
// import "../styles/index.css";

// import styles from './page.module.css'
// npm start --prefix client
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/home";
import LoginForm from "../components/login-form";
import CreateUser from "../components/create-account";
import CreateCard from "../components/create-card";
import RockPaperScissors from "../components/rock-paper-scissors";
import SpeechPractice from "../components/speech-practice";
import UseContext from "../components/use-context";
import About from "../components/about";
import SavedCards from "../components/saved-cards";
import EmptyRoute from "../components/empty-route";
import NavBar from "../components/navbar";
import Videos from "../components/videos";
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface EmailProps {
  email: string;
  setEmail: (email: string) => void;
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <main>
      <div>
        {/* useContext wraps all of the components to provide condition rendering props for the logged-in user */}
        <NavBar />

        {/* Use the useRouter hook to access the current route */}
        {router.pathname === '/' && <Home />}
        {router.pathname === '/login' && <LoginForm email={email} setEmail={setEmail} />}
        {router.pathname === '/about' && <About />}
        {router.pathname === '/create-account' && <CreateUser />}
        {router.pathname === '/create-card' && <CreateCard email={email} setEmail={setEmail} />}
        {router.pathname === '/videos' && <Videos email={email} setEmail={setEmail} />}
        {router.pathname === '/rock-paper-scissors-game' && <RockPaperScissors email={email} setEmail={setEmail} />}
        {router.pathname === '/favorite-cards' && <SavedCards email={email} setEmail={setEmail} />}
        {router.pathname === '/speech-practice' && <SpeechPractice email={email} setEmail={setEmail} />}
        {router.pathname === '/empty-route' && <EmptyRoute />}

        {/* Use Next.js <Link> components for navigation */}
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/about">About</Link>
        <Link href="/create-account">Create Account</Link>
        <Link href="/create-card">Create Card</Link>
        <Link href="/videos">Videos</Link>
        <Link href="/rock-paper-scissors-game">Rock Paper Scissors Game</Link>
        <Link href="/favorite-cards">Favorite Cards</Link>
        <Link href="/speech-practice">Speech Practice</Link>
        <Link href="/empty-route">Empty Route</Link>
      </div>
    </main>
  );
}

