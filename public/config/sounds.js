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
      });
    } catch (error) {
      console.warn("Sound could not be played:", error);
    }
  }

  return { soundOptions, playSound };
})();
