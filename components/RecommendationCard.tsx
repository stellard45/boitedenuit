import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, TrendingUp, MapPin, Heart } from 'lucide-react-native';
import { Recommendation } from '@/types';
import Colors from '@/constants/Colors';
import EventCard from './EventCard';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onPress?: () => void;
}

export default function RecommendationCard({ recommendation, onPress }: RecommendationCardProps) {
  const getRecommendationIcon = () => {
    switch (recommendation.type) {
      case 'personalized':
        return <Heart size={16} color={Colors.neonPink} fill={Colors.neonPink} />;
      case 'trending':
        return <TrendingUp size={16} color={Colors.neonBlue} />;
      case 'nearby':
        return <MapPin size={16} color={Colors.success} />;
      default:
        return <Sparkles size={16} color={Colors.primary} />;
    }
  };

  const getRecommendationTitle = () => {
    switch (recommendation.type) {
      case 'personalized':
        return 'Parfait pour vous';
      case 'trending':
        return 'Tendance à Paris';
      case 'nearby':
        return 'Près de vous';
      default:
        return 'Recommandé';
    }
  };

  const getGradientColors = () => {
    switch (recommendation.type) {
      case 'personalized':
        return [Colors.neonPink, Colors.primary];
      case 'trending':
        return [Colors.neonBlue, Colors.secondary];
      case 'nearby':
        return [Colors.success, Colors.neonBlue];
      default:
        return [Colors.primary, Colors.secondary];
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.recommendationBadge}
      >
        {getRecommendationIcon()}
        <Text style={styles.recommendationType}>{getRecommendationTitle()}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{Math.round(recommendation.score * 100)}%</Text>
        </View>
      </LinearGradient>
      
      <View style={styles.reasonsContainer}>
        {recommendation.reasons.map((reason, index) => (
          <View key={index} style={styles.reasonTag}>
            <Text style={styles.reasonText}>• {reason}</Text>
          </View>
        ))}
      </View>
      
      <EventCard event={recommendation.event} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  recommendationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 12,
  },
  recommendationType: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginLeft: 8,
    flex: 1,
  },
  scoreContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  score: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: Colors.text,
  },
  reasonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  reasonTag: {
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
});