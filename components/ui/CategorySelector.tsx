import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Text from './Text';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { JobCategory } from '../../types/Job';

interface CategoryItem {
  id: JobCategory;
  label: string;
  icon: React.ReactNode;
}

interface CategorySelectorProps {
  categories: CategoryItem[];
  selectedCategory: JobCategory | null;
  onSelectCategory: (category: JobCategory | null) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategory === null && styles.selectedItem,
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <View
          style={[
            styles.iconContainer,
            selectedCategory === null && styles.selectedIconContainer,
          ]}
        >
          {/* All icon */}
        </View>
        <Text
          variant="body2"
          weight={selectedCategory === null ? 'semibold' : 'regular'}
          color={selectedCategory === null ? 'primary' : 'secondary'}
          style={styles.categoryLabel}
        >
          All
        </Text>
      </TouchableOpacity>

      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategory === category.id && styles.selectedItem,
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <View
            style={[
              styles.iconContainer,
              selectedCategory === category.id && styles.selectedIconContainer,
            ]}
          >
            {category.icon}
          </View>
          <Text
            variant="body2"
            weight={selectedCategory === category.id ? 'semibold' : 'regular'}
            color={selectedCategory === category.id ? 'primary' : 'secondary'}
            style={styles.categoryLabel}
          >
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: Layout.spacing.sm,
    width: 80,
  },
  selectedItem: {
    
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  selectedIconContainer: {
    backgroundColor: Colors.primary[100],
  },
  categoryLabel: {
    textAlign: 'center',
  },
});

export default CategorySelector;