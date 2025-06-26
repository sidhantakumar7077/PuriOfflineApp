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
            "id": 1,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 2,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 3,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 4,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 5,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 6,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 7,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 8,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 9,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 10,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 11,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 12,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 13,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 14,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 15,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 16,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 17,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 18,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 19,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 20,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 21,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 22,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 23,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 24,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        },
        {
            "id": 25,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "କୋଟାକ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ଏଟିଏମ୍",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Kotak+Mahindra+Bank+ATM/...",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଉନ୍ଡ ଫ୍ଲୋର, ସ୍ବାଧୀନ ଏନକ୍ଲେବ, ଭିଆପି ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Kotak Mahindra Bank Atm",
            "status": "active",
            "created_at": "2025-04-19T06:07:22.000000Z",
            "updated_at": "2025-06-03T05:46:05.000000Z"
        }
    ];

    const english_data = [
        {
            "id": 1,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 2,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 3,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 4,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 5,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 6,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 7,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 8,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 9,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 10,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 11,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 12,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 13,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 14,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        },
        {
            "id": 15,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "atm",
            "service_name": "State Bank Of India Atm",
            "photo": require('../../assets/offlineData/atm.jpeg'),
            "google_map_link": "https://maps.google.com",
            "contact_no": "911800112211",
            "whatsapp_no": null,
            "opening_time": "06:00",
            "closing_time": "05:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "State Bank Of India",
            "status": "active",
            "created_at": "2025-04-19T05:22:08.000000Z",
            "updated_at": "2025-06-03T05:39:37.000000Z"
        }
    ];

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [allATM, setAllATM] = useState([]);

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getATMList(value);
                if (value === 'Odia') {
                    setAllATM(odia_data);
                } else if (value === 'English') {
                    setAllATM(english_data);
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
            // getATMList(selectedLanguage);
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

    const getATMList = async (language) => {
        try {
            setSpinner(true);
            const response = await fetch(`${base_url}api/get-all-service-list/${language}`);
            const result = await response.json();
            if (result.status) {
                const atmList = result.data.filter(item => item.service_type === 'atm');
                // const filteredData = atmList.filter(item => item.language === selectedLanguage);
                setAllATM(atmList);
            }
        } catch (error) {
            console.error('Error fetching ATM data:', error);
        } finally {
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            // getATMList(selectedLanguage);
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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଏଟିଏମ୍' : 'ATM'}</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ନିକଟସ୍ଥ ଏଟିଏମ୍ ସେବା' : 'Nearby ATM Services'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଆପଣଙ୍କ ଚାରିପାଖରେ ଉପଲବ୍ଧ ଏଟିଏମ୍ ସେବା |' : 'Accessible ATM Services Around You.'}</Text>
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Check Now →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/atm.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {/* Main Locker & Shoes Stands */}
                {spinner ? (
                    <View style={{ paddingVertical: 80, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551' }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={allATM}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.google_map_link)}
                                style={{
                                    width: '100%',
                                    height: 100,
                                    flexDirection: 'row',
                                    // alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <View style={{ width: '30%', justifyContent: 'center', backgroundColor: '#dedfe0', borderRadius: 6 }}>
                                    {item.photo ?
                                        // <Image source={{ uri: item.photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        <Image source={item.photo} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        :
                                        <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                    }
                                </View>

                                {/* Text Content */}
                                <View style={{ width: '65%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                                        {item.service_name || 'ATM Service'}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            {item.landmark}, {item.district}
                                        </Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
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
        // textTransform: 'capitalize'
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
});
