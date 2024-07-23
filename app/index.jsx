import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/color';
import {images} from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const {isLoading,isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className=" h-full" style={{backgroundColor: colors.primary}}>
      <ScrollView contentContainerStyle={{height:'100%'}}>

        <View className="justify-center w-full min-h-[85vh] px-4 items-center">

          <Image source={images.shapesupper} className="" resizeMode="contain" />

          <Image 
            source = {images.logo} className="w-[130px] h-[84px]" resizeMode="contain"
          />

          {/* <View>
            <Image
              source={images.shapesupper} 
            />
          </View> */}

          <Image 
            source={images.star} className="absolute top-[72.69px] left-[37.78px] transform rotate-[-31deg]" resizeMode="contain"
          />

          <Text className="absolute w-[249px] h-[164px] top-[116.5px] left-[42px] font-pextrabold text-5xl py-3 leading-[54px] text-white" resizeMode="contain">READING MAKES ME HAPPY</Text>

          <Image 
            source={images.curveline} className="absolute w-[127px] h-[26px] top-[275px] left-[163px] transform roytate-[1.6deg] "
          />

          <Image 
            source={images.textbox}  className="absolute z-[10] w-[96px] h-[42px] top-[326px] left-[59px] transform rotate-[-18deg]" resizeMode="contain"
          />

          <Image 
            source={images.star} className="absolute top-[420px] left-[344px] w-[17px] h-[17px] transform rotate-[-31deg]" resizeMode="contain"
          />

          <Image source={images.shapelower} className="absolute w-[849px] h-[891px]  top-[128px] ytransform " resizeMode="contain" />


          <Image 
            source={images.loadingpage}
            className = "absolute max-w-[299px] w-full h-[318px] top-[424px] left-[32px]"
            resizeMode="contain"
          />


          <CustomButton 
            title="Get Started!!"
            handlePress = {()=> router.push('/sign-in')}
            containerStyles = "mt-7 top-[80px] w-full"
          />

          <Image 
            source={images.star} className="absolute top-[841px] left-[220px] w-[40px] h-[39px] transform rotate-[-61deg]" resizeMode="contain"
          />

        </View>
      </ScrollView>
      <StatusBar backgroundColor={colors.primary} style='light' />
    </SafeAreaView>
  );
}

