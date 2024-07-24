import { View, Text, FlatList, Image, RefreshControl, TextInput,StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { images } from "../../constants";
import SearchInput from "../../components/SearchInput"
import EmptyState from "../../components/EmptyState"
import CustomButton from '../../components/CustomButton';
import DueDate from '../../components/DueDate';
import { getAllBooks } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppWrite'

const Home = () => {
  const {data:booksData ,refetch} = useAppWrite(getAllBooks);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  //console.log(booksData);

  const [bookName, setBookName] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => { loadBooks();  }, []);

  const saveBooks = async (books) => {
    try {
      const jsonValue = JSON.stringify(books);
      await AsyncStorage.setItem('@books', jsonValue);
    } catch (e) {
      console.error('Failed to save books.', e);
    }
  };

  const loadBooks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@books');
      if (jsonValue != null) {
        setBooks(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load books.', e);
    }
  };

  const addBook = () => {
    if (bookName.trim()) {
      const newBooks = [...books, { id: Date.now().toString(), name: bookName }];
      setBooks(newBooks);
      saveBooks(newBooks);
      setBookName('');
    }
  };

  const removeBook = (id) => {
    const newBooks = books.filter(book => book.id !== id);
    setBooks(newBooks);
    saveBooks(newBooks);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
              data={books}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.bookItem}>
                  <Text style={styles.bookText}>{item.name}</Text>
                  <CustomButton 
                  title="Remove"
                  handlePress={() => removeBook(item.id)}
                  containerStyles={"flex w-[100px] min-h-[35px] rounded-l"}
                  textStyles={"text-white"}
                  />
                </View>
              )}

        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  User
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logo1Small}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            
            <SearchInput />
            <TextInput
              style={styles.input}
              placeholder="Enter book name"
              value={bookName} // whatever that is being stored in the input text
              onChangeText={setBookName} 
              autoFocus
            />
            
            <CustomButton
              title="Add Book"
              handlePress={addBook}
              textStyles={"text-white"}
            />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-xl font-pregular text-gray-100 mb-3">
                Due Date Approaching
              </Text>

              <DueDate books={[{id:1},{id:2},{id:3}] ?? []} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No Books Found"
            subtitle="No Books uploaded yet"
          />
        )}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10
  },
  title: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 3,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  bookText:{
    fontSize:30,
    color:"white"
  }
});

export default Home