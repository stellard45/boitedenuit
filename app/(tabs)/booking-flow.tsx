import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Users, Calendar, Clock, Check } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { mockEvents } from '@/data/mockData';

export default function BookingFlowScreen() {
  const { eventId, ticketType = 'guestList' } = useLocalSearchParams();
  const [step, setStep] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: 'Jerome Dupuis',
    email: 'jerome.dupuis@email.com',
    phone: '+33 6 12 34 56 78'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  
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

  const ticketPrice = event.price[ticketType as keyof typeof event.price] || 0;
  const totalPrice = ticketPrice * guestCount;

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleBooking();
    }
  };

  const handleBooking = () => {
    // Simulate booking process
    setTimeout(() => {
      setIsBookingComplete(true);
      Alert.alert(
        'Réservation confirmée !',
        `Votre réservation pour ${event.title} a été confirmée. Vous recevrez un email de confirmation.`,
        [
          {
            text: 'Voir mes réservations',
            onPress: () => router.push('/(tabs)/bookings')
          }
        ]
      );
    }, 2000);
  };

  const getTicketTypeName = () => {
    switch (ticketType) {
      case 'guestList':
        return 'Guest List';
      case 'vip':
        return 'VIP';
      case 'regular':
        return 'Entrée Standard';
      default:
        return 'Standard';
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((stepNumber) => (
        <View key={stepNumber} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            step >= stepNumber && styles.stepCircleActive
          ]}>
            {step > stepNumber ? (
              <Check size={16} color={Colors.text} />
            ) : (
              <Text style={[
                styles.stepNumber,
                step >= stepNumber && styles.stepNumberActive
              ]}>
                {stepNumber}
              </Text>
            )}
          </View>
          {stepNumber < 3 && <View style={[
            styles.stepLine,
            step > stepNumber && styles.stepLineActive
          ]} />}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Détails de la réservation</Text>
      
      {/* Event Summary */}
      <View style={styles.eventSummary}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventClub}>{event.club.name}</Text>
        <Text style={styles.eventDate}>
          {new Date(event.date).toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })} • {event.time}
        </Text>
      </View>

      {/* Ticket Type */}
      <View style={styles.ticketInfo}>
        <Text style={styles.sectionLabel}>Type de ticket</Text>
        <View style={styles.ticketCard}>
          <Text style={styles.ticketName}>{getTicketTypeName()}</Text>
          <Text style={styles.ticketPrice}>{ticketPrice}€</Text>
        </View>
      </View>

      {/* Guest Count */}
      <View style={styles.guestSection}>
        <Text style={styles.sectionLabel}>Nombre de personnes</Text>
        <View style={styles.guestCounter}>
          <TouchableOpacity 
            style={[styles.counterButton, guestCount <= 1 && styles.counterButtonDisabled]}
            onPress={() => guestCount > 1 && setGuestCount(guestCount - 1)}
            disabled={guestCount <= 1}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.guestCount}>{guestCount}</Text>
          <TouchableOpacity 
            style={[styles.counterButton, guestCount >= 10 && styles.counterButtonDisabled]}
            onPress={() => guestCount < 10 && setGuestCount(guestCount + 1)}
            disabled={guestCount >= 10}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Sous-total</Text>
          <Text style={styles.totalValue}>{totalPrice}€</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Frais de service</Text>
          <Text style={styles.totalValue}>2€</Text>
        </View>
        <View style={[styles.totalRow, styles.totalRowFinal]}>
          <Text style={styles.totalLabelFinal}>Total</Text>
          <Text style={styles.totalValueFinal}>{totalPrice + 2}€</Text>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Informations de contact</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>Nom complet</Text>
        <TextInput
          style={styles.textInput}
          value={contactInfo.name}
          onChangeText={(text) => setContactInfo({...contactInfo, name: text})}
          placeholder="Votre nom complet"
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={contactInfo.email}
          onChangeText={(text) => setContactInfo({...contactInfo, email: text})}
          placeholder="votre@email.com"
          placeholderTextColor={Colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionLabel}>Téléphone</Text>
        <TextInput
          style={styles.textInput}
          value={contactInfo.phone}
          onChangeText={(text) => setContactInfo({...contactInfo, phone: text})}
          placeholder="+33 6 12 34 56 78"
          placeholderTextColor={Colors.textMuted}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.noticeSection}>
        <Text style={styles.noticeText}>
          ℹ️ Vous recevrez un QR code de confirmation par email et SMS
        </Text>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Paiement</Text>
      
      {/* Payment Methods */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionLabel}>Méthode de paiement</Text>
        
        <TouchableOpacity 
          style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentOptionActive]}
          onPress={() => setPaymentMethod('card')}
        >
          <CreditCard size={20} color={paymentMethod === 'card' ? Colors.primary : Colors.textMuted} />
          <Text style={[
            styles.paymentText,
            paymentMethod === 'card' && styles.paymentTextActive
          ]}>
            Carte bancaire
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.paymentOption, paymentMethod === 'paypal' && styles.paymentOptionActive]}
          onPress={() => setPaymentMethod('paypal')}
        >
          <CreditCard size={20} color={paymentMethod === 'paypal' ? Colors.primary : Colors.textMuted} />
          <Text style={[
            styles.paymentText,
            paymentMethod === 'paypal' && styles.paymentTextActive
          ]}>
            PayPal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Details (if card selected) */}
      {paymentMethod === 'card' && (
        <View style={styles.cardSection}>
          <View style={styles.formSection}>
            <Text style={styles.sectionLabel}>Numéro de carte</Text>
            <TextInput
              style={styles.textInput}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.cardRow}>
            <View style={[styles.formSection, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.sectionLabel}>Expiration</Text>
              <TextInput
                style={styles.textInput}
                placeholder="MM/YY"
                placeholderTextColor={Colors.textMuted}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.formSection, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.sectionLabel}>CVV</Text>
              <TextInput
                style={styles.textInput}
                placeholder="123"
                placeholderTextColor={Colors.textMuted}
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </View>
        </View>
      )}

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Récapitulatif</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{event.title}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryDetail}>{getTicketTypeName()} × {guestCount}</Text>
          <Text style={styles.summaryValue}>{totalPrice}€</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryDetail}>Frais de service</Text>
          <Text style={styles.summaryValue}>2€</Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryRowTotal]}>
          <Text style={styles.summaryTotal}>Total</Text>
          <Text style={styles.summaryTotalValue}>{totalPrice + 2}€</Text>
        </View>
      </View>
    </View>
  );

  if (isBookingComplete) {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Check size={48} color={Colors.success} />
          </View>
          <Text style={styles.successTitle}>Réservation confirmée !</Text>
          <Text style={styles.successMessage}>
            Votre réservation pour {event.title} a été confirmée. 
            Vous recevrez un QR code par email dans quelques minutes.
          </Text>
          <TouchableOpacity 
            style={styles.successButton}
            onPress={() => router.push('/(tabs)/bookings')}
          >
            <Text style={styles.successButtonText}>Voir mes réservations</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Réservation</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {step === 3 ? 'Confirmer le paiement' : 'Continuer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.textMuted,
  },
  stepNumberActive: {
    color: Colors.text,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  eventSummary: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  eventClub: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 12,
  },
  ticketInfo: {
    marginBottom: 24,
  },
  ticketCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ticketName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
  },
  ticketPrice: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary,
  },
  guestSection: {
    marginBottom: 24,
  },
  guestCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  counterButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    backgroundColor: Colors.surface,
    opacity: 0.5,
  },
  counterButtonText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text,
  },
  guestCount: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginHorizontal: 32,
  },
  totalSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalRowFinal: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  totalValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
  },
  totalLabelFinal: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  totalValueFinal: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary,
  },
  formSection: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noticeSection: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noticeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    lineHeight: 20,
  },
  paymentSection: {
    marginBottom: 24,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  paymentOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  paymentText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.textMuted,
    marginLeft: 12,
  },
  paymentTextActive: {
    color: Colors.text,
  },
  cardSection: {
    marginBottom: 24,
  },
  cardRow: {
    flexDirection: 'row',
  },
  orderSummary: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryRowTotal: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginBottom: 0,
  },
  summaryLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
  },
  summaryDetail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
  },
  summaryTotal: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  successIcon: {
    backgroundColor: Colors.surface,
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  successTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  successButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  successButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
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
});