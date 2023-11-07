// npm start --prefix client
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import LoginForm from "./login-form";
import CreateUser from "./create-account";
import CreateCard from "./create-card";
import RockPaperScissors from "./rock-paper-scissors";
import SpeechPractice from "./speech-practice";
import UseContext from "./use-context";
import About from "./about";
import SavedCards from "./saved-cards";
import EmptyRoute from "./empty-route";
import NavBar from "./navbar";
import Videos from "./videos";

export interface EmailProps {
  email: string;
  setEmail: (email: string) => void;
}

function App() {
  const [email, setEmail] = useState("");

  return (
    <div>
      {/* useContext wraps all of the components to provide condition rendering props for the logged in user */}
      <UseContext>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<LoginForm email={email} setEmail={setEmail} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/create-account" element={<CreateUser />} />
          <Route
            path="/create-card"
            element={<CreateCard email={email} setEmail={setEmail} />}
          />
          <Route
            path="/videos"
            element={<Videos email={email} setEmail={setEmail} />}
          />
          <Route
            path="/rock-paper-scissors-game"
            element={<RockPaperScissors email={email} setEmail={setEmail} />}
          />
          <Route
            path="/favorite-cards"
            element={<SavedCards email={email} setEmail={setEmail} />}
          />
          <Route
            path="/speech-practice"
            element={<SpeechPractice email={email} setEmail={setEmail} />}
          />
          <Route path="/empty-route" element={<EmptyRoute />} />
        </Routes>
      </UseContext>
    </div>
  );
}

export default App;
