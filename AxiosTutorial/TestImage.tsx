import React, { useState } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';

const TestImage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View
      style={{
        height: 120,
        width: 120,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      }}>
      
      <Image
        source={{
          uri: 'http://picsum.photos/200/300',
        }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 12,
          opacity: loading ? 0.3 : 1,
        }}
        resizeMode="cover"
        defaultSource={require('../assets/images/logo.png')}
        onLoadStart={() => {
          console.log('🟡 Image loading started...');
          setLoading(true);
        }}
        onLoad={() => {
          console.log('🟢 Image loaded successfully!');
          setLoading(false);
        }}
        onError={(err) => {
          console.log('🔴 Image load failed:', err.nativeEvent.error);
          setError(true);
          setLoading(false);
        }}
        onLoadEnd={() => {
          console.log('⚪️ Image load ended.');
          setLoading(false);
        }}
      />

      {loading && <ActivityIndicator size="small" color="#666" />}
      {error && (
        <Image
          source={require('../assets/images/logo.png')}
          style={{
            position: 'absolute',
            height: 100,
            width: 100,
            borderRadius: 12,
          }}
        />
      )}
    </View>
  );
};

export default TestImage;
