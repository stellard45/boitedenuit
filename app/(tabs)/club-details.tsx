import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MapPin, Star, DollarSign, Heart, Share2, Phone, Clock, Users } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { mockClubs, mockEvents } from '@/data/mockData';

export default function ClubDetailsScreen() {
  const { clubId } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  
  // Find the club by ID
  const club = mockClubs.find(c => c.id === clubId);
  
  if (!club) {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Club non trouvé</Text>
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

  // Find events for this club
  const clubEvents = mockEvents.filter(event => event.club.id === club.id);

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    Alert.alert(
      isLiked ? 'Retiré des favoris' : 'Ajouté aux favoris',
      isLiked ? 'Club retiré de vos favoris' : 'Club ajouté à vos favoris'
    );
  };

  const handleShare = () => {
    Alert.alert('Partager', 'Partage du club sur les réseaux sociaux');
  };

  const handleCall = () => {
    Alert.alert('Appeler', `Appel vers ${club.name}`);
  };

  const handleEventPress = (eventId: string) => {
    router.push({
      pathname: '/(tabs)/event-details',
      params: { eventId }
    });
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: club.image }} style={styles.clubImage} />
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

          {/* Club Title Overlay */}
          <View style={styles.titleOverlay}>
            <Text style={styles.clubTitle}>{club.name}</Text>
            <View style={styles.clubMeta}>
              <View style={styles.ratingContainer}>
                <Star size={16} color={Colors.warning} fill={Colors.warning} />
                <Text style={styles.rating}>{club.rating}</Text>
                <Text style={styles.reviewCount}>({club.reviewCount} avis)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          
          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoCard}>
              <MapPin size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Adresse</Text>
                <Text style={styles.infoText}>{club.address}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <DollarSign size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Gamme de prix</Text>
                <Text style={styles.infoText}>{club.priceRange}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.infoCard} onPress={handleCall}>
              <Phone size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Appeler</Text>
                <Text style={styles.infoText}>Réservations</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Music Genres */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Styles musicaux</Text>
            <View style={styles.genresContainer}>
              {club.musicGenres.map((genre, index) => (
                <View key={index} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Équipements & Services</Text>
            <View style={styles.featuresContainer}>
              {club.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureBullet}>•</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Dress Code */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Code vestimentaire</Text>
            <View style={styles.dressCodeCard}>
              <Text style={styles.dressCodeText}>{club.dressCode}</Text>
            </View>
          </View>

          {/* Upcoming Events */}
          {clubEvents.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Événements à venir</Text>
              {clubEvents.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => handleEventPress(event.id)}
                >
                  <Image source={{ uri: event.image }} style={styles.eventImage} />
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle} numberOfLines={2}>
                      {event.title}
                    </Text>
                    <View style={styles.eventMeta}>
                      <Clock size={14} color={Colors.textMuted} />
                      <Text style={styles.eventDate}>
                        {new Date(event.date).toLocaleDateString('fr-FR', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        })} • {event.time}
                      </Text>
                    </View>
                    <View style={styles.eventFooter}>
                      <Text style={styles.eventDj}>{event.dj}</Text>
                      <Text style={styles.eventPrice}>À partir de {event.price.guestList}€</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => Alert.alert('Réservation', 'Réservation directe au club')}
            >
              <Text style={styles.primaryButtonText}>Réserver une table</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => Alert.alert('Itinéraire', 'Ouverture de l\'application de cartes')}
            >
              <MapPin size={18} color={Colors.primary} />
              <Text style={styles.secondaryButtonText}>Itinéraire</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
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
  clubImage: {
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
  clubTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginBottom: 8,
  },
  clubMeta: {
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
  reviewCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    marginLeft: 4,
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  quickInfo: {
    marginBottom: 32,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginBottom: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  genreText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  featuresContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
    marginRight: 8,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
  },
  dressCodeCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dressCodeText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    textAlign: 'center',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginLeft: 4,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDj: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  eventPrice: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  actionButtons: {
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
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