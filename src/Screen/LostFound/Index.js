import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Index = () => {

  const english_data = [
    {
      "id": "13",
      "locationname": "Singhadwara Information Center",
      "lat": "19.804561766262474",
      "long": "85.81911426522505",
      "photo": require('../../assets/offlineData/lostandfound/SinghadwaraInformationCenter.jpeg')
    },
    // {
    //   "id": "1",
    //   "locationname": "Lions Gate",
    //   "lat": "19.804543563698207",
    //   "long": "85.81930583037438",
    //   "photo": require('../../assets/offlineData/lostandfound/LionsGate.jpeg')
    // },
    // {
    //   "id": "2",
    //   "locationname": "Gundicha Ghara Muktaash Rangamanch",
    //   "lat": "19.81593451772561",
    //   "long": "85.83876570554955",
    //   "photo": require('../../assets/offlineData/lostandfound/GundichaGharaMuktaashRangamanch.jpeg')
    // },
    // {
    //   "id": "3",
    //   "locationname": "Jagannatha Ballav Matha",
    //   "lat": "19.80988059975975",
    //   "long": "85.82438446767046",
    //   "photo": require('../../assets/offlineData/lostandfound/JagannathaBallavMatha.jpeg')
    // },
    // {
    //   "id": "4",
    //   "locationname": "Balagandi Chack",
    //   "lat": "19.8130796272601",
    //   "long": "85.8301243062821",
    //   "photo": require('../../assets/offlineData/lostandfound/BalagandiChack.jpeg')
    // },
    // {
    //   "id": "5",
    //   "locationname": "Badasankha Chack",
    //   "lat": "19.814054397780385",
    //   "long": "85.83284977285376",
    //   "photo": require('../../assets/offlineData/lostandfound/BadasankhaChack.jpeg')
    // },
    // {
    //   "id": "6",
    //   "locationname": "Talabania Parking",
    //   "lat": "19.81086780917331",
    //   "long": "85.84687364164495",
    //   "photo": require('../../assets/offlineData/lostandfound/TalabaniaParking.jpeg')
    // },
    // {
    //   "id": "7",
    //   "locationname": "Malatipata Pur Parking",
    //   "lat": "19.865748024997256",
    //   "long": "85.83044080050104",
    //   "photo": require('../../assets/offlineData/lostandfound/MalatipataPurParking.jpeg')
    // },
    // {
    //   "id": "8",
    //   "locationname": "Digabareni Chack",
    //   "lat": "19.795971198786614",
    //   "long": "85.82568939976444",
    //   "photo": require('../../assets/offlineData/lostandfound/DigabareniChack.jpeg')
    // },
    // {
    //   "id": "9",
    //   "locationname": "Panthanivas",
    //   "lat": "19.798644635864633",
    //   "long": "85.83215785723448",
    //   "photo": require('../../assets/offlineData/lostandfound/Panthanivas.jpeg')
    // },
    // {
    //   "id": "10",
    //   "locationname": "Subas Bose Chack, Near Tourist Office",
    //   "lat": "19.799860639032833",
    //   "long": "85.8314976791313",
    //   "photo": require('../../assets/offlineData/lostandfound/SubasBoseChackNearTouristOffice.jpeg')
    // },
    // {
    //   "id": "11",
    //   "locationname": "Shree Danda",
    //   "lat": "19.81185481171331",
    //   "long": "85.82242502871516",
    //   "photo": require('../../assets/offlineData/lostandfound/ShreeDanda.jpeg')
    // },
    // {
    //   "id": "12",
    //   "locationname": "Utkal Balasharm CWC control Room",
    //   "lat": "19.81354182174009",
    //   "long": "85.82708392075733",
    //   "photo": require('../../assets/offlineData/lostandfound/UtkalBalasharmCWCcontrolRoom.jpeg')
    // },
    {
      "id": "14",
      "locationname": "Singhadwara Police Station",
      "lat": "19.804720852266115",
      "long": "85.81985579735071",
      "photo": require('../../assets/offlineData/lostandfound/SinghadwaraPoliceStation.jpeg')
    }
  ];

  const odia_data = [
    {
      "id": "13",
      "locationname": "ସିଂହଦ୍ବାର ସୂଚନା କେନ୍ଦ୍ର",
      "lat": "19.804561766262474",
      "long": "85.81911426522505",
      "photo": require('../../assets/offlineData/lostandfound/SinghadwaraInformationCenter.jpeg')
    },
    // {
    //   "id": "1",
    //   "locationname": "ସିଂହଦ୍ଵାର",
    //   "lat": "19.804543563698207",
    //   "long": "85.81930583037438",
    //   "photo": require('../../assets/offlineData/lostandfound/LionsGate.jpeg')
    // },
    // {
    //   "id": "2",
    //   "locationname": "ଗୁଣ୍ଡିଚା ଘର ମୁକ୍ତାକାଶ ରଙ୍ଗମଞ୍ଚ",
    //   "lat": "19.81593451772561",
    //   "long": "85.83876570554955",
    //   "photo": require('../../assets/offlineData/lostandfound/GundichaGharaMuktaashRangamanch.jpeg')
    // },
    // {
    //   "id": "3",
    //   "locationname": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠ",
    //   "lat": "19.80988059975975",
    //   "long": "85.82438446767046",
    //   "photo": require('../../assets/offlineData/lostandfound/JagannathaBallavMatha.jpeg')
    // },
    // {
    //   "id": "4",
    //   "locationname": "ବଳଗଣ୍ଡି ଛକ",
    //   "lat": "19.8130796272601",
    //   "long": "85.8301243062821",
    //   "photo": require('../../assets/offlineData/lostandfound/BalagandiChack.jpeg')
    // },
    // {
    //   "id": "5",
    //   "locationname": "ବଡଶଙ୍ଖ ଛକ",
    //   "lat": "19.814054397780385",
    //   "long": "85.83284977285376",
    //   "photo": require('../../assets/offlineData/lostandfound/BadasankhaChack.jpeg')
    // },
    // {
    //   "id": "6",
    //   "locationname": "ତାଳବଣିଆ ପାର୍କିଂ",
    //   "lat": "19.81086780917331",
    //   "long": "85.84687364164495",
    //   "photo": require('../../assets/offlineData/lostandfound/TalabaniaParking.jpeg')
    // },
    // {
    //   "id": "7",
    //   "locationname": "ମାଳତିପାଟ ପୁର ପାର୍କିଂ",
    //   "lat": "19.865748024997256",
    //   "long": "85.83044080050104",
    //   "photo": require('../../assets/offlineData/lostandfound/MalatipataPurParking.jpeg')
    // },
    // {
    //   "id": "8",
    //   "locationname": "ଦିଗବାରେଣୀ ଛକ",
    //   "lat": "19.795971198786614",
    //   "long": "85.82568939976444",
    //   "photo": require('../../assets/offlineData/lostandfound/DigabareniChack.jpeg')
    // },
    // {
    //   "id": "9",
    //   "locationname": "ପାନ୍ଥନିବାସ",
    //   "lat": "19.798644635864633",
    //   "long": "85.83215785723448",
    //   "photo": require('../../assets/offlineData/lostandfound/Panthanivas.jpeg')
    // },
    // {
    //   "id": "10",
    //   "locationname": "ସୁବାଷ ବୋଷ ଛକ , ଟୁରିଷ୍ଟ ଅଫିସ ପାଖ",
    //   "lat": "19.799860639032833",
    //   "long": "85.8314976791313",
    //   "photo": require('../../assets/offlineData/lostandfound/SubasBoseChackNearTouristOffice.jpeg')
    // },
    // {
    //   "id": "11",
    //   "locationname": "ଶ୍ରୀଦାଣ୍ଡ",
    //   "lat": "19.81185481171331",
    //   "long": "85.82242502871516",
    //   "photo": require('../../assets/offlineData/lostandfound/ShreeDanda.jpeg')
    // },
    // {
    //   "id": "12",
    //   "locationname": "ଉତ୍କଳ ବାଳଶ୍ରମ",
    //   "lat": "19.81354182174009",
    //   "long": "85.82708392075733",
    //   "photo": require('../../assets/offlineData/lostandfound/UtkalBalasharmCWCcontrolRoom.jpeg')
    // },
    {
      "id": "14",
      "locationname": "ସିଂହଦ୍ଵାର ପୋଲିସ ଥାନା ",
      "lat": "19.804720852266115",
      "long": "85.81985579735071",
      "photo": require('../../assets/offlineData/lostandfound/SinghadwaraPoliceStation.jpeg')
    }
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [allLostAndFound, setAllLostAndFound] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        if (value === 'Odia') {
          setAllLostAndFound(odia_data);
        } else if (value === 'English') {
          setAllLostAndFound(english_data);
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
      console.log("Refreshing Successful");
      loadLanguage();
    }, 2000);
  }, []);

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

  const openMap = (lat, long) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
    Linking.openURL(url).catch(err => console.error("Failed to open map:", err));
  };

  const linkPhone = (number) => {
    const phoneNumber = `tel:${number}`;
    Linking.openURL(phoneNumber).catch(err => console.warn("Failed to open dialer:", err));
  };

  useEffect(() => {
    if (isFocused) {
      // getShoesStands(selectedLanguage);
      loadLanguage();
    }
  }, [isFocused, selectedLanguage]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
        <LinearGradient
          colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
          style={styles.gradient}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
            <MaterialIcons name="arrow-back-ios" size={20} color="white" />
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ହଜିବା ଓ ଖୋଜିବା କେନ୍ଦ୍ର' : 'Lost & Found'}</Text>
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
              <Text style={{ color: '#ddd', fontSize: 14, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଏଠାରେ ସମସ୍ତ ସୂଚନା କେନ୍ଦ୍ର ଏବଂ ହଜିବା ଓ ଖୋଜିବା କେନ୍ଦ୍ର ବିଷୟରେ ତଥ୍ୟ ଉପଲବ୍ଧ ଅଛି।' : "Please contact the information center below for Lost & Found."}</Text>
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
              <Image source={require('../../assets/image/lost&found21.png')} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
            </View>
          </View>
        </View>

        {spinner ? (
          <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#341551" />
            <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={allLostAndFound}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => openMap(item.lat, item.long)}
                style={{
                  width: '100%',
                  height: 120,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 12,
                  paddingHorizontal: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}
              >
                <View style={{ width: '42%', justifyContent: 'center', backgroundColor: '#dedfe0', borderRadius: 6 }}>
                  {item.photo ?
                    <Image source={item.photo} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                    :
                    <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                  }
                </View>
                <View style={{ width: '55%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                    {item.locationname || 'Shoe Stand'}
                  </Text>
                  <View style={styles.buttonRow}>
                    <LinearGradient
                      colors={['#FFA726', '#F06292']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.bookNowButton}
                    >
                      <TouchableOpacity onPress={() => openMap(item.lat, item.long)}>
                        <Text style={styles.bookNowText}>Direction</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <TouchableOpacity style={styles.callButton} onPress={() => linkPhone(item.contact_no)}>
                      <Text style={styles.callText}>📞 1098</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
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
    overflow: 'hidden'
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    paddingHorizontal: 7,
    marginLeft: 20,
  },
  callText: {
    fontSize: 11,
    color: '#000',
    fontWeight: '600'
  }
});
