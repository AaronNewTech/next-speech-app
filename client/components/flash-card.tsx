import React from "react";
import SaveSoundButton from "./save-sound-button";
import { EmailProps } from "./app";
import { SoundProps } from "./speech-practice";

export interface SoundIdProps {
  soundId: number;
}

// component for displaying flash cards
const FlashCard: React.FC<SoundProps & EmailProps> = ({
  sound,
  email,
  setEmail,
}) => {
  return (
    <div id="flash-card-container">
      <div>
        <h2>Say the word "{sound.sound}"</h2>
        <br />
        <div className="sound-image-container">
          <img src={sound.image} alt={sound.sound}></img>
        </div>
        <SaveSoundButton soundId={sound.id} email={email} setEmail={setEmail} />
      </div>
    </div>
  );
};

export default FlashCard;
