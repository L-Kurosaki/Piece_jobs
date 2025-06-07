import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Calendar, Clock, MapPin, Volume2, Briefcase } from 'lucide-react-native';
import { mockJobs, mockUsers } from '../../utils/mockData';

interface DailyVoiceBriefingProps {
  userId: string;
  onComplete?: () => void;
}

export const DailyVoiceBriefing: React.FC<DailyVoiceBriefingProps> = ({
  userId,
  onComplete,
}) => {
  const [briefingData, setBriefingData] = useState<any>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  
  const { speak, isPlaying } = useVoiceAssistant();

  useEffect(() => {
    generateBriefingData();
  }, [userId]);

  const generateBriefingData = () => {
    // Get user's jobs for today
    const userJobs = mockJobs.filter(job => 
      job.providerId === userId && 
      (job.status === 'accepted' || job.status === 'in-progress')
    );

    const user = mockUsers.find(u => u.id === userId);
    
    const briefing = {
      userName: user?.name || 'User',
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      totalJobs: userJobs.length,
      jobs: userJobs.map(job => ({
        title: job.title,
        location: job.location.address,
        time: '9:00 AM', // Mock time
        duration: job.expectedDuration,
        payment: `R${job.budget.min}-${job.budget.max}`,
      })),
      totalEarnings: userJobs.reduce((sum, job) => sum + job.budget.min, 0),
      weather: 'sunny with a high of 24°C', // Mock weather
    };

    setBriefingData(briefing);
  };

  const generateBriefingText = () => {
    if (!briefingData) return '';

    let briefingText = `Good morning ${briefingData.userName}! Here's your briefing for ${briefingData.date}. `;

    if (briefingData.totalJobs === 0) {
      briefingText += "You have no scheduled jobs today. This is a great time to check for new opportunities or take a well-deserved break!";
    } else {
      briefingText += `You have ${briefingData.totalJobs} job${briefingData.totalJobs > 1 ? 's' : ''} scheduled today. `;

      briefingData.jobs.forEach((job: any, index: number) => {
        const jobNumber = index + 1;
        briefingText += `Job ${jobNumber}: ${job.title} in ${job.location} at ${job.time}, estimated ${job.duration} hours, paying ${job.payment}. `;
      });

      if (briefingData.jobs.length > 1) {
        briefingText += `Your total potential earnings for today are R${briefingData.totalEarnings}. `;
      }

      briefingText += `The weather today is ${briefingData.weather}, perfect for getting work done! `;
    }

    briefingText += "Have a productive day, and remember to stay safe on all your jobs!";

    return briefingText;
  };

  const playBriefing = async () => {
    const briefingText = generateBriefingText();
    await speak(briefingText);
    setHasPlayed(true);
    
    if (onComplete) {
      setTimeout(onComplete, 1000);
    }
  };

  if (!briefingData) return null;

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Calendar size={24} color={Colors.primary[500]} />
        <Text variant="h4" weight="semibold" style={styles.title}>
          Daily Briefing
        </Text>
      </View>

      <Text variant="body2" color="secondary" style={styles.date}>
        {briefingData.date}
      </Text>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Briefcase size={20} color={Colors.accent[500]} />
          <Text variant="body1" weight="medium" style={styles.summaryText}>
            {briefingData.totalJobs} Job{briefingData.totalJobs !== 1 ? 's' : ''}
          </Text>
        </View>

        {briefingData.totalJobs > 0 && (
          <View style={styles.summaryItem}>
            <Text variant="h3" weight="bold" color="success">
              R{briefingData.totalEarnings}
            </Text>
            <Text variant="caption" color="secondary">
              Potential Earnings
            </Text>
          </View>
        )}
      </View>

      {briefingData.jobs.length > 0 && (
        <View style={styles.jobsList}>
          <Text variant="body1" weight="semibold" style={styles.jobsTitle}>
            Today's Schedule:
          </Text>
          
          {briefingData.jobs.map((job: any, index: number) => (
            <View key={index} style={styles.jobItem}>
              <View style={styles.jobTime}>
                <Clock size={16} color={Colors.primary[500]} />
                <Text variant="body2" weight="medium" style={styles.jobTimeText}>
                  {job.time}
                </Text>
              </View>
              
              <View style={styles.jobDetails}>
                <Text variant="body1" weight="medium" numberOfLines={1}>
                  {job.title}
                </Text>
                <View style={styles.jobLocation}>
                  <MapPin size={14} color={Colors.neutral[500]} />
                  <Text variant="caption" color="secondary" style={styles.jobLocationText}>
                    {job.location}
                  </Text>
                </View>
              </View>
              
              <Text variant="body2" weight="medium" color="success">
                {job.payment}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Button
        title={hasPlayed ? "Play Again" : "Play Briefing"}
        variant="primary"
        onPress={playBriefing}
        loading={isPlaying}
        leftIcon={<Volume2 size={20} color={Colors.white} />}
        style={styles.playButton}
        fullWidth
      />

      <Text variant="caption" color="secondary" style={styles.tip}>
        💡 Tip: Enable daily briefings in settings to hear this automatically each morning
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: Layout.spacing.lg,
    padding: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  title: {
    marginLeft: Layout.spacing.sm,
  },
  date: {
    marginBottom: Layout.spacing.lg,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.md,
    backgroundColor: Colors.primary[50],
    borderRadius: Layout.borderRadius.md,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    marginLeft: Layout.spacing.xs,
  },
  jobsList: {
    marginBottom: Layout.spacing.lg,
  },
  jobsTitle: {
    marginBottom: Layout.spacing.md,
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  jobTime: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  jobTimeText: {
    marginLeft: Layout.spacing.xs,
  },
  jobDetails: {
    flex: 1,
    marginHorizontal: Layout.spacing.md,
  },
  jobLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  jobLocationText: {
    marginLeft: 4,
  },
  playButton: {
    marginBottom: Layout.spacing.md,
  },
  tip: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DailyVoiceBriefing;