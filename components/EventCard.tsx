import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Star, Users, Clock } from 'lucide-react-native';
import { Event } from '@/types';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getStatusColor = () => {
    const attendanceRate = event.attendees / event.capacity;
    if (attendanceRate > 0.8) return Colors.neonPink;
    if (attendanceRate > 0.5) return Colors.warning;
    return Colors.success;
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, GlobalStyles.cardGlow]}>
      <View style={styles.card}>
        <Image source={{ uri: event.image }} style={styles.image} />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.imageOverlay}
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color={Colors.warning} fill={Colors.warning} />
              <Text style={styles.rating}>{event.club.rating}</Text>
            </View>
          </View>
          
          <View style={styles.venueInfo}>
            <MapPin size={14} color={Colors.textMuted} />
            <Text style={styles.venueName} numberOfLines={1}>{event.club.name}</Text>
            <Text style={styles.neighborhood}>• {event.club.neighborhood}</Text>
          </View>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Clock size={14} color={Colors.textMuted} />
              <Text style={styles.detailText}>
                {formatDate(event.date)} • {event.time}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Users size={14} color={getStatusColor()} />
              <Text style={[styles.detailText, { color: getStatusColor() }]}>
                {event.attendees}/{event.capacity}
              </Text>
            </View>
          </View>
          
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>À partir de</Text>
              <Text style={styles.price}>{event.price.guestList}€</Text>
            </View>
            
            <View style={styles.tagsContainer}>
              {event.tags.slice(0, 2).map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.djInfo}>
            <Text style={styles.djLabel}>DJ:</Text>
            <Text style={styles.djName}>{event.dj}</Text>
            <Text style={styles.genre}>• {event.musicGenre}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
    marginLeft: 4,
  },
  venueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  venueName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
  neighborhood: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginLeft: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginRight: 6,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tagText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  djInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  djLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  djName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginLeft: 6,
  },
  genre: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
});