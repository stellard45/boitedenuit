import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MapPin, Clock, Users, Star, Heart, Share2, Calendar, CreditCard } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { mockEvents } from '@/data/mockData';

export default function EventDetailsScreen() {
  const { eventId } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState('guestList');
  
  // Find the event by ID
  const event = mockEvents.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Événement non trouvé</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    Alert.alert(
      isLiked ? 'Retiré des favoris' : 'Ajouté aux favoris',
      isLiked ? 'Événement retiré de vos favoris' : 'Événement ajouté à vos favoris'
    );
  };

  const handleShare = () => {
    Alert.alert('Partager', 'Partage de l\'événement sur les réseaux sociaux');
  };

  const handleBook = () => {
    router.push({
      pathname: '/(tabs)/booking-flow',
      params: { 
        eventId: event.id,
        ticketType: selectedTicketType 
      }
    });
  };

  const handleClubPress = () => {
    router.push({
      pathname: '/(tabs)/club-details',
      params: { clubId: event.club.id }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const ticketTypes = [
    { id: 'guestList', name: 'Guest List', price: event.price.guestList, available: event.isGuestListAvailable },
    { id: 'regular', name: 'Entrée Standard', price: event.price.regular, available: true },
    { id: 'vip', name: 'VIP', price: event.price.vip, available: event.isVipAvailable },
  ];

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}
          />
          
          {/* Header Actions */}
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleBack}>
              <ArrowLeft size={24} color={Colors.text} />
            </TouchableOpacity>
            <View style={styles.rightActions}>
              <TouchableOpacity 
                style={[styles.actionButton, isLiked && styles.actionButtonActive]} 
                onPress={handleLike}
              >
                <Heart 
                  size={24} 
                  color={isLiked ? Colors.neonPink : Colors.text}
                  fill={isLiked ? Colors.neonPink : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Share2 size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Event Title Overlay */}
          <View style={styles.titleOverlay}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.eventMeta}>
              <View style={styles.ratingContainer}>
                <Star size={16} color={Colors.warning} fill={Colors.warning} />
                <Text style={styles.rating}>{event.club.rating}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          
          {/* Event Info */}
          <View style={styles.eventInfo}>
            <TouchableOpacity style={styles.clubInfo} onPress={handleClubPress}>
              <View style={styles.clubDetails}>
                <Text style={styles.clubName}>{event.club.name}</Text>
                <View style={styles.locationInfo}>
                  <MapPin size={14} color={Colors.textMuted} />
                  <Text style={styles.locationText}>{event.club.neighborhood}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.eventDetails}>
              <View style={styles.detailRow}>
                <Calendar size={18} color={Colors.primary} />
                <Text style={styles.detailText}>{formatDate(event.date)}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Clock size={18} color={Colors.primary} />
                <Text style={styles.detailText}>{event.time}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Users size={18} color={Colors.primary} />
                <Text style={styles.detailText}>
                  {event.attendees}/{event.capacity} participants
                </Text>
              </View>
            </View>
          </View>

          {/* DJ Info */}
          <View style={styles.djSection}>
            <Text style={styles.sectionTitle}>DJ & Musique</Text>
            <View style={styles.djInfo}>
              <Text style={styles.djName}>{event.dj}</Text>
              <Text style={styles.musicGenre}>{event.musicGenre}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {event.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Ticket Selection */}
          <View style={styles.ticketSection}>
            <Text style={styles.sectionTitle}>Choisir votre ticket</Text>
            {ticketTypes.map((ticket) => (
              <TouchableOpacity
                key={ticket.id}
                style={[
                  styles.ticketOption,
                  selectedTicketType === ticket.id && styles.ticketOptionSelected,
                  !ticket.available && styles.ticketOptionDisabled
                ]}
                onPress={() => ticket.available && setSelectedTicketType(ticket.id)}
                disabled={!ticket.available}
              >
                <View style={styles.ticketInfo}>
                  <Text style={[
                    styles.ticketName,
                    !ticket.available && styles.ticketNameDisabled
                  ]}>
                    {ticket.name}
                  </Text>
                  {!ticket.available && (
                    <Text style={styles.unavailableText}>Non disponible</Text>
                  )}
                </View>
                <Text style={[
                  styles.ticketPrice,
                  !ticket.available && styles.ticketPriceDisabled
                ]}>
                  {ticket.price}€
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Booking Button */}
      <View style={styles.bookingFooter}>
        <View style={styles.priceInfo}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            {ticketTypes.find(t => t.id === selectedTicketType)?.price}€
          </Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <CreditCard size={20} color={Colors.text} />
          <Text style={styles.bookButtonText}>Réserver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerActions: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 12,
    marginLeft: 12,
  },
  actionButtonActive: {
    backgroundColor: 'rgba(233,30,99,0.3)',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  eventTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  eventInfo: {
    marginBottom: 32,
  },
  clubInfo: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clubDetails: {
    flex: 1,
  },
  clubName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginLeft: 6,
  },
  eventDetails: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    marginLeft: 12,
  },
  djSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginBottom: 16,
  },
  djInfo: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  djName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary,
    marginBottom: 4,
  },
  musicGenre: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  descriptionSection: {
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  tagsSection: {
    marginBottom: 32,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  ticketSection: {
    marginBottom: 32,
  },
  ticketOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ticketOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  ticketOptionDisabled: {
    opacity: 0.5,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 2,
  },
  ticketNameDisabled: {
    color: Colors.textMuted,
  },
  unavailableText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.error,
  },
  ticketPrice: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary,
  },
  ticketPriceDisabled: {
    color: Colors.textMuted,
  },
  bookingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  priceInfo: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: Colors.error,
    textAlign: 'center',
    marginTop: 50,
  },
  backButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  bottomSpacing: {
    height: 20,
  },
});