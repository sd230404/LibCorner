import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View , Image} from 'react-native';
import {Link} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context'
import { Colors } from '../constants/color';

import {images} from "../constants"

export default function App() {
  return (
    <SafeAreaView className="h-full" style={{backgroundColor:Colors.primary}}>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="items-center justify-center w-full h-full px-4">
        <Image
        source={images.logo1}
        className="w-[130px] h-[84px]"
        resizeMode='contain'
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

