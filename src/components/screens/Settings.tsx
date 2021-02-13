import React, {
  ReactText,
  useState,
} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {RootState} from '../../redux/reducers';
import {connect} from 'react-redux';
import {setSetting} from '../../redux/actions';
import {Picker} from '@react-native-picker/picker';

export interface ISettingProps {
  data: any;
  setSetting: any;
}

const Settings: React.FC<ISettingProps> = ({data, setSetting}) => {
  const [isVibroEnabled, setIsVibroEnabled] = useState(data.isVibroEnabled);
  const [playSound, setPlaySound] = useState(data.playSound);
  const [vibroDuration, setVibroDuration] = useState(data.vibroDuration);
  const [vibroTime, setVibroTime] = useState(data.vibroTime);
  const [currentSound, setCurrentSound] = useState(data.currentSound);

  const toggleSwitchVibro = (value: boolean) => {
    setSetting('isVibroEnabled', value);
    setIsVibroEnabled(value);
  };
  const toggleSwitchSound = (value: boolean) => {
    setSetting('playSound', value);
    setPlaySound(value);
  };

  const onChangeVibroDuration = (value: string) => {
    const nVal = Number(value);
    if (Number.isInteger(nVal)) {
      setSetting('vibroDuration', nVal.toString());
      setVibroDuration(value);
    }
  };

  const onChangeVibroTime = (value: ReactText) => {
    if (!value) value = vibroTime;
    const nVal = Number(value);
    const sVal = nVal.toString();

    if (Number.isInteger(nVal)) {
      setVibroTime(sVal);
      console.log('vTime', vibroTime);
      setSetting('vibroTime', nVal);
    }
  };

  const handleChangePicker = (itemValue: string, index: any) => {
    setSetting('currentSound', itemValue);
    setCurrentSound(itemValue);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>Vibration: </Text>
        <Switch
          trackColor={{false: '#81b0ff', true: '#81b0ff'}}
          thumbColor={isVibroEnabled ? '#5cd65c' : '#ff3333'}
          onValueChange={toggleSwitchVibro}
          value={isVibroEnabled}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Play sound: </Text>
        <Switch
          trackColor={{false: '#81b0ff', true: '#81b0ff'}}
          thumbColor={playSound ? '#5cd65c' : '#ff3333'}
          onValueChange={toggleSwitchSound}
          value={playSound}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Vibration duration, ms: </Text>
        <TextInput
          maxLength={5}
          style={styles.textInput}
          onChangeText={onChangeVibroDuration}
          value={vibroDuration}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Alert time, sec: </Text>
        <TextInput
          maxLength={3}
          style={styles.textInput}
          onChangeText={onChangeVibroTime}
          value={vibroTime}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Select sound: </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={currentSound}
            style={styles.soundPicker}
            //@ts-ignore
            onValueChange={handleChangePicker}>
            <Picker.Item label="bass" value="bass" />
            <Picker.Item label="bass2" value="bass2" />
            <Picker.Item label="ring" value="ring" />
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {},
  text: {
    fontSize: 20,
    fontFamily: 'Feather',
  },
  textInput: {
    width: 80,
    height: 36,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
    fontFamily: 'Feather',
    overflow: 'hidden',
  },
  soundPicker: {
    height: 36,
    width: 80,
  },
  pickerWrapper: {
    borderWidth: 0.5,
    borderRadius: 5,
  },
});

export default connect(({data}: RootState) => ({data}), {setSetting})(Settings);
