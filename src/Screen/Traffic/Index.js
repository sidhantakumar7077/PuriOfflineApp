import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Index = () => {

  const trafficAdvisoryOdia = [
    {
      id: '1',
      category: 'fourwheeler',
      title: 'Four Wheeler Traffic Advisory',
      photo: [
        require('../../assets/offlineData/trafficAdvisory/fourwheelerodia1.png'),
        require('../../assets/offlineData/trafficAdvisory/fourwheelerodia2.png'),
        require('../../assets/offlineData/trafficAdvisory/fourwheelerodia3.png'),
      ]
    },
    {
      id: '2',
      category: 'twowheeler',
      title: 'Two Wheeler Traffic Advisory',
      photo: [
        require('../../assets/offlineData/trafficAdvisory/twowheelerodia1.png'),
        require('../../assets/offlineData/trafficAdvisory/twowheelerodia2.png'),
        require('../../assets/offlineData/trafficAdvisory/twowheelerodia3.png'),
      ]
    },
    {
      id: '3',
      category: 'touristbus',
      title: 'Tourist Bus Traffic Advisory',
      photo: [
        require('../../assets/offlineData/trafficAdvisory/touristbusodia1.png'),
        require('../../assets/offlineData/trafficAdvisory/touristbusodia2.png'),
        require('../../assets/offlineData/trafficAdvisory/touristbusodia3.png'),
      ]
    }
  ];

  const trafficAdvisoryEnglish = [
    {
      id: '1',
      category: 'fourwheeler',
      title: 'Four Wheeler Traffic Advisory',
      photo: [
        require('../../assets/offlineData/trafficAdvisory/fourwheelerenglish1.png'),
        require('../../assets/offlineData/trafficAdvisory/fourwheelerenglish2.png'),
        require('../../assets/offlineData/trafficAdvisory/fourwheelerenglish3.png'),
      ]
    },
    {
      id: '2',
      category: 'twowheeler',
      title: 'Two Wheeler Traffic Advisory',
      photo: [
        require('../../assets/offlineData/trafficAdvisory/twowheelerenglish1.png'),
        require('../../assets/offlineData/trafficAdvisory/twowheelerenglish2.png'),
        require('../../assets/offlineData/trafficAdvisory/twowheelerenglish3.png'),
      ]
    },
    {
      id: '3',
      category: 'touristbus',
      title: 'Tourist Bus Traffic Advisory',
      photo: [
        require('../../assets/offlineData/trafficAdvisory/touristbusEnglish1.png'),
        require('../../assets/offlineData/trafficAdvisory/touristbusEnglish2.png'),
        require('../../assets/offlineData/trafficAdvisory/touristbusEnglish3.png'),
      ]
    }
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState("fourwheeler");
  const [trafficeData, setTrafficData] = useState([]);
  const filteredData = trafficeData.filter(item => item.category === selectedTab);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // console.log("Refreshing Successful");
      loadLanguage();
    }, 2000);
  }, []);

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        setSelectedLanguage(value);
        if (value === 'Odia') {
          setTrafficData(trafficAdvisoryOdia);
        } else if (value === 'English') {
          setTrafficData(trafficAdvisoryEnglish);
        }
      }
    } catch (error) {
      console.log('Error loading language from storage:', error);
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsScrolled(offsetY > 50);
      }
    }
  );

  useEffect(() => {
    if (isFocused) {
      loadLanguage();
    }
  }, [isFocused, selectedLanguage])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
        <LinearGradient
          colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
          style={styles.gradient}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
            <MaterialIcons name="arrow-back-ios" size={20} color="white" />
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଟ୍ରାଫିକ ପରାମର୍ଶ' : 'Traffic Advisory'}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.headerContainer}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
            <View style={{ width: '75%' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ରଥଯାତ୍ରା 2025 ପାଇଁ ଟ୍ରାଫିକ ପରାମର୍ଶ।' : 'Traffic advisory for Ratha Yatra 2025.'}</Text>
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 30 }}>
              <Image source={require('../../assets/image/traffic.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
            </View>
          </View>
        </View>

        <View style={styles.nearbyContainer}>

          <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, marginVertical: 15, padding: 5 }}>
            <LinearGradient
              colors={selectedTab === 'fourwheeler' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedTab('fourwheeler')}
                style={{
                  flex: 1,
                  borderRadius: 10,
                  paddingVertical: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: selectedTab === 'fourwheeler' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                  {selectedLanguage === 'Odia' ? 'ଚାରି ଚକିଆ' : 'Four Wheeler'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={selectedTab === 'twowheeler' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedTab('twowheeler')}
                style={{
                  flex: 1,
                  borderRadius: 10,
                  paddingVertical: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: selectedTab === 'twowheeler' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                  {selectedLanguage === 'Odia' ? 'ଦୁଇ ଚକିଆ' : 'Two Wheeler'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={selectedTab === 'touristbus' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedTab('touristbus')}
                style={{
                  flex: 1,
                  borderRadius: 10,
                  paddingVertical: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: selectedTab === 'touristbus' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                  {selectedLanguage === 'Odia' ? 'ପର୍ଯ୍ୟଟକ ବସ୍' : 'Tourist Bus'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Add Here Image Slider */}
          <FlatList
            horizontal
            data={filteredData[0]?.photo || []}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={280} // width of each item + margin
            renderItem={({ item }) => (
              <View style={styles.cardSlider}>
                <Image source={item} style={styles.sliderImage} />
              </View>
            )}
          />
        </View>

        <View style={{ width: '93%', height: 220, alignSelf: 'center', borderRadius: 10, marginBottom: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, elevation: 2 }}>
          {selectedLanguage === 'Odia' ?
            <Image source={require('../../assets/offlineData/trafficAdvisory/shuttleserviceOdia.jpeg')} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
            :
            <Image source={require('../../assets/offlineData/trafficAdvisory/shuttleserviceEnglish.jpeg')} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'FiraSans-Regular',
    color: 'white',
    textTransform: 'capitalize'
  },
  headerContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#341551',
    alignSelf: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  // main style
  nearbyContainer: {
    marginVertical: 10,
    width: '93%',
    alignSelf: 'center',
  },
  cardSlider: {
    width: 260,
    height: 450,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    // backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
})