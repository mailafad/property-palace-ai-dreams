// src/components/PropMateVoice.tsx
import { useEffect } from "react";

interface PropMateVoiceProps {
  text: string;
  speak: boolean;
  onEnd?: () => void;
}

const PropMateVoice: React.FC<PropMateVoiceProps> = ({ text, speak, onEnd }) => {
  useEffect(() => {
    if (!speak || !text) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.rate = 1;
    utter.pitch = 1;
    utter.onend = () => {
      if (onEnd) onEnd();
    };
    synth.cancel(); // Stop any previous speech
    synth.speak(utter);
    // Cleanup
    return () => synth.cancel();
  }, [text, speak, onEnd]);

  return null;
};

export default PropMateVoice;