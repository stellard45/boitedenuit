import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { QrCode, Calendar, MapPin, Users, Star, Clock, Check, CircleAlert as AlertCircle, X } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { mockBookings, mockUser } from '@/data/mockData';

export default function BookingsScreen() {
  const [selectedTab, setSelectedTab] = useState('active');
  
  const tabs = [
    { id: 'active', label: 'Actives', count: 2 },
    { id: 'past', label: 'Passées', count: 24 },
    { id: 'cancelled', label: 'Annulées', count: 1 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Check size={16} color={Colors.success} />;
      case 'pending':
        return <AlertCircle size={16} color={Colors.warning} />;
      case 'cancelled':
        return <X size={16} color={Colors.error} />;
      default:
        return <Check size={16} color={Colors.success} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      default:
        return 'Confirmée';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return Colors.success;
      case 'pending':
        return Colors.warning;
      case 'cancelled':
        return Colors.error;
      default:
        return Colors.success;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'vip':
        return 'VIP';
      case 'guestList':
        return 'Guest List';
      case 'regular':
        return 'Standard';
      default:
        return 'Standard';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const handleQRPress = () => {
    Alert.alert(
      'QR Code',
      'Affichage du QR Code pour l\'entrée',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Partager', onPress: () => Alert.alert('QR Code partagé') }
      ]
    );
  };

  const handleDetailsPress = (bookingId: string) => {
    Alert.alert(
      'Détails de la réservation',
      `Détails complets de la réservation ${bookingId}`,
      [
        { text: 'Modifier', onPress: () => Alert.alert('Modification en cours...') },
        { text: 'Annuler', style: 'destructive', onPress: () => Alert.alert('Réservation annulée') },
        { text: 'Fermer', style: 'cancel' }
      ]
    );
  };

  const handleProfilePress = () => {
    router.push('/(tabs)/profile');
  };

  const handleNewBookingPress = () => {
    router.push('/(tabs)/events');
  };

  const handleReviewPress = () => {
    Alert.alert(
      'Laisser un avis',
      'Partagez votre expérience sur cette soirée',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Écrire un avis', onPress: () => Alert.alert('Formulaire d\'avis ouvert') }
      ]
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Mes Réservations</Text>
            <Text style={styles.subtitle}>Gérez vos sorties parisiennes</Text>
          </View>
          <TouchableOpacity style={styles.qrButton} onPress={handleQRPress}>
            <QrCode size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* User Status Card */}
        <TouchableOpacity onPress={handleProfilePress}>
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.statusCard}
          >
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: mockUser.avatar }} 
                style={styles.avatar}
              />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{mockUser.name}</Text>
                <View style={styles.vipBadge}>
                  <Star size={14} color={Colors.text} fill={Colors.text} />
                  <Text style={styles.vipText}>VIP Member</Text>
                </View>
              </View>
            </View>
            <View style={styles.loyaltyInfo}>
              <Text style={styles.loyaltyPoints}>{mockUser.stats.loyaltyPoints}</Text>
              <Text style={styles.loyaltyLabel}>Points</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.tabActive
              ]}
              onPress={() => {
                setSelectedTab(tab.id);
                Alert.alert('Onglet changé', `Affichage des réservations ${tab.label.toLowerCase()}`);
              }}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
              <View style={[
                styles.tabBadge,
                selectedTab === tab.id && styles.tabBadgeActive
              ]}>
                <Text style={[
                  styles.tabBadgeText,
                  selectedTab === tab.id && styles.tabBadgeTextActive
                ]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bookings List */}
        <View style={styles.bookingsContainer}>
          {mockBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Image 
                source={{ uri: booking.event.image }} 
                style={styles.eventImage}
              />
              
              <View style={styles.bookingContent}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {booking.event.title}
                  </Text>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(booking.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                      {getStatusText(booking.status)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.venueInfo}>
                  <MapPin size={14} color={Colors.textMuted} />
                  <Text style={styles.venueName}>{booking.event.club.name}</Text>
                </View>
                
                <View style={styles.eventDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={14} color={Colors.textMuted} />
                    <Text style={styles.detailText}>
                      {formatDate(booking.event.date)}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Clock size={14} color={Colors.textMuted} />
                    <Text style={styles.detailText}>
                      {booking.event.time}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Users size={14} color={Colors.textMuted} />
                    <Text style={styles.detailText}>
                      {booking.guests} {booking.guests === 1 ? 'personne' : 'personnes'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.bookingFooter}>
                  <View style={styles.typeContainer}>
                    <Text style={styles.typeLabel}>Type:</Text>
                    <Text style={styles.typeText}>{getTypeText(booking.type)}</Text>
                  </View>
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Total:</Text>
                    <Text style={styles.price}>{booking.totalPrice}€</Text>
                  </View>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.qrCodeButton} onPress={handleQRPress}>
                    <QrCode size={16} color={Colors.text} />
                    <Text style={styles.buttonText}>QR Code</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => handleDetailsPress(booking.id)}
                  >
                    <Text style={styles.detailsButtonText}>Détails</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          
          <TouchableOpacity style={styles.actionCard} onPress={handleNewBookingPress}>
            <View style={styles.actionIcon}>
              <Calendar size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Réserver une nouvelle soirée</Text>
              <Text style={styles.actionSubtitle}>Découvrez les événements à venir</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard} onPress={handleReviewPress}>
            <View style={styles.actionIcon}>
              <Star size={24} color={Colors.warning} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Laisser un avis</Text>
              <Text style={styles.actionSubtitle}>Partagez votre expérience</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  qrButton: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  statusCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  vipText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginLeft: 4,
  },
  loyaltyInfo: {
    alignItems: 'center',
  },
  loyaltyPoints: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
  },
  loyaltyLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    opacity: 0.8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.textSecondary,
    marginRight: 8,
  },
  tabTextActive: {
    color: Colors.text,
  },
  tabBadge: {
    backgroundColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.textMuted,
  },
  tabBadgeTextActive: {
    color: Colors.text,
  },
  bookingsContainer: {
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eventImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  bookingContent: {
    padding: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginRight: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
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
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginLeft: 8,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  typeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
    marginLeft: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  qrCodeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginLeft: 6,
  },
  detailsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailsButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.textSecondary,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionIcon: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  bottomSpacing: {
    height: 20,
  },
});