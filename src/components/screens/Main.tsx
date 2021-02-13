import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  useWindowDimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {getSound} from '../../redux/actions';
import {IData} from '../../redux/reducers/data';

export interface IMainProps {
  navigation: any;
  data: IData;
  sound?: any;
  getSound: any;
}

const Main: React.FC<IMainProps> = ({
  sound,
  getSound,
  data: {currentSound, isVibroEnabled, vibroDuration, vibroTime, playSound},
}) => {
  const window = useWindowDimensions();
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);

  const onPressBtn = () => {
    setStarted(true);
    setElapsed(0);
  };
  useEffect(() => {
    let timer: any;
    if (started) {
      timer = setInterval(() => {
        setElapsed((state) => state + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [started]);

  useEffect(() => {
    getSound(currentSound);
  }, [currentSound]);

  const vibrate = () => {
    if (isVibroEnabled) {
      Vibration.vibrate(Number(vibroDuration));
    }
  };

  const playSoundNow = () => {
    if (playSound) {
      if (sound.soundObj) {
        sound.soundObj.play();
      }
    }
  };

  const renderBg = (time: number) => {
    const vTime = Number(vibroTime);
    if (time >= vTime) {
      if (time === vTime) {
        playSoundNow();
        vibrate();
      }
      if (time >= vTime + 10) {
        return '#ff4d4d';
      }
      return '#ffff4d';
    } else {
      return '#eee';
    }
  };

  const getOrientation = () => {
    if (window.height >= window.width) {
      return 'PORTRAIT';
    }
    return 'LANDSCAPE';
  };
  return (
    <>
      <View style={{...styles.container, backgroundColor: renderBg(elapsed)}}>
        <View style={styles.timeWrapper}>
          <Text style={styles.time}>{elapsed}</Text>
        </View>
        <View
          style={{
            position: 'relative',
            top: getOrientation() === 'PORTRAIT' ? 0 : -35,
          }}>
          <TouchableOpacity style={styles.btn} onPress={onPressBtn}>
            <Text style={styles.btnText}>START</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  timeWrapper: {
    position: 'relative',
    top: -50,
  },
  time: {
    fontSize: 80,
    fontWeight: 'normal',
    marginTop: 110,
    fontFamily: 'Orbitron-Medium',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#3385ff',
    padding: 15,
    borderRadius: 10,
    width: 250,
  },
  btnText: {
    fontSize: 50,
    fontFamily: 'Orbitron-Medium',
  },
});

export default connect(({data, sound}: RootState) => ({data, sound}), {
  getSound,
})(Main);
