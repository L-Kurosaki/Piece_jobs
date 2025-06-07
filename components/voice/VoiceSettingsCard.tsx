import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import Text from '../ui/Text';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Volume2, Mic, CircleAlert as AlertCircle, Settings } from 'lucide-react-native';

interface VoiceSettingsCardProps {
  isVoiceEnabled: boolean;
  isSpeechSupported: boolean;
  onToggleVoice: (enabled: boolean) => void;
  onTestVoice?: () => void;
}

export const VoiceSettingsCard: React.FC<VoiceSettingsCardProps> = ({
  isVoiceEnabled,
  isSpeechSupported,
  onToggleVoice,
  onTestVoice,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Volume2 size={24} color={Colors.primary[500]} />
        </View>
        <View style={styles.headerText}>
          <Text variant="h4" weight="semibold">
            Voice Notifications
          </Text>
          <Text variant="body2" color="secondary">
            Get spoken notifications and reply with your voice
          </Text>
        </View>
        <Switch
          value={isVoiceEnabled && isSpeechSupported}
          onValueChange={onToggleVoice}
          disabled={!isSpeechSupported}
          trackColor={{ false: Colors.neutral[300], true: Colors.primary[200] }}
          thumbColor={isVoiceEnabled ? Colors.primary[500] : Colors.neutral[400]}
        />
      </View>

      {!isSpeechSupported && (
        <View style={styles.warningContainer}>
          <AlertCircle size={16} color={Colors.warning[500]} />
          <Text variant="body2" color="warning" style={styles.warningText}>
            Voice features are not supported in your current browser. Please use Chrome, Safari, or Edge for the best experience.
          </Text>
        </View>
      )}

      {isVoiceEnabled && isSpeechSupported && (
        <View style={styles.featuresContainer}>
          <Text variant="body2" weight="medium" style={styles.featuresTitle}>
            Voice Features:
          </Text>
          
          <View style={styles.featureItem}>
            <Volume2 size={16} color={Colors.success[500]} />
            <Text variant="body2" color="secondary" style={styles.featureText}>
              Messages read aloud automatically
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Mic size={16} color={Colors.success[500]} />
            <Text variant="body2" color="secondary" style={styles.featureText}>
              Voice-to-text replies
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Settings size={16} color={Colors.success[500]} />
            <Text variant="body2" color="secondary" style={styles.featureText}>
              Hands-free operation
            </Text>
          </View>

          {onTestVoice && (
            <Button
              title="Test Voice Assistant"
              variant="outline"
              size="small"
              onPress={onTestVoice}
              leftIcon={<Volume2 size={16} color={Colors.primary[500]} />}
              style={styles.testButton}
            />
          )}
        </View>
      )}

      <View style={styles.tipContainer}>
        <Text variant="caption" color="secondary" style={styles.tip}>
          💡 Perfect for when your hands are busy with work. Just speak naturally to reply to messages.
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.warning[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  warningText: {
    marginLeft: Layout.spacing.xs,
    flex: 1,
    lineHeight: 18,
  },
  featuresContainer: {
    backgroundColor: Colors.success[50],
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
  },
  featuresTitle: {
    marginBottom: Layout.spacing.sm,
    color: Colors.success[800],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  featureText: {
    marginLeft: Layout.spacing.sm,
    color: Colors.success[700],
  },
  testButton: {
    marginTop: Layout.spacing.md,
    alignSelf: 'flex-start',
  },
  tipContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Layout.spacing.md,
  },
  tip: {
    fontStyle: 'italic',
    lineHeight: 16,
  },
});

export default VoiceSettingsCard;