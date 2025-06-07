import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../ui/Text';
import VoiceNotificationHandler from './VoiceNotificationHandler';
import { Message } from '../../types/Message';
import { Job } from '../../types/Job';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Mic, Volume2 } from 'lucide-react-native';

interface VoiceMessageButtonProps {
  message?: Message;
  job?: Job;
  onReply?: (replyText: string) => void;
  style?: any;
}

export const VoiceMessageButton: React.FC<VoiceMessageButtonProps> = ({
  message,
  job,
  onReply,
  style,
}) => {
  const [showVoiceHandler, setShowVoiceHandler] = useState(false);

  const handleVoiceReply = (replyText: string) => {
    onReply?.(replyText);
    setShowVoiceHandler(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.voiceButton}
        onPress={() => setShowVoiceHandler(true)}
        activeOpacity={0.7}
      >
        <Volume2 size={20} color={Colors.white} />
        <Text variant="body2" color="white" weight="medium" style={styles.buttonText}>
          Voice Reply
        </Text>
      </TouchableOpacity>

      <VoiceNotificationHandler
        message={message}
        job={job}
        visible={showVoiceHandler}
        onReply={handleVoiceReply}
        onDismiss={() => setShowVoiceHandler(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent[500],
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    marginLeft: Layout.spacing.sm,
  },
});

export default VoiceMessageButton;