import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../ui/Text';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react-native';

interface JobTimerProps {
  startTime: number;
  expectedDuration: number; // in hours
  maxDuration?: number; // in hours, defaults to 5
  onWarning?: () => void;
  onOverdue?: () => void;
}

export const JobTimer: React.FC<JobTimerProps> = ({
  startTime,
  expectedDuration,
  maxDuration = 5,
  onWarning,
  onOverdue,
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [hasWarned, setHasWarned] = useState(false);
  const [hasTriggeredOverdue, setHasTriggeredOverdue] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const elapsedMs = currentTime - startTime;
  const elapsedHours = elapsedMs / (1000 * 60 * 60);
  const elapsedMinutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
  const elapsedSeconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);

  const warningThreshold = expectedDuration - 0.5; // 30 minutes before expected end
  const isWarning = elapsedHours >= warningThreshold && elapsedHours < maxDuration;
  const isOverdue = elapsedHours >= maxDuration;
  const isCompleted = false; // This would come from job status

  // Trigger callbacks
  useEffect(() => {
    if (isWarning && !hasWarned && onWarning) {
      setHasWarned(true);
      onWarning();
    }
  }, [isWarning, hasWarned, onWarning]);

  useEffect(() => {
    if (isOverdue && !hasTriggeredOverdue && onOverdue) {
      setHasTriggeredOverdue(true);
      onOverdue();
    }
  }, [isOverdue, hasTriggeredOverdue, onOverdue]);

  const getStatusBadge = () => {
    if (isCompleted) {
      return <Badge label="Completed" variant="success" />;
    }
    if (isOverdue) {
      return <Badge label="Overdue - Security Notified" variant="error" />;
    }
    if (isWarning) {
      return <Badge label="Approaching Time Limit" variant="warning" />;
    }
    return <Badge label="In Progress" variant="primary" />;
  };

  const getStatusIcon = () => {
    if (isCompleted) {
      return <CheckCircle2 size={20} color={Colors.success[500]} />;
    }
    if (isOverdue || isWarning) {
      return <AlertTriangle size={20} color={isOverdue ? Colors.error[500] : Colors.warning[500]} />;
    }
    return <Clock size={20} color={Colors.primary[500]} />;
  };

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    const h = Math.floor(hours);
    const m = minutes;
    const s = seconds;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card style={[styles.card, isOverdue && styles.overdueCard]}>
      <View style={styles.header}>
        {getStatusIcon()}
        <Text variant="h4" weight="semibold" style={styles.title}>
          Job Timer
        </Text>
        {getStatusBadge()}
      </View>

      <View style={styles.timeDisplay}>
        <Text variant="h2" weight="bold" color={isOverdue ? 'error' : 'primary'}>
          {formatTime(elapsedHours, elapsedMinutes, elapsedSeconds)}
        </Text>
        <Text variant="body2" color="secondary">
          Elapsed Time
        </Text>
      </View>

      <View style={styles.progressInfo}>
        <View style={styles.progressRow}>
          <Text variant="body2" color="secondary">Expected Duration:</Text>
          <Text variant="body2" weight="medium">
            {expectedDuration}h
          </Text>
        </View>
        
        <View style={styles.progressRow}>
          <Text variant="body2" color="secondary">Maximum Duration:</Text>
          <Text variant="body2" weight="medium">
            {maxDuration}h
          </Text>
        </View>

        <View style={styles.progressRow}>
          <Text variant="body2" color="secondary">Progress:</Text>
          <Text variant="body2" weight="medium" color={isOverdue ? 'error' : 'primary'}>
            {((elapsedHours / expectedDuration) * 100).toFixed(0)}%
          </Text>
        </View>
      </View>

      {isWarning && !isOverdue && (
        <View style={styles.warningMessage}>
          <AlertTriangle size={16} color={Colors.warning[500]} />
          <Text variant="body2" color="warning" style={styles.warningText}>
            Job is approaching the expected completion time
          </Text>
        </View>
      )}

      {isOverdue && (
        <View style={styles.overdueMessage}>
          <AlertTriangle size={16} color={Colors.error[500]} />
          <Text variant="body2" color="error" style={styles.overdueText}>
            Job has exceeded maximum duration. Security services have been automatically notified.
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  overdueCard: {
    borderColor: Colors.error[300],
    backgroundColor: Colors.error[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
  },
  title: {
    flex: 1,
    marginLeft: Layout.spacing.sm,
  },
  timeDisplay: {
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  progressInfo: {
    marginBottom: Layout.spacing.md,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xs,
  },
  warningMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning[50],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginTop: Layout.spacing.sm,
  },
  warningText: {
    marginLeft: Layout.spacing.xs,
    flex: 1,
  },
  overdueMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.error[100],
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    marginTop: Layout.spacing.sm,
  },
  overdueText: {
    marginLeft: Layout.spacing.xs,
    flex: 1,
  },
});

export default JobTimer;