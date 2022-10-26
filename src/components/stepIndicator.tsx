import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Entypo';

interface IStepIndicator {
  text: string;
  onPress?: () => void;
  drag?: () => void;
  action?: boolean;
}

const StepIndicator = ({ text, onPress, action, drag }: IStepIndicator) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={drag}>
      <View style={tw`px-4 flex-row items-center ${action ? 'py-1' : ''}`}>
        <Icon
          name={action ? 'circle-with-plus' : 'location'}
          size={18}
          style={tw`mr-2 ${action ? 'text-blue-500' : 'text-gray-500'}`}
        />
        <View
          style={[
            tw`border-gray-300 flex-row flex-1 items-center justify-between ${
              action ? '' : 'border-b'
            } py-1`,
          ]}>
          <Text
            style={tw`text-lg ${action ? 'text-blue-500' : 'text-gray-900'}`}
            numberOfLines={1}>
            {text}
          </Text>
          {action ? null : <Text style={tw`p-1 text-gray-400 text-xl`}>☰</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StepIndicator;
