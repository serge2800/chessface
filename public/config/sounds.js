window.ChessFaceSounds = (() => {
  const soundOptions = [
    { id: "none", label: "No sound", file: null },
    { id: "fart", label: "Fart", file: "/assets/sounds/fart.mp3" },
    { id: "laugh", label: "Evil Laugh", file: "/assets/sounds/evil-laugh.mp3" },
    { id: "bell", label: "Bell", file: "/assets/sounds/bell.mp3" },
    { id: "dramatic", label: "Dramatic Hit", file: "/assets/sounds/dramatic-hit.mp3" }
  ];

  function playSound(soundId) {
    const option = soundOptions.find((sound) => sound.id === soundId);
    if (!option || option.id === "none" || !option.file) return;
    try {
      const audio = new Audio(option.file);
      audio.volume = 0.7;
      audio.play().catch((error) => {
        console.warn("Sound playback failed:", error);
        playFallbackSound(soundId);
      });
    } catch (error) {
      console.warn("Sound could not be played:", error);
      playFallbackSound(soundId);
    }
  }

  function playFallbackSound(soundId) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const context = new AudioContext();
      const now = context.currentTime;
      const output = context.createGain();
      output.gain.setValueAtTime(0.0001, now);
      output.gain.exponentialRampToValueAtTime(0.45, now + 0.02);
      output.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      output.connect(context.destination);

      const frequencies = {
        fart: [90, 58],
        laugh: [420, 520],
        bell: [760, 1140],
        dramatic: [140, 62]
      }[soundId] || [520, 390];

      frequencies.forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        oscillator.type = soundId === "bell" ? "sine" : soundId === "laugh" ? "square" : "triangle";
        oscillator.frequency.setValueAtTime(frequency, now + index * 0.08);
        oscillator.connect(output);
        oscillator.start(now + index * 0.08);
        oscillator.stop(now + 0.42);
      });
    } catch (error) {
      console.warn("Fallback sound could not be played:", error);
    }
  }

  return { soundOptions, playSound };
})();
