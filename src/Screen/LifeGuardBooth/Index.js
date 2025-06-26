import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

  const odia_data = [
    {
      "id": 123,
      "language": "Odia",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "ଲାଇଫଗାର୍ଡ ବୁଥ ନୀଳାଦ୍ରୀ ବେଳାଭୂମି",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothNiladriBeach.jpeg'),
      "google_map_link": "https://www.google.co.in/maps/place/Niladri+Beach/@19.7985298,85.8352679,19z/data=!4m6!3m5!1s0x3a19c58b0111e04d:0x2f0d1430bcf80cbf!8m2!3d19.7984844!4d85.8356787!16s%2Fg%2F11k50w17dv?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "ବାଙ୍କି ମୁହାଣ",
      "pincode": "୭୫୨୦୦୨",
      "city_village": "",
      "district": "ପୁରୀ",
      "state": "ଓଡିଶା",
      "country": "ଭାରତ",
      "description": "Life Guard Booth Niladri Beach",
      "status": "active",
      "created_at": "2025-04-18T04:54:47.000000Z",
      "updated_at": "2025-06-03T05:26:25.000000Z"
    },
    {
      "id": 124,
      "language": "Odia",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "ଲାଇଫଗାର୍ଡ ବୁଥ ବ୍ଲୁଫ୍ଲାଗ ବେଳାଭୂମି",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothBlueFlagBeach.png'),
      "google_map_link": "https://www.google.co.in/maps/place/Blue+Flag+Beach/@19.7964622,85.830962,19.43z/data=!4m6!3m5!1s0x3a19c52655258809:0x526a68bae3011bc7!8m2!3d19.7965033!4d85.8313094!16s%2Fg%2F11lh_wl1wt?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "ଚକ୍ରତୀର୍ଥ ରୋଡ଼",
      "pincode": "୭୫୨୦୦୨",
      "city_village": "",
      "district": "ପୁରୀ",
      "state": "ଓଡିଶା",
      "country": "ଭାରତ",
      "description": "Lifeguard Booth Blue Flag Beach",
      "status": "active",
      "created_at": "2025-04-18T04:56:52.000000Z",
      "updated_at": "2025-06-03T05:25:14.000000Z"
    },
    {
      "id": 125,
      "language": "Odia",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "ଲାଇଫଗାର୍ଡ ବୁଥ ଗୋଲ୍ଡେନ ବେଳାଭୂମି ",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothGoldenBeach.png'),
      "google_map_link": "https://www.google.co.in/maps/place/Golden+Beach,+Puri,+Odisha/@19.7959363,85.8194038,15.35z/data=!4m10!1m2!2m1!1sGolden+Beach+Lifeguard+Tower+puri!3m6!1s0x3a19c5cac5afa9d7:0x880a15dc82619942!8m2!3d19.7969375!4d85.8310625!15sCiFHb2xkZW4gQmVhY2ggTGlmZWd1YXJkIFRvd2VyIHB1cmlaIyIhZ29sZGVuIGJlYWNoIGxpZmVndWFyZCB0b3dlciBwdXJpkgESdG91cmlzdF9hdHRyYWN0aW9u4AEA!16s%2Fg%2F11lfbgx8bp?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "ଭିଆପି ରୋଡ଼ ",
      "pincode": "୭୫୨୦୦୨",
      "city_village": "",
      "district": "ପୁରୀ",
      "state": "ଓଡିଶା",
      "country": "ଭାରତ",
      "description": "Lifeguard Booth Golden Beach",
      "status": "active",
      "created_at": "2025-04-18T04:59:18.000000Z",
      "updated_at": "2025-06-03T05:25:21.000000Z"
    },
    {
      "id": 126,
      "language": "Odia",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "ଲାଇଫଗାର୍ଡ ବୁଥ ଲାଇଟ୍ ହାଉସ(ଘର)",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothLightHouse.png'),
      "google_map_link": "https://www.google.co.in/maps/place/Puri+Light+House/@19.7897608,85.8037983,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c5676ce27781:0xa2c920b0e080d2c3!8m2!3d19.7897608!4d85.8063732!16s%2Fg%2F11j1cx18lt?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "ନୂଆ ମେରାଇନ ଡ୍ରାଇଭ ରୋଡ଼",
      "pincode": "୭୫୨୦୦୧",
      "city_village": "",
      "district": "ପୁରୀ",
      "state": "ଓଡିଶା",
      "country": "ଭାରତ",
      "description": "Life Guard Booth Lighthouse",
      "status": "active",
      "created_at": "2025-04-18T05:01:08.000000Z",
      "updated_at": "2025-04-28T01:06:27.000000Z"
    },
    {
      "id": 127,
      "language": "Odia",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "ଲାଇଫଗାର୍ଡ ବୁଥ ସ୍ଵର୍ଗଦ୍ଵାର ବେଳାଭୂମି  ",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothSwargadwarSeaBeach.png'),
      "google_map_link": "https://www.google.co.in/maps/place/Swargadwar+Sea+Beach/@19.7901482,85.8106486,16.68z/data=!4m10!1m2!2m1!1spuri+sea+beach+near+by!3m6!1s0x3a19c4304eebcbab:0xa0323eef6f24cc34!8m2!3d19.7917753!4d85.8157589!15sChZwdXJpIHNlYSBiZWFjaCBuZWFyIGJ5IgOQAQFaGCIWcHVyaSBzZWEgYmVhY2ggbmVhciBieZIBBWJlYWNo4AEA!16s%2Fg%2F11c6v3hty9?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "ଶଙ୍କର ରୋଡ଼",
      "pincode": "୭୫୨୦୦୧",
      "city_village": "",
      "district": "ପୁରୀ",
      "state": "ଓଡିଶା",
      "country": "ଭାରତ",
      "description": "Life Guard Booth Swargadwar Sea Beach",
      "status": "active",
      "created_at": "2025-04-18T05:03:03.000000Z",
      "updated_at": "2025-06-03T05:25:33.000000Z"
    },
  ];

  const english_data = [
    {
      "id": 46,
      "language": "English",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "Life Guard Booth Niladri Beach",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothNiladriBeach.jpeg'),
      "google_map_link": "https://www.google.co.in/maps/place/Niladri+Beach/@19.7985298,85.8352679,19z/data=!4m6!3m5!1s0x3a19c58b0111e04d:0x2f0d1430bcf80cbf!8m2!3d19.7984844!4d85.8356787!16s%2Fg%2F11k50w17dv?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "Banki Muhan",
      "pincode": "752002",
      "city_village": "Puri",
      "district": "Puri",
      "state": "Odisha",
      "country": "India",
      "description": "Life Guard Booth Niladri Beach",
      "status": "active",
      "created_at": "2025-04-18T04:54:47.000000Z",
      "updated_at": "2025-06-03T05:23:56.000000Z"
    },
    {
      "id": 47,
      "language": "English",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "Life Guard Booth Blue Flag Beach",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothBlueFlagBeach.png'),
      "google_map_link": "https://www.google.co.in/maps/place/Blue+Flag+Beach/@19.7964622,85.830962,19.43z/data=!4m6!3m5!1s0x3a19c52655258809:0x526a68bae3011bc7!8m2!3d19.7965033!4d85.8313094!16s%2Fg%2F11lh_wl1wt?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "Chakra Tirtha Rd",
      "pincode": "752002",
      "city_village": "Puri",
      "district": "Puri",
      "state": "Odisha",
      "country": "India",
      "description": "Lifeguard Booth Blue Flag Beach",
      "status": "active",
      "created_at": "2025-04-18T04:56:52.000000Z",
      "updated_at": "2025-06-03T05:24:10.000000Z"
    },
    {
      "id": 48,
      "language": "English",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "Life Guard Booth Golden Beach",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothGoldenBeach.png'),
      "google_map_link": "https://www.google.co.in/maps/place/Golden+Beach,+Puri,+Odisha/@19.7959363,85.8194038,15.35z/data=!4m10!1m2!2m1!1sGolden+Beach+Lifeguard+Tower+puri!3m6!1s0x3a19c5cac5afa9d7:0x880a15dc82619942!8m2!3d19.7969375!4d85.8310625!15sCiFHb2xkZW4gQmVhY2ggTGlmZWd1YXJkIFRvd2VyIHB1cmlaIyIhZ29sZGVuIGJlYWNoIGxpZmVndWFyZCB0b3dlciBwdXJpkgESdG91cmlzdF9hdHRyYWN0aW9u4AEA!16s%2Fg%2F11lfbgx8bp?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "Vip Rd",
      "pincode": "752002",
      "city_village": "Puri",
      "district": "Puri",
      "state": "Odisha",
      "country": "India",
      "description": "Lifeguard Booth Golden Beach",
      "status": "active",
      "created_at": "2025-04-18T04:59:18.000000Z",
      "updated_at": "2025-06-03T05:24:23.000000Z"
    },
    {
      "id": 49,
      "language": "English",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "Life Guard Booth Light House",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothLightHouse.png'),
      "google_map_link": "https://www.google.co.in/maps/place/Puri+Light+House/@19.7897608,85.8037983,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c5676ce27781:0xa2c920b0e080d2c3!8m2!3d19.7897608!4d85.8063732!16s%2Fg%2F11j1cx18lt?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "Light House, New Marine Drive Rd",
      "pincode": "752001",
      "city_village": "Puri",
      "district": "Puri",
      "state": "Odisha",
      "country": "India",
      "description": "Life Guard Booth Lighthouse",
      "status": "active",
      "created_at": "2025-04-18T05:01:08.000000Z",
      "updated_at": "2025-06-03T05:24:49.000000Z"
    },
    {
      "id": 50,
      "language": "English",
      "temple_id": "TEMPLE25402",
      "service_type": "life_guard_booth",
      "service_name": "Life Guard Booth Swargadwar Sea Beach",
      "photo": require('../../assets/offlineData/lifebooth/LifeGuardBoothSwargadwarSeaBeach.png'),
      "google_map_link": "https://www.google.co.in/maps/place/Swargadwar+Sea+Beach/@19.7901482,85.8106486,16.68z/data=!4m10!1m2!2m1!1spuri+sea+beach+near+by!3m6!1s0x3a19c4304eebcbab:0xa0323eef6f24cc34!8m2!3d19.7917753!4d85.8157589!15sChZwdXJpIHNlYSBiZWFjaCBuZWFyIGJ5IgOQAQFaGCIWcHVyaSBzZWEgYmVhY2ggbmVhciBieZIBBWJlYWNo4AEA!16s%2Fg%2F11c6v3hty9?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
      "contact_no": "82607 77771",
      "whatsapp_no": null,
      "opening_time": "06:00",
      "closing_time": "05:59",
      "start_date": null,
      "end_date": null,
      "landmark": "Shankar Rd, Sea Beach Rd",
      "pincode": "752001",
      "city_village": "Puri",
      "district": "Puri",
      "state": "Odisha",
      "country": "India",
      "description": "Life Guard Booth Swargadwar Sea Beach",
      "status": "active",
      "created_at": "2025-04-18T05:03:03.000000Z",
      "updated_at": "2025-06-03T05:25:03.000000Z"
    },
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [allLifeguards, setAllLifeguards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        // getLifeguards(value);
        if (value === 'Odia') {
          setAllLifeguards(odia_data);
        } else if (value === 'English') {
          setAllLifeguards(english_data);
        }
        setSelectedLanguage(value);
      }
    } catch (error) {
      console.log('Error loading language from storage:', error);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // getLifeguards(selectedLanguage);
      loadLanguage();
    }, 2000);
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsScrolled(offsetY > 50); // Change header color after 50px scroll
      }
    }
  );

  const openMap = (url) => {
    Linking.openURL(url);
  };

  const linkPhone = (number) => {
    const phoneNumber = `tel:${number}`;
    Linking.openURL(phoneNumber).catch(err => console.warn("Failed to open dialer:", err));
  };

  const getLifeguards = async (language) => {
    // console.log("selectedLanguage", selectedLanguage);
    try {
      setLoading(true);
      const response = await fetch(`${base_url}api/get-all-service-list/${language}`);
      const responseData = await response.json();
      if (responseData.status) {
        const filtered = responseData.data.filter(item => item.service_type === 'life_guard_booth');
        // const filteredData = filtered.filter(item => item.language === selectedLanguage);
        setAllLifeguards(filtered);
      }
    } catch (error) {
      console.error('Error fetching life guard booths:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // getLifeguards(selectedLanguage);
      loadLanguage();
    }
  }, [isFocused, selectedLanguage]);

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
        <LinearGradient
          colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
          style={styles.gradient}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
            <MaterialIcons name="arrow-back-ios" size={20} color="white" />
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଲାଇଫ ଗାର୍ଡ ବୁଥ୍' : 'Lifeguard Booth'}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false} // Prevents bounce effect on iOS
        overScrollMode="never" // Prevents overscroll glow on Android
      >
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
            <View style={{ width: '75%' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ବେଳାଭୂମି ନିକଟରେ ଉପଲବ୍ଧ ଲାଇଫ ଗାର୍ଡ ସେବା' : 'Lifeguard Services Near Beaches'}</Text>
              <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଏକ ନିରାପଦ ବେଳାଭୂମିର ଅଭିଜ୍ଞତା ନିଶ୍ଚିତ କରିବାକୁ ନିକଟତମ ଲାଇଫ୍ ଗାର୍ଡ ବୁଥ୍ ସନ୍ଧାନ କରନ୍ତୁ |' : 'Find the nearest life guard booths to ensure a safe beach experience.'}</Text>
              {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Call Now →</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
              <Image source={require('../../assets/image/life432.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
            </View>
          </View>
        </View>

        {/* Main Locker & Shoes Stands */}
        {loading ? (
          <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#341551" />
            <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={allLifeguards}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View
                style={{
                  width: '100%',
                  height: 135,
                  flexDirection: 'row',
                  // alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 12,
                  paddingHorizontal: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}
              >
                <View style={{ width: '42%', justifyContent: 'center', backgroundColor: '#dedfe0', borderRadius: 6 }}>
                  {item.photo ?
                    // <Image source={{ uri: item.photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                    <Image source={item.photo} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                    :
                    <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                  }
                </View>

                {/* Text Content */}
                <View style={{ width: '55%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                    {item.service_name || 'Life Guard Booth'}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <MaterialIcons name="location-on" size={14} color="#999" />
                    <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                      {item.landmark}, {item.district}, {item.state}, {item.pincode}
                    </Text>
                  </View>
                  {/* Buttons */}
                  <View style={styles.buttonRow}>
                    <LinearGradient
                      colors={['#FFA726', '#F06292']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.bookNowButton}
                    >
                      <TouchableOpacity onPress={() => openMap(item.google_map_link)}>
                        <Text style={styles.bookNowText}>Direction</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <TouchableOpacity style={styles.callButton} onPress={() => linkPhone(item.contact_no)}>
                      <Text style={styles.callText}>📞 {item.contact_no}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <MaterialIcons name="access-time" size={13} color="#999" />
                    <Text style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>Open: {item.opening_time} - {item.closing_time}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <FontAwesome5 name="phone" size={13} color="#28a745" />
                    <Text style={{ fontSize: 13, marginLeft: 5, color: '#28a745' }}>{item.contact_no}</Text>
                  </View> */}
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Index;

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
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
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
    overflow: 'hidden', // Ensures the image does not bleed outside the rounded corners
  },
  headerImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4B7100',
  },
  /* List Styles */
  mostPPlrItem: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 13,
    elevation: 5,
    marginBottom: 10,
    marginHorizontal: '1.3%'
  },
  mostPPImage: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: 'cover'
  },
  hotBtm: {
    position: 'absolute',
    top: 10,
    left: 6,
    backgroundColor: '#f00062',
    padding: 2,
    borderRadius: 6
  },
  saveBtm: {
    position: 'absolute',
    top: 10,
    right: 6,
    backgroundColor: '#fff',
    width: 26,
    height: 26,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lockerImage: {
    height: 100,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10
  },
  secondLocker: {
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
    overflow: 'hidden',
    padding: 8
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  bookNowButton: {
    backgroundColor: '#7e22ce',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  bookNowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1
  },
  callButton: {
    borderWidth: 1,
    borderColor: '#b8b8b8',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 7
  },
  callText: {
    fontSize: 11,
    color: '#000',
    fontWeight: '600'
  }
});
