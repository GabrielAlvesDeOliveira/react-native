import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'
import { Camera } from 'expo-camera'
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [open, setOpen] = useState(false)
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture() {
    const options = { quality: 0.5, base64: true };
    const data = await Camera.takePictureAsync(options);

    setPhoto(data.uri)

    setOpen(true)
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Camera style={styles.preview} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => takePicture()}
          ><Text> Tirar Foto</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>

      {
        capturedPhoto && (
          <Modal animationType='slide' transparent={false} visible={open}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
              <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                <Text>Fechar</Text>
              </TouchableOpacity>

              <Image 
                resizeMode="contain"
                style={{width: 350, height: 450, borderRadius:15}}
                source={{ uri: capturedPhoto}}
              />

            </View>
          </Modal>
        )
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'

  },
  text: {}
})