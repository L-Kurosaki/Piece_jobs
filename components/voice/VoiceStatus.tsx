import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react-native';
import Text from '../ui/Text';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { voiceService } from '../../utils/voiceService';

export const VoiceStatus: React.FC = () => {
  const status = voiceService.getVoiceStatus();

  return (
    <View style={[styles.container, status.available ? styles.available : styles.unavailable]}>
      {status.available ? (
        <Volume2 size={16} color={Colors.success[500]} />
      ) : (
        <VolumeX size={16} color={Colors.warning[500]} />
      )}
      <Text 
        variant="caption" 
        color={status.available ? 'success' : 'warning'} 
        style={styles.text}
      >
        Voice {status.available ? 'Ready' : 'Limited'}
      </Text>
      {!status.available && status.reason && (
        <AlertCircle size={12} color={Colors.warning[500]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  available: {
    backgroundColor: Colors.success[50],
  },
  unavailable: {
    backgroundColor: Colors.warning[50],
  },
  text: {
    marginLeft: 4,
    marginRight: 4,
    fontSize: 10,
  },
});

export default VoiceStatus;