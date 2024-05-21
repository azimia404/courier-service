import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default function Agreement({navigation}) {
  return <WebView source={{ uri: 'https://kz.139express.com/agreement' }} style={{ flex: 1 }} />;
}