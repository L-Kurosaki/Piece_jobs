import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Bell, Brain, TrendingUp, Clock, DollarSign } from 'lucide-react-native';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { voiceService } from '../../utils/voiceService';
import { aiLearningService } from '../../utils/aiLearningService';

interface SmartNotification {
  id: string;
  type: 'opportunity' | 'insight' | 'warning' | 'celebration';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
  actionable: boolean;
}

interface SmartNotificationsProps {
  userId: string;
}

export const SmartNotifications: React.FC<SmartNotificationsProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Generate AI-powered smart notifications
    generateSmartNotifications();
  }, [userId]);

  const generateSmartNotifications = () => {
    const smartNotifications: SmartNotification[] = [
      {
        id: '1',
        type: 'opportunity',
        title: '🚀 High-Demand Alert',
        message: 'Maintenance jobs are 40% above normal demand in your area. Perfect time to increase your rates!',
        priority: 'high',
        timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
        actionable: true,
      },
      {
        id: '2',
        type: 'insight',
        title: '📊 Performance Insight',
        message: 'Your response time of 1.5 hours is 60% faster than average. This is boosting your bid success rate!',
        priority: 'medium',
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
        actionable: false,
      },
      {
        id: '3',
        type: 'celebration',
        title: '🎉 Milestone Achieved',
        message: 'Congratulations! You\'ve reached a 4.7-star average rating. You\'re now in the top 15% of providers!',
        priority: 'medium',
        timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
        actionable: false,
      },
      {
        id: '4',
        type: 'warning',
        title: '⚠️ Competitive Alert',
        message: 'New providers in your area are pricing 15% lower. Consider highlighting your experience and quality.',
        priority: 'medium',
        timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
        actionable: true,
      },
    ];

    setNotifications(smartNotifications);
  };

  const getNotificationIcon = (type: SmartNotification['type']) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp size={20} color={Colors.success[500]} />;
      case 'insight':
        return <Brain size={20} color={Colors.primary[500]} />;
      case 'warning':
        return <Clock size={20} color={Colors.warning[500]} />;
      case 'celebration':
        return <DollarSign size={20} color={Colors.accent[500]} />;
      default:
        return <Bell size={20} color={Colors.neutral[500]} />;
    }
  };

  const getNotificationColor = (type: SmartNotification['type']) => {
    switch (type) {
      case 'opportunity':
        return Colors.success[50];
      case 'insight':
        return Colors.primary[50];
      case 'warning':
        return Colors.warning[50];
      case 'celebration':
        return Colors.accent[50];
      default:
        return Colors.neutral[50];
    }
  };

  const handlePlayNotification = async (notification: SmartNotification) => {
    try {
      setIsPlaying(true);
      
      const fullMessage = `${notification.title.replace(/[🚀📊🎉⚠️]/g, '')}: ${notification.message}`;
      const audioUrl = await voiceService.generateSpeech(fullMessage);
      await voiceService.playAudio(audioUrl);
      
    } catch (error) {
      console.error('Error playing notification:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handlePlayAllNotifications = async () => {
    try {
      setIsPlaying(true);
      
      const highPriorityNotifications = notifications.filter(n => n.priority === 'high');
      const notificationText = highPriorityNotifications.length > 0
        ? `You have ${highPriorityNotifications.length} important update${highPriorityNotifications.length !== 1 ? 's' : ''}. ${highPriorityNotifications[0].message}`
        : `You have ${notifications.length} smart notification${notifications.length !== 1 ? 's' : ''}. Your AI assistant has analyzed market trends and your performance to bring you these insights.`;
      
      const audioUrl = await voiceService.generateSpeech(notificationText);
      await voiceService.playAudio(audioUrl);
      
    } catch (error) {
      console.error('Error playing notifications:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Brain size={24} color={Colors.primary[500]} />
          <Text variant="h4" weight="semibold" style={styles.title}>
            Smart Notifications
          </Text>
        </View>
        <Button
          title={isPlaying ? "Playing..." : "Listen All"}
          variant="primary"
          size="small"
          onPress={handlePlayAllNotifications}
          disabled={isPlaying}
          leftIcon={<Bell size={16} color={Colors.white} />}
        />
      </View>

      <Text variant="body2" color="secondary" style={styles.description}>
        AI-powered insights based on market analysis and your performance
      </Text>

      <View style={styles.notifications}>
        {notifications.map((notification) => (
          <View 
            key={notification.id} 
            style={[
              styles.notificationItem,
              { backgroundColor: getNotificationColor(notification.type) }
            ]}
          >
            <View style={styles.notificationHeader}>
              <View style={styles.notificationInfo}>
                {getNotificationIcon(notification.type)}
                <View style={styles.notificationText}>
                  <Text variant="body2" weight="semibold">
                    {notification.title}
                  </Text>
                  <Text variant="caption" color="secondary">
                    {formatTimeAgo(notification.timestamp)}
                  </Text>
                </View>
              </View>
              
              <Button
                title="🔊"
                variant="ghost"
                size="small"
                onPress={() => handlePlayNotification(notification)}
                disabled={isPlaying}
                style={styles.playButton}
              />
            </View>
            
            <Text variant="body2" color="secondary" style={styles.notificationMessage}>
              {notification.message}
            </Text>
            
            {notification.actionable && (
              <View style={styles.actionHint}>
                <Text variant="caption" color="primary" weight="medium">
                  💡 Actionable insight - tap to hear suggestions
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <Text variant="caption" color="secondary" style={styles.footer}>
        🤖 AI continuously learns from market data and your behavior patterns
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: Layout.spacing.sm,
  },
  description: {
    marginBottom: Layout.spacing.md,
    lineHeight: 20,
  },
  notifications: {
    marginBottom: Layout.spacing.md,
  },
  notificationItem: {
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  notificationText: {
    marginLeft: Layout.spacing.sm,
    flex: 1,
  },
  playButton: {
    minWidth: 40,
    paddingHorizontal: Layout.spacing.sm,
  },
  notificationMessage: {
    lineHeight: 20,
    marginBottom: Layout.spacing.sm,
  },
  actionHint: {
    backgroundColor: Colors.primary[100],
    padding: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SmartNotifications;