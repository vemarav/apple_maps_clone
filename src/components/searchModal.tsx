import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';

import { GOOGLE_MAPS_API_KEY } from '../../.env';

interface ISearchModal {
  isVisible?: boolean;
  onPress?: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void;
  onDismiss?: () => void;
}

const SearchModal = ({ isVisible, onPress, onDismiss }: ISearchModal) => {
  return (
    <Modal
      backdropOpacity={0.3}
      onBackdropPress={onDismiss}
      isVisible={isVisible}
      onDismiss={onDismiss}
      style={tw`m-0 justify-end`}
      swipeDirection={['down']}
      onSwipeComplete={onDismiss}>
      <View style={tw`h-3/4 bg-gray-100 rounded-4 p-4 pt-6`}>
        <GooglePlacesAutocomplete
          styles={{ textInput: tw`bg-gray-200` }}
          debounce={400}
          placeholder="Search Maps"
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          fetchDetails
          nearbyPlacesAPI="GooglePlacesSearch"
          onPress={onPress}
        />
      </View>
    </Modal>
  );
};

export default SearchModal;
