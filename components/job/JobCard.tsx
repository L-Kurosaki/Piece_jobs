import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Job } from '../../types/Job';
import Text from '../ui/Text';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { MapPin, Clock, Banknote, User, Calendar, Eye, MessageSquare } from 'lucide-react-native';

interface JobCardProps {
  job: Job;
  onPress: () => void;
  showBidButton?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress, showBidButton = false }) => {
  const getStatusBadge = () => {
    switch (job.status) {
      case 'pending':
        return <Badge label="Open for Bids" variant="success" />;
      case 'accepted':
        return <Badge label="Accepted" variant="primary" />;
      case 'in-progress':
        return <Badge label="In Progress" variant="primary" />;
      case 'completed':
        return <Badge label="Completed" variant="neutral" />;
      case 'cancelled':
        return <Badge label="Cancelled" variant="error" />;
      default:
        return null;
    }
  };

  const getCategoryBadge = () => {
    switch (job.category) {
      case 'cleaning':
        return <Badge label="Cleaning" variant="secondary" />;
      case 'gardening':
        return <Badge label="Gardening" variant="secondary" />;
      case 'maintenance':
        return <Badge label="Maintenance" variant="secondary" />;
      case 'delivery':
        return <Badge label="Delivery" variant="secondary" />;
      case 'moving':
        return <Badge label="Moving" variant="secondary" />;
      case 'cooking':
        return <Badge label="Cooking" variant="secondary" />;
      default:
        return <Badge label="Other" variant="secondary" />;
    }
  };

  // Format the posted date
  const getPostedDate = () => {
    const now = Date.now();
    const diffInHours = Math.floor((now - job.postedAt) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleCardPress = () => {
    if (!showBidButton) {
      onPress();
    }
  };

  return (
    <Card onPress={handleCardPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: job.images[0] }} style={styles.image} />
        <View style={styles.badgeContainer}>
          {getStatusBadge()}
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text variant="h4" weight="semibold" numberOfLines={1} style={styles.title}>
            {job.title}
          </Text>
          {getCategoryBadge()}
        </View>
        
        <Text variant="body2" color="secondary" numberOfLines={2} style={styles.description}>
          {job.description}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={Colors.primary[500]} />
            <Text variant="body2" color="secondary" style={styles.detailText}>
              {job.location.displayDistance ? '< 2 km away' : job.location.address}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.primary[500]} />
            <Text variant="body2" color="secondary" style={styles.detailText}>
              ~{job.expectedDuration}h
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Banknote size={16} color={Colors.primary[500]} />
            <Text variant="body2" color="secondary" style={styles.detailText}>
              R{job.budget.min} - R{job.budget.max}
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.userInfo}>
            <Avatar
              source={job.bids.length > 0 ? job.bids[0].providerAvatar : undefined}
              initials={job.customerName.split(' ').map(n => n[0]).join('')}
              size="xs"
            />
            <Text variant="caption" color="secondary" style={styles.userName}>
              {job.bids.length > 0 ? `${job.bids.length} bid${job.bids.length !== 1 ? 's' : ''}` : 'No bids yet'}
            </Text>
          </View>
          
          <View style={styles.timeInfo}>
            <Calendar size={12} color={Colors.neutral[500]} />
            <Text variant="caption" color="secondary" style={styles.timeText}>
              {getPostedDate()}
            </Text>
          </View>
        </View>

        {showBidButton && job.status === 'pending' && (
          <View style={styles.actionButtons}>
            <Button
              title="View Details"
              variant="outline"
              size="small"
              onPress={onPress}
              leftIcon={<Eye size={16} color={Colors.primary[500]} />}
              style={styles.actionButton}
            />
            <Button
              title="Place Bid"
              variant="primary"
              size="small"
              onPress={onPress}
              leftIcon={<MessageSquare size={16} color={Colors.white} />}
              style={styles.actionButton}
            />
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.md,
    padding: 0,
    overflow: 'hidden',
    borderRadius: Layout.borderRadius.md,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.neutral[200],
  },
  badgeContainer: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
  },
  content: {
    padding: Layout.spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  title: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  description: {
    marginBottom: Layout.spacing.md,
  },
  details: {
    marginBottom: Layout.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  detailText: {
    marginLeft: Layout.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: Layout.spacing.xs,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
});

export default JobCard;