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
import { Camera, Upload, MapPin, Clock, DollarSign, X } from 'lucide-react-native';
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
  const [location, setLocation] = useState('');
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

  const handleSubmit = () => {
    // Validate input
    if (!title || !description || !category || !location || !duration || !minBudget || !maxBudget) {
      Alert.alert('Missing Information', 'Please fill in all the required fields.');
      return;
    }

    if (images.length === 0) {
      Alert.alert('Image Required', 'Please add at least one image of the job.');
      return;
    }

    setLoading(true);

    // In a real app, we would submit the form to an API
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Job Posted Successfully',
        'Your job has been posted and is now visible to service providers.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Reset form
              setTitle('');
              setDescription('');
              setCategory('');
              setLocation('');
              setDuration('');
              setMinBudget('');
              setMaxBudget('');
              setImages([]);
            } 
          }
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="h3" weight="bold">
            Post a New Job
          </Text>
          <Text variant="body1" color="secondary" style={styles.subtitle}>
            Fill in the details of your job and wait for bids from service providers.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.imageSection}>
            <Text variant="body1" weight="semibold">
              Job Photos
            </Text>
            <Text variant="body2" color="secondary" style={styles.imageInstructions}>
              Upload photos of the job site to help providers understand the work required.
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
              
              {images.length < 3 && (
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

          <Input
            label="Job Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., House Cleaning, Garden Maintenance"
          />

          <Text variant="body1" weight="semibold" style={styles.fieldLabel}>
            Category
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
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the job in detail"
            multiline
            numberOfLines={4}
          />

          <Input
            label="Location"
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your address"
            leftIcon={<MapPin size={20} color={Colors.neutral[500]} />}
          />

          <Input
            label="Expected Duration (hours)"
            value={duration}
            onChangeText={setDuration}
            placeholder="e.g., 3"
            keyboardType="numeric"
            leftIcon={<Clock size={20} color={Colors.neutral[500]} />}
          />

          <View style={styles.budgetContainer}>
            <Text variant="body1" weight="semibold" style={styles.fieldLabel}>
              Budget Range (ZAR)
            </Text>
            <View style={styles.budgetInputs}>
              <Input
                label="Min"
                value={minBudget}
                onChangeText={setMinBudget}
                placeholder="e.g., 200"
                keyboardType="numeric"
                leftIcon={<DollarSign size={20} color={Colors.neutral[500]} />}
                style={styles.budgetInput}
              />
              <Input
                label="Max"
                value={maxBudget}
                onChangeText={setMaxBudget}
                placeholder="e.g., 400"
                keyboardType="numeric"
                leftIcon={<DollarSign size={20} color={Colors.neutral[500]} />}
                style={styles.budgetInput}
              />
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
    paddingBottom: 100, // Extra padding for footer
  },
  header: {
    padding: Layout.spacing.lg,
  },
  subtitle: {
    marginTop: Layout.spacing.xs,
  },
  form: {
    padding: Layout.spacing.lg,
    paddingTop: 0,
  },
  imageSection: {
    marginBottom: Layout.spacing.lg,
  },
  imageInstructions: {
    marginTop: Layout.spacing.xs,
    marginBottom: Layout.spacing.md,
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
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.lg,
  },
  categoryButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.neutral[100],
    marginRight: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  selectedCategory: {
    backgroundColor: Colors.primary[500],
  },
  budgetContainer: {
    marginBottom: Layout.spacing.lg,
  },
  budgetInputs: {
    flexDirection: 'row',
  },
  budgetInput: {
    flex: 1,
    marginRight: Layout.spacing.md,
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