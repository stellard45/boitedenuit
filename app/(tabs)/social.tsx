import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Send, Users, Heart, Share2, Camera, Mic, Search } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { mockUser } from '@/data/mockData';

export default function SocialScreen() {
  const [selectedTab, setSelectedTab] = useState('chat');
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'groups', label: 'Groupes', icon: Users },
    { id: 'feed', label: 'Feed', icon: Heart },
  ];

  const mockChats = [
    {
      id: '1',
      name: 'Groupe Techno Paris',
      lastMessage: 'Qui vient au Rex ce soir ?',
      time: '14:32',
      unread: 3,
      avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      isGroup: true,
      members: 12,
    },
    {
      id: '2',
      name: 'Le Duplex',
      lastMessage: 'Votre réservation VIP est confirmée pour demain soir',
      time: '12:15',
      unread: 1,
      avatar: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      isGroup: false,
      isClub: true,
    },
    {
      id: '3',
      name: 'Marie Dubois',
      lastMessage: 'On se retrouve à 22h devant le club ?',
      time: '11:45',
      unread: 0,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      isGroup: false,
    },
  ];

  const mockFeedPosts = [
    {
      id: '1',
      user: {
        name: 'Sophie Martin',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      content: 'Soirée incroyable au Silencio hier soir! L\'ambiance était parfaite 🔥',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      time: '2h',
      likes: 24,
      comments: 5,
      club: 'Silencio',
      isLiked: false,
    },
    {
      id: '2',
      user: {
        name: 'Alex Dupont',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      },
      content: 'Qui vient avec moi au Rex Club demain ? Les sets de Charlotte de Witte sont toujours magiques!',
      time: '4h',
      likes: 18,
      comments: 8,
      club: 'Rex Club',
      isLiked: false,
    },
  ];

  const handleChatPress = (chatId: string, chatName: string) => {
    Alert.alert(
      'Conversation',
      `Ouverture du chat avec ${chatName}`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Ouvrir', onPress: () => Alert.alert('Chat ouvert', `Conversation avec ${chatName}`) }
      ]
    );
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      Alert.alert('Message envoyé', `"${messageText}" envoyé dans le chat`);
      setMessageText('');
    } else {
      Alert.alert('Erreur', 'Veuillez écrire un message');
    }
  };

  const handleAttachment = () => {
    Alert.alert(
      'Pièce jointe',
      'Choisir le type de fichier à joindre',
      [
        { text: 'Photo', onPress: () => Alert.alert('Photo sélectionnée') },
        { text: 'Vidéo', onPress: () => Alert.alert('Vidéo sélectionnée') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const handleVoiceMessage = () => {
    Alert.alert('Message vocal', 'Enregistrement d\'un message vocal');
  };

  const handleCreateGroup = () => {
    Alert.alert(
      'Créer un groupe',
      'Voulez-vous créer un nouveau groupe ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Créer', onPress: () => Alert.alert('Groupe créé', 'Nouveau groupe créé avec succès') }
      ]
    );
  };

  const handleJoinGroup = (groupName: string) => {
    Alert.alert(
      'Rejoindre le groupe',
      `Voulez-vous rejoindre ${groupName} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Rejoindre', onPress: () => Alert.alert('Rejoint !', `Vous avez rejoint ${groupName}`) }
      ]
    );
  };

  const handleLikePost = (postId: string) => {
    Alert.alert('Like', `Post ${postId} liké !`);
  };

  const handleCommentPost = (postId: string) => {
    Alert.alert('Commentaire', `Écrire un commentaire sur le post ${postId}`);
  };

  const handleSharePost = (postId: string) => {
    Alert.alert(
      'Partager',
      'Partager ce post',
      [
        { text: 'Instagram Stories', onPress: () => Alert.alert('Partagé sur Instagram') },
        { text: 'Copier le lien', onPress: () => Alert.alert('Lien copié') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const renderChatTab = () => (
    <View style={styles.chatContainer}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une conversation..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.chatList}>
        {mockChats
          .filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((chat) => (
          <TouchableOpacity 
            key={chat.id} 
            style={styles.chatItem}
            onPress={() => handleChatPress(chat.id, chat.name)}
          >
            <View style={styles.chatAvatarContainer}>
              <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} />
              {chat.isGroup && (
                <View style={styles.groupBadge}>
                  <Users size={10} color={Colors.text} />
                </View>
              )}
            </View>
            
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName} numberOfLines={1}>
                  {chat.name}
                </Text>
                <View style={styles.chatMeta}>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                  {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
              
              <Text style={styles.chatMessage} numberOfLines={1}>
                {chat.lastMessage}
              </Text>
              
              {chat.isGroup && (
                <Text style={styles.membersCount}>
                  {chat.members} membres
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.messageInput}>
        <TextInput
          style={styles.messageTextInput}
          placeholder="Tapez votre message..."
          placeholderTextColor={Colors.textMuted}
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity style={styles.attachButton} onPress={handleAttachment}>
          <Camera size={20} color={Colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.voiceButton} onPress={handleVoiceMessage}>
          <Mic size={20} color={Colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Send size={18} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGroupsTab = () => (
    <View style={styles.groupsContainer}>
      <Text style={styles.sectionTitle}>Mes groupes</Text>
      
      <TouchableOpacity style={styles.createGroupButton} onPress={handleCreateGroup}>
        <Users size={24} color={Colors.primary} />
        <View style={styles.createGroupContent}>
          <Text style={styles.createGroupTitle}>Créer un nouveau groupe</Text>
          <Text style={styles.createGroupSubtitle}>Organisez vos sorties entre amis</Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.groupsList}>
        {mockChats.filter(chat => chat.isGroup).map((group) => (
          <TouchableOpacity key={group.id} style={styles.groupCard}>
            <Image source={{ uri: group.avatar }} style={styles.groupImage} />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupMembers}>{group.members} membres</Text>
              <Text style={styles.groupActivity}>Dernier message: {group.time}</Text>
            </View>
            <View style={styles.groupActions}>
              <TouchableOpacity 
                style={styles.joinButton}
                onPress={() => handleJoinGroup(group.name)}
              >
                <Text style={styles.joinButtonText}>Rejoindre</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFeedTab = () => (
    <ScrollView style={styles.feedContainer}>
      <Text style={styles.sectionTitle}>Actualités nightlife</Text>
      
      {mockFeedPosts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.user.avatar }} style={styles.postAvatar} />
            <View style={styles.postUserInfo}>
              <Text style={styles.postUserName}>{post.user.name}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <TouchableOpacity style={styles.postOptions}>
              <Text style={styles.postOptionsText}>•••</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.postContent}>{post.content}</Text>
          
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}
          
          {post.club && (
            <View style={styles.clubTag}>
              <Text style={styles.clubTagText}>📍 {post.club}</Text>
            </View>
          )}
          
          <View style={styles.postActions}>
            <TouchableOpacity 
              style={styles.postAction}
              onPress={() => handleLikePost(post.id)}
            >
              <Heart size={20} color={Colors.textMuted} />
              <Text style={styles.postActionText}>{post.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.postAction}
              onPress={() => handleCommentPost(post.id)}
            >
              <MessageCircle size={20} color={Colors.textMuted} />
              <Text style={styles.postActionText}>{post.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.postAction}
              onPress={() => handleSharePost(post.id)}
            >
              <Share2 size={20} color={Colors.textMuted} />
              <Text style={styles.postActionText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Social</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <MessageCircle size={24} color={Colors.primary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  selectedTab === tab.id && styles.tabActive
                ]}
                onPress={() => setSelectedTab(tab.id)}
              >
                <Icon 
                  size={20} 
                  color={selectedTab === tab.id ? Colors.text : Colors.textMuted} 
                />
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.tabTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {selectedTab === 'chat' && renderChatTab()}
          {selectedTab === 'groups' && renderGroupsTab()}
          {selectedTab === 'feed' && renderFeedTab()}
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
  notificationButton: {
    position: 'relative',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
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
    color: Colors.textMuted,
    marginLeft: 8,
  },
  tabTextActive: {
    color: Colors.text,
  },
  content: {
    flex: 1,
  },
  
  // Chat Tab Styles
  chatContainer: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 16,
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
  chatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  chatAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  groupBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 4,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    flex: 1,
    marginRight: 12,
  },
  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  chatMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  membersCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  messageTextInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    maxHeight: 100,
    marginRight: 12,
  },
  attachButton: {
    padding: 10,
    marginRight: 8,
  },
  voiceButton: {
    padding: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 12,
  },
  
  // Groups Tab Styles
  groupsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text,
    marginBottom: 16,
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  createGroupContent: {
    marginLeft: 16,
    flex: 1,
  },
  createGroupTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  createGroupSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  groupsList: {
    flex: 1,
  },
  groupCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  groupActivity: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  groupActions: {
    justifyContent: 'center',
  },
  joinButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  joinButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  
  // Feed Tab Styles
  feedContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUserInfo: {
    flex: 1,
  },
  postUserName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  postOptions: {
    padding: 8,
  },
  postOptionsText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  postContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  clubTag: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  clubTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  postActions: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  postActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    marginLeft: 6,
  },
});