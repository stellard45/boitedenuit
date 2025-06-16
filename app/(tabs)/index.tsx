import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, MapPin, Zap } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { mockUser, mockRecommendations, mockClubs, mockEvents } from '@/data/mockData';
import EventCard from '@/components/EventCard';
import ClubCard from '@/components/ClubCard';
import RecommendationCard from '@/components/RecommendationCard';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'Tous', icon: Zap },
    { id: 'house', label: 'House', icon: Zap },
    { id: 'techno', label: 'Techno', icon: Zap },
    { id: 'tonight', label: 'Ce soir', icon: Zap },
    { id: 'weekend', label: 'Week-end', icon: Zap },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Recherche', `Recherche pour: "${searchQuery}"`);
    } else {
      Alert.alert('Recherche', 'Veuillez entrer un terme de recherche');
    }
  };

  const handleLocationPress = () => {
    setIsLocationMenuOpen(!isLocationMenuOpen);
  };

  const handleFilterPress = () => {
    Alert.alert('Filtres', 'Menu des filtres avancés');
  };

  const handleStatsPress = () => {
    router.push('/(tabs)/profile');
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Salut {mockUser.name.split(' ')[0]} 👋</Text>
            <Text style={styles.subtitle}>Découvre les meilleures soirées parisiennes</Text>
          </View>
          <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
            <MapPin size={20} color={Colors.primary} />
            <Text style={styles.locationText}>Paris</Text>
          </TouchableOpacity>
        </View>

        {/* Location Menu */}
        {isLocationMenuOpen && (
          <View style={styles.locationMenu}>
            {['Paris', 'Lyon', 'Marseille', 'Toulouse'].map((city) => (
              <TouchableOpacity
                key={city}
                style={styles.locationMenuItem}
                onPress={() => {
                  Alert.alert('Ville sélectionnée', `Basculement vers ${city}`);
                  setIsLocationMenuOpen(false);
                }}
              >
                <Text style={styles.locationMenuText}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un club, événement, DJ..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <Filter size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive
              ]}
              onPress={() => {
                setSelectedFilter(filter.id);
                Alert.alert('Filtre', `Filtre "${filter.label}" appliqué`);
              }}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* User Stats */}
        <TouchableOpacity onPress={handleStatsPress}>
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.statsCard}
          >
            <View style={styles.statsContent}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{mockUser.stats.eventsAttended}</Text>
                <Text style={styles.statLabel}>Soirées</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{mockUser.stats.loyaltyPoints}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>VIP</Text>
                <Text style={styles.statLabel}>Statut</Text>
              </View>
            </View>
            <Zap size={24} color={Colors.text} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Personalized Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommandations pour vous</Text>
          {mockRecommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onPress={() => {
                router.push({
                  pathname: '/(tabs)/event-details',
                  params: { eventId: recommendation.event.id }
                });
              }}
            />
          ))}
        </View>

        {/* Trending Clubs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clubs tendance</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {mockClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onPress={() => {
                  router.push({
                    pathname: '/(tabs)/club-details',
                    params: { clubId: club.id }
                  });
                }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Tonight's Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ce soir à Paris</Text>
          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => {
                router.push({
                  pathname: '/(tabs)/event-details',
                  params: { eventId: event.id }
                });
              }}
            />
          ))}
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    marginLeft: 6,
  },
  locationMenu: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  locationMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  locationMenuText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    marginLeft: 12,
  },
  filterButton: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  filterChip: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.text,
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsContent: {
    flexDirection: 'row',
    flex: 1,
  },
  statItem: {
    marginRight: 32,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    opacity: 0.8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});