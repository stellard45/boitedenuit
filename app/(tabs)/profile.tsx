import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Star, MapPin, Music, Heart, Users, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Award, Calendar, Zap } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { mockUser } from '@/data/mockData';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const achievements = [
    { id: '1', title: 'Nightlife Explorer', description: '10 clubs visités', icon: '🌟', completed: true },
    { id: '2', title: 'VIP Member', description: 'Statut VIP obtenu', icon: '👑', completed: true },
    { id: '3', title: 'Social Butterfly', description: '5 amis ajoutés', icon: '🦋', completed: true },
    { id: '4', title: 'Early Bird', description: '3 réservations anticipées', icon: '🐦', completed: false },
  ];

  const menuItems = [
    { id: '1', title: 'Mes préférences', subtitle: 'Musique, quartiers, budget', icon: Music, color: Colors.primary },
    { id: '2', title: 'Mes avis', subtitle: '12 avis publiés', icon: Heart, color: Colors.neonPink },
    { id: '3', title: 'Mes amis', subtitle: '28 amis sur l\'app', icon: Users, color: Colors.neonBlue },
    { id: '4', title: 'Historique', subtitle: 'Toutes mes sorties', icon: Calendar, color: Colors.warning },
    { id: '5', title: 'Paiements', subtitle: 'Méthodes de paiement', icon: CreditCard, color: Colors.success },
    { id: '6', title: 'Notifications', subtitle: 'Paramètres des alertes', icon: Bell, color: Colors.secondary },
    { id: '7', title: 'Confidentialité', subtitle: 'Sécurité et données', icon: Shield, color: Colors.error },
    { id: '8', title: 'Support', subtitle: 'Aide et contact', icon: HelpCircle, color: Colors.textMuted },
  ];

  const handleSettingsPress = () => {
    Alert.alert(
      'Paramètres',
      'Accès aux paramètres généraux de l\'application',
      [
        { text: 'Fermer', style: 'cancel' }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Modifier le profil',
      'Édition des informations personnelles',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Modifier', onPress: () => Alert.alert('Profil modifié', 'Vos informations ont été mises à jour') }
      ]
    );
  };

  const handleMenuItemPress = (item: any) => {
    Alert.alert(
      item.title,
      item.subtitle,
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Ouvrir', onPress: () => Alert.alert('Ouverture', `${item.title} ouvert`) }
      ]
    );
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    Alert.alert(
      'Notifications',
      value ? 'Notifications activées' : 'Notifications désactivées'
    );
  };

  const handleLocationToggle = (value: boolean) => {
    setLocationEnabled(value);
    Alert.alert(
      'Géolocalisation',
      value ? 'Géolocalisation activée' : 'Géolocalisation désactivée'
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Déconnecté', 'Vous avez été déconnecté avec succès');
            // Here you would typically handle the logout logic
          }
        }
      ]
    );
  };

  const renderAchievement = (achievement: any) => (
    <TouchableOpacity 
      key={achievement.id} 
      style={[styles.achievementCard, !achievement.completed && styles.achievementLocked]}
      onPress={() => Alert.alert('Achievement', `${achievement.title}: ${achievement.description}`)}
    >
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
      <View style={styles.achievementContent}>
        <Text style={[styles.achievementTitle, !achievement.completed && styles.achievementTitleLocked]}>
          {achievement.title}
        </Text>
        <Text style={[styles.achievementDescription, !achievement.completed && styles.achievementDescriptionLocked]}>
          {achievement.description}
        </Text>
      </View>
      {achievement.completed && (
        <View style={styles.achievementBadge}>
          <Award size={16} color={Colors.text} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mon Profil</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
            <Settings size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={styles.profileCard}
        >
          <View style={styles.profileInfo}>
            <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{mockUser.name}</Text>
              <Text style={styles.userEmail}>{mockUser.email}</Text>
              <View style={styles.vipContainer}>
                <Star size={16} color={Colors.text} fill={Colors.text} />
                <Text style={styles.vipText}>VIP Member</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statItem} onPress={() => router.push('/(tabs)/bookings')}>
              <Text style={styles.statNumber}>{mockUser.stats.eventsAttended}</Text>
              <Text style={styles.statLabel}>Soirées</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>{mockUser.stats.loyaltyPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Note</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Preferences Preview */}
        <TouchableOpacity 
          style={styles.preferencesCard}
          onPress={() => handleMenuItemPress(menuItems[0])}
        >
          <Text style={styles.cardTitle}>Mes goûts musicaux</Text>
          <View style={styles.tagsContainer}>
            {mockUser.preferences.musicGenres.map((genre, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{genre}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.preferenceRow}>
            <MapPin size={16} color={Colors.textMuted} />
            <Text style={styles.preferenceText}>
              Quartiers préférés: {mockUser.preferences.neighborhoods.join(', ')}
            </Text>
          </View>
          
          <View style={styles.preferenceRow}>
            <CreditCard size={16} color={Colors.textMuted} />
            <Text style={styles.preferenceText}>
              Budget: {mockUser.preferences.budget === 'medium' ? 'Moyen' : mockUser.preferences.budget}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes accomplissements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map(renderAchievement)}
          </View>
        </View>

        {/* Quick Settings */}
        <View style={styles.quickSettings}>
          <Text style={styles.sectionTitle}>Paramètres rapides</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={Colors.primary} />
              <Text style={styles.settingTitle}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.text}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MapPin size={20} color={Colors.primary} />
              <Text style={styles.settingTitle}>Géolocalisation</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={handleLocationToggle}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.text}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item)}
              >
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                  <Icon size={20} color={item.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Loyalty Program */}
        <TouchableOpacity style={styles.loyaltyCard}>
          <View style={styles.loyaltyHeader}>
            <Zap size={24} color={Colors.primary} />
            <Text style={styles.loyaltyTitle}>Programme de fidélité</Text>
          </View>
          
          <View style={styles.loyaltyProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>650 / 1000 points pour le niveau suivant</Text>
          </View>
          
          <Text style={styles.loyaltyBenefits}>
            Avantages VIP: Accès prioritaire aux guest lists, réductions exclusives, invitations aux événements privés
          </Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

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
  },
  settingsButton: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    opacity: 0.8,
    marginBottom: 8,
  },
  vipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  vipText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  preferencesCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
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
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  preferenceText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginLeft: 8,
    flex: 1,
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
  achievementsContainer: {
    paddingHorizontal: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: Colors.textMuted,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  achievementDescriptionLocked: {
    color: Colors.textMuted,
  },
  achievementBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 8,
  },
  quickSettings: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
    marginLeft: 12,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuIcon: {
    borderRadius: 12,
    padding: 10,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  menuArrow: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  loyaltyCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loyaltyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginLeft: 12,
  },
  loyaltyProgress: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  loyaltyBenefits: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.error,
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});