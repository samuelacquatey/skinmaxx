import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/useAppStore';

export default function PhotoScreen() {
  const [localImage, setLocalImage] = useState<string | null>(null);
  const setImage = useAppStore((state) => state.setImage);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permissions are required to use this feature.');
      }
    })();
  }, []);

  const handleImageSelect = (uri: string) => {
    setLocalImage(uri);
    setImage(uri); // Save to global state
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      handleImageSelect(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      handleImageSelect(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!localImage) {
      Alert.alert('No image selected', 'Please upload or take a photo first.');
      return;
    }

    router.push('/questions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload or Take a Photo</Text>

      <View style={styles.buttons}>
        <Button title="Pick from Gallery" onPress={pickImage} />
        <Button title="Take a Photo" onPress={takePhoto} />
      </View>

      {localImage && (
        <Image
          source={{ uri: localImage }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Button title="Continue" onPress={handleContinue} disabled={!localImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  image: {
    width: 200,
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
