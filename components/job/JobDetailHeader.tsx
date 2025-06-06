import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Job } from '../../types/Job';
import Text from '../ui/Text';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react-native';

interface JobDetailHeaderProps {
  job: Job;
}

export const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ job }) => {
  // Format the posted date
  const getPostedDate = () => {
    const date = new Date(job.postedAt);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getStatusBadge = () => {
    switch (job.status) {
      case 'pending':
        return <Badge label="Pending\" variant="warning\" size="medium" />;
      case 'accepted':
        return <Badge label="Accepted\" variant="primary\" size="medium" />;
      case 'in-progress':
        return <Badge label="In Progress\" variant="primary\" size="medium" />;
      case 'completed':
        return <Badge label="Completed\" variant="success\" size="medium" />;
      case 'cancelled':
        return <Badge label="Cancelled\" variant="error\" size="medium" />;
      default:
        return null;
    }
  };

  const getCategoryBadge = () => {
    switch (job.category) {
      case 'cleaning':
        return <Badge label="Cleaning\" variant="secondary" />;
      case 'gardening':
        return <Badge label="Gardening\" variant="secondary" />;
      case 'maintenance':
        return <Badge label="Maintenance\" variant="secondary" />;
      case 'delivery':
        return <Badge label="Delivery\" variant="secondary" />;
      case 'moving':
        return <Badge label="Moving\" variant="secondary" />;
      case 'cooking':
        return <Badge label="Cooking\" variant="secondary" />;
      default:
        return <Badge label="Other\" variant="secondary" />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageScroller}
      >
        {job.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
          />
        ))}
      </ScrollView>
      
      <View style={styles.statusContainer}>
        {getStatusBadge()}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text variant="h3" weight="bold" style={styles.title}>
            {job.title}
          </Text>
          {getCategoryBadge()}
        </View>
        
        <View style={styles.postedInfo}>
          <Avatar
            size="sm"
            initials={job.customerName.split(' ').map(n => n[0]).join('')}
          />
          <Text variant="body2" color="secondary" style={styles.postedBy}>
            Posted by {job.customerName}
          </Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MapPin size={18} color={Colors.primary[500]} />
            <Text variant="body2" style={styles.detailText}>
              {job.location.displayDistance ? '< 2 km away' : job.location.address}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={18} color={Colors.primary[500]} />
            <Text variant="body2" style={styles.detailText}>
              Expected: ~{job.expectedDuration} hours
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <DollarSign size={18} color={Colors.primary[500]} />
            <Text variant="body2" style={styles.detailText}>
              Budget: R{job.budget.min} - R{job.budget.max}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Calendar size={18} color={Colors.primary[500]} />
            <Text variant="body2" style={styles.detailText}>
              Posted: {getPostedDate()}
            </Text>
          </View>
        </View>
        
        <Text variant="body1" color="secondary" style={styles.description}>
          {job.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  imageScroller: {
    height: 240,
  },
  image: {
    width: Layout.window.width,
    height: 240,
    resizeMode: 'cover',
  },
  statusContainer: {
    position: 'absolute',
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    zIndex: 10,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
  },
  title: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  postedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  postedBy: {
    marginLeft: Layout.spacing.sm,
  },
  detailsContainer: {
    marginBottom: Layout.spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  detailText: {
    marginLeft: Layout.spacing.sm,
  },
  description: {
    lineHeight: 24,
  },
});

export default JobDetailHeader;