import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Platform, Alert, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import CommonHeader from '../components/CommonHeader';

const UploadScreen = ({ navigation }) => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recentUploads, setRecentUploads] = useState([]);
  const [meetingTime, setMeetingTime] = useState(new Date());
  
  // Görüntülenecek tarih ve saat metinleri
  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg', // MP3 dosyaları için MIME tipi
        copyToCacheDirectory: true
      });
      
      if (result.canceled) {
        console.log('Dosya seçimi iptal edildi');
        return;
      }
      
      // Dosya seçildi
      const file = result.assets[0];
      console.log('Seçilen dosya:', file);
      
      // Dosya boyutunu kontrol et (10MB'dan büyük mü?)
      const fileInfo = await FileSystem.getInfoAsync(file.uri);
      if (fileInfo.size > 10 * 1024 * 1024) {
        Alert.alert(
          "Dosya Çok Büyük",
          "Lütfen 10MB'dan küçük bir dosya seçin.",
          [{ text: "Tamam" }]
        );
        return;
      }
      
      // Dosya uzantısını kontrol et
      if (!file.name.toLowerCase().endsWith('.mp3')) {
        Alert.alert(
          "Geçersiz Dosya Formatı",
          "Lütfen sadece .mp3 formatında dosya seçin.",
          [{ text: "Tamam" }]
        );
        return;
      }
      
      setSelectedFile(file);
    } catch (error) {
      console.log('Dosya seçimi hatası:', error);
      Alert.alert(
        "Hata",
        "Dosya seçilirken bir hata oluştu.",
        [{ text: "Tamam" }]
      );
    }
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed' && Platform.OS === 'android') {
      setShowDatePicker(false);
      return;
    }
    
    const currentDate = selectedDate || meetingDate;
    setShowDatePicker(Platform.OS === 'ios');
    setMeetingDate(currentDate);
    
    // Tarih metnini formatlayalım
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    setDateText(`${day}.${month}.${year}`);
    
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (event.type === 'dismissed' && Platform.OS === 'android') {
      setShowTimePicker(false);
      return;
    }
    
    const currentTime = selectedTime || meetingTime;
    setShowTimePicker(Platform.OS === 'ios');
    setMeetingTime(currentTime);
    
    // Saat metnini formatlayalım
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    setTimeText(`${hours}:${minutes}`);
    
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const hideTimePicker = () => {
    setShowTimePicker(false);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      Alert.alert(
        "Uyarı",
        "Lütfen önce bir dosya seçin.",
        [{ text: "Tamam" }]
      );
      return;
    }
    
    // Başlık kontrolü
    if (!meetingTitle.trim()) {
      Alert.alert(
        "Uyarı",
        "Lütfen toplantı başlığını girin.",
        [{ text: "Tamam" }]
      );
      return;
    }
    
    // Tarih ve saat kontrolü
    if (!dateText) {
      Alert.alert(
        "Uyarı",
        "Lütfen toplantı tarihini seçin.",
        [{ text: "Tamam" }]
      );
      return;
    }
    
    if (!timeText) {
      Alert.alert(
        "Uyarı",
        "Lütfen toplantı saatini seçin.",
        [{ text: "Tamam" }]
      );
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Simüle edilmiş yükleme işlemi
      for (let i = 0; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setUploadProgress(i * 10);
      }
      
      // Gerçek bir API'ye yükleme yapacaksanız, aşağıdaki gibi bir kod kullanabilirsiniz:
      /*
      const uploadResponse = await FileSystem.uploadAsync('https://your-api-endpoint.com/upload', selectedFile.uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        mimeType: 'audio/mpeg',
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN_HERE'
        },
        parameters: {
          'fileName': selectedFile.name,
          'fileSize': selectedFile.size.toString()
        }
      });
      
      if (uploadResponse.status !== 200) {
        throw new Error('Yükleme başarısız oldu');
      }
      */
      
      // Yükleme başarılı
      const newUpload = {
        id: Date.now().toString(),
        name: selectedFile.name,
        size: selectedFile.size,
        title: meetingTitle,
        date: dateText,
        time: timeText,
        uploadDate: new Date().toLocaleString(),
      };
      
      setRecentUploads([newUpload, ...recentUploads]);
      setSelectedFile(null);
      setMeetingTitle('');
      setDateText('');
      setTimeText('');
      
      Alert.alert(
        "Başarılı",
        "Kayıt başarıyla yüklendi.",
        [{ text: "Tamam" }]
      );
    } catch (error) {
      console.log('Yükleme hatası:', error);
      Alert.alert(
        "Hata",
        "Kayıt yüklenirken bir hata oluştu.",
        [{ text: "Tamam" }]
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Upload Recording" showBackButton={true} />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.uploadSection}>
            <View style={styles.uploadBox}>
              <Ionicons name="mic-outline" size={60} color="#3b5998" />
              <Text style={styles.uploadText}>
                {selectedFile ? selectedFile.name : "Click to select an audio recording"}
              </Text>
              {selectedFile && (
                <Text style={styles.fileInfo}>
                  {formatFileSize(selectedFile.size)}
                </Text>
              )}
              
              <TouchableOpacity 
                style={styles.selectButton}
                onPress={pickDocument}
                disabled={uploading}
              >
                <Text style={styles.selectButtonText}>
                  {selectedFile ? "Change Recording" : "Select Recording"}
                </Text>
              </TouchableOpacity>
              
              {/* Toplantı bilgileri girişi */}
              <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Meeting Title</Text>
                <TextInput
                  style={styles.input}
                  value={meetingTitle}
                  onChangeText={setMeetingTitle}
                  placeholder="E.g., Weekly Team Meeting"
                  placeholderTextColor="#999"
                />
                
                <Text style={styles.formLabel}>Meeting Date</Text>
                <TouchableOpacity 
                  style={styles.datePickerButton}
                  onPress={showDatePickerModal}
                >
                  <Text style={dateText ? styles.dateTimeText : styles.dateTimePlaceholder}>
                    {dateText || "Select Date"}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                </TouchableOpacity>
                
                <Text style={styles.formLabel}>Meeting Time</Text>
                <TouchableOpacity 
                  style={styles.datePickerButton}
                  onPress={showTimePickerModal}
                >
                  <Text style={timeText ? styles.dateTimeText : styles.dateTimePlaceholder}>
                    {timeText || "Select Time"}
                  </Text>
                  <Ionicons name="time-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              
              {uploading ? (
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
                  <Text style={styles.progressText}>{uploadProgress}%</Text>
                </View>
              ) : null}
              
              {selectedFile && !uploading && (
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={uploadFile}
                >
                  <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          {/* Son yüklenenler bölümü */}
          {recentUploads.length > 0 && (
            <View style={styles.recentUploadsSection}>
              <Text style={styles.sectionTitle}>Recent Uploads</Text>
              
              {recentUploads.map(file => (
                <View key={file.id} style={styles.fileCard}>
                  <View style={styles.fileIconContainer}>
                    <Ionicons name="musical-note" size={24} color="#3b5998" />
                  </View>
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileName} numberOfLines={1}>{file.title}</Text>
                    <Text style={styles.fileDate}>{file.date} - {file.time}</Text>
                    <Text style={styles.fileUploadDate}>Uploaded: {file.uploadDate}</Text>
                  </View>
                  <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Bilgi bölümü */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Recording Upload Information</Text>
            <View style={styles.infoItem}>
              <Ionicons name="information-circle-outline" size={20} color="#666" />
              <Text style={styles.infoText}>Only .mp3 format recordings are accepted.</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="information-circle-outline" size={20} color="#666" />
              <Text style={styles.infoText}>Maximum file size is 10MB.</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="information-circle-outline" size={20} color="#666" />
              <Text style={styles.infoText}>Meeting title, date, and time must be provided.</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="information-circle-outline" size={20} color="#666" />
              <Text style={styles.infoText}>Uploaded recordings will be automatically analyzed.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Android için Tarih Seçici */}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={meetingDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      
      {/* Android için Saat Seçici */}
      {Platform.OS === 'android' && showTimePicker && (
        <DateTimePicker
          value={meetingTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
      
      {/* iOS için Tarih Seçici Modal */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={hideDatePicker}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Select Date</Text>
                <TouchableOpacity onPress={hideDatePicker}>
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={meetingDate}
                mode="date"
                display="spinner"
                onChange={onDateChange}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}
      
      {/* iOS için Saat Seçici Modal */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={showTimePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={hideTimePicker}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Select Time</Text>
                <TouchableOpacity onPress={hideTimePicker}>
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={meetingTime}
                mode="time"
                display="spinner"
                onChange={onTimeChange}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  datePickerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  selectButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  selectedFileName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  selectedFileSize: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  uploadButton: {
    backgroundColor: '#3b5998',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButtonDisabled: {
    backgroundColor: '#9eb0d4',
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#333',
  },
  dateTimePlaceholder: {
    fontSize: 14,
    color: '#999',
  },
  fileUploadDate: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  uploadSection: {
    width: '100%',
    marginBottom: 20,
  },
  uploadBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  fileInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
  },
  recentUploadsSection: {
    width: '100%',
    marginBottom: 20,
  },
  fileCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileDetails: {
    flex: 1,
    marginLeft: 10,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  fileDate: {
    fontSize: 12,
    color: '#666',
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelButton: {
    fontSize: 16,
    color: '#999',
  },
  doneButton: {
    fontSize: 16,
    color: '#3b5998',
    fontWeight: 'bold',
  },
  picker: {
    height: 200,
  },
});

export default UploadScreen; 