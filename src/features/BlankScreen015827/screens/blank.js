import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DateTimePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import {CheckBox} from 'react-native-elements';
import {SlideMenuIcon} from '../../../navigator/slideMenuIcon';
import {Avatar, Accessory} from 'react-native-elements';

export default class Blank extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    };
  };

  state = {};

  render = () => (
    <View style={styles.container}>
      <Avatar
      size="xlarge"
      title="CB"
      activeOpacity={0.7}
      rounded
        source={{
          uri:
            'https://crowdbotics-slack.s3.amazonaws.com/media/components/other_2.png',
        }}>
        <Accessory size={25} />
      </Avatar>
      <Button
        title="Logout"
        style={styles.button}
        onPress={() => alert("Pressed!")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  avatar: {
      height: 200,
      width: 400,
  },
  button: {color: '#FF0000'}
});
