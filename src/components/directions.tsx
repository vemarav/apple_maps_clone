import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Directions = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Text style={tw`text-2xl font-semibold`}>Directions</Text>
      <View style={tw`bg-gray-200 mt-2 rounded-2`}>{children}</View>
    </>
  );
};

export default Directions;
