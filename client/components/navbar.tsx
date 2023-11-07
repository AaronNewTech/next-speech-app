import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { useAuth } from "./use-context";

function NavBar() {
  // used to conditionally render the navigation bar
  const { user } = useAuth();

  return (
    <div id="navbar-container">
      <nav className="navbarStyles">
        <div className="navbar-links">
          <div>
            <Link href="/"> Home </Link>
          </div>
          {user ? (
            <div>
              <Link href="/login"> Logout </Link>
            </div>
          ) : (
            <div>
              <Link href="/login"> Login </Link>
            </div>
          )}

          <div>
            <Link href="/about"> About </Link>
          </div>

          {user ? (
            <div className="dropdown">
              <Link href="/my-cards">My Cards</Link>
              <div>
                <div className="dropdown-content">
                  <div>
                    <Link href="/create-card"> Create Cards </Link>
                  </div>
                  <div>
                    <Link href="/favorite-cards"> Saved Cards </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="dropdown">
            <Link href="/speech-practice">Speech Practice</Link>
            <div>
              <div className="dropdown-content">
                <div>
                  <Link href="/videos"> Video Speech Trainer </Link>
                </div>
                <div>
                  <Link href="/speech-practice"> First Words </Link>
                </div>
                <div>
                  <Link href="/rock-paper-scissors-game">Games</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/">
            <img
              id="facebook"
              src="/images/Social/facebook.png"
              alt="facebook-icon"
            />
          </a>
          <a href="https://instagram.com/">
            <img
              id="instagram"
              src="/images/Social/instagram.png"
              alt="instagram-icon"
            />
          </a>
          <a href="https://twitter.com">
            <img
              id="twitter"
              src="/images/Social/twitter.png"
              alt="twitter-icon"
            />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
