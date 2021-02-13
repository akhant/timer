import Sound from 'react-native-sound';
Sound.setCategory('Playback');

export const initiateSound = (val: string) => {
  const sound = new Sound(`${val}.wav`, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log(`failed to load the sound ${val}`, error);
      return;
    }
  });
  return sound;
};
