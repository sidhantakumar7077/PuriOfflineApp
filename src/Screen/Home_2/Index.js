import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, Linking, Modal, ActivityIndicator, RefreshControl, Animated, Easing, BackHandler, ToastAndroid } from "react-native";
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Calendar } from 'react-native-calendars';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Swiper from 'react-native-swiper';
import { base_url } from "../../../App";
import moment from "moment";
import DrawerModal from "../../Component/DrawerModal";
import Video from 'react-native-video';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Index = () => {

    const TempleBanner = [
        // {
        //     image: require('../../assets/image/temple546.png'),
        //     title: 'Shree Jagannatha',
        //     subtitle: 'All Information about Temple.',
        //     pageName: 'TempleInformationPage',
        // },
        {
            image: require('../../assets/image/ratha432.png'),
            title: 'Ratha Yatra Information',
            odia_title: 'ରଥଯାତ୍ରା ସୂଚନା',
            subtitle: 'Click here to get all data.',
            odia_subtitle: 'ସମସ୍ତ ତଥ୍ୟ ପାଇବା ପାଇଁ ଏଠାରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
            pageName: 'RathaYatraMainPage',
        },
    ];

    const conveniences = [
        { id: '1', odiaLabel: 'ବିଶେଷ ସକ୍ଷମ ବ୍ୟକ୍ତି', label: 'Specially Abled Person', page: '', image: require('../../assets/image/physical21.png') },
        { id: '2', odiaLabel: 'ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ', label: 'Emergency Contact', page: '', image: require('../../assets/image/emergencyontact.png') },
        { id: '3', odiaLabel: 'ଲାଇଫ ଗାର୍ଡଙ୍କ ଯୋଗାଯୋଗ', label: 'Lifeguard    Contacts', page: 'LifeGuardBooth', image: require('../../assets/image/life432.png') },
        { id: '4', odiaLabel: 'ହଜିବା ଓ ଖୋଜିବା କେନ୍ଦ୍ର', label: 'Lost & Found', page: 'LostFound', image: require('../../assets/image/lost&found21.png') },
        { id: '5', odiaLabel: 'ପାନୀୟ ଜଳ', label: 'Drinking Water', page: 'DrinkingWater', image: require('../../assets/image/drinkingWater32.png') },
        { id: '6', odiaLabel: 'ଶୌଚାଳୟ', label: 'Toilet', page: 'Toilet', image: require('../../assets/image/toilet543.png') },
        // { id: '7', odiaLabel: '', label: 'Hotel', page: 'Hotel', image: require('../../assets/image/hotel89.png') },
        // { id: '8', odiaLabel: '', label: 'Restaurant', page: 'Restaurant', image: require('../../assets/image/restaurant87.png') },
        { id: '9', odiaLabel: 'ବେଳାଭୂମି', label: 'Beaches', page: 'Beaches', image: require('../../assets/image/beaches21.png') },
        // { id: '10', odiaLabel: '', label: 'Dharmashala', page: 'Dharmashala', image: require('../../assets/image/dharamasala67.png') },
        { id: '11', odiaLabel: 'ଏଟିଏମ୍', label: 'ATM', page: 'Atm', image: require('../../assets/image/atm.png') },
        { id: '12', odiaLabel: 'ଯାତାୟତ ମାର୍ଗ', label: 'Route Map', page: '', image: require('../../assets/image/routeMap.png') },
        { id: '13', odiaLabel: 'ପେଟ୍ରୋଲ ପମ୍ପ', label: 'Petrol Pump', page: 'PetrolPump', image: require('../../assets/image/petrolPump21.png') },
        { id: '14', odiaLabel: 'ବସ୍ ଷ୍ଟାଣ୍ଡ/ରେଳ ଷ୍ଟେସନ୍', label: 'Bus Stand/Railway Station', page: 'BusRailwayStop', image: require('../../assets/image/busRaily.png') },
        { id: '15', odiaLabel: 'ଚାର୍ଜିଂ ଷ୍ଟେସନ୍', label: 'Charging Station', page: 'ChargingStation', image: require('../../assets/image/charghingstation89.png') },
    ];

    const emergencyContacts = [
        { name: 'Police', odiaName: 'ପୋଲିସ', phone: '112' },
        { name: 'Ambulance', odiaName: 'ଆମ୍ବୁଲାନ୍ସ', phone: '112' },
        { name: 'Fire Service', odiaName: 'ଅଗ୍ନିଶମ ସେବା', phone: '112' },
        { name: 'Elder Person Helpline', odiaName: 'ବୟସ୍କ ବ୍ୟକ୍ତିଙ୍କ ପାଇଁ ହେଲ୍ପଲାଇନ୍', phone: '1090' },
        { name: 'Child Helpline', odiaName: 'ଶିଶୁଙ୍କ ପାଇଁ ହେଲ୍ପଲାଇନ୍', phone: '1098' },
        { name: 'Women Helpline', odiaName: 'ମହିଳାଙ୍କ ହେଲ୍ପଲାଇନ୍', phone: '1091' },
        { name: 'Life Guard', odiaName: 'ଲାଇଫ ଗାର୍ଡ', phone: '8260777771' },
        { name: 'National Highway Helpline', odiaName: 'ଜାତୀୟ ରାଜପଥ ହେଲ୍ପଲାଇନ୍', phone: '1033' },
    ];

    const doList = {
        en: [
            "Follow the Queue System for hassle free darshan of Deities.",
            "Respect ancient customs and usages while at Shree Jagannatha Temple and promote religious sentiments among co-pilgrims.",
            "Observe absolute silence inside the temple.",
            "Deposit your offerings in the Hundi and Branch Office inside the temple premises.",
            "Keep clean the premises of Shree Jagannatha Temple.",
            "Bath and wear clean clothes before you enter the shrine.",
            "Beware of pickpocket and monkeys.",
        ],
        or: [
            "ଶ୍ରୀମନ୍ଦିରରେ ଶାନ୍ତି ଓ ସୁବ୍ୟବସ୍ଥିତ ଦର୍ଶନ ପାଇଁ ଶୃଙ୍ଖଳାବଦ୍ଧ ଭାବେ ଧାଡ଼ିରେ ଆସନ୍ତୁ।",
            "ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିରରେ ପ୍ରାଚୀନ ରୀତି ଓ ପ୍ରଥାକୁ ସମ୍ମାନ ଦିଅନ୍ତୁ ଏବଂ ସହ-ତୀର୍ଥଯାତ୍ରୀ ଭକ୍ତ ମଧ୍ୟରେ ଧାର୍ମିକ ଭାବନାକୁ ପ୍ରୋତ୍ସାହିତ କରନ୍ତୁ।",
            "ମନ୍ଦିର ଭିତରେ ପୂର୍ଣ୍ଣ ନିରବତା ପାଳନ କରନ୍ତୁ।",
            "ମନ୍ଦିର ପରିସରରେ ଥିବା ହୁଣ୍ଡି ଓ ଶାଖା କାର୍ଯ୍ୟାଳୟରେ ଆପଣଙ୍କର ଦାନ ଅର୍ପଣ କରନ୍ତୁ।",
            "ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ପରିସରକୁ ପରିଷ୍କାର ରଖନ୍ତୁ।",
            "ସ୍ନାନ ଓ  ଶୌଚ କରି ସଫା ପୋଷାକ ପିନ୍ଧି ମନ୍ଦିରରେ ପ୍ରବେଶ କରନ୍ତୁ।",
            "ପକେଟମାର ଓ ମାଙ୍କଡ଼ମାନଙ୍କଠାରୁ  ସତର୍କ ରୁହନ୍ତୁ।",
        ]
    };

    const dontList = {
        en: [
            "Do not Consume liquor or other intoxicants during Darshan of the Deities.",
            "Do not Eat non-vegetarian food.",
            "Do not Carry cooked food.",
            "Do not Encourage beggary.",
            "Do not Spit or commit nuisance.",
            "Do not Waste water.",
            "Do not Spit, urinate or defecate in the premises of temple.",
            "Do not wear Foot wear and leather items in and around the premises of the temple.",
            "Do not wear cap inside temple premises",
            "Do not Carry umbrella, mobile telephone, electronic gadgets, leather items etc.",
        ],
        or: [
            "ଦେବତାଙ୍କ ଦର୍ଶନ ସମୟରେ ମଦ ବା ଅନ୍ୟ କୋଣସି ମାଦକ ଦ୍ରବ୍ୟ ସେବନ କରିବା ନିଷିଦ୍ଧ।",
            "ମନ୍ଦିର ପରିସରକୁ ମାଂସାହାର କରି ଯିବା ନିଷିଦ୍ଧ।",
            "ମନ୍ଦିର ପରିସରକୁ ରନ୍ଧା ଖାଦ୍ୟ ନେଇଯିବା ନିଷିଦ୍ଧ।",
            "ମନ୍ଦିର ପରିସରରେ ଭିକ୍ଷାବୃତ୍ତି କରିବା ଅନୁଚିତ ।",
            "ମନ୍ଦିର ପରିସରରେ ଛେପ ପକାଇବା କିମ୍ବା ଅସଭ୍ୟ ଆଚରଣ କରିବା ନିଷିଦ୍ଧ।",
            "ଜଳକୁ ନଷ୍ଟ କରନ୍ତୁ ନାହିଁ ।",
            "ମନ୍ଦିର ପରିସରରେ ଛେପ ପକାଇବା, ପରିଶ୍ରା କରିବା ବା ଶୌଚ କରିବା ନିଷିଦ୍ଧ ଅଟେ।",
            "ମନ୍ଦିର ପରିସର ଭିତରେ ଏବଂ ଚାରିପାଖରେ ଜୋତା ଓ ଚମଡା ଜିନିଷ ବ୍ୟବହାର ନିଷିଦ୍ଧ ଅଟେ।",
            "ମନ୍ଦିର ପରିସରକୁ ଛତା, ମୋବାଇଲ୍ ଫୋନ୍, ଇଲେକ୍ଟ୍ରୋନିକ୍ ଉପକରଣ, ଚମଡା ଜିନିଷ ଇତ୍ୟାଦି ସାଙ୍ଗରେ ନେଇଯିବାକୁ ନିଷିଦ୍ଧ ଅଟେ।",
            "ମନ୍ଦିର ପରିସର ମଧ୍ୟରେ ଟୋପି ପିନ୍ଧନ୍ତୁ ନାହିଁ।"
        ]
    };

    const temple_data = [
        // Temple
        {
            "id": 6,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Mausi Maa Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/mausiMaaTemple/MausiMaaTemplePhoto5.jpg'), require('../../assets/offlineData/nearbyTemple/mausiMaaTemple/mausi_maa_temple.png')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/mausiMaaTemple/MausiMaaTempleCover.jpg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/mausiMaaTemple/MausiMaaTempleMap.png'),
            "google_map_link": "https://www.google.com/maps/place/Mausi+Maa+Temple/@19.8115116,85.8275798,17z/data=!4m6!3m5!1s0x3a19c69f4d179977:0x51f72b37acce0dad!8m2!3d19.8166449!4d85.8396162!16s%2Fg%2F11bxc61rrm?entry=ttu&g_ep=EgoyMDI1MDQyMS4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Grand Road, Mausima Ln",
            "pincode": "752001",
            "city_village": "Balagandi",
            "distance_from_temple": "2.5 Km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-24T06:04:53.000000Z",
            "updated_at": "2025-06-03T08:15:38.000000Z"
        },
        {
            "id": 20,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ମାଉସୀ ମା ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/mausiMaaTemple/MausiMaaTemplePhoto5.jpg'), require('../../assets/offlineData/nearbyTemple/mausiMaaTemple/mausi_maa_temple.png')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/mausiMaaTemple/MausiMaaTempleCover.jpg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/mausiMaaTemple/MausiMaaTempleMap.png'),
            "google_map_link": "https://maps.app.goo.gl/mdNvCwi1FQpp57Hn9",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ଗ୍ରାଣ୍ଡ ରୋଡ଼, ମାଉସୀ ମା ଲେନ୍",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ବଳଗଣ୍ଡି",
            "distance_from_temple": "୨.୫ କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": "17",
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T10:11:41.000000Z",
            "updated_at": "2025-06-03T05:07:13.000000Z"
        },
        {
            "id": 7,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Sakhi Gopal Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/SakhigopalCoverPhoto/Sakhigopal1Photo.jpeg'), require('../../assets/offlineData/nearbyTemple/SakhigopalCoverPhoto/Sakhigopal2Photo.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/SakhigopalCoverPhoto/SakhigopalCoverPhoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/SakhigopalCoverPhoto/SakhiGopalTempleMap.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/zExzkzTbLByhSyTh6",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "1234567890",
            "whatsapp_no": "1234567890",
            "email": "abcd@gmail.com",
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Sakhigopal",
            "pincode": "752002",
            "city_village": "Shri Ramachandra Rd",
            "distance_from_temple": "21.6 km",
            "history": null,
            "district": "Puri",
            "state": "17",
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-24T11:25:20.000000Z",
            "updated_at": "2025-06-03T10:28:25.000000Z"
        },
        {
            "id": 21,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ସାକ୍ଷୀଗୋପାଳ ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/SakhigopalCoverPhoto/Sakhigopal1Photo.jpeg'), require('../../assets/offlineData/nearbyTemple/SakhigopalCoverPhoto/Sakhigopal2Photo.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/SakhigopalCoverPhoto/SakhigopalCoverPhoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/SakhigopalCoverPhoto/SakhiGopalTempleMap.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/xjHtbSV5BS8oPC3PA",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ସାକ୍ଷୀଗୋପାଳ",
            "pincode": "୭୫୨୦୧୪",
            "city_village": "ସାକ୍ଷୀଗୋପାଳ \n ରୋଡ଼",
            "distance_from_temple": "୨୧ କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": "17",
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T10:21:07.000000Z",
            "updated_at": "2025-06-03T10:28:12.000000Z"
        },
        {
            "id": 13,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Lokanath Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathTemplePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathTemplePhoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathTemplePhoto.jpeg'),],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathaTempleMap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Lokanatha+Temple/@19.8030625,85.7991994,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c5d6650e5ae7:0xa8f301c89aad8d48!8m2!3d19.8030625!4d85.8017743!16s%2Fg%2F12qf66f8v?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "09439861001",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Lokanath Temple Road",
            "pincode": "752001",
            "city_village": "Balisahi",
            "distance_from_temple": "1.7 Km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-26T04:27:12.000000Z",
            "updated_at": "2025-06-03T08:27:02.000000Z"
        },
        {
            "id": 22,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ଲୋକନାଥ ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathTemplePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathTemplePhoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathTemplePhoto.jpeg'),],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/LokanathTempleCover/LokanathaTempleMap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Lokanatha+Temple/@19.8030625,85.7991994,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c5d6650e5ae7:0xa8f301c89aad8d48!8m2!3d19.8030625!4d85.8017743!16s%2Fg%2F12qf66f8v?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ଲୋକନାଥ ମନ୍ଦିର ରାସ୍ତା",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ବାଲିସାହି",
            "distance_from_temple": "୧.୭ କିମି  କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": "17",
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T10:29:03.000000Z",
            "updated_at": "2025-06-03T08:28:08.000000Z"
        },
        {
            "id": 15,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Bedi Hanuman Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/BediHanumanTempleCover/BediHanumanTemplePhoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/BediHanumanTempleCover/BediHanumanTemplePhoto3.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/BediHanumanTempleCover/BediHanumanTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/BediHanumanTempleCover/BediHanumanMap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Bedi+Hanuman+Temple/@19.8036472,85.8420233,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c4280f0e0c33:0x473d3c3deeee6613!8m2!3d19.8036472!4d85.8445982!16s%2Fg%2F1hm1xljwm?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Chakra Tirtha Rd",
            "pincode": "752002",
            "city_village": "Bedi Hanuman",
            "distance_from_temple": "3.4 Km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-26T05:02:29.000000Z",
            "updated_at": "2025-06-03T05:06:21.000000Z"
        },
        {
            "id": 23,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ବେଡ଼ି ହନୁମାନ ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/BediHanumanTempleCover/BediHanumanTemplePhoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/BediHanumanTempleCover/BediHanumanTemplePhoto3.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/BediHanumanTempleCover/BediHanumanTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/BediHanumanTempleCover/BediHanumanMap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Bedi+Hanuman+Temple/@19.8036472,85.8420233,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c4280f0e0c33:0x473d3c3deeee6613!8m2!3d19.8036472!4d85.8445982!16s%2Fg%2F1hm1xljwm?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ଚକ୍ରତୀର୍ଥ ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": null,
            "distance_from_temple": "୩.୪ କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": "17",
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T10:34:26.000000Z",
            "updated_at": "2025-06-03T05:08:08.000000Z"
        },
        {
            "id": 16,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Bata Mangala Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/MaaBataMangalaMap/MaaBataMangalaTemplePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/MaaBataMangalaMap/MaaBataMangalaTemplePhoto2.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/MaaBataMangalaMap/MaaBataMangalaTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/MaaBataMangalaMap/MaaBataMangalaMap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Maa+Bata+Mangala+Temple/@19.8401471,85.8342666,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c6c515eb897b:0x8994bc9a467ec492!8m2!3d19.8401471!4d85.8368415!16s%2Fm%2F012l1g2n?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Jagannath Sadak",
            "pincode": "752002",
            "city_village": null,
            "distance_from_temple": "5.0 Km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-26T05:16:57.000000Z",
            "updated_at": "2025-06-03T05:06:27.000000Z"
        },
        {
            "id": 24,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ବାଟ ମଙ୍ଗଳା ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/MaaBataMangalaMap/MaaBataMangalaTemplePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/MaaBataMangalaMap/MaaBataMangalaTemplePhoto2.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/MaaBataMangalaMap/MaaBataMangalaTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/MaaBataMangalaMap/MaaBataMangalaMap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Maa+Bata+Mangala+Temple/@19.8401471,85.8342666,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c6c515eb897b:0x8994bc9a467ec492!8m2!3d19.8401471!4d85.8368415!16s%2Fm%2F012l1g2n?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ଜଗନ୍ନାଥ ସଡ଼କ",
            "pincode": "୭୫୨୦୦୧",
            "city_village": null,
            "distance_from_temple": "୫ କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": "17",
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T10:42:19.000000Z",
            "updated_at": "2025-06-03T05:09:12.000000Z"
        },
        {
            "id": 17,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Alarnath Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/AlarnathTempleCover/AlarnathTemplePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/AlarnathTempleCover/AlarnathTemplePhoto3.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/AlarnathTempleCover/AlarnathTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/AlarnathTempleCover/AlarnathTempleMap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Sri+Alarnath+Temple/@19.7949004,85.6477484,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19cc7bc363e06b:0x64b6ddcfaf1ca8a9!8m2!3d19.7949004!4d85.6503233!16s%2Fm%2F0ds4nx_?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "1800111363",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Alarapur, Brahmagiri",
            "pincode": "752011",
            "city_village": "Naragariamatha",
            "distance_from_temple": "22.1 Km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-26T05:29:03.000000Z",
            "updated_at": "2025-06-03T05:06:49.000000Z"
        },
        {
            "id": 25,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ଅଲାରନାଥ ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/AlarnathTempleCover/AlarnathTemplePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/AlarnathTempleCover/AlarnathTemplePhoto3.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/AlarnathTempleCover/AlarnathTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/AlarnathTempleCover/AlarnathTempleMap.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/CSCxVP5SeBB9545U8",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ଅଲରପୁର, ବ୍ରହ୍ମଗିରି",
            "pincode": "୭୫୨୦୧୧",
            "city_village": "ନରଗରି ମଠ",
            "distance_from_temple": "୨୨ କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": "17",
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T10:50:56.000000Z",
            "updated_at": "2025-06-03T05:09:32.000000Z"
        },
        {
            "id": 19,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Gundicha Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/GundichaTemple/GundichaTemplePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/GundichaTemple/GundichaTemplePhoto2.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/GundichaTemple/GundichaTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/GundichaTemple/GundichaTempleMap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Shree+Gundicha+Temple,+Puri/@19.8166465,85.8370185,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c6afbf63e625:0x8b86567021c14050!8m2!3d19.8166465!4d85.8395934!16s%2Fm%2F05f406r?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "09777226411",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Gundicha Temple",
            "pincode": "752002",
            "city_village": null,
            "distance_from_temple": "2.5 Km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-26T08:33:01.000000Z",
            "updated_at": "2025-06-03T05:06:59.000000Z"
        },
        {
            "id": 27,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ଗୁଣ୍ଡିଚା ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/GundichaTemple/GundichaTemplePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/GundichaTemple/GundichaTemplePhoto2.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/GundichaTemple/GundichaTempleCover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/GundichaTemple/GundichaTempleMap.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/D8LUcZDvTijsGqrN7",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ଗୁଣ୍ଡିଚା ମନ୍ଦିର",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "",
            "distance_from_temple": "ଦୂରତା ଜଗନ୍ନାଥ ମନ୍ଦିର ରୁ ୩ କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଇଣ୍ଡିଆ",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T11:06:36.000000Z",
            "updated_at": "2025-06-03T05:11:09.000000Z"
        },
        {
            "id": 33,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Gupta Vrindavan",
            "photo": [require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanPhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanPhoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanPhoto3.jpeg'), require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanPhoto4.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavancover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanmap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Gupta+Vrindavan+-+Puri/@19.7980756,85.7887436,780m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a19c5dc174bd9bf:0x96661e1dc8e7d70e!8m2!3d19.7980706!4d85.7913185!16s%2Fg%2F11fz9j8wjm?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "1234567890",
            "whatsapp_no": "1234567890",
            "email": "abcd@gmail.com",
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Baliapanda Housing Board Colony",
            "pincode": "752002",
            "city_village": "Sipasurubili",
            "distance_from_temple": "6 km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-24T11:25:20.000000Z",
            "updated_at": "2025-06-03T10:15:57.000000Z"
        },
        {
            "id": 37,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ଗୁପ୍ତ ବୃନ୍ଦାବନ",
            "photo": [require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanPhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanPhoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanPhoto3.jpeg'), require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanPhoto4.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavancover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/GuptaVrindavan/GuptaVrindavanmap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Gupta+Vrindavan+-+Puri/@19.7980756,85.7887436,780m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a19c5dc174bd9bf:0x96661e1dc8e7d70e!8m2!3d19.7980706!4d85.7913185!16s%2Fg%2F11fz9j8wjm?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "1234567890",
            "whatsapp_no": "1234567890",
            "email": "abcd@gmail.com",
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ବଳିଆପଣ୍ଡା ହାଉସିଂ ବୋର୍ଡ କଲୋନି",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ସିପାସୁରୁବିଲି",
            "distance_from_temple": "୬ କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-24T11:25:20.000000Z",
            "updated_at": "2025-06-03T10:15:51.000000Z"
        },
        {
            "id": 36,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Shree Nrusingha Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/nrusinghaTemple/NarasimhaTemple2.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/nrusinghaTemple/nrusinghaTempleCover.jpg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/nrusinghaTemple/NarasimhaTemplemap.jpg'),
            "google_map_link": "https://maps.app.goo.gl/oX5kCwTKnxnP6vsi8",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Mihir Sanyal Rd, Balikuda Sahi, Sarbodaya Nagar",
            "pincode": "752002",
            "city_village": "Balikuda Sahi",
            "distance_from_temple": "2.7 Km",
            "history": null,
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "Shree Nrusingha Temple",
            "status": "active",
            "created_at": "2025-05-27T07:57:46.000000Z",
            "updated_at": "2025-05-27T03:36:12.000000Z"
        },
        {
            "id": 38,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "ନୃସିଂହ ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/nrusinghaTemple/NarasimhaTemple2.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/nrusinghaTemple/nrusinghaTempleCover.jpg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/nrusinghaTemple/NarasimhaTemplemap.jpg'),
            "google_map_link": "https://maps.app.goo.gl/oX5kCwTKnxnP6vsi8",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ମିହିର ସନ୍ୟାଲ୍ ରାସ୍ତା, ସର୍ବୋଦୟ ନଗର ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ବାଲିକୁଦା ସାହି",
            "distance_from_temple": "୨.୭ କିମି",
            "history": null,
            "district": "ପୁରୀ",
            "state": "ଓଡିଶା",
            "country": "India",
            "description": "Shree Nrusingha Temple",
            "status": "active",
            "created_at": "2025-05-27T07:57:46.000000Z",
            "updated_at": "2025-06-03T10:27:32.000000Z"
        },
        {
            "id": 34,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": "Tota Gopinatha Temple",
            "photo": [require('../../assets/offlineData/nearbyTemple/totagopinathatemple/totagopinathatemple2.jpeg'), require('../../assets/offlineData/nearbyTemple/totagopinathatemple/totagopinathatemple1.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/totagopinathatemple/totagopinathatemplecoverphoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/totagopinathatemple/Totagopinathatemplemap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Shri+Tota+Gopinatha+Temple/@19.7974372,85.8107815,658m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3a19c42e9d36cc35:0xef86d278a8ced378!2sShri+Tota+Gopinatha+Temple!8m2!3d19.7974314!4d85.8129541!16s%2Fg%2F12hkky2_8!3m5!1s0x3a19c42e9d36cc35:0xef86d278a8ced378!8m2!3d19.7974314!4d85.8129541!16s%2Fg%2F12hkky2_8?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "09777226411",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Goudabada Sahi",
            "pincode": "752001",
            "city_village": "Sandha jaga",
            "distance_from_temple": "800 meter",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-26T08:33:01.000000Z",
            "updated_at": "2025-06-03T10:28:02.000000Z"
        },
        {
            "id": 35,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "temple",
            "name": " ତୋଟା ଗୋପୀନାଥ ମନ୍ଦିର",
            "photo": [require('../../assets/offlineData/nearbyTemple/totagopinathatemple/totagopinathatemple2.jpeg'), require('../../assets/offlineData/nearbyTemple/totagopinathatemple/totagopinathatemple1.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/totagopinathatemple/totagopinathatemplecoverphoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/totagopinathatemple/Totagopinathatemplemap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Shri+Tota+Gopinatha+Temple/@19.7974372,85.8107815,658m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3a19c42e9d36cc35:0xef86d278a8ced378!2sShri+Tota+Gopinatha+Temple!8m2!3d19.7974314!4d85.8129541!16s%2Fg%2F12hkky2_8!3m5!1s0x3a19c42e9d36cc35:0xef86d278a8ced378!8m2!3d19.7974314!4d85.8129541!16s%2Fg%2F12hkky2_8?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D",
            "type": "inside_india",
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "09777226411",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ଗଉଡ଼ ବାଡ଼ ସାହି",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ଷଣ୍ଢ ଜାଗା",
            "distance_from_temple": "୮୦୦ ମିଟର",
            "history": null,
            "district": "ପୁରୀ",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-26T08:33:01.000000Z",
            "updated_at": "2025-06-03T10:27:56.000000Z"
        },
        // Ritual Site
        {
            "id": 9,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "ritual_site",
            "name": "Narendra Puskarinee",
            "photo": [require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineephoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineephoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineephoto3.jpeg'), require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineephoto4.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineecoverphoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineemap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Narendra+Pokhari/@19.8137625,85.823662,18z/data=!3m1!4b1!4m6!3m5!1s0x3a19c6991a24dcc5:0xfb315d059da34828!8m2!3d19.8136249!4d85.8246254!16s%2Fg%2F1tfjjj_h?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Satapada Rd",
            "pincode": "752001",
            "city_village": null,
            "distance_from_temple": "1.2 km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-25T01:32:26.000000Z",
            "updated_at": "2025-06-03T05:05:06.000000Z"
        },
        {
            "id": 28,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "ritual_site",
            "name": "ନରେନ୍ଦ୍ର ପୁଷ୍କରିଣୀ\n",
            "photo": [require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineephoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineephoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineephoto3.jpeg'), require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineephoto4.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineecoverphoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/Narendrapuskarinee/Narendrapuskarineemap.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/ZSe76ibbETjR9Wqo7",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ସାତପଡା ରୋଡ଼",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "",
            "distance_from_temple": "1.2 km",
            "history": null,
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଇଣ୍ଡିଆ",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T11:25:58.000000Z",
            "updated_at": "2025-06-04T22:02:01.000000Z"
        },
        {
            "id": 10,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "ritual_site",
            "name": "Sweta Ganga Puskarinee",
            "photo": [require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarinee1.jpeg'), require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarinee2.jpeg'), require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarinee3.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarineecover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarineemap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Swetaganga+Tank/@19.8018203,85.815873,17z/data=!4m14!1m7!3m6!1s0x3a19c5619462cc51:0x91c7f6d7afefe0f6!2sSwetaganga+Tank!8m2!3d19.8018203!4d85.8184479!16s%2Fg%2F11swn73fhf!3m5!1s0x3a19c5619462cc51:0x91c7f6d7afefe0f6!8m2!3d19.8018203!4d85.8184479!16s%2Fg%2F11swn73fhf?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Bali Sahi",
            "pincode": "752001",
            "city_village": "Khuntia sahi",
            "distance_from_temple": "350 m",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-25T01:48:34.000000Z",
            "updated_at": "2025-06-03T05:20:14.000000Z"
        },
        {
            "id": 29,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "ritual_site",
            "name": "ଶ୍ଵେତ ଗଙ୍ଗା ପୁଷ୍କରିଣୀ\n",
            "photo": [require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarinee1.jpeg'), require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarinee2.jpeg'), require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarinee3.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarineecover.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/swetagangapuskarinee/swetagangapuskarineemap.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/62VgLju4Csg1h7HP8",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ବାଲି ସାହି",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "",
            "distance_from_temple": "350 m",
            "history": null,
            "district": "ପୁରୀ",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T11:37:28.000000Z",
            "updated_at": "2025-06-04T22:01:56.000000Z"
        },
        {
            "id": 11,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "ritual_site",
            "name": "Indradyumna Puskarinee",
            "photo": [require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineephoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineephoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineephoto3.jpeg'), require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineephoto4.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineecoverphoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineemap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Narendra+Pushkarinee/@19.8131626,85.8058958,15z/data=!4m10!1m2!2m1!1sIndradyumna+Pushkarini!3m6!1s0x3a19c69922cabff1:0xe9e23f7139c74d63!8m2!3d19.8131626!4d85.8249502!15sChZJbmRyYWR5dW1uYSBQdXNoa2FyaW5pWhgiFmluZHJhZHl1bW5hIHB1c2hrYXJpbmmSAQxoaW5kdV90ZW1wbGWaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTmFlbkYyWW1SM0VBRaoBWhABKhoiFmluZHJhZHl1bW5hIHB1c2hrYXJpbmkoADIeEAEiGhmNiCwVthfIvtZtUdnIXvU_Lj1H0gdGBc1YMhoQAiIWaW5kcmFkeXVtbmEgcHVzaGthcmluaeABAPoBBAgAECw!16s%2Fg%2F11bzq3m6bm?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Makubana",
            "pincode": "752002",
            "city_village": null,
            "distance_from_temple": "1.2 km",
            "history": null,
            "district": "Puri",
            "state": null,
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-25T02:16:44.000000Z",
            "updated_at": "2025-06-03T05:21:16.000000Z"
        },
        {
            "id": 30,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "ritual_site",
            "name": "ଇନ୍ଦ୍ରଦ୍ୟୁମ୍ନ ପୁଷ୍କରିଣୀ\n",
            "photo": [require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineephoto2.jpeg'), require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineephoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineephoto3.jpeg'), require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineephoto4.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineecoverphoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/Indradyumnapuskarinee/Indradyumnapuskarineemap.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/b3GEd4ruFuxd9paT7",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ମକୁବାଣ",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "",
            "distance_from_temple": "1.2 km",
            "history": null,
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଇଣ୍ଡିଆ",
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T11:44:50.000000Z",
            "updated_at": "2025-06-04T22:01:49.000000Z"
        },
        {
            "id": 12,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "place_type": "ritual_site",
            "name": "Markandeya Puskarinee",
            "photo": [require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/MarkandeyapuskarineePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/MarkandeyapuskarineePhoto3.jpeg'), require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/MarkandeyapuskarineePhoto2.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/Markandeyapuskarineecoverphoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/Markandeyapuskarineemap.jpeg'),
            "google_map_link": "https://www.google.com/maps/place/Markandeshwara+Pond/@19.811146,85.8130402,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c7b67325e60b:0x2a4f9b3f2d743024!8m2!3d19.811146!4d85.8156151!16s%2Fg%2F11pr1y89ns?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "Mathur Rd",
            "pincode": "752001",
            "city_village": "Markandeya Tank",
            "distance_from_temple": "850 m",
            "history": null,
            "district": "puri",
            "state": null,
            "country": "105",
            "description": null,
            "status": "active",
            "created_at": "2025-04-25T02:40:37.000000Z",
            "updated_at": "2025-06-03T05:05:46.000000Z"
        },
        {
            "id": 31,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "place_type": "ritual_site",
            "name": "ମାର୍କେଣ୍ଡୟ ପୁଷ୍କରିଣୀ\n",
            "photo": [require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/MarkandeyapuskarineePhoto1.jpeg'), require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/MarkandeyapuskarineePhoto3.jpeg'), require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/MarkandeyapuskarineePhoto2.jpeg')],
            "cover_photo": require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/Markandeyapuskarineecoverphoto.jpeg'),
            "map_photo": require('../../assets/offlineData/nearbyTemple/Markandeyapuskarinee/Markandeyapuskarineemap.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/bFuHRmwjy5kg5Luk7",
            "type": null,
            "estd_date": null,
            "estd_by": null,
            "committee_name": null,
            "contact_no": "0000000000",
            "whatsapp_no": null,
            "email": null,
            "priest_name": null,
            "priest_contact_no": null,
            "landmark": "ମଥୁର ରୋଡ଼",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "",
            "distance_from_temple": "850 m",
            "history": null,
            "district": "ପୁରୀ",
            "state": null,
            "country": null,
            "description": null,
            "status": "active",
            "created_at": "2025-04-27T11:48:48.000000Z",
            "updated_at": "2025-06-04T22:01:43.000000Z"
        },
    ]

    const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    // const [active, setActive] = useState('');
    // useEffect(() => {
    //     if (selectedLanguage === 'Odia') {
    //         setActive('ବିଶ୍ୱବ୍ୟାପୀ');
    //     } else {
    //         setActive('World Wide');
    //     }
    // }, [selectedLanguage]);

    // const locationOptions = [
    //     selectedLanguage === 'Odia' ? 'ବିଶ୍ୱବ୍ୟାପୀ' : 'World Wide',
    //     selectedLanguage === 'Odia' ? 'ଭାରତ' : 'India',
    //     selectedLanguage === 'Odia' ? 'ଓଡିଶା' : 'Odisha'
    //   ];

    const [selectedTab, setSelectedTab] = useState("temple");
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
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
            getData();
            getHundi();
            loadLanguage();
            getRathaYatraSectionStatus();
        }, 2000);
    }, []);

    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, []);

    const [backPressCount, setBackPressCount] = useState(0);

    useEffect(() => {
        const handleBackPress = () => {
            if (backPressCount === 1) {
                BackHandler.exitApp(); // Exit the app if back button is pressed twice within 2 seconds
                return true;
            }

            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            setBackPressCount(1);

            const timeout = setTimeout(() => {
                setBackPressCount(0);
            }, 2000); // Reset back press count after 2 seconds

            return true; // Prevent default behavior
        };

        if (isFocused) {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

            return () => backHandler.remove(); // Cleanup the event listener when the component unmounts or navigates away
        }
    }, [backPressCount, isFocused]);

    const [expanded, setExpanded] = useState(false);
    const itemsPerRow = 3;
    const maxVisibleItems = 3 * itemsPerRow; // Show 2 rows initially

    const [nitiList, setNitiList] = useState([]);
    const [information, setInformation] = useState(null);
    const [banners, setBanners] = useState([]);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [hundi, setHundi] = useState({});
    const [showHundi, setShowHundi] = useState(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const closeDrawer = () => { setIsDrawerOpen(false); };

    const [doDontsModal, setDoDontsModal] = useState(false);

    const [physicalHanducapModalVisible, setPhysicalHanducapModalVisible] = useState(false);
    const [lostAndFoundModalVisible, setLostAndFoundModalVisible] = useState(false);

    const getHundi = async () => {
        try {
            const response = await fetch(`${base_url}api/get-hundi-collections`);
            if (!response.ok) {
                // throw new Error('Network response was not ok');
                // console.log("Network response was not ok");
            }

            const result = await response.json();

            if (result.status) {
                const data = result.data;

                if (Array.isArray(data)) {
                    const today = moment().format('YYYY-MM-DD');
                    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

                    const todayData = data.find(item => item.date === today);

                    if (todayData) {
                        setHundi(todayData);
                    } else {
                        const yesterdayData = data.find(item => item.date === yesterday);
                        if (yesterdayData) {
                            setHundi(yesterdayData);
                        } else {
                            // console.log("No hundi data found for today or yesterday.");
                            setHundi({});
                        }
                    }
                } else {
                    // console.log("No hundi collection data available.");
                    setHundi({});
                }
            } else {
                // console.warn("Hundi API response status was false.");
                setHundi({});
            }
        } catch (error) {
            // console.error('Error fetching hundi data:', error);
        }
    };

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${base_url}api/get-home-section`);
            if (!response.ok) {
                // throw new Error('Network response was not ok');
                // console.log("Network response was not ok");
            }

            const result = await response.json();
            // console.log('Get Home Page Data:', result.data);

            if (result.status) {
                const { niti_master, banners, nearby_temples, information } = result.data;

                setNitiList(niti_master || []);
                setBanners(banners || []);
                setInformation(information);

                const filteredNearbyPlaces = nearby_temples.filter(place => place.language === selectedLanguage);
                // setNearbyPlaces(filteredNearbyPlaces || []);
                setIsLoading(false);
            } else {
                // console.log('API responded with status false:', result.message);
                setIsLoading(false);
            }

        } catch (error) {
            // console.log('Error fetching home section data:', error);
            setIsLoading(false);
        }
    };

    const hendlegetNitiFOrRefresh = async () => {
        try {
            const response = await fetch(`${base_url}api/get-home-section`);
            if (!response.ok) {
                // throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Get Home Page Data:', result);

            if (result.status) {
                setNitiList(result.data.niti_master || []);
                setInformation(result.data.information);
            } else {
                // console.warn('API responded with status false:', result.message);
            }

        } catch (error) {
            // console.error('Error fetching home section data:', error);
        }
    };

    const [donationModal, setDonationModal] = useState(false);
    const handleOk = () => {
        Linking.openURL('https://www.shreejagannatha.in/donation/');
        setDonationModal(false); // Optional: close modal after redirect
    };

    const runningNiti = nitiList.find(
        item => item.niti_status === 'Started'
    );
    const upcomingNitis = nitiList
        .filter(item => item.niti_status === 'Upcoming')
        .sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
    const nextNiti = upcomingNitis[0];

    const [duration, setDuration] = useState("00:00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            const start = moment(runningNiti?.start_time, "HH:mm:ss");
            const diff = moment.utc(now.diff(start)).format("HH:mm:ss");
            setDuration(diff);
        }, 1000);

        return () => clearInterval(interval);
    }, [runningNiti?.start_time]);

    useEffect(() => {
        if (isFocused) {
            getData();
            getHundi();
            loadLanguage();
            getRathaYatraSectionStatus();

            const filteredNearbyPlaces = temple_data.filter(place => place.language === selectedLanguage);
            setNearbyPlaces(filteredNearbyPlaces || []);
        }
    }, [isFocused, selectedLanguage]);

    useEffect(() => {
        if (selectedTab === 'temple') {
            setFilteredPlaces(nearbyPlaces?.filter(place => place.place_type === 'temple'));
        } else if (selectedTab === 'Mathas') {
            setFilteredPlaces(nearbyPlaces?.filter(place => place.place_type === 'matha'));
        } else if (selectedTab === 'ritual_site') {
            setFilteredPlaces(nearbyPlaces?.filter(place => place.place_type === 'ritual_site'));
        }
    }, [selectedTab, nearbyPlaces]);

    const [notices, setNotices] = useState([]);
    const [noticeModalVisible, setNoticeModalVisible] = useState(false);

    // ✅ Get Today's Notices from AsyncStorage
    const loadNoticesFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem('todaysNotices');
            if (data !== null) {
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setNotices(parsed);
                    setNoticeModalVisible(true);
                    console.log('Notices loaded from storage:', parsed);
                }
            }
        } catch (error) {
            console.log('Error reading notices from storage:', error);
        }
    };

    const getNoticeForToday = async () => {
        try {
            const response = await fetch(`${base_url}api/latest-temple-notice`);
            const result = await response.json();

            if (result.status && Array.isArray(result.data)) {
                const today = moment().startOf('day');

                // Filter notices where today is within start_date and end_date (inclusive)
                const todaysNotices = result.data.filter((notice) => {
                    const start = moment(notice.start_date, 'YYYY-MM-DD').startOf('day');
                    const end = moment(notice.end_date, 'YYYY-MM-DD').endOf('day');

                    return today.isBetween(start, end, undefined, '[]'); // [] = inclusive
                });

                if (todaysNotices.length > 0) {
                    // console.log("Today's Notices:", todaysNotices);
                    setNotices(todaysNotices);
                    setNoticeModalVisible(true);
                    // await AsyncStorage.setItem('todaysNotices', JSON.stringify(todaysNotices));
                } else {
                    // console.log("No notices for today.");
                }
            } else {
                // console.log("Invalid or empty data.");
            }
        } catch (error) {
            // console.log("Fetch Notice Error:", error);
        }
    };

    const [rathaYatraSectionActive, setRathaYatraSectionActive] = useState(false);

    const getRathaYatraSectionStatus = async () => {
        try {
            const response = await fetch(`${base_url}api/rathayatra/status`);
            if (!response.ok) {
                // console.log('Network response was not ok');
                setRathaYatraSectionActive(false); // fail-safe
                return;
            }

            const result = await response.json();
            if (result.status) {
                setRathaYatraSectionActive(result.data.section === "active");
            } else {
                // console.log('API responded with status false:', result.message);
                setRathaYatraSectionActive(false);
            }
        } catch (error) {
            // console.log('Error fetching Ratha Yatra section status:', error);
            setRathaYatraSectionActive(false);
        }
    };

    useEffect(() => {
        // loadNoticesFromStorage();
        getNoticeForToday();
    }, []);

    const renderItem = ({ item }) => (
        <View
            style={{
                backgroundColor: '#F9FAFB',
                borderRadius: 12,
                padding: 15,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
        >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2D3748', marginBottom: 5 }}>
                {selectedLanguage === 'Odia' ? item.notice_name : item.notice_name_english}
            </Text>
            {/* {item.notice_descp ? (
                <Text style={{ fontSize: 14, color: '#4A5568', marginBottom: 8 }}>
                    {item.notice_descp}
                </Text>
            ) : null} */}
            {/* <Text style={{ fontSize: 13, color: '#718096', fontStyle: 'italic' }}>
                📅 {moment(item.notice_date).format('MMMM Do, YYYY')}
            </Text> */}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerModal visible={isDrawerOpen} navigation={navigation} onClose={closeDrawer} loadLanguageForHomePage={loadLanguage} rathaYatraSectionActive={rathaYatraSectionActive} />
            {/* {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#fa0000" />
                    <Text style={{ marginTop: 10, fontSize: 16, color: '#333' }}>Loading...</Text>
                </View>
                : */}
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Background Image with Overlay */}
                <ImageBackground source={require("../../assets/image/templeImage1.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, resizeMode: 'cover' }} style={styles.backgroundImage}>
                    <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/mainLogo.png")} style={styles.logo} />
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => setIsDrawerOpen(true)}>
                            <View style={{ width: 28, height: 3, backgroundColor: '#ff5733', marginVertical: 3.5 }} />
                            <View style={{ width: 28, height: 3, backgroundColor: '#ffc300', marginVertical: 3.5 }} />
                            <View style={{ width: 28, height: 3, backgroundColor: '#fff', marginVertical: 3.5 }} />
                        </TouchableOpacity>
                    </View>
                    {selectedLanguage === 'Odia' ?
                        <View style={{ position: 'absolute', top: 110, width: '100%', left: 13 }}>
                            <View style={{ textAlign: 'center', marginLeft: 8 }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'FiraSans-Regular', letterSpacing: 0.8, marginBottom: 2 }}>ଜୟ ଶ୍ରୀଜଗନ୍ନାଥ</Text>
                                <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -5 }}>ଶ୍ରୀଜଗନ୍ନାଥ ଧାମ, ପୁରୀକୁ</Text>
                                <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -5 }}>ସ୍ଵାଗତ</Text>
                            </View>
                        </View>
                        :
                        <View style={{ position: 'absolute', top: 110, width: '100%', left: 13 }}>
                            <View style={{ textAlign: 'center', marginLeft: 8 }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'FiraSans-Regular', letterSpacing: 0.8, marginBottom: 2 }}>Welcome to</Text>
                                <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -8 }}>Shree Jagannatha</Text>
                                <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -10 }}>Dham, Puri</Text>
                            </View>
                        </View>
                    }
                </ImageBackground>

                {/* Current Niti Box */}
                {isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <ActivityIndicator size="large" color="#fa0000" />
                        <Text style={{ marginTop: 10, fontSize: 16, color: '#333' }}>Loading...</Text>
                    </View>
                    :
                    <ScrollView
                        style={{ padding: 8, alignSelf: 'center', marginTop: -50 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        decelerationRate="fast"
                        nestedScrollEnabled={true}
                        onMomentumScrollEnd={() => {
                            console.log('Scroll ended – refreshing Niti...');
                            hendlegetNitiFOrRefresh(); // ✅ This will trigger only once per scroll
                        }}
                    // onScroll={throttledRefresh}
                    >
                        <View style={{ flexDirection: 'row', paddingLeft: 3 }}>
                            {runningNiti && (
                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ width: '90%' }}>
                                            <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>{selectedLanguage === 'Odia' ? runningNiti.niti_name : runningNiti.english_niti_name}</Text>
                                            <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                                    {selectedLanguage === 'Odia' ?
                                                        <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>ଆରମ୍ଭ ସମୟ: {moment(runningNiti.start_time, "HH:mm:ss").format("hh:mm A")}</Text>
                                                        :
                                                        <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Start Time: {moment(runningNiti.start_time, "HH:mm:ss").format("hh:mm A")}</Text>
                                                    }
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                                    <Ionicons name="time-outline" size={16} color="#fa0000" />
                                                    <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>
                                                        {duration}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'green', width: 80, height: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10, position: 'absolute', top: 10, right: 20 }}>
                                        {selectedLanguage === 'Odia' ?
                                            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 12 }}>ଚାଲୁଅଛି</Text>
                                            :
                                            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 12 }}>Running</Text>
                                        }
                                    </View>
                                </View>
                            )}
                            {nextNiti && (
                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ width: '90%' }}>
                                            <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>{selectedLanguage === 'Odia' ? nextNiti.niti_name : nextNiti.english_niti_name}</Text>
                                            <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                                    <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>{moment(new Date).format("DD MMM YYYY")}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20, backgroundColor: '#341551', borderRadius: 10, padding: 2, paddingHorizontal: 5 }}>
                                                    {selectedLanguage === 'Odia' ?
                                                        <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 13 }}>ଆରମ୍ଭ ହୋଇନାହିଁ</Text>
                                                        :
                                                        <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 13 }}>Not started</Text>
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'red', width: 80, height: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10, position: 'absolute', top: 10, right: 20 }}>
                                        {selectedLanguage === 'Odia' ?
                                            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 12 }}>ଆଗାମୀ</Text>
                                            :
                                            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 12 }}>Upcoming</Text>
                                        }
                                    </View>
                                </View>
                            )}
                            <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 200, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('AllNitePage')} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: '95%' }}>
                                        {selectedLanguage === 'Odia' ?
                                            <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>ସମ୍ପୂର୍ଣ୍ଣ ନୀତିକାନ୍ତି</Text>
                                            :
                                            <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>View All Niti</Text>
                                        }
                                    </View>
                                    <View style={{ width: '10%' }}>
                                        <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                }

                {/* Information */}
                {information && (
                    <Animated.View style={{ width: '82%', alignSelf: 'center', marginTop: 10, flexDirection: 'row', opacity: opacity }}>
                        <View style={{ flex: 1, width: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#ffaa00', marginRight: 10, marginTop: -5 }} />
                            <Text style={{ width: '75%', fontSize: 16, fontFamily: 'FiraSans-Medium', color: '#341551', marginBottom: 4 }}>
                                {selectedLanguage === 'Odia' ? information?.niti_notice : information?.niti_notice_english}
                            </Text>
                            <Text style={{ width: '20%', fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#666', marginLeft: 20, marginBottom: 4 }}>
                                {moment(information?.created_at).format('hh:mm A')}
                            </Text>
                        </View>
                    </Animated.View>
                )}

                {/* Ratha Yatra Banner */}
                {rathaYatraSectionActive &&
                    <View style={{ height: 250, marginVertical: 10 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RathaYatraMainPage')}
                            style={{
                                width: width * 0.9,
                                height: 250,
                                alignSelf: 'center',
                                borderRadius: 20,
                                overflow: 'hidden', // this is required!
                                marginBottom: 10,
                                backgroundColor: '#000', // Fallback color in case video fails to load
                            }}
                        >
                            {selectedLanguage === 'Odia' ?
                                <Video
                                    source={require('../../assets/offlineData/rathasectionodia.mp4')}
                                    style={{ width: '100%', height: '100%', borderRadius: 30 }}
                                    resizeMode="cover"
                                    paused={false}
                                    controls={false}
                                    repeat
                                />
                                :
                                <Video
                                    source={require('../../assets/offlineData/rathasectionenglish.mp4')}
                                    style={{ width: '100%', height: '100%', borderRadius: 30 }}
                                    resizeMode="cover"
                                    paused={false}
                                    controls={false}
                                    repeat
                                />
                            }
                        </TouchableOpacity>
                        {/* <Animated.View style={{ opacity, borderRadius: 10, marginTop: 10 }}> */}
                        {/* {TempleBanner.map((item, index) => (
                                <LinearGradient
                                    colors={['#F06292', '#FFA726']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    key={index}
                                    style={{ width: width * 0.90, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 180, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <TouchableOpacity onPress={() => navigation.navigate(item.pageName)} style={{ width: '70%' }}>
                                        <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'FiraSans-Medium' }}>{selectedLanguage === 'Odia' ? item.odia_title : item.title}</Text>
                                        <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? item.odia_subtitle : item.subtitle}</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate(item.pageName)} style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, marginTop: 10, width: 90, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>{selectedLanguage === 'Odia' ? "ବିସ୍ତାରରେ" : "Know More"}</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate(item.pageName)} style={{ width: '30%', alignItems: 'flex-end' }}>
                                        <Image source={item.image} style={{ width: 100, height: 120 }} resizeMode="contain" />
                                    </TouchableOpacity>
                                </LinearGradient>
                            ))} */}
                        {/* </Animated.View> */}
                    </View>
                }

                {/* Live Broadcast Section */}
                {/* <View style={styles.liveCard}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: '26%' }}>
                                <Text style={styles.liveTitle}>Shree Mandira</Text>
                                <View style={{ marginTop: 5, borderRadius: 7, overflow: 'hidden' }}>
                                    <LinearGradient
                                        colors={['#FFA726', '#F06292']} // orange to pink gradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{
                                            width: 74,
                                            height: 30,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 7,
                                        }}
                                    >
                                        <Octicons name="zap" size={15} color="#fff" />
                                        <Text style={styles.liveSubText}>Live</Text>
                                    </LinearGradient>
                                </View>
                            </View>
                            <View style={{ width: '34%' }}>
                                <Text style={{ textAlign: 'left', fontFamily: 'FiraSans-Light', color: '#000', fontSize: 13.6 }}>Listen or Watch all the live broadcasts from Shree Mandira</Text>
                            </View>
                            <View style={{ width: '36%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('LivePage')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                        <Image source={require('../../assets/image/radio214142.png')} style={{ width: 25, height: 25 }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#dd4c2f' }}>Radio</Text>
                                </View>
                                <View style={{ backgroundColor: 'red', height: 50, width: 1.4 }} />
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Tv')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                        <Image source={require('../../assets/image/tv43.png')} style={{ width: 27, height: 27 }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#dd4c2f' }}>TV</Text>
                                </View>
                            </View>
                        </View>
                    </View> */}

                {/* Quick Services Section */}
                <View style={{ padding: 15, marginTop: -10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Darshan')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'calendar-check'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/darshan34.png')} style={{ width: 45, height: 45 }} />
                            </TouchableOpacity>
                            {selectedLanguage === 'Odia' ?
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>ଦର୍ଶନ</Text>
                                :
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Darshan</Text>
                            }
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MahaPrashad')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                <Image source={require('../../assets/image/prasad879.png')} style={{ width: 55, height: 55 }} />
                            </TouchableOpacity>
                            {selectedLanguage === 'Odia' ?
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>ମହାପ୍ରସାଦ</Text>
                                :
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Mahaprashad</Text>
                            }
                        </View>
                        {/* <View style={{ alignItems: "center", width: "23%" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Panji')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                    <Image source={require('../../assets/image/panji765.png')} style={{ width: 35, height: 35 }} />
                                </TouchableOpacity>
                                {selectedLanguage === 'Odia' ?
                                    <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>ପଞ୍ଜିକା</Text>
                                    :
                                    <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Panji</Text>
                                }
                            </View> */}
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Festival')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                <Image source={require('../../assets/image/festival21.png')} style={{ width: 60, height: 60 }} />
                            </TouchableOpacity>
                            {selectedLanguage === 'Odia' ?
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>ପର୍ବପର୍ବାଣି</Text>
                                :
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Festivals</Text>
                            }
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => setDoDontsModal(true)} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                <Image source={require('../../assets/image/dodonts.png')} style={{ width: 75, height: 75 }} />
                            </TouchableOpacity>
                            {selectedLanguage === 'Odia' ?
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>କରନ୍ତୁ ଏବଂ କରନ୍ତୁ ନାହିଁ</Text>
                                :
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Do's and Don'ts</Text>
                            }
                        </View>
                    </View>

                    {/* <View style={{ marginTop: 10, height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('QueueAndDarshan')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                <View style={{ width: '80%' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>Temple Queue & Darshan Information</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                    <Image source={require('../../assets/image/Livequeue.png')} style={{ width: 50, height: 50 }} />
                                </View>
                            </TouchableOpacity>
                        </View> */}

                    <View style={{ marginTop: 10, height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View style={{ width: '20%' }}>
                                {selectedLanguage === 'Odia' ?
                                    <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>ଭକ୍ତ ନିବାସ</Text>
                                    :
                                    <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>Bhakta Nivas</Text>
                                }
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                {selectedLanguage === 'Odia' ?
                                    <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#474747', lineHeight: 20 }}>ତୀର୍ଥଯାତ୍ରୀମାନଙ୍କ ପାଇଁ ମନ୍ଦିର ପାଖରେ ରହିବା ସ୍ଥାନ</Text>
                                    :
                                    <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#474747', lineHeight: 20 }}>Temple owned properties for Pilgrims to stay Comfortably</Text>
                                }
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <Image source={require('../../assets/image/bhaktanibash54.png')} style={{ width: 50, height: 50 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ParkingPage')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{selectedLanguage === 'Odia' ? 'ପାର୍କିଂ' : 'Parking'}</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>{selectedLanguage === 'Odia' ? '୨, ୩, ୪ ଚକିଆ' : '2, 3, 4 Wheelers'}</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/parking765.png')} style={{ width: 38, height: 38, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Locker_shoes')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{selectedLanguage === 'Odia' ? 'ଜୋତା ଷ୍ଟାଣ୍ଡ' : 'Locker & Shoe Stand'}</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>{selectedLanguage === 'Odia' ? 'ନିଃଶୁଳ୍କ  ସେବା' : 'Free services'}</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/locker675.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => setDonationModal(true)} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{selectedLanguage === 'Odia' ? 'ଅନଲାଇନ୍ ଦାନ' : 'Online Donation'}</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>{selectedLanguage === 'Odia' ? 'ଦାନ କରନ୍ତୁ' : 'Donate Now'}</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/donation435.png')} style={{ width: 33, height: 33 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowHundi(true)} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{selectedLanguage === 'Odia' ? 'ହୁଣ୍ଡି ସଂଗ୍ରହ' : 'Hundi Collection'}</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>{selectedLanguage === 'Odia' ? 'ଏବେ ଦେଖନ୍ତୁ' : 'Check Now'}</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                {/* <FontAwesome5 name="rupee-sign" size={27} color="#D64C64" /> */}
                                <Image source={require('../../assets/image/hundiColection654.png')} style={{ width: 33, height: 33 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ marginTop: 10, height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                <View style={{ width: '20%' }}>
                                    {selectedLanguage === 'Odia' ?
                                        <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>ଭକ୍ତ ନିବାସ</Text>
                                        :
                                        <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>Bhakta Nivas</Text>
                                    }
                                </View>
                                <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {selectedLanguage === 'Odia' ?
                                        <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#474747', lineHeight: 20 }}>ତୀର୍ଥଯାତ୍ରୀମାନଙ୍କ ପାଇଁ ମନ୍ଦିର ପାଖରେ ରହିବା ସ୍ଥାନ</Text>
                                        :
                                        <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#474747', lineHeight: 20 }}>Temple owned properties for Pilgrims to stay Comfortably</Text>
                                    }
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                    <Image source={require('../../assets/image/bhaktanibash54.png')} style={{ width: 50, height: 50 }} />
                                </View>
                            </TouchableOpacity>
                        </View> */}
                </View>

                {/* Nearby Temples */}
                <View style={styles.nearbyContainer}>
                    {/* Title Section */}
                    {selectedLanguage === 'Odia' ?
                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>ନିକଟସ୍ଥ ଧାର୍ମିକ ସ୍ଥଳ</Text>
                        :
                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Nearby Religious Places</Text>
                    }
                    {/* <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} /> */}
                    <LinearGradient
                        colors={['#FFA726', '#F06292']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                        }}
                    />

                    <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, marginVertical: 15, padding: 5 }}>
                        {/* Temples Tab */}
                        <LinearGradient
                            colors={selectedTab === 'temple' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setSelectedTab('temple')}
                                style={{
                                    flex: 1,
                                    // backgroundColor: selectedTab === 'temple' ? '#D64C64' : 'transparent',
                                    borderRadius: 10,
                                    paddingVertical: 8,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: selectedTab === 'temple' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                    {selectedLanguage === 'Odia' ? 'ମନ୍ଦିର' : 'Temples'}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        {/* Mathas Tab */}
                        {/* <LinearGradient
                                colors={selectedTab === 'Mathas' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    flex: 1,
                                    borderRadius: 10,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setSelectedTab('Mathas')}
                                    style={{
                                        flex: 1,
                                        // backgroundColor: selectedTab === 'Mathas' ? '#D64C64' : 'transparent',
                                        borderRadius: 10,
                                        paddingVertical: 8,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: selectedTab === 'Mathas' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                        Mathas
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient> */}

                        {/* Ritual Sites Tab */}
                        <LinearGradient
                            colors={selectedTab === 'ritual_site' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setSelectedTab('ritual_site')}
                                style={{
                                    flex: 1,
                                    // backgroundColor: selectedTab === 'ritual_site' ? '#D64C64' : 'transparent',
                                    borderRadius: 10,
                                    paddingVertical: 8,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: selectedTab === 'ritual_site' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                    {selectedLanguage === 'Odia' ? 'ନୀତିକାନ୍ତି ସ୍ଥଳ' : 'Ritual Sites'}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={filteredPlaces}
                        horizontal
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={(content) => {
                            return (
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('NearbyTemple', content?.item)} style={styles.sliderCard}>
                                        {/* <Image style={{ width: '100%', height: '100%', borderRadius: 15 }} source={{ uri: content?.item?.cover_photo }} /> */}
                                        <Image style={{ width: '100%', height: '100%', borderRadius: 15 }} source={content?.item?.cover_photo} />
                                    </TouchableOpacity>
                                    <Text style={{ width: 140, fontSize: 14, fontFamily: 'FiraSans-Medium', color: '#333', marginTop: 7, textAlign: 'center' }}>{content?.item?.name}</Text>
                                </View>
                            )
                        }}
                    />
                </View>

                {/* conveniences */}
                <View style={{ padding: 15 }}>
                    {/* Title */}
                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>{selectedLanguage === 'Odia' ? 'ଯାତ୍ରୀ ତଥା ଭକ୍ତମାନଙ୍କ ଆବଶ୍ୟକତା' : 'Conveniences'}</Text>
                    {/* <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} /> */}
                    <LinearGradient
                        colors={['#FFA726', '#F06292']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                        }}
                    />

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>
                        {(expanded ? conveniences : conveniences.slice(0, maxVisibleItems)).map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    if (item.page !== '') {
                                        navigation.navigate(item.page);
                                    } else if (item.label === 'Emergency Contact') {
                                        setEmergencyModalVisible(true);
                                    } else if (item.label === 'Specially Abled Person') {
                                        setPhysicalHanducapModalVisible(true);
                                    } else if (item.label === 'Route Map') {
                                        Linking.openURL('https://maps.app.goo.gl/MQEvQykPJo64ghgQA');
                                    }
                                    // else if (item.label === 'Lost & Found') {
                                    //     setLostAndFoundModalVisible(true);
                                    // }
                                }}
                                style={{ width: '30%', alignItems: 'center', marginBottom: 20 }}
                            >
                                <View style={{ width: 54, height: 54, borderRadius: 30, backgroundColor: item.page === 'DrinkingWater' ? "#feefec" : 'transparent', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                    {/* <item.iconType name={item.icon} size={24} color="#D64C64" /> */}
                                    <Image source={item.image} style={{ width: item.page === 'DrinkingWater' ? 40 : 55, height: item.page === 'DrinkingWater' ? 40 : 55 }} resizeMode="contain" />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4F4F4F', textAlign: 'center', fontWeight: '500' }}>{selectedLanguage === 'Odia' ? item.odiaLabel : item.label}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>

                    {conveniences.length > maxVisibleItems && (
                        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingHorizontal: 20, marginTop: 10, alignSelf: 'center' }}>
                            <AntDesign name={expanded ? 'upcircleo' : 'downcircleo'} size={30} color="#D64C64" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Do and don'ts Modal */}
                <Modal
                    visible={doDontsModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setDoDontsModal(false)}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '90%', maxHeight: '85%', backgroundColor: '#fff', paddingVertical: 15, borderRadius: 16, overflow: 'hidden' }}>
                            <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                                <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#B7070A' }}>
                                    {selectedLanguage === 'Odia' ? "ଶ୍ରୀଜଗନ୍ନାଥ ଧାମ ପୁରୀରେ କରିବା ଓ ନକରିବା କାମ" : "Do’s & Don’ts at Jagannatha Tepmle Puri"}
                                </Text>

                                {/* ✅ DOs */}
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#008000', marginBottom: 8 }}>{selectedLanguage === 'Odia' ? 'କରନ୍ତୁ:' : 'Do’s:'}</Text>

                                {(selectedLanguage === 'Odia' ? doList.or : doList.en).map((item, index) => (
                                    <Text key={index} style={{ fontSize: 14, color: '#333', marginBottom: 5, lineHeight: 20 }}>
                                        ✅ {item}
                                    </Text>
                                ))}

                                {/* 🚫 DON'Ts */}
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#B7070A', marginTop: 15, marginBottom: 8 }}>{selectedLanguage === 'Odia' ? 'କରନ୍ତୁ ନାହିଁ:' : 'Don’ts:'}</Text>

                                {(selectedLanguage === 'Odia' ? dontList.or : dontList.en).map((item, index) => (
                                    <Text key={index} style={{ fontSize: 14, color: '#333', marginBottom: 5, lineHeight: 20 }}>
                                        🚫 {item}
                                    </Text>
                                ))}

                                {/* Close Button */}
                                <View style={{ alignItems: 'center', marginTop: 20 }}>
                                    <LinearGradient
                                        colors={['#FFA726', '#F06292']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ backgroundColor: '#B7070A', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 }}
                                    >
                                        <TouchableOpacity onPress={() => setDoDontsModal(false)}>
                                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Close</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                {/* Emergency Contact */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={emergencyModalVisible}
                    onRequestClose={() => setEmergencyModalVisible(false)}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 16, paddingVertical: 25, paddingHorizontal: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 10, alignItems: 'center' }}>
                            <MaterialIcons name="local-phone" size={40} color="#D64C64" style={{ marginBottom: 10 }} />
                            <Text style={{ fontSize: 20, fontWeight: '700', color: '#341551', marginBottom: 15 }}>{selectedLanguage === 'Odia' ? 'ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ' : 'Emergency Contacts'}</Text>

                            {emergencyContacts.map((contact, index) => (
                                <TouchableOpacity key={index} onPress={() => handleCall(contact.phone)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 12, borderBottomWidth: index !== emergencyContacts.length - 1 ? 1 : 0, borderBottomColor: '#eee' }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{selectedLanguage === 'Odia' ? contact.odiaName : contact.name}</Text>
                                        <Text style={{ fontSize: 14, color: '#999' }}>{contact.phone}</Text>
                                    </View>
                                    <MaterialIcons name="call" size={24} color="#D64C64" />
                                </TouchableOpacity>
                            ))}

                            <LinearGradient
                                colors={['#FFA726', '#F06292']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ marginTop: 20, backgroundColor: '#D64C64', borderRadius: 25 }}
                            >
                                <TouchableOpacity onPress={() => setEmergencyModalVisible(false)} style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Close</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </Modal>

                {/* Special Abled Person */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={physicalHanducapModalVisible}
                    onRequestClose={() => setPhysicalHanducapModalVisible(false)}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20
                    }}>
                        <View style={{
                            width: '100%',
                            backgroundColor: '#fff',
                            borderRadius: 20,
                            paddingVertical: 30,
                            paddingHorizontal: 25,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                            elevation: 20
                        }}>
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <MaterialIcons name="accessible" size={50} color="#D64C64" />
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: 'bold',
                                    color: '#341551',
                                    textAlign: 'center',
                                    marginTop: 10
                                }}>
                                    {selectedLanguage === 'Odia' ? 'ବିଶେଷ ସକ୍ଷମ ଓ ବରିଷ୍ଠ ନାଗରିକ' : 'Specially Abled Person'}
                                </Text>
                            </View>

                            {selectedLanguage === 'Odia' ?
                                <Text style={{
                                    fontSize: 16,
                                    color: '#444',
                                    textAlign: 'justify',
                                    lineHeight: 24
                                }}>
                                    ବରିଷ୍ଠ ନାଗରିକ ଏବଂ ଶାରୀରିକ ଅକ୍ଷମ ଲୋକଙ୍କୁ ପରିବହନ ପାଇଁ ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ ସ୍ଥାନ (ମାର୍କେଟ୍ ଛକ) ରୁ ମନ୍ଦିର ପୂର୍ବ ଦ୍ୱାର (ସିଂହ ଦ୍ୱାର) / ଉତ୍ତର ଦ୍ୱାର ପର୍ଯ୍ୟନ୍ତ ମାଗଣା ବ୍ୟାଟେରୀ ଚାଳିତ ଯାନବାହାନ ସେବା ଉପଲବ୍ଧ ।
                                </Text>
                                :
                                <Text style={{
                                    fontSize: 16,
                                    color: '#444',
                                    textAlign: 'justify',
                                    lineHeight: 24
                                }}>
                                    Free service of battery operated vehicles is available from <Text style={{ fontWeight: '600' }}>Jagannatha Ballav Parking place (Market square)</Text> to the <Text style={{ fontWeight: '600' }}>Temple East gate (Singha Dwara) / North gate</Text> for carrying senior citizens and Special Abled Person.
                                </Text>
                            }

                            {/* {selectedLanguage === 'Odia' ?
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#444',
                                        textAlign: 'justify',
                                        lineHeight: 24
                                    }}>
                                        ଉତ୍ତର ଦ୍ୱାରରେ ହୁଇଲ ଚେୟାର ଏବଂ ରାମ୍ପ ସୁବିଧା ଉପଲବ୍ଧ ଏବଂ ହୁଇଲ ଚେୟାର ପାଇବା ପାଇଁ, ମନ୍ଦିର ପର୍ଯ୍ୟବେକ୍ଷକ / ସହାୟକ ପର୍ଯ୍ୟବେକ୍ଷକଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରିପାରିବେ ।
                                    </Text>
                                    :
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#444',
                                        textAlign: 'justify',
                                        marginTop: 15,
                                        lineHeight: 24
                                    }}>
                                        Wheelchair and ramp facilities are available at the North gate. To avail a wheelchair, please contact <Text style={{ fontWeight: '600' }}>Temple Supervisor / Asst. Supervisor</Text>.
                                    </Text>
                                } */}
                            {/* {selectedLanguage === 'Odia' ?
                                    <View style={{
                                        backgroundColor: '#fff5f5',
                                        padding: 12,
                                        borderRadius: 10,
                                        borderLeftWidth: 4,
                                        borderLeftColor: '#F06292',
                                        marginTop: 15,
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#444',
                                            lineHeight: 24,
                                            textAlign: 'justify',
                                        }}>
                                            <Text style={{ fontWeight: 'bold', color: '#E91E63' }}>⚠️ Note:</Text> ହ୍ୱିଲଚେୟାର କେବଳ ଭିନ୍ନକ୍ଷମ ଭକ୍ତଙ୍କ ପାଇଁ ଉପଲବ୍ଧ ।{"\n\n"}
                                            <Text style={{ fontWeight: 'bold', color: '#E91E63' }}>🚫 Note:</Text> ମନ୍ଦିର ଭିତରେ ହ୍ୱିଲଚେୟାର ସଂପୂର୍ଣ୍ଣ ଭାବେ ନିଷିଦ୍ଧ।
                                        </Text>
                                    </View>
                                    :
                                    <View style={{
                                        backgroundColor: '#fff5f5',
                                        padding: 12,
                                        borderRadius: 10,
                                        borderLeftWidth: 4,
                                        borderLeftColor: '#F06292',
                                        marginTop: 15,
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#444',
                                            lineHeight: 24,
                                            textAlign: 'justify',
                                        }}>
                                            <Text style={{ fontWeight: 'bold', color: '#E91E63' }}>⚠️ Note:</Text> Wheelchairs are available only for differently abled devotees.{"\n\n"}
                                            <Text style={{ fontWeight: 'bold', color: '#E91E63' }}>🚫 Note:</Text> Wheelchairs are strictly prohibited inside the temple.
                                        </Text>
                                    </View>
                                } */}

                            <LinearGradient
                                colors={['#FFA726', '#F06292']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ marginTop: 30, backgroundColor: '#D64C64', borderRadius: 30, alignSelf: 'center' }}
                            >
                                <TouchableOpacity onPress={() => setPhysicalHanducapModalVisible(false)} style={{ paddingVertical: 12, paddingHorizontal: 30 }}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Close</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </Modal>

                {/* Lost & Found */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={lostAndFoundModalVisible}
                    onRequestClose={() => setLostAndFoundModalVisible(false)}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20
                    }}>
                        <View style={{
                            width: '100%',
                            backgroundColor: '#fff',
                            borderRadius: 20,
                            paddingVertical: 30,
                            paddingHorizontal: 25,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                            elevation: 20
                        }}>
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <Image source={require('../../assets/image/lost&found21.png')} style={{ width: 70, height: 70 }} resizeMode="contain" />
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: 'bold',
                                    color: '#341551',
                                    textAlign: 'center',
                                    marginTop: 10
                                }}>
                                    {selectedLanguage === 'Odia' ? 'ହଜିବା ଓ ଖୋଜିବା କେନ୍ଦ୍ର' : 'Lost & Found'}
                                </Text>
                            </View>

                            {selectedLanguage === 'Odia' ?
                                <Text style={{
                                    fontSize: 16,
                                    color: '#444',
                                    textAlign: 'justify',
                                    lineHeight: 24
                                }}>
                                    ଦୟାକରି ପୁରୀର ଶ୍ରୀ ମନ୍ଦିରରେ ଥିବା ସିଂହଦ୍ୱାର ସୂଚନା କେନ୍ଦ୍ର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।{'\n\n'}
                                    <Text style={{ fontWeight: '600', color: '#D64C64' }}>ଫୋନ୍ : +୯୧-୬୭୫୨-୨୨୨୦୦୨</Text>
                                </Text>
                                :
                                <Text style={{
                                    fontSize: 16,
                                    color: '#444',
                                    textAlign: 'justify',
                                    lineHeight: 24
                                }}>
                                    Please contact Information Center at Lion's Gate, Shree Mandira, Puri.{'\n\n'}
                                    <Text style={{ fontWeight: '600', color: '#D64C64' }}>Phone : +91-6752-222002</Text>
                                </Text>
                            }
                            <LinearGradient
                                colors={['#FFA726', '#F06292']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ marginTop: 30, backgroundColor: '#D64C64', borderRadius: 30, alignSelf: 'center' }}
                            >
                                <TouchableOpacity onPress={() => setLostAndFoundModalVisible(false)} style={{ paddingVertical: 12, paddingHorizontal: 30 }}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Close</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </Modal>

                {/* Banner Section */}
                {/* <View style={{ height: 150, marginTop: 10, marginBottom: 0 }}>
                    <Swiper
                        // autoplay
                        // autoplayTimeout={4}
                        showsPagination={true}
                        paginationStyle={{ bottom: -7 }}
                        dotColor="#999"
                        activeDotColor="#341551"
                        containerStyle={{ borderRadius: 10 }}
                    >
                        {bannerData.map((item, index) => (
                            <View key={index} style={{ width: width * 0.93, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '80%' }}>
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'FiraSans-Medium' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'FiraSans-Regular' }}>{item.subtitle}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('TempleInformationPage')} style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, marginTop: 10, width: 90, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>Know More</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-start' }}>
                                    <Image source={item.image} style={{ width: 85, height: 85 }} resizeMode="contain" />
                                </View>
                            </View>
                        ))}
                    </Swiper>
                    </View> */}

                {/* Calendar Section */}
                {/* <View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Panji & Calendar</Text>
                        <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    </View>
                    <ImageBackground source={require('../../assets/image/calendarBG.jpg')} style={styles.calendarContainer} imageStyle={{ resizeMode: 'cover', }}>
                        <Calendar
                            style={{ width: '90%', alignSelf: 'center', borderRadius: 10 }}
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={{
                                [selectedDate]: { selected: true, selectedColor: '#4B7100' },
                            }}
                            theme={{
                                backgroundColor: '#FBF5F5',
                                calendarBackground: '#fff',
                                textSectionTitleColor: '#4B7100',
                                selectedDayBackgroundColor: '#4B7100',
                                selectedDayTextColor: '#fff',
                                todayTextColor: '#D49100',
                                dayTextColor: '#333',
                                textDisabledColor: '#d9e1e8',
                                arrowColor: '#4B7100',
                                monthTextColor: '#4B7100',
                                textDayFontFamily: 'Lora-Bold',
                                textMonthFontFamily: 'Lora-Bold',
                                textDayHeaderFontFamily: 'Lora-Bold',
                                textDayFontSize: 16,
                                textMonthFontSize: 18,
                                textDayHeaderFontSize: 14,
                            }}
                        />
                        <View style={styles.eventContainer}>
                            <Text style={styles.eventTitle}>Event's</Text>
                            <FlatList
                                data={eventTypes}
                                scrollEnabled={false}
                                numColumns={3}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <View style={styles.eventItem}>
                                        <Text style={styles.eventIcon}>{item.icon}</Text>
                                        <Text style={styles.eventText}>{item.name}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    </ImageBackground>
                    </View> */}

                {/* About Temple */}
                {/* <View style={{ padding: 15, marginTop: 10 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Temple Information</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 6 }}>
                        {templeInfo.map((item) => (
                            <View key={item.id} style={{ width: '30%', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1ebf5', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                    <Image source={item.image} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4F4F4F', textAlign: 'center', fontWeight: '500' }}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                    </View> */}

                {/* Temples Worldwide */}
                {/* <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>{selectedLanguage === 'Odia' ? 'ବିଶ୍ୱବ୍ୟାପୀ ଜଗନ୍ନାଥ ମନ୍ଦିର' : 'Jagannatha Temples Worldwide'}</Text>
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                            }}
                        />
                        <View style={{ width: 270, alignSelf: 'center', backgroundColor: '#f2f0f0', padding: 5, borderRadius: 10, marginTop: 20 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {locationOptions.map((location) => (
                                    <LinearGradient
                                        key={location}
                                        colors={active === location ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{
                                            flex: 1,
                                            borderRadius: 10,
                                            width: '32%',
                                            padding: 5,
                                            alignItems: 'center',
                                            borderRadius: 5,
                                        }}
                                    >
                                        <TouchableOpacity onPress={() => setActive(location)}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: active === location ? '#fff' : '#333',
                                                fontFamily: 'FiraSans-Regular',
                                                fontWeight: active === location ? 'bold' : 'normal'
                                            }}>
                                                {location}
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                ))}
                            </View>
                        </View>
                        {active === (selectedLanguage === 'Odia' ? 'ବିଶ୍ୱବ୍ୟାପୀ' : 'World Wide') && (
                            <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                                <Image source={require('../../assets/image/world1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        )}
                        {active === (selectedLanguage === 'Odia' ? 'ଭାରତ' : 'India') && (
                            <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                                <Image source={require('../../assets/image/india1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        )}
                        {active === (selectedLanguage === 'Odia' ? 'ଓଡିଶା' : 'Odisha') && (
                            <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                                <Image source={require('../../assets/image/odisha1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        )}
                    </View> */}

                {/* Extra Section */}
                {/* <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Extra</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, backgroundColor: '#fff', padding: 10, borderRadius: 15 }}>
                        {serviceData.map((item, index) => (
                            <View key={index} style={{ alignItems: "center", width: "23%" }}>
                                <TouchableOpacity style={{
                                    backgroundColor: item.color,
                                    width: 75,
                                    height: 75,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 3,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                }}>
                                    <MaterialCommunityIcons name={item.icon} size={37} color="white" />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#333',
                                    marginTop: 5,
                                    textAlign: 'center',
                                    fontWeight: '500',
                                }}>{item.title}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{
                            width: '47%', height: 200, backgroundColor: '#fff', borderRadius: 12, padding: 15,
                            shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3
                        }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{extraItems[0].title}</Text>
                            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{extraItems[0].description}</Text>
                            <Image source={{ uri: extraItems[0].image }} style={{ width: 70, height: 80, position: 'absolute', right: 0, bottom: 0 }} />
                        </View>
                        <View style={{ width: '50%', justifyContent: 'space-between' }}>
                            {extraItems.slice(1).map((item) => (
                                <View key={item.id} style={{
                                    height: 95, backgroundColor: '#fff', borderRadius: 12, padding: 15,
                                    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, marginBottom: 10
                                }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{item.description}</Text>
                                    <Image source={{ uri: item.image }} style={{ width: 40, height: 40, position: 'absolute', right: 0, bottom: 0 }} />
                                </View>
                            ))}
                        </View>
                    </View>
                    </View> */}
            </ScrollView>
            {/* } */}

            {/* Today Hundi Collection Modal */}
            <Modal
                visible={showHundi}
                transparent
                animationType="fade"
                onRequestClose={() => setShowHundi(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '85%', backgroundColor: '#fff', borderRadius: 14, padding: 20, elevation: 10 }}>
                        {/* Header */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#B7070A' }}>
                                🪙  {selectedLanguage === 'Odia' ? 'ହୁଣ୍ଡି ସଂଗ୍ରହ' : 'Hundi Collection'}
                            </Text>
                            <TouchableOpacity onPress={() => setShowHundi(false)}>
                                <Ionicons name="close-circle" size={26} color="#B7070A" />
                            </TouchableOpacity>
                        </View>

                        {/* Date */}
                        <Text style={{ fontSize: 14, color: '#555', marginBottom: 16, textAlign: 'center' }}>
                            {moment(hundi?.date).format("DD MMM YYYY")}, {moment(hundi?.date).format("dddd")}
                        </Text>

                        {hundi && hundi.date ?
                            <>
                                {/* Rupees */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>
                                        💰 {selectedLanguage === 'Odia' ? 'ମୁଦ୍ରା' : 'Rupees'}:
                                    </Text>
                                    <Text style={{ fontSize: 16, color: '#444' }}>
                                        ₹ {hundi?.rupees || 0}
                                    </Text>
                                </View>

                                {/* Gold */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>
                                        🥇 {selectedLanguage === 'Odia' ? 'ସୁନା' : 'Gold'}:
                                    </Text>
                                    <Text style={{ fontSize: 16, color: '#444' }}>
                                        {(hundi?.gold) || "0 Gm"}
                                    </Text>
                                </View>

                                {/* Mix Gold */}
                                {hundi?.mix_gold &&
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>
                                            🥇 {selectedLanguage === 'Odia' ? 'ମିଶ୍ରିତ ସୁନା' : 'Mixed Gold'}:
                                        </Text>
                                        <Text style={{ fontSize: 16, color: '#444' }}>
                                            {(hundi?.mix_gold) || "0 Gm"}
                                        </Text>
                                    </View>
                                }

                                {/* Silver */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>
                                        🥈 {selectedLanguage === 'Odia' ? 'ରୂପା' : 'Silver'}:
                                    </Text>
                                    <Text style={{ fontSize: 16, color: '#444' }}>
                                        {(hundi?.silver) || "0 Gm"}
                                    </Text>
                                </View>

                                {/* Mix Silver */}
                                {hundi?.mix_silver &&
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>
                                            🥈 {selectedLanguage === 'Odia' ? 'ମିଶ୍ରିତ ରୂପା' : 'Mixed Silver'}
                                        </Text>
                                        <Text style={{ fontSize: 16, color: '#444' }}>
                                            {(hundi?.mix_silver) || "0 Gm"}
                                        </Text>
                                    </View>
                                }

                            </>
                            :
                            <View style={{ width: '80%', alignSelf: 'center', alignItems: 'center', marginVertical: 20 }}>
                                <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>No Hundi collection data available for today.</Text>
                            </View>
                        }
                    </View>
                </View>
            </Modal>

            {/* Modal for navigating Donation site */}
            <Modal
                visible={donationModal}
                transparent
                animationType="fade"
                onRequestClose={() => setDonationModal(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '88%',
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: 25,
                        elevation: 8,
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 10,
                        shadowOffset: { width: 0, height: 4 }
                    }}>
                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#B7070A'
                            }}>
                                🏦  {selectedLanguage === 'Odia' ? 'ଦାନ କରନ୍ତୁ' : 'Donation'}
                            </Text>
                            <TouchableOpacity onPress={() => setDonationModal(false)}>
                                <Ionicons name="close-circle-outline" size={28} color="#B7070A" />
                            </TouchableOpacity>
                        </View>

                        {selectedLanguage === 'Odia' ?
                            <Text style={{
                                fontSize: 16,
                                color: '#444',
                                marginBottom: 20,
                                lineHeight: 24,
                                paddingHorizontal: 10
                            }}>
                                ଆପଣ ଶ୍ରୀ ଜଗନ୍ନାଥ ମନ୍ଦିରର ସରକାରୀ ୱେବସାଇଟ୍ ମାଧ୍ୟମରେ ଅନଲାଇନରେ ଦାନ କରିପାରିବେ।{"\n\n"}

                                <Text style={{ fontWeight: '700' }}>ଦାନ ବିଷୟରେ ଅଧିକ ସୂଚନା ପାଇଁ, ଦୟାକରି ଯୋଗାଯୋଗ କରନ୍ତୁ:{"\n\n"}</Text>
                                www.shreejagannatha.in{"\n"}
                                ଇମେଲ୍: jagannatha.or@nic.in{"\n"}
                                ଫୋନ୍ : (୦୬୭୫୨) ୨୫୨୬୦୧{"\n\n"}


                                ପୁରୀର ଗ୍ରାଣ୍ଡ ରୋଡରେ ଥିବା ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟରେ ଦାନ ପ୍ରକୋଷ୍ଠ
                                ଶାଖା କାର୍ଯ୍ୟାଳୟ, ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ଭିତରେ, ପୁରୀ।{"\n\n"}

                                ଶ୍ରୀ ଜଗନ୍ନାଥ ମନ୍ଦିରର ସୂଚନା କେନ୍ଦ୍ର:{"\n"}
                                (a) ସିଂହଦ୍ଵାର, ପୁରୀ{"\n"}
                                (b) ଗୁଣ୍ଡିଚା ମନ୍ଦିର, ପୁରୀ{"\n"}
                                (c) ରେଳ ଷ୍ଟେସନ, ପୁରୀ{"\n"}
                                (d) ଜୟଦେବ ଭବନ, ସଚିବାଳୟ ମାର୍ଗ, ଭୂବନେଶ୍ବର{"\n"}
                            </Text>
                            :
                            <Text style={{
                                fontSize: 16,
                                color: '#444',
                                marginBottom: 20,
                                lineHeight: 24,
                                paddingHorizontal: 10
                            }}>
                                You can donate online through{"\n"}
                                Shree Jagannath Temple official website.{"\n\n"}

                                <Text style={{ fontWeight: '700' }}>For more information about donations, please contact:{"\n\n"}</Text>
                                www.shreejagannatha.in{"\n"}
                                📧 Email: jagannatha.or@nic.in{"\n"}
                                📞 Ph: (06752) 252601{"\n\n"}

                                Donation Cell at Head office on the Grand Road, Puri{"\n"}
                                Branch office, inside the Shree Jagannath Temple, Puri.{"\n\n"}

                                Information Centers of Shree Jagannath Temple located at:{"\n"}
                                (a) Lions Gate, Puri{"\n"}
                                (b) Gundicha Temple, Puri{"\n"}
                                (c) Railway Station, Puri{"\n"}
                                (d) Jaydev Bhawan, Sachivalaya Marg, Bhubaneswar{"\n"}
                            </Text>
                        }

                        {/* Info Text */}
                        {/* <Text style={{
                            fontSize: 16,
                            color: '#444',
                            marginBottom: 30,
                            lineHeight: 24
                        }}>
                            You are navigating to Shree Mandira official Donation Platform.
                        </Text> */}

                        {/* Buttons */}
                        {/* <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity
                                onPress={() => setDonationModal(false)}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#ccc',
                                    paddingVertical: 12,
                                    marginRight: 10,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleOk}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#B7070A',
                                    paddingVertical: 12,
                                    marginLeft: 10,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>OK</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
            </Modal>

            {/* Today Notice */}
            <Modal visible={noticeModalVisible} transparent animationType="slide">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            maxWidth: 360,
                            maxHeight: '80%',
                            backgroundColor: '#fff',
                            borderRadius: 16,
                            paddingVertical: 25,
                            paddingHorizontal: 20,
                            elevation: 12,
                            shadowColor: '#000',
                            shadowOpacity: 0.25,
                            shadowOffset: { width: 0, height: 6 },
                            shadowRadius: 10,
                        }}
                    >
                        {/* Title */}
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#341551', marginBottom: 15, textAlign: 'center' }}>{selectedLanguage === 'Odia' ? "ସୂଚନା" : "Notices"}</Text>

                        {/* Notice List */}
                        <FlatList
                            data={notices}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            ListEmptyComponent={
                                <Text style={{ textAlign: 'center', color: '#999', marginTop: 20, fontSize: 14 }}>
                                    No notices for today.
                                </Text>
                            }
                            contentContainerStyle={{
                                paddingBottom: 10,
                                paddingTop: 5,
                            }}
                            showsVerticalScrollIndicator={false}
                        />

                        {/* Close Button */}
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ marginTop: 20, backgroundColor: '#341551', borderRadius: 10 }}
                        >
                            <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 13 }} onPress={() => setNoticeModalVisible(false)} activeOpacity={0.8}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </Modal>

            {/* Ratha Yatra Button */}
            {/* <View style={{ width: 70, height: 70, position: 'absolute', bottom: 20, right: 20, borderRadius: 100, overflow: 'hidden', elevation: 5 }}>
                <TouchableOpacity style={{ backgroundColor: 'transparent', flex: 1 }}>
                    <Image source={require('../../assets/image/ratha1.jpg')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 2,
        backgroundColor: "#F8F8F8",
    },
    backgroundImage: {
        width: "100%",
        height: 350,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // borderRadius: 30,
    },
    header: {
        position: "absolute",
        top: 5,
        // left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    liveCard: {
        width: '93%',
        alignSelf: 'center',
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 25,
        borderRadius: 20,
        elevation: 1,
        marginTop: 10,
        marginBottom: 5,
    },
    liveTitle: {
        fontSize: 19,
        fontFamily: "FiraSans-SemiBold",
        color: "#5c5b5b",
    },
    liveSubText: {
        color: "#fff",
        fontFamily: "FiraSans-Medium",
        fontSize: 14,
        marginLeft: 5,
    },
    nearbyContainer: {
        marginVertical: 10,
        width: '93%',
        alignSelf: 'center',
    },
    sliderCard: {
        width: 150,
        height: 210,
        backgroundColor: '#E8F5E9',
        marginRight: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    calendarContainer: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 20,
    },
    eventContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'black',
        opacity: 0.5,
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
    },
    eventTitle: {
        fontSize: 16,
        fontFamily: 'Lora-Bold',
        color: '#fff',
        marginBottom: 10,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '33%',
        marginBottom: 8,
    },
    eventIcon: {
        fontSize: 18,
        marginRight: 5,
    },
    eventText: {
        fontSize: 14,
        fontFamily: 'Lora-Regular',
        color: '#fff',
    },
});

export default Index;
