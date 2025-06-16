import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Star, DollarSign } from 'lucide-react-native';
import { Club } from '@/types';
import Colors from '@/constants/Colors';

interface ClubCardProps {
  club: Club;
  onPress?: () => void;
}

export default function ClubCard({ club, onPress }: ClubCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: club.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{club.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={12} color={Colors.warning} fill={Colors.warning} />
            <Text style={styles.rating}>{club.rating}</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={12} color={Colors.textMuted} />
          <Text style={styles.neighborhood} numberOfLines={1}>{club.neighborhood}</Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <DollarSign size={12} color={Colors.primary} />
            <Text style={styles.priceRange}>{club.priceRange}</Text>
          </View>
          
          <Text style={styles.reviewCount}>{club.reviewCount} avis</Text>
        </View>
        
        <View style={styles.genresContainer}>
          {club.musicGenres.slice(0, 2).map((genre, index) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginRight: 16,
    width: 200,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  rating: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
    marginLeft: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  neighborhood: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginLeft: 4,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceRange: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
    marginLeft: 2,
  },
  reviewCount: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: Colors.textSecondary,
  },
});