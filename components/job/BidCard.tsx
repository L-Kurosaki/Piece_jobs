import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Bid } from '../../types/Job';
import Text from '../ui/Text';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { Star, CircleCheck as CheckCircle2 } from 'lucide-react-native';

interface BidCardProps {
  bid: Bid;
  isAccepted?: boolean;
  onAccept?: () => void;
  onMessage?: () => void;
}

export const BidCard: React.FC<BidCardProps> = ({ 
  bid, 
  isAccepted = false,
  onAccept,
  onMessage,
}) => {
  // Format the bid timestamp
  const getFormattedTime = () => {
    const now = Date.now();
    const diffInHours = Math.floor((now - bid.timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <Card style={styles.card} elevation={isAccepted ? 'medium' : 'low'}>
      {isAccepted && (
        <View style={styles.acceptedBanner}>
          <CheckCircle2 size={16} color={Colors.white} />
          <Text variant="caption" color="white" weight="medium" style={styles.acceptedText}>
            Accepted Bid
          </Text>
        </View>
      )}
      
      <View style={styles.header}>
        <View style={styles.providerInfo}>
          <Avatar
            source={bid.providerAvatar}
            size="md"
            initials={bid.providerName.split(' ').map(n => n[0]).join('')}
          />
          <View style={styles.nameContainer}>
            <Text variant="body1" weight="semibold">
              {bid.providerName}
            </Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.warning[500]} fill={Colors.warning[500]} />
              <Text variant="body2" color="secondary" style={styles.ratingText}>
                {bid.rating.toFixed(1)} ({bid.completedJobs} jobs)
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text variant="h3" weight="bold" color="primary">
            R{bid.price}
          </Text>
          <Text variant="caption" color="secondary">
            {getFormattedTime()}
          </Text>
        </View>
      </View>
      
      <View style={styles.message}>
        <Text variant="body2" color="secondary">
          {bid.message}
        </Text>
      </View>
      
      {!isAccepted && onAccept && onMessage && (
        <View style={styles.actions}>
          <Button
            title="Accept Bid"
            variant="primary"
            onPress={onAccept}
            style={styles.acceptButton}
          />
          <Button
            title="Message"
            variant="outline"
            onPress={onMessage}
            style={styles.messageButton}
          />
        </View>
      )}
      
      {isAccepted && onMessage && (
        <View style={styles.actions}>
          <Button
            title="Message Provider"
            variant="primary"
            onPress={onMessage}
            fullWidth
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  acceptedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success[500],
    padding: Layout.spacing.sm,
    borderTopLeftRadius: Layout.borderRadius.md,
    borderTopRightRadius: Layout.borderRadius.md,
  },
  acceptedText: {
    marginLeft: Layout.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.md,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: Layout.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  message: {
    marginBottom: Layout.spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.sm,
  },
  acceptButton: {
    flex: 1,
    marginRight: Layout.spacing.sm,
  },
  messageButton: {
    flex: 1,
  },
});

export default BidCard;