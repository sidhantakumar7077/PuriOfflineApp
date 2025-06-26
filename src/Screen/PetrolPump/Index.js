import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

    const odia_data = [
        {
            "id": 98,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "ଏଚପି ପେଟ୍ରୋଲ ପମ୍ପ ",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/H.P.+Petrol+pump/@19.8246455,85.8158303,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c149540540d3:0x87d88ece7fefcd98!8m2!3d19.8246455!4d85.8539391!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wkgELZ2FzX3N0YXRpb27gAQA!16s%2Fg%2F11ddx4w844?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "02222863900",
            "whatsapp_no": null,
            "opening_time": "12:00",
            "closing_time": "12:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ବାଲିଘାଟ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "All the Best",
            "status": "active",
            "created_at": "2025-04-18T00:48:04.000000Z",
            "updated_at": "2025-06-03T05:49:35.000000Z"
        },
        {
            "id": 99,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "ଇଣ୍ଡିଆନ ଅଏଲ",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/IndianOil/@19.8246455,85.8158303,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c7162408124b:0x4442dba533ae91a4!8m2!3d19.8149181!4d85.8401877!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wWh4iHHB1cmkgbWFuZGlyIG5lYXIgcGV0cm9sIHB1bXCSAQtnYXNfc3RhdGlvbuABAA!16s%2Fg%2F11s5pw7l2_?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "09437058384",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "10:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର ମାଟିପଡା ସ୍କୋୟାର , ବଡଗାଁ ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Very good",
            "status": "active",
            "created_at": "2025-04-18T00:53:30.000000Z",
            "updated_at": "2025-06-03T05:49:29.000000Z"
        },
        {
            "id": 100,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "ଭାରତ ପେଟ୍ରୋଲ ପମ୍ପ",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Bharat+Petroleum+Petrol+Pump+(CNG)+,+PUJAPANDA+FILLING+STATION/@19.8246455,85.8158303,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c10ee78e8523:0xb4c40936ad45e72!8m2!3d19.825953!4d85.8607876!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wkgELZ2FzX3N0YXRpb27gAQA!16s%2Fg%2F11fllwk3xn?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "11:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ବାଲୁଖଣ୍ଡ ତହସିଲ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Good",
            "status": "active",
            "created_at": "2025-04-18T00:58:02.000000Z",
            "updated_at": "2025-05-27T05:44:41.000000Z"
        },
        {
            "id": 101,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "ଇଣ୍ଡିଆନ ଅଏଲ",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/IndianOil/@19.8537286,85.7987307,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c6d87562eb13:0xf7c6e8d2a4358fb5!8m2!3d19.8537286!4d85.8368395!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wkgELZ2FzX3N0YXRpb27gAQA!16s%2Fg%2F11rmvdgqs?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "09692517012",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "10:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ବୀରହରେକୃଷ୍ଣ ପୁର",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Good",
            "status": "active",
            "created_at": "2025-04-18T01:04:15.000000Z",
            "updated_at": "2025-06-03T05:49:21.000000Z"
        },
        {
            "id": 102,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "ଇଣ୍ଡିଆନ ଅଏଲ",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/IndianOil/@19.8537286,85.7987307,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c14f4b1d8897:0x1baffa6f885bf8d!8m2!3d19.8244301!4d85.8575034!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wWh4iHHB1cmkgbWFuZGlyIG5lYXIgcGV0cm9sIHB1bXCSAQtnYXNfc3RhdGlvbuABAA!16s%2Fg%2F11c76ng0m9?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "09861341094",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "10:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ହର୍ଟିକଲଚର ନର୍ସରି ପାଖରେ,  ବାଲିଘାଟ  ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T01:08:24.000000Z",
            "updated_at": "2025-06-03T05:49:15.000000Z"
        },
        {
            "id": 103,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "ଇଣ୍ଡିଆନ ଅଏଲ",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/IndianOil/@19.798531,85.6254051,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19cc74d093b0b1:0x1032a947274109db!8m2!3d19.798531!4d85.6635139!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wWh4iHHB1cmkgbWFuZGlyIG5lYXIgcGV0cm9sIHB1bXCSAQtnYXNfc3RhdGlvbuABAA!16s%2Fg%2F11cn93qbrx?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "07008019134",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "10:00",
            "start_date": null,
            "end_date": null,
            "landmark": "କଲେଜ ଛକ ପାଖରେ, ବ୍ରହ୍ମଗିରି, ଗୋପୀନାଥ ପୁର",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Very Good",
            "status": "active",
            "created_at": "2025-04-18T01:11:27.000000Z",
            "updated_at": "2025-06-03T05:49:09.000000Z"
        },
    ];

    const english_data = [
        {
            "id": 7,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "Hp Petrol Pump",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/H.P.+Petrol+pump/@19.8246455,85.8158303,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c149540540d3:0x87d88ece7fefcd98!8m2!3d19.8246455!4d85.8539391!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wkgELZ2FzX3N0YXRpb27gAQA!16s%2Fg%2F11ddx4w844?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "02222863900",
            "whatsapp_no": null,
            "opening_time": "12:00",
            "closing_time": "12:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Balighat",
            "pincode": "752002",
            "city_village": "Balighat",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "All the Best",
            "status": "active",
            "created_at": "2025-04-18T00:48:04.000000Z",
            "updated_at": "2025-05-27T05:11:25.000000Z"
        },
        {
            "id": 10,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "Indian Oil",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/IndianOil/@19.8246455,85.8158303,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c7162408124b:0x4442dba533ae91a4!8m2!3d19.8149181!4d85.8401877!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wWh4iHHB1cmkgbWFuZGlyIG5lYXIgcGV0cm9sIHB1bXCSAQtnYXNfc3RhdGlvbuABAA!16s%2Fg%2F11s5pw7l2_?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "09437058384",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "10:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Ground Floor, Matiapada Square",
            "pincode": "752002",
            "city_village": "Badagaon",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Very good",
            "status": "active",
            "created_at": "2025-04-18T00:53:30.000000Z",
            "updated_at": "2025-05-27T05:27:03.000000Z"
        },
        {
            "id": 12,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "Bharat Petrol Pump",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Bharat+Petroleum+Petrol+Pump+(CNG)+,+PUJAPANDA+FILLING+STATION/@19.8246455,85.8158303,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c10ee78e8523:0xb4c40936ad45e72!8m2!3d19.825953!4d85.8607876!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wkgELZ2FzX3N0YXRpb27gAQA!16s%2Fg%2F11fllwk3xn?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "11:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Balukhanda Tahasil",
            "pincode": "752002",
            "city_village": "puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Good",
            "status": "active",
            "created_at": "2025-04-18T00:58:02.000000Z",
            "updated_at": "2025-06-03T05:56:32.000000Z"
        },
        {
            "id": 16,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "Indian Oil",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/IndianOil/@19.8537286,85.7987307,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c6d87562eb13:0xf7c6e8d2a4358fb5!8m2!3d19.8537286!4d85.8368395!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wkgELZ2FzX3N0YXRpb27gAQA!16s%2Fg%2F11rmvdgqs?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "09692517012",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "10:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Lock No 21016102, 1 Set Biraharekrushnapur, Badagaon",
            "pincode": "752002",
            "city_village": "puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Good",
            "status": "active",
            "created_at": "2025-04-18T01:04:15.000000Z",
            "updated_at": "2025-05-27T05:27:54.000000Z"
        },
        {
            "id": 19,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "Indian Oil",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/IndianOil/@19.8537286,85.7987307,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19c14f4b1d8897:0x1baffa6f885bf8d!8m2!3d19.8244301!4d85.8575034!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wWh4iHHB1cmkgbWFuZGlyIG5lYXIgcGV0cm9sIHB1bXCSAQtnYXNfc3RhdGlvbuABAA!16s%2Fg%2F11c76ng0m9?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "09861341094",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "10:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Lock No 21012, 102, beside Horticulture Nursery, Balighat, Badagaon,",
            "pincode": "752002",
            "city_village": "puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T01:08:24.000000Z",
            "updated_at": "2025-04-27T07:15:10.000000Z"
        },
        {
            "id": 21,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "petrol_pump",
            "service_name": "Indian Oil",
            "photo": require('../../assets/offlineData/petrolpump.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/IndianOil/@19.798531,85.6254051,14z/data=!4m10!1m2!2m1!1spuri+mandir+near+petrol+pump!3m6!1s0x3a19cc74d093b0b1:0x1032a947274109db!8m2!3d19.798531!4d85.6635139!15sChxwdXJpIG1hbmRpciBuZWFyIHBldHJvbCBwdW1wWh4iHHB1cmkgbWFuZGlyIG5lYXIgcGV0cm9sIHB1bXCSAQtnYXNfc3RhdGlvbuABAA!16s%2Fg%2F11cn93qbrx?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "07008019134",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "10:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Lock No Ig 205, 102, 1Set Brahmagiri, near College Square, Gopinathpur",
            "pincode": "752001",
            "city_village": "puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Very Good",
            "status": "active",
            "created_at": "2025-04-18T01:11:27.000000Z",
            "updated_at": "2025-06-03T05:48:57.000000Z"
        },
    ];

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const [petrolData, setPetrolData] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getPetrolData(value);
                if (value === 'Odia') {
                    setPetrolData(odia_data);
                } else if (value === 'English') {
                    setPetrolData(english_data);
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
            // getPetrolData(selectedLanguage);
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

    const openMap = (url) => {
        Linking.openURL(url);
    };

    const getPetrolData = async (language) => {
        try {
            setSpinner(true);
            const response = await fetch(`${base_url}api/get-all-service-list/${language}`);
            const result = await response.json();
            if (result.status) {
                const petrolPumpOnly = result.data.filter(item => item.service_type === 'petrol_pump');
                // const filteredData = petrolPumpOnly.filter(item => item.language === selectedLanguage);
                setPetrolData(petrolPumpOnly);
            }
        } catch (error) {
            console.error('Error fetching petrol pump data:', error);
        } finally {
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            // getPetrolData(selectedLanguage);
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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ପେଟ୍ରୋଲ ପମ୍ପ' : 'Petrol Pump'}</Text>
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
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15
                    }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>
                                {selectedLanguage === 'Odia' ? 'ନିକଟସ୍ଥ ପେଟ୍ରୋଲ ପମ୍ପ' : 'Petrol Pumps Nearby'}
                            </Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>
                                {selectedLanguage === 'Odia' ? 'ପେଟ୍ରୋଲ ପମ୍ପକୁ ଯିବା ପାଇଁ ଆପଣ ମାନଚିତ୍ରରେ କ୍ଲିକ୍ କରିପାରିବେ।' : 'You Can Click On The Map To Navigate To Petrol Pumps.'}
                            </Text>
                            {/* <TouchableOpacity style={styles.ctaBtn}>
                                <Text style={styles.ctaText}>Check Now →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 60 }}>
                            <Image source={require('../../assets/image/petrolPump21.png')}
                                style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {spinner ? (
                    <View style={{ paddingVertical: 80, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={petrolData}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.google_map_link)}
                                style={styles.cardContainer}
                            >
                                <View style={styles.imageBox}>
                                    {item.photo ?
                                        // <Image source={{ uri: item.photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        <Image source={item.photo} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        :
                                        <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                    }
                                </View>
                                <View style={{ width: '65%', justifyContent: 'center' }}>
                                    <Text style={styles.title}>{item.service_name || 'Petrol Pump'}</Text>

                                    <View style={styles.row}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={styles.subText}>
                                            {item.landmark}, {item.district}
                                        </Text>
                                    </View>

                                    {/* <View style={styles.row}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={styles.subText}>
                                            Open: {item.opening_time} - {item.closing_time}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <FontAwesome5 name="air-freshener" size={13} color="#28a745" />
                                        <Text style={{ fontSize: 13, marginLeft: 5, color: '#28a745', textTransform: 'capitalize' }}>{item.status}</Text>
                                    </View> */}
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
        textTransform: 'capitalize',
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#341551',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    ctaBtn: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    ctaText: {
        color: '#4B0082',
        fontFamily: 'FiraSans-Regular'
    },
    cardContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    imageBox: {
        width: '30%',
        height: 100,
        justifyContent: 'center',
        backgroundColor: '#dedfe0',
        borderRadius: 6,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#341551',
        fontFamily: 'FiraSans-SemiBold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2
    },
    subText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
        fontFamily: 'FiraSans-Regular'
    },
    contact: {
        fontSize: 13,
        marginLeft: 4,
        color: '#28a745',
        fontFamily: 'FiraSans-Regular'
    }
});
