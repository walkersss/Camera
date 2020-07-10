import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }

      snapPicture() {
    this.setState({
        takeImageText: "... PROCESSING ..."
    });
    this.camera.takePictureAsync({ skipProcessing: true }).then((data) => {
        this.setState({
            takeImageText: "PICTURE TAKEN",
            photo: data.uri
        }, console.log(data.uri))
    })
}
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
        <Camera ref={ref => { this.camera = ref; }}
        type={this.state.type}>
            <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row',}}>
              <TouchableOpacity
                style={{flex: 0.1, alignSelf: 'flex-end', alignItems: 'center',}}
                    onPress={() => {
                    this.setState({
                      type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
                
          
          <TouchableOpacity
              onPress={this.snapPicture.bind(this)} >
                <Text>Take photo</Text>
            </TouchableOpacity>
            </View>
        
      );
    }
  }
}
