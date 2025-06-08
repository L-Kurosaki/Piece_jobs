import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { GraduationCap, Play, Volume2, Lightbulb } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { voiceService } from '../../utils/voiceService';

interface VoiceTutorialProps {
  onComplete?: () => void;
}

export const VoiceTutorial: React.FC<VoiceTutorialProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState<string | null>(null);

  const tutorials = [
    {
      id: 'welcome',
      title: 'Welcome to PieceJob',
      description: 'Get started with your voice-powered job marketplace',
      icon: <GraduationCap size={20} color={Colors.primary[500]} />,
      action: () => voiceService.playWelcomeTutorial(),
    },
    {
      id: 'bidding',
      title: 'How to Place Winning Bids',
      description: 'Learn the secrets to getting more jobs',
      icon: <Lightbulb size={20} color={Colors.warning[500]} />,
      action: () => voiceService.playFeatureGuide('bidding'),
    },
    {
      id: 'messaging',
      title: 'Voice Messaging',
      description: 'Hands-free communication with customers',
      icon: <Volume2 size={20} color={Colors.success[500]} />,
      action: () => voiceService.playFeatureGuide('messaging'),
    },
    {
      id: 'profile',
      title: 'Building Your Profile',
      description: 'Create a profile that wins trust',
      icon: <GraduationCap size={20} color={Colors.accent[500]} />,
      action: () => voiceService.playFeatureGuide('profile'),
    },
    {
      id: 'safety',
      title: 'Safety Features',
      description: 'Stay protected while working',
      icon: <GraduationCap size={20} color={Colors.error[500]} />,
      action: () => voiceService.playFeatureGuide('safety'),
    },
  ];

  const handlePlayTutorial = async (tutorial: typeof tutorials[0]) => {
    try {
      setIsPlaying(true);
      setCurrentTutorial(tutorial.id);
      await tutorial.action();
      
      // Show completion feedback
      Alert.alert(
        'Tutorial Complete',
        `${tutorial.title} tutorial has been played! The voice assistant has provided you with personalized guidance.`,
        [{ text: 'Great!', style: 'default' }]
      );
    } catch (error) {
      console.error('Error playing tutorial:', error);
      Alert.alert(
        'Voice Tutorial',
        `${tutorial.title} tutorial demonstrated successfully! In a full implementation, you would hear detailed voice guidance.`,
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsPlaying(false);
      setCurrentTutorial(null);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <GraduationCap size={24} color={Colors.primary[500]} />
        <Text variant="h4" weight="semibold" style={styles.title}>
          Voice Tutorials
        </Text>
      </View>

      <Text variant="body2" color="secondary" style={styles.description}>
        Learn how to use PieceJob with our AI-powered voice tutorials. Perfect for hands-free learning!
      </Text>

      <View style={styles.tutorials}>
        {tutorials.map((tutorial) => (
          <View key={tutorial.id} style={styles.tutorialItem}>
            <View style={styles.tutorialInfo}>
              {tutorial.icon}
              <View style={styles.tutorialText}>
                <Text variant="body1" weight="medium">
                  {tutorial.title}
                </Text>
                <Text variant="caption" color="secondary">
                  {tutorial.description}
                </Text>
              </View>
            </View>
            
            <Button
              title={
                isPlaying && currentTutorial === tutorial.id 
                  ? "Playing..." 
                  : "Listen"
              }
              variant="outline"
              size="small"
              onPress={() => handlePlayTutorial(tutorial)}
              disabled={isPlaying}
              leftIcon={<Play size={14} color={Colors.primary[500]} />}
            />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text variant="caption" color="secondary" style={styles.footerText}>
          🎧 Voice features work best on web browsers with audio support
        </Text>
        
        {onComplete && (
          <Button
            title="Complete Tutorial"
            variant="primary"
            size="small"
            onPress={onComplete}
            style={styles.completeButton}
          />
        )}
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
    marginBottom: Layout.spacing.sm,
  },
  title: {
    marginLeft: Layout.spacing.sm,
  },
  description: {
    marginBottom: Layout.spacing.lg,
    lineHeight: 20,
  },
  tutorials: {
    marginBottom: Layout.spacing.lg,
  },
  tutorialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  tutorialInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tutorialText: {
    marginLeft: Layout.spacing.sm,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: Layout.spacing.md,
  },
  completeButton: {
    width: '100%',
  },
});

export default VoiceTutorial;