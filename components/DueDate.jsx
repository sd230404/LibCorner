import { Text, FlatList } from 'react-native'
import React from 'react'

const DueDate = ({books}) => {
  return (
    <FlatList
    data={books}
    keyExtractor={(item) => item.id}
    renderItem={({item})=>(
        <Text className="text-lg text-white">
            {item.title}
        </Text>
    )}
    horizontal
    />
  )
}

export default DueDate;