import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { useAuth } from "./use-context";
// import "../styles/index.css";

// Home page component
function Home() {
  const { user } = useAuth();

  return (
    <div>
      <div className="home-page-1">
        <br />
        <div className="row-1">
          <div className="column">
            <img
              id="speech-trainer-main-logo"
              src="/images/speech-trainer-main-logo.png"
              alt="speech-trainer-logo"
            />
          </div>
          <div className="column">
            <img
              id="home-kids-image-1"
              src="/images/HomePageImages/Home4.png"
              alt="kids"
            />
          </div>
          <div className="column">
            <div>
              <img
                id="home-level-up"
                src="/images/HomePageImages/Home2.png"
                alt="level-up"
              />
              {user ? (
                <Link href="/login">
                  <a>
                    <img
                      id="logout-image"
                      src="/images/HomePageImages/HomeLogout.png"
                      alt="logout"
                    />
                  </a>
                </Link>
              ) : (
                <Link href="/login">
                  <a>
                    <img
                      id="login-image"
                      src="/images/HomePageImages/HomeLogin.png"
                      alt="login"
                    />
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="home-page-2">
        <img
          id="home-welcome-image"
          src="/images/HomePageImages/Home5.png"
          alt="home-welcome"
        />
        <img
          id="home-wind-image"
          src="/images/HomePageImages/Home6.png"
          alt="home-wind"
        />
        <img
          id="home-stars-image"
          src="/images/HomePageImages/Home7.png"
          alt="home-stars"
        />
      </div>

      <div className="home-page-3">
        <div className="row-4">
          <img
            id="home-learning-center-image"
            src="/images/HomePageImages/Home8.png"
            alt="home-learning-center"
          />
        </div>
        <div className="row-3">
          <div className="column-2">
            <Link href="/videos">
              <a>
                <img
                  id="video-speech-trainer-logo"
                  src="/images/video-speech-trainer-logo.png"
                  alt="Video Speech Trainer"
                />
              </a>
            </Link>
          </div>
          <div className="column-2">
            <Link href="/speech-practice">
              <a>
                <img
                  id="first-words-logo"
                  src="/images/first-words-logo.png"
                  alt="First Words"
                />
              </a>
            </Link>
          </div>
          <div className="column-2">
            <Link href="/rock-paper-scissors-game">
              <a>
                <img
                  id="games-logo"
                  src="/images/HomePageImages/games-logo.png"
                  alt="Rock Paper Scissors"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
