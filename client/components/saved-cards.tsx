import React, { useState, useEffect } from "react";
import FlashCard from "./flash-card";
import { EmailProps } from "./app";

type SoundType = {
  id: number;
  sound: string;
  image: string;
};

const SavedCards: React.FC<EmailProps> = ({ email, setEmail }) => {
  const [sounds, setSounds] = useState<SoundType[]>([]);

  useEffect(() => {
    fetchAllSounds();
  }, []);

  // handles fetching all saved cards from the database
  const fetchAllSounds = async () => {
    try {
      const response = await fetch("/user_saved_sounds");

      if (response.ok) {
        const allSounds = await response.json();
        // sets saved sounds to be displayed
        setSounds(allSounds);
      } else {
        console.error("Error fetching sounds:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sounds:", error);
    }
  };

  return (
    <div id="flash-card-library">
      <h2>Flash Card Library</h2>
      <h3 id="practice-message">for extra practice</h3>
      <div className="cards-container">
        {sounds &&
          sounds.map((sound) => (
            <div className="display-container" key={sound.id}>
              <FlashCard sound={sound} email={email} setEmail={setEmail} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SavedCards;
