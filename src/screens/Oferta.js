import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default function Oferta({navigation}) {
  return <WebView source={{ uri: 'https://kz.139express.com/oferta' }} style={{ flex: 1 }} />;
}