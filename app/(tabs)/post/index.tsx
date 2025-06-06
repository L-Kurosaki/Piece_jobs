import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  Platform,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/ui/Text';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import LocationPicker from '../../../components/ui/LocationPicker';
import { Camera, Upload, Clock, DollarSign, X, CheckCircle2 } from 'lucide-react-native';
import { JobCategory } from '../../../types/Job';

// Categories for selection
const categories: { value: JobCategory; label: string }[] = [
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'moving', label: 'Moving' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'other', label: 'Other' },
];

export default function PostJobScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<JobCategory | ''>('');
  const [location, setLocation] = useState<{ address: string; latitude: number; longitude: number } | null>(null);
  const [duration, setDuration] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validateForm = () => {
    if (!title.trim()) return 'Job title is required';
    if (!description.trim()) return 'Job description is required';
    if (!category) return 'Please select a category';
    if (!location) return 'Location is required';
    if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) return 'Valid duration is required';
    if (!minBudget || isNaN(Number(minBudget)) || Number(minBudget) <= 0) return 'Valid minimum budget is required';
    if (!maxBudget || isNaN(Number(maxBudget)) || Number(maxBudget) <= 0) return 'Valid maximum budget is required';
    if (Number(minBudget) >= Number(maxBudget)) return 'Maximum budget must be greater than minimum budget';
    if (images.length === 0) return 'At least one image is required';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Alert.alert('Validation Error', validationError);
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Job Posted Successfully! 🎉',
        'Your job has been posted and is now visible to service providers. You\'ll receive notifications when providers submit bids.',
        [
          { 
            text: 'View My Jobs', 
            onPress: () => {
              // Reset form
              setTitle('');
              setDescription('');
              setCategory('');
              setLocation(null);
              setDuration('');
              setMinBudget('');
              setMaxBudget('');
              setImages([]);
              // Navigate to jobs tab
            } 
          },
          {
            text: 'Post Another Job',
            onPress: () => {
              // Reset form
              setTitle('');
              setDescription('');
              setCategory('');
              setLocation(null);
              setDuration('');
              setMinBudget('');
              setMaxBudget('');
              setImages([]);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="h3" weight="bold">
            Post a New Job
          </Text>
          <Text variant="body1" color="secondary" style={styles.subtitle}>
            Describe your job clearly to attract the best service providers.
          </Text>
        </View>

        <View style={styles.form}>
          {/* Job Photos Section */}
          <View style={styles.section}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              Job Photos *
            </Text>
            <Text variant="body2" color="secondary" style={styles.sectionDescription}>
              Upload clear photos of the job site to help providers understand the work required.
            </Text>

            <View style={styles.imagesContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <X size={16} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              ))}
              
              {images.length < 5 && (
                <View style={styles.imageButtons}>
                  <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
                    <Upload size={24} color={Colors.primary[500]} />
                    <Text variant="body2" color="primary" style={styles.addImageText}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                  
                  {Platform.OS !== 'web' && (
                    <TouchableOpacity style={styles.addImageButton} onPress={takePhoto}>
                      <Camera size={24} color={Colors.primary[500]} />
                      <Text variant="body2" color="primary" style={styles.addImageText}>
                        Camera
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              Job Details
            </Text>

            <Input
              label="Job Title *"
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Deep Clean 3-Bedroom House"
              helper="Be specific about what needs to be done"
            />

            <View style={styles.categorySection}>
              <Text variant="body1" weight="semibold" style={styles.fieldLabel}>
                Category *
              </Text>
              <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[
                      styles.categoryButton,
                      category === cat.value && styles.selectedCategory,
                    ]}
                    onPress={() => setCategory(cat.value)}
                  >
                    <Text
                      variant="body2"
                      color={category === cat.value ? 'white' : 'secondary'}
                      weight={category === cat.value ? 'medium' : 'regular'}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input
              label="Description *"
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the job in detail, including any specific requirements or preferences..."
              multiline
              numberOfLines={4}
              helper="The more details you provide, the better bids you'll receive"
            />
          </View>

          {/* Location Section */}
          <View style={styles.section}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              Location *
            </Text>
            <LocationPicker
              onLocationSelect={setLocation}
              placeholder="Enter the job location"
            />
            {location && (
              <View style={styles.locationConfirm}>
                <CheckCircle2 size={16} color={Colors.success[500]} />
                <Text variant="body2" color="success" style={styles.locationText}>
                  Location set: {location.address}
                </Text>
              </View>
            )}
          </View>

          {/* Time and Budget */}
          <View style={styles.section}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              Time & Budget
            </Text>

            <Input
              label="Expected Duration (hours) *"
              value={duration}
              onChangeText={setDuration}
              placeholder="e.g., 3"
              keyboardType="numeric"
              leftIcon={<Clock size={20} color={Colors.neutral[500]} />}
              helper="How long do you estimate this job will take?"
            />

            <View style={styles.budgetContainer}>
              <Text variant="body1" weight="semibold" style={styles.fieldLabel}>
                Budget Range (ZAR) *
              </Text>
              <View style={styles.budgetInputs}>
                <Input
                  label="Minimum"
                  value={minBudget}
                  onChangeText={setMinBudget}
                  placeholder="200"
                  keyboardType="numeric"
                  leftIcon={<DollarSign size={20} color={Colors.neutral[500]} />}
                  style={styles.budgetInput}
                />
                <Input
                  label="Maximum"
                  value={maxBudget}
                  onChangeText={setMaxBudget}
                  placeholder="400"
                  keyboardType="numeric"
                  leftIcon={<DollarSign size={20} color={Colors.neutral[500]} />}
                  style={styles.budgetInput}
                />
              </View>
              <Text variant="caption" color="secondary">
                Set a realistic range to attract quality providers
              </Text>
            </View>
          </View>

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
              💡 Tips for Better Results
            </Text>
            <View style={styles.tipsList}>
              <Text variant="body2" color="secondary" style={styles.tipItem}>
                • Upload clear, well-lit photos from multiple angles
              </Text>
              <Text variant="body2" color="secondary" style={styles.tipItem}>
                • Be specific about your requirements and expectations
              </Text>
              <Text variant="body2" color="secondary" style={styles.tipItem}>
                • Set a fair budget range based on market rates
              </Text>
              <Text variant="body2" color="secondary" style={styles.tipItem}>
                • Respond quickly to bids to secure the best providers
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Post Job"
          variant="primary"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.primary[50],
  },
  subtitle: {
    marginTop: Layout.spacing.xs,
  },
  form: {
    padding: Layout.spacing.lg,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.xs,
  },
  sectionDescription: {
    marginBottom: Layout.spacing.md,
    lineHeight: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Layout.spacing.sm,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: Layout.borderRadius.md,
    marginRight: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.error[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtons: {
    flexDirection: 'row',
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  addImageText: {
    marginTop: Layout.spacing.xs,
  },
  fieldLabel: {
    marginBottom: Layout.spacing.xs,
  },
  categorySection: {
    marginBottom: Layout.spacing.lg,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.neutral[100],
    marginRight: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  selectedCategory: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  locationConfirm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.sm,
    padding: Layout.spacing.sm,
    backgroundColor: Colors.success[50],
    borderRadius: Layout.borderRadius.md,
  },
  locationText: {
    marginLeft: Layout.spacing.xs,
    flex: 1,
  },
  budgetContainer: {
    marginBottom: Layout.spacing.lg,
  },
  budgetInputs: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.xs,
  },
  budgetInput: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  tipsSection: {
    backgroundColor: Colors.neutral[50],
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  tipsList: {
    marginTop: Layout.spacing.sm,
  },
  tipItem: {
    marginBottom: Layout.spacing.xs,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
});