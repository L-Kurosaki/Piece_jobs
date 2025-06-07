import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import VoiceAssistantButton from './VoiceAssistantButton';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Mic, CreditCard as Edit3, Check, X } from 'lucide-react-native';

interface VoiceJobDescriptionInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
}

export const VoiceJobDescriptionInput: React.FC<VoiceJobDescriptionInputProps> = ({
  value,
  onChangeText,
  placeholder = "Describe your job...",
  label = "Job Description",
}) => {
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [pendingText, setPendingText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const { confirmJobDescription, speak } = useVoiceAssistant();

  const handleVoiceTranscription = async (transcribedText: string) => {
    if (transcribedText.trim()) {
      setPendingText(transcribedText);
      setShowConfirmation(true);
      
      // Read back the transcription for confirmation
      await confirmJobDescription(transcribedText);
    }
  };

  const handleConfirmVoiceInput = () => {
    onChangeText(pendingText);
    setShowConfirmation(false);
    setIsVoiceMode(false);
    setPendingText('');
    
    speak("Job description saved successfully!");
  };

  const handleRejectVoiceInput = () => {
    setShowConfirmation(false);
    setPendingText('');
    
    speak("Let's try again. Please describe your job.");
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (showConfirmation) {
      setShowConfirmation(false);
      setPendingText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="body1" weight="semibold" style={styles.label}>
          {label}
        </Text>
        <Button
          title={isVoiceMode ? "Type Instead" : "Use Voice"}
          variant="ghost"
          size="small"
          onPress={toggleVoiceMode}
          leftIcon={isVoiceMode ? <Edit3 size={16} color={Colors.primary[500]} /> : <Mic size={16} color={Colors.primary[500]} />}
        />
      </View>

      {isVoiceMode ? (
        <View style={styles.voiceContainer}>
          <Card style={styles.voiceCard}>
            <Text variant="body2" color="secondary" style={styles.voiceInstructions}>
              Tap the microphone and describe your job clearly. I'll read it back to you for confirmation.
            </Text>
            
            <View style={styles.voiceButtonContainer}>
              <VoiceAssistantButton
                size="large"
                onTranscription={handleVoiceTranscription}
                onError={(error) => Alert.alert('Voice Error', error)}
              />
            </View>

            {showConfirmation && (
              <View style={styles.confirmationContainer}>
                <Text variant="h4" weight="semibold" style={styles.confirmationTitle}>
                  Is this correct?
                </Text>
                <Card style={styles.transcriptionCard}>
                  <Text variant="body1" style={styles.transcriptionText}>
                    "{pendingText}"
                  </Text>
                </Card>
                
                <View style={styles.confirmationButtons}>
                  <Button
                    title="Yes, Use This"
                    variant="success"
                    onPress={handleConfirmVoiceInput}
                    leftIcon={<Check size={20} color={Colors.white} />}
                    style={styles.confirmButton}
                  />
                  <Button
                    title="Try Again"
                    variant="outline"
                    onPress={handleRejectVoiceInput}
                    leftIcon={<X size={20} color={Colors.primary[500]} />}
                    style={styles.rejectButton}
                  />
                </View>
              </View>
            )}
          </Card>
        </View>
      ) : (
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          multiline
          numberOfLines={4}
          helper="Describe your job in detail to attract the best service providers"
        />
      )}

      {value && !isVoiceMode && (
        <View style={styles.previewContainer}>
          <Text variant="caption" color="secondary">
            💡 Tip: You can also use voice input for faster job posting
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  label: {
    flex: 1,
  },
  voiceContainer: {
    marginTop: Layout.spacing.sm,
  },
  voiceCard: {
    padding: Layout.spacing.lg,
    alignItems: 'center',
  },
  voiceInstructions: {
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
    lineHeight: 20,
  },
  voiceButtonContainer: {
    marginVertical: Layout.spacing.lg,
  },
  confirmationContainer: {
    width: '100%',
    marginTop: Layout.spacing.lg,
  },
  confirmationTitle: {
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  transcriptionCard: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  transcriptionText: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  rejectButton: {
    flex: 1,
    marginLeft: Layout.spacing.sm,
  },
  previewContainer: {
    marginTop: Layout.spacing.sm,
    padding: Layout.spacing.sm,
    backgroundColor: Colors.neutral[50],
    borderRadius: Layout.borderRadius.md,
  },
});

export default VoiceJobDescriptionInput;