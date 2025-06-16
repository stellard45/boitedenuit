import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Filter, MapPin, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { mockEvents } from '@/data/mockData';
import EventCard from '@/components/EventCard';

export default function EventsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  
  const periods = [
    { id: 'all', label: 'Tous' },
    { id: 'today', label: 'Aujourd\'hui' },
    { id: 'tomorrow', label: 'Demain' },
    { id: 'weekend', label: 'Week-end' },
    { id: 'next-week', label: 'Semaine prochaine' },
  ];

  const neighborhoods = ['Marais', 'Bastille', 'Pigalle', 'Champs-Élysées', 'Montmartre', 'République'];

  const getEventsCount = () => {
    return mockEvents.length;
  };

  const handleFilterPress = () => {
    Alert.alert(
      'Filtres avancés',
      'Genre musical, prix, code vestimentaire...',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appliquer', onPress: () => Alert.alert('Filtres appliqués') }
      ]
    );
  };

  const handleCalendarPress = () => {
    Alert.alert(
      'Calendrier complet',
      'Ouverture du calendrier mensuel des événements',
      [
        { text: 'OK', onPress: () => console.log('Calendar opened') }
      ]
    );
  };

  const handleNeighborhoodPress = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood === selectedNeighborhood ? '' : neighborhood);
    Alert.alert('Filtre appliqué', `Événements dans le quartier: ${neighborhood}`);
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
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Événements</Text>
            <Text style={styles.subtitle}>{getEventsCount()} événements à Paris</Text>
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <Filter size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Quick Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodChip,
                selectedPeriod === period.id && styles.periodChipActive
              ]}
              onPress={() => {
                setSelectedPeriod(period.id);
                Alert.alert('Période sélectionnée', `Filtrage par: ${period.label}`);
              }}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period.id && styles.periodTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Event */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Événement à la une</Text>
          <EventCard
            event={mockEvents[0]}
            onPress={() => handleEventPress(mockEvents[0].id)}
          />
        </View>

        {/* All Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tous les événements</Text>
            <TouchableOpacity 
              style={styles.sortButton}
              onPress={() => Alert.alert('Tri', 'Options de tri des événements')}
            >
              <Clock size={16} color={Colors.textMuted} />
              <Text style={styles.sortText}>Par date</Text>
            </TouchableOpacity>
          </View>
          
          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => handleEventPress(event.id)}
            />
          ))}
        </View>

        {/* Calendar Integration */}
        <View style={styles.calendarSection}>
          <TouchableOpacity style={styles.calendarButton} onPress={handleCalendarPress}>
            <Calendar size={24} color={Colors.primary} />
            <View style={styles.calendarTextContainer}>
              <Text style={styles.calendarTitle}>Voir le calendrier complet</Text>
              <Text style={styles.calendarSubtitle}>Planifie tes soirées du mois</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Location Filter */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Par quartier</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.locationContainer}
          >
            {neighborhoods.map((neighborhood) => (
              <TouchableOpacity 
                key={neighborhood} 
                style={[
                  styles.locationChip,
                  selectedNeighborhood === neighborhood && styles.locationChipActive
                ]}
                onPress={() => handleNeighborhoodPress(neighborhood)}
              >
                <MapPin size={14} color={
                  selectedNeighborhood === neighborhood ? Colors.text : Colors.primary
                } />
                <Text style={[
                  styles.locationText,
                  selectedNeighborhood === neighborhood && styles.locationTextActive
                ]}>
                  {neighborhood}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  filterButton: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  periodChip: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  periodChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.textSecondary,
  },
  periodTextActive: {
    color: Colors.text,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sortText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.textMuted,
    marginLeft: 6,
  },
  calendarSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  calendarTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  calendarTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  calendarSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  locationSection: {
    marginBottom: 32,
  },
  locationContainer: {
    paddingHorizontal: 20,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  locationChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    marginLeft: 6,
  },
  locationTextActive: {
    color: Colors.text,
  },
  bottomSpacing: {
    height: 20,
  },
});