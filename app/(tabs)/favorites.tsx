import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { Heart, Star, MapPin, Trash2, Share } from 'lucide-react-native';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Mountain Adventure',
      location: 'Swiss Alps',
      rating: 4.9,
      reviews: 234,
      price: '$299',
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600',
      savedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Sunset Beach Yoga',
      location: 'Bali',
      rating: 4.9,
      reviews: 89,
      price: '$45',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=600',
      savedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'City Photography Tour',
      location: 'New York',
      rating: 4.8,
      reviews: 156,
      price: '$89',
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600',
      savedDate: '2 weeks ago'
    }
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSubtitle}>{favorites.length} saved experiences</Text>
      </View>

      {favorites.length > 0 ? (
        <ScrollView style={styles.favoritesList} showsVerticalScrollIndicator={false}>
          {favorites.map((item) => (
            <View key={item.id} style={styles.favoriteCard}>
              <Image source={{ uri: item.image }} style={styles.favoriteImage} />
              <View style={styles.favoriteContent}>
                <View style={styles.favoriteHeader}>
                  <Text style={styles.favoriteTitle}>{item.title}</Text>
                  <View style={styles.favoriteActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Share size={20} color="#6b7280" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => removeFavorite(item.id)}
                    >
                      <Trash2 size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
                
                <View style={styles.favoriteFooter}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.reviewsText}>({item.reviews})</Text>
                  </View>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
                
                <Text style={styles.savedDate}>Saved {item.savedDate}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Heart size={64} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            Start exploring and save experiences you love
          </Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  favoritesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  favoriteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  favoriteImage: {
    width: '100%',
    height: 160,
  },
  favoriteContent: {
    padding: 16,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    flex: 1,
    marginRight: 12,
  },
  favoriteActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    backgroundColor: '#f3f4f6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  locationRow: {
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
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  savedDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Inter-Regular',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});