import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username:"",
    email: "",
    password: "",
  });

  const [isSubmitting,setIsSubmitting]=useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () =>{
    if(!form.email || !form.password || !form.username){
      Alert.alert('Error','Please fill in all the fields')
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email,form.password,form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error',error.message)
    } finally{
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center min-h-[85vh] px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo1Small}
            resizeMode="contain"
            className="w-[80px] h-[80px] mb-1"
          />

          <Text className="text-3xl font-semibold mt-10 text-white">
            Sign Up with <Text style={{color:'#FFB71E'}}>LibCorner</Text>
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;