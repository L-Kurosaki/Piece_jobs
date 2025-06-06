import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TriangleAlert as AlertTriangle, Shield } from 'lucide-react-native';
import Button from '../ui/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { securityService } from '../../utils/securityService';

interface EmergencyButtonProps {
  userId: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  userId,
  currentLocation,
}) => {
  const [isTriggering, setIsTriggering] = useState(false);

  const handleEmergencyPress = () => {
    Alert.alert(
      'Emergency Alert',
      'This will immediately notify security services and your emergency contacts. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'EMERGENCY',
          style: 'destructive',
          onPress: triggerEmergency,
        },
      ]
    );
  };

  const triggerEmergency = async () => {
    setIsTriggering(true);
    
    try {
      if (currentLocation) {
        securityService.triggerEmergencyButton(userId, currentLocation);
        
        Alert.alert(
          'Emergency Alert Sent',
          'Security services have been notified and are on their way. Your emergency contacts have also been alerted.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Location Required',
          'Please enable location services to use the emergency button.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to send emergency alert. Please call emergency services directly.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsTriggering(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="EMERGENCY"
        variant="danger"
        size="large"
        onPress={handleEmergencyPress}
        loading={isTriggering}
        leftIcon={<AlertTriangle size={24} color={Colors.white} />}
        style={styles.emergencyButton}
      />
      
      <View style={styles.securityInfo}>
        <Shield size={16} color={Colors.success[500]} />
        <Button
          title="Security services will be notified immediately"
          variant="ghost"
          size="small"
          onPress={() => {
            Alert.alert(
              'Security Information',
              'When you press the emergency button:\n\n• Local security services are immediately notified\n• Your emergency contacts receive alerts\n• Your current location is shared\n• Response time is typically 10-15 minutes',
              [{ text: 'OK' }]
            );
          }}
          style={styles.infoButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  emergencyButton: {
    width: 200,
    height: 60,
    borderRadius: 30,
    marginBottom: Layout.spacing.md,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButton: {
    marginLeft: Layout.spacing.xs,
  },
});

export default EmergencyButton;