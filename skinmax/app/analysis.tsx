import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import * as FaceDetector from 'expo-face-detector';
import { useRouter } from 'expo-router';

export default function AnalysisScreen() {
  const imageUri = useAppStore((state) => state.image);
  const router = useRouter();

  const [skinType, setSkinType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUri) {
      Alert.alert('No Image Found', 'Please upload a photo first.');
      router.replace('/photo');
      return;
    }

    const runAnalysis = async () => {
      try {
        const detection = await FaceDetector.detectFacesAsync(imageUri, {
          mode: FaceDetector.FaceDetectorMode.fast,
        });

        if (detection.faces.length === 0) {
          Alert.alert('No face detected', 'Please retake the photo with your face clearly visible.');
          setSkinType('unknown');
          setLoading(false);
          return;
        }

        // Placeholder logic (simulate based on randomness)
        const simulatedTypes = ['oily', 'dry', 'normal', 'combination'];
        const randomSkin = simulatedTypes[Math.floor(Math.random() * simulatedTypes.length)];

        setTimeout(() => {
          setSkinType(randomSkin);
          setLoading(false);
        }, 2000); // simulate processing delay
      } catch (err) {
        Alert.alert('Analysis Error', 'Something went wrong analyzing the image.');
        setLoading(false);
      }
    };

    runAnalysis();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analyzing Skin Details...</Text>

      <Image source={{ uri: imageUri || '' }} style={styles.image} />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : skinType ? (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={styles.resultText}>Detected Skin Type: {skinType}</Text>
        </View>
      ) : (
        <Text>No skin data found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
  image: { width: 220, height: 280, borderRadius: 12, marginBottom: 20 },
  resultText: { fontSize: 18, fontWeight: '600', color: '#444' },
});
