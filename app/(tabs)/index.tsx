import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  TrendingUp, 
  Star, 
  MapPin, 
  Clock,
  ChevronRight,
  Zap,
  Award,
  Users
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const featuredItems = [
    {
      id: 1,
      title: 'Mountain Adventure',
      location: 'Swiss Alps',
      rating: 4.9,
      reviews: 234,
      price: '$299',
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Adventure'
    },
    {
      id: 2,
      title: 'City Photography Tour',
      location: 'New York',
      rating: 4.8,
      reviews: 156,
      price: '$89',
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Photography'
    },
    {
      id: 3,
      title: 'Sunset Beach Yoga',
      location: 'Bali',
      rating: 4.9,
      reviews: 89,
      price: '$45',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wellness'
    }
  ];

  const categories = [
    { icon: <TrendingUp size={24} color="#6366f1" />, name: 'Trending', count: '120+' },
    { icon: <Zap size={24} color="#f59e0b" />, name: 'Quick', count: '45+' },
    { icon: <Award size={24} color="#10b981" />, name: 'Premium', count: '78+' },
    { icon: <Users size={24} color="#ef4444" />, name: 'Groups', count: '92+' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.username}>Welcome back, Alex</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Discover Amazing Experiences</Text>
            <Text style={styles.heroSubtitle}>
              Find unique activities and adventures near you
            </Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Explore Now</Text>
              <ChevronRight size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400' }}
            style={styles.heroImage}
          />
        </LinearGradient>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={styles.categoryIcon}>
                  {category.icon}
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
          >
            {featuredItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.featuredCard}>
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
                <View style={styles.featuredOverlay}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{item.category}</Text>
                  </View>
                </View>
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>{item.title}</Text>
                  <View style={styles.featuredLocation}>
                    <MapPin size={14} color="#6b7280" />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                  <View style={styles.featuredFooter}>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#fbbf24" fill="#fbbf24" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                      <Text style={styles.reviewsText}>({item.reviews})</Text>
                    </View>
                    <Text style={styles.priceText}>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Clock size={24} color="#6366f1" />
              <Text style={styles.quickActionText}>Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Heart size={24} color="#ef4444" />
              <Text style={styles.quickActionText}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <MapPin size={24} color="#10b981" />
              <Text style={styles.quickActionText}>Near Me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginTop: 2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  heroCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  heroContent: {
    flex: 1,
    paddingRight: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    fontFamily: 'Inter-Regular',
    marginBottom: 20,
    lineHeight: 22,
  },
  heroButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#6366f1',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  seeAllText: {
    color: '#6366f1',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: (width - 60) / 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  featuredScroll: {
    paddingRight: 20,
  },
  featuredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  featuredOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  categoryBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  featuredLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginLeft: 2,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
    fontFamily: 'Inter-Bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginTop: 8,
  },
});