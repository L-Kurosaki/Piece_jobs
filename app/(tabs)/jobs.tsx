import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, Filter, MapPin, Clock, DollarSign, Star } from 'lucide-react-native';

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cleaning', 'Gardening', 'Maintenance', 'Delivery'];
  
  const jobs = [
    {
      id: '1',
      title: 'Deep Clean 3-Bedroom House',
      category: 'Cleaning',
      description: 'Professional deep cleaning needed for move-out. Kitchen, bathrooms, and all rooms.',
      location: 'Cape Town',
      budget: 'R400-700',
      duration: '5h',
      rating: 4.8,
      bids: 3,
      image: 'https://images.pexels.com/photos/4107268/pexels-photo-4107268.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '2 hours ago',
    },
    {
      id: '2',
      title: 'Garden Maintenance & Landscaping',
      category: 'Gardening',
      description: 'Monthly garden maintenance including lawn mowing, hedge trimming, and flower bed care.',
      location: 'Johannesburg',
      budget: 'R250-400',
      duration: '3h',
      rating: 4.9,
      bids: 5,
      image: 'https://images.pexels.com/photos/1159693/pexels-photo-1159693.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '4 hours ago',
    },
    {
      id: '3',
      title: 'Plumbing Repair - Kitchen Sink',
      category: 'Maintenance',
      description: 'Kitchen sink leak needs immediate attention. Customer available all day.',
      location: 'Durban',
      budget: 'R300-500',
      duration: '2h',
      rating: 4.7,
      bids: 2,
      image: 'https://images.pexels.com/photos/5331071/pexels-photo-5331071.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '1 hour ago',
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Jobs</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#0077B6" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.jobsList} showsVerticalScrollIndicator={false}>
        {filteredJobs.map((job) => (
          <TouchableOpacity key={job.id} style={styles.jobCard}>
            <Image source={{ uri: job.image }} style={styles.jobImage} />
            
            <View style={styles.jobContent}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Open</Text>
                </View>
              </View>
              
              <Text style={styles.jobCategory}>{job.category}</Text>
              <Text style={styles.jobDescription} numberOfLines={2}>
                {job.description}
              </Text>
              
              <View style={styles.jobDetails}>
                <View style={styles.jobDetail}>
                  <MapPin size={14} color="#666" />
                  <Text style={styles.jobDetailText}>{job.location}</Text>
                </View>
                <View style={styles.jobDetail}>
                  <Clock size={14} color="#666" />
                  <Text style={styles.jobDetailText}>{job.duration}</Text>
                </View>
                <View style={styles.jobDetail}>
                  <DollarSign size={14} color="#666" />
                  <Text style={styles.jobDetailText}>{job.budget}</Text>
                </View>
              </View>
              
              <View style={styles.jobFooter}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#FFB800" fill="#FFB800" />
                  <Text style={styles.rating}>{job.rating}</Text>
                  <Text style={styles.bidsText}>• {job.bids} bids</Text>
                </View>
                <Text style={styles.postedTime}>{job.postedTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#0077B6',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  jobsList: {
    flex: 1,
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  jobImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
  },
  jobContent: {
    padding: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#2E7D32',
  },
  jobCategory: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#0077B6',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginLeft: 4,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginLeft: 4,
  },
  bidsText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginLeft: 4,
  },
  postedTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
});