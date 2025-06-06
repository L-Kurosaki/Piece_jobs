import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { MapPin, Navigation, Search } from 'lucide-react-native';
import Text from './Text';
import Button from './Button';
import Input from './Input';
import Card from './Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; latitude: number; longitude: number }) => void;
  initialLocation?: string;
  placeholder?: string;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  initialLocation = '',
  placeholder = 'Enter your address',
}) => {
  const [address, setAddress] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock location suggestions for South African addresses
  const mockSuggestions = [
    'Cape Town, Western Cape, South Africa',
    'Johannesburg, Gauteng, South Africa',
    'Durban, KwaZulu-Natal, South Africa',
    'Pretoria, Gauteng, South Africa',
    'Port Elizabeth, Eastern Cape, South Africa',
    'Bloemfontein, Free State, South Africa',
    'East London, Eastern Cape, South Africa',
    'Nelspruit, Mpumalanga, South Africa',
    'Kimberley, Northern Cape, South Africa',
    'Polokwane, Limpopo, South Africa',
  ];

  const getCurrentLocation = async () => {
    if (Platform.OS === 'web') {
      // Web geolocation API
      if (!navigator.geolocation) {
        Alert.alert('Error', 'Geolocation is not supported by this browser.');
        return;
      }

      setIsLoading(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Mock reverse geocoding for demo
          const mockAddress = 'Cape Town, Western Cape, South Africa';
          setAddress(mockAddress);
          onLocationSelect({
            address: mockAddress,
            latitude,
            longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          Alert.alert('Error', 'Unable to get your current location. Please enter your address manually.');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      // For mobile platforms, you would use expo-location
      Alert.alert('Location Access', 'Location services would be available on mobile devices.');
    }
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
    
    // Filter suggestions based on input
    if (text.length > 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setAddress(suggestion);
    setSuggestions([]);
    
    // Mock geocoding - in a real app, you'd use a geocoding service
    const mockCoordinates = {
      'Cape Town, Western Cape, South Africa': { lat: -33.9249, lng: 18.4241 },
      'Johannesburg, Gauteng, South Africa': { lat: -26.2041, lng: 28.0473 },
      'Durban, KwaZulu-Natal, South Africa': { lat: -29.8587, lng: 31.0218 },
    };
    
    const coords = mockCoordinates[suggestion as keyof typeof mockCoordinates] || 
                  { lat: -33.9249, lng: 18.4241 }; // Default to Cape Town
    
    onLocationSelect({
      address: suggestion,
      latitude: coords.lat,
      longitude: coords.lng,
    });
  };

  const handleManualSubmit = () => {
    if (address.trim()) {
      // Mock geocoding for manual address
      onLocationSelect({
        address: address.trim(),
        latitude: -33.9249, // Default coordinates
        longitude: 18.4241,
      });
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          value={address}
          onChangeText={handleAddressChange}
          placeholder={placeholder}
          leftIcon={<MapPin size={20} color={Colors.neutral[500]} />}
          onSubmitEditing={handleManualSubmit}
        />
        
        <Button
          title="Use Current Location"
          variant="outline"
          size="small"
          onPress={getCurrentLocation}
          loading={isLoading}
          leftIcon={<Navigation size={16} color={Colors.primary[500]} />}
          style={styles.locationButton}
        />
      </View>

      {suggestions.length > 0 && (
        <Card style={styles.suggestionsContainer}>
          <Text variant="body2" weight="medium" style={styles.suggestionsTitle}>
            Suggestions
          </Text>
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              title={suggestion}
              variant="ghost"
              size="small"
              onPress={() => selectSuggestion(suggestion)}
              leftIcon={<Search size={16} color={Colors.neutral[500]} />}
              style={styles.suggestionButton}
            />
          ))}
        </Card>
      )}

      <Text variant="caption" color="secondary" style={styles.privacyNote}>
        📍 Your exact location will only be shared after job confirmation
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  inputContainer: {
    marginBottom: Layout.spacing.sm,
  },
  locationButton: {
    marginTop: Layout.spacing.sm,
  },
  suggestionsContainer: {
    marginTop: Layout.spacing.sm,
    padding: Layout.spacing.md,
  },
  suggestionsTitle: {
    marginBottom: Layout.spacing.sm,
  },
  suggestionButton: {
    justifyContent: 'flex-start',
    marginBottom: Layout.spacing.xs,
  },
  privacyNote: {
    marginTop: Layout.spacing.sm,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LocationPicker;