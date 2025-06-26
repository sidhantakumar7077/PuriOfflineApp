import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatbotScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/image/mainLogo.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.headerTitle}>Rath yatra Helpline</Text>
            <Text style={styles.subTitle}>replies instantly…</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* WebView below the header */}
      <WebView
        source={{ uri: 'https://puribot.vercel.app' }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        style={styles.webview}
      />
    </View>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#d50000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 6,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitle: {
    color: '#fff',
    fontSize: 12,
  },
  webview: {
    flex: 1,
  },
});













// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const Index = () => {
//   return (
//     <View style={styles.container}>
//       <WebView
//         // source={{ uri: 'https://puribot.vercel.app' }}
//         source={{ uri: 'https://puribot.vercel.app' }}
//         originWhitelist={['*']}
//         javaScriptEnabled
//         domStorageEnabled
//         startInLoadingState
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
