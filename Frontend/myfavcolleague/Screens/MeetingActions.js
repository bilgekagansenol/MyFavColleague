import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';
import { useActions } from '../context/ActionsContext';

const MeetingActions = ({ navigation, route }) => {
  const { actions, toggleAction, addAction, deleteAction } = useActions();
  const [newAction, setNewAction] = useState('');
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState('Bugün');

  const getDeadlineDate = (option) => {
    const today = new Date();
    switch(option) {
      case 'Bugün':
        return 'Bugün';
      case 'Yarın':
        return 'Yarın';
      case 'Bu Hafta':
        return 'Bu Hafta';
      case 'Gelecek Hafta':
        return 'Gelecek Hafta';
      default:
        return 'Bugün';
    }
  };

  const addNewAction = () => {
    if (newAction.trim()) {
      const newActionItem = {
        id: Date.now(),
        title: newAction,
        deadline: selectedDeadline,
        completed: false
      };
      addAction(newActionItem);
      setNewAction('');
      setSelectedDeadline('Bugün');
    }
  };

  const renderDeadlineModal = () => (
    <Modal
      visible={showDeadlineModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDeadlineModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Son Tarih Seçin</Text>
          {['Bugün', 'Yarın', 'Bu Hafta', 'Gelecek Hafta'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.deadlineOption,
                selectedDeadline === option && styles.selectedOption
              ]}
              onPress={() => {
                setSelectedDeadline(option);
                setShowDeadlineModal(false);
              }}
            >
              <Text style={[
                styles.optionText,
                selectedDeadline === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowDeadlineModal(false)}
          >
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Meeting Tasks" showBackButton={true} />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Add New Action */}
          <View style={styles.addActionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Yeni aksiyon ekle"
                value={newAction}
                onChangeText={setNewAction}
                placeholderTextColor="#666"
              />
              <TouchableOpacity 
                style={styles.deadlineButton}
                onPress={() => setShowDeadlineModal(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#003366" />
                <Text style={styles.deadlineText}>{selectedDeadline}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={addNewAction}
            >
              <Ionicons name="add-circle" size={32} color="#003366" />
            </TouchableOpacity>
          </View>

          {renderDeadlineModal()}

          {/* Actions List */}
          {actions.map((action) => (
            <View key={action.id} style={styles.actionItem}>
              <TouchableOpacity 
                style={styles.checkbox}
                onPress={() => toggleAction(action.id)}
              >
                <Ionicons 
                  name={action.completed ? "checkmark-circle" : "checkmark-circle-outline"} 
                  size={24} 
                  color={action.completed ? "#003366" : "#666"} 
                />
              </TouchableOpacity>
              <View style={styles.actionContent}>
                <Text style={[
                  styles.actionTitle,
                  action.completed && styles.completedText
                ]}>
                  {action.title}
                </Text>
                <Text style={styles.actionDeadline}>{action.deadline}</Text>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteAction(action.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  addActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    fontSize: 14,
    backgroundColor: '#F8F9FA',
  },
  deadlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  deadlineText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#333',
  },
  addButton: {
    marginLeft: 8,
    padding: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  actionDeadline: {
    fontSize: 12,
    color: '#6C757D',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  deleteButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  deadlineOption: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#003366',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: 'white',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default MeetingActions; 