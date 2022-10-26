import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { View, StatusBar, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import tw from 'twrnc';
import MapView, { MarkerAnimated, Region } from 'react-native-maps';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';

import Directions from '../components/directions';
import StepIndicator from '../components/stepIndicator';
import SearchModal from '../components/searchModal';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { addLocation, sortLocations, RootState } from '../store';
import MapViewDirections, {
  MapViewDirectionsWaypoints,
} from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '../../.env';
import { minutesToWords } from '../utils';

interface TimeDistance {
  time: string;
  distance: string;
}

const selectLocations = (store: RootState) => store.locations;

const Locations = () => {
  const locations: Array<GooglePlaceDetail> = useSelector(selectLocations);
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [sheetIndex, setSheetIndex] = useState<number>(2);
  const [timeDistance, setTimeDistance] = useState<TimeDistance>({
    time: '',
    distance: '',
  });

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['3%', '35%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  useEffect(() => {
    const previewMap = () => {
      if (locations.length > 1) {
        const placeIds = locations.map(loc => loc.place_id);

        mapRef?.current?.fitToSuppliedMarkers(placeIds, {
          edgePadding: { top: 50, bottom: 50, right: 50, left: 50 },
        });

        setSheetIndex(1);
      }
    };

    setTimeout(previewMap, 20);
  }, [locations]);

  const onSearchCompleted = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => {
    dispatch(addLocation(details));
    setShowSearch(false);
    setSheetIndex(1);
  };

  const animateToRegion = (details: GooglePlaceDetail | null) => {
    if (details?.place_id) {
      mapRef?.current?.fitToSuppliedMarkers([details?.place_id], {
        edgePadding: { top: 50, left: 50, right: 50, bottom: 50 },
        animated: true,
      });
    }
  };

  const getRegion = (details: GooglePlaceDetail | null): Region | undefined => {
    const { lat, lng } = details?.geometry.location || {};
    if (lat && lng) {
      return {
        latitudeDelta: -0.5,
        longitudeDelta: -0.5,
        latitude: lat,
        longitude: lng,
      };
    }
  };

  const getMapViewDirections = () => {
    const regions: Array<Region | undefined> = locations.map(getRegion);
    if (regions.length > 1) {
      const origin = regions[0];
      const destination = regions[regions.length - 1];

      const waypoints: MapViewDirectionsWaypoints[] =
        regions.length > 2
          ? regions.map(({ latitude, longitude }: any) => ({
              latitude,
              longitude,
            }))
          : [];

      if (origin && destination)
        return (
          <MapViewDirections
            origin={origin}
            waypoints={waypoints}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor={'#0275d8'}
            strokeWidth={5}
            precision={'high'}
            tappable={true}
            onReady={({ distance, duration }) =>
              setTimeDistance({
                distance: `${distance.toFixed(1)} Km`,
                time: `${minutesToWords(duration)}`,
              })
            }
          />
        );
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={tw`flex-1 bg-white`}>
        <MapView
          ref={mapRef}
          style={tw`flex-1`}
          initialRegion={{
            latitude: 28.7041,
            longitude: 77.13,
            longitudeDelta: 0.5,
            latitudeDelta: 0.5,
          }}>
          {locations.map(loc => {
            const region = getRegion(loc);
            if (region)
              return (
                <MarkerAnimated
                  key={loc.place_id}
                  identifier={loc.place_id}
                  coordinate={region}
                  title={loc.formatted_address}
                />
              );
          })}
          {getMapViewDirections()}
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          index={sheetIndex}
          snapPoints={snapPoints}
          backgroundStyle={tw`bg-gray-100`}
          handleStyle={[
            tw`bg-gray-100 rounded-t-xl`,
            {
              shadowColor: '#000000',
              shadowOffset: {
                height: -6,
                width: 0,
              },
              shadowOpacity: 0.3,
            },
          ]}
          onChange={handleSheetChanges}>
          <View style={tw`px-4`}>
            <Directions>
              <DraggableFlatList
                data={locations}
                alwaysBounceVertical={false}
                keyExtractor={(item: GooglePlaceDetail) => item.name}
                renderItem={({ item, drag }) => (
                  <ScaleDecorator>
                    <StepIndicator
                      text={item.name}
                      drag={drag}
                      onPress={() => animateToRegion(item)}
                    />
                  </ScaleDecorator>
                )}
                onDragEnd={({ data }) => dispatch(sortLocations(data))}
              />
              <StepIndicator
                text="Add Item"
                action
                onPress={() => setShowSearch(true)}
              />
            </Directions>
            {timeDistance.time && timeDistance.distance ? (
              <View style={tw`my-4 flex-row justify-between item-center`}>
                <View>
                  <Text style={tw`text-xl text-gray-900`}>
                    {timeDistance.time}
                  </Text>
                  <Text style={tw`text-lg text-gray-500 ml-1`}>
                    {timeDistance.distance}
                  </Text>
                </View>
                <View style={tw`bg-green-500 px-5 rounded-2 justify-center`}>
                  <Text style={tw`text-xl text-white font-semibold`}>Go</Text>
                </View>
              </View>
            ) : null}
          </View>
        </BottomSheet>
        <SearchModal
          isVisible={showSearch}
          onPress={onSearchCompleted}
          onDismiss={() => setShowSearch(false)}
        />
      </View>
    </>
  );
};

export default Locations;
