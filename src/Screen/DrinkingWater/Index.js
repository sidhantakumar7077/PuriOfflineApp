import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

  // const odia_data = [
  //   {
  //     "id": 150,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ପାନୀୟ ଜଳ ମାର୍କେଟ୍ ଛକ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749096956_1.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=131mFOjwC6xd0auAZLEAG95CuIAL0zxw&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ମାର୍କେଟ୍ ଛକ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ ",
  //     "description": "Near By Gundichha Temple Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:33:02.000000Z",
  //     "updated_at": "2025-06-04T23:01:29.000000Z"
  //   },
  //   {
  //     "id": 151,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ପାନୀୟ ଜଳ ବଳଗଣ୍ଡି ଛକ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097563_balagandi.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1kyi-yGbh8mQAUoK6nuCLpFIz-0o8D0Q&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ବଳଗଣ୍ଡି ଛକ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Near By Gundichha Temple Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:41:01.000000Z",
  //     "updated_at": "2025-06-04T23:01:45.000000Z"
  //   },
  //   {
  //     "id": 152,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ପାନୀୟ ଜଳ ମାର୍କେଟ୍ ଛକ ପଏଣ୍ଟ ୨",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097596_market2.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1VNKbeiAFAuK-NHSWwJNtqYXhMaS_gi4&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ନୀଳାଦ୍ରି ଲଜ୍, ଗ୍ରାଣ୍ଡ ରୋଡ୍, ମାର୍କେଟ୍ ଛକ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Near By Gundichha Temple Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:43:34.000000Z",
  //     "updated_at": "2025-06-04T23:02:03.000000Z"
  //   },
  //   {
  //     "id": 153,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ପାନୀୟ ଜଳ ବଳଗଣ୍ଡି ଛକ ୨",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097628_balagandi 2.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=11NS3qv6X6hGTBNMw0M7vVN5wAEaoezk&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ଶ୍ରୀ ସିଦ୍ଧେଶ୍ୱର ମହାଦେବଙ୍କ ନିକଟରେ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:47:58.000000Z",
  //     "updated_at": "2025-06-04T23:02:21.000000Z"
  //   },
  //   {
  //     "id": 154,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ପାନୀୟ ଜଳ ବଳଗଣ୍ଡି ଛକ ୩",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097656_balagandi 3.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1RkPtnFaXtoHmZGCZiD6DV-irhdAIOcA&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ସାଲବେଗ ମନ୍ଦିର ନିକଟରେ ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:52:22.000000Z",
  //     "updated_at": "2025-06-04T23:02:36.000000Z"
  //   },
  //   {
  //     "id": 155,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ପାନୀୟ ଜଳ  ବଗଳା\nଧର୍ମଶାଳା",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097745_bagala 1.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1MmZrkTp-6o6ZXW75NGqO9P3hPq7veLw&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ହୋଟେଲ ନାୟକ ପ୍ଲାଜା, ବଗଳା\nଧର୍ମଶାଳା ନିକଟରେ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:54:10.000000Z",
  //     "updated_at": "2025-06-04T23:02:51.000000Z"
  //   },
  //   {
  //     "id": 158,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ପାନୀୟ ଜଳ ପଏଣ୍ଟ ମାର୍କେଟ୍ ଛକ ୩",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097783_market3.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1DB1u5HkkZbLRsy7pzinhI6Q2f_lJo34&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ହୋଟେଲ ପାରାଡାଇଜ୍, ମାର୍କେଟ୍ ଛକ ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:54:10.000000Z",
  //     "updated_at": "2025-06-04T23:03:13.000000Z"
  //   },
  //   {
  //     "id": 159,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ମାଉସୀ ମା ମନ୍ଦିର ପାନୀୟ ଜଳ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097815_mausimaa 22.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1cfK4BEEUSjcsarYyIKBR7bOU1k5eA9Y&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ମାଉସୀ ମା ମନ୍ଦିର ନିକଟରେ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:54:10.000000Z",
  //     "updated_at": "2025-06-04T23:03:30.000000Z"
  //   },
  //   {
  //     "id": 160,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "ବଗଳା ପାନୀୟ ଜଳ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097844_bagala2.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1lgCWRHkX2CCgfIaYwFjoT4BVX7ATP1U&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ବଗଳା ନିକଟରେ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:54:10.000000Z",
  //     "updated_at": "2025-06-04T23:03:45.000000Z"
  //   }
  // ];

  // const english_data = [
  //   {
  //     "id": 51,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Drinking Water Point Market Chhaka",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749096956_1.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=131mFOjwC6xd0auAZLEAG95CuIAL0zxw&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Market Chhaka",
  //     "pincode": "752001",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-18T07:22:00.000000Z",
  //     "updated_at": "2025-06-05T04:15:56.000000Z"
  //   },
  //   {
  //     "id": 67,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Drinking Water Point Balagandi Chhaka",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097563_balagandi.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1kyi-yGbh8mQAUoK6nuCLpFIz-0o8D0Q&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Near Maa JanaJaga, Balagandi Chhaka",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Near By Gundichha Temple Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:33:02.000000Z",
  //     "updated_at": "2025-06-05T04:26:03.000000Z"
  //   },
  //   {
  //     "id": 68,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Drinking Water Point Market Chhaka Point 2",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097596_market2.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1VNKbeiAFAuK-NHSWwJNtqYXhMaS_gi4&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Neeladri Lodge, Grand Road, Market Chaka",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Near By Gundichha Temple Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:41:01.000000Z",
  //     "updated_at": "2025-06-05T04:26:36.000000Z"
  //   },
  //   {
  //     "id": 69,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Drinking Water Point Balagandi Chaka-2",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097628_balagandi 2.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=11NS3qv6X6hGTBNMw0M7vVN5wAEaoezk&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Infront of Shree Sidheswara Mahadeva , Balagandi Chaka",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Near By Gundichha Temple Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:43:34.000000Z",
  //     "updated_at": "2025-06-05T04:27:08.000000Z"
  //   },
  //   {
  //     "id": 70,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Drinking Water Point Balagandi Chaka-3",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097656_balagandi 3.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1RkPtnFaXtoHmZGCZiD6DV-irhdAIOcA&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Infront of Salabega Temple, Balagandi Chaka",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:47:58.000000Z",
  //     "updated_at": "2025-06-05T04:27:36.000000Z"
  //   },
  //   {
  //     "id": 71,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Bagala Dharamasala Water Point",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097745_bagala 1.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1MmZrkTp-6o6ZXW75NGqO9P3hPq7veLw&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Hotel Nayak Plaza, Infront Of Bagala Dharamasala",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:52:22.000000Z",
  //     "updated_at": "2025-06-05T04:29:05.000000Z"
  //   },
  //   {
  //     "id": 72,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Market Chhaka Water Point 3",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097783_market3.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1DB1u5HkkZbLRsy7pzinhI6Q2f_lJo34&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Hotel Paradise, Market Chaka",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:54:10.000000Z",
  //     "updated_at": "2025-06-05T04:29:43.000000Z"
  //   },
  //   {
  //     "id": 73,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Mausi Maa Temple Water Point",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097815_mausimaa 22.jpg",
  
  //  "google_map_link": "https://www.google.com/maps/d/edit?mid=1cfK4BEEUSjcsarYyIKBR7bOU1k5eA9Y&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Near By Mausi Maa Temple",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:57:35.000000Z",
  //     "updated_at": "2025-06-05T04:30:15.000000Z"
  //   },
  //   {
  //     "id": 74,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "drinking_water",
  //     "service_name": "Bagala Drinking Water Point",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749097844_bagala2.jpg",
  
  //     "google_map_link": "https://www.google.com/maps/d/edit?mid=1lgCWRHkX2CCgfIaYwFjoT4BVX7ATP1U&usp=sharing",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Bagala V.I.P Suite",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Badashanka Drinking Water",
  //     "status": "active",
  //     "created_at": "2025-04-19T00:59:47.000000Z",
  //     "updated_at": "2025-06-05T04:30:44.000000Z"
  //   },
  // ];

  const odia_data = [
    {
      "id": "1",
      "service_name": "କହ୍ନେଇଲାଲ୍ ମାରୱାଡ଼ୀ ହୋଟେଲ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/QTKg4r42BJHxAvCN7"
    },
    {
      "id": "2",
      "service_name": "ଦୁଧୱାଲା ଧର୍ମଶାଳା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5YRyAVqQZiL4JX7t9"
    },
    {
      "id": "3",
      "service_name": "ହୋଟେଲ ଧର୍ମଜ୍ୟୋତି",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ZNsTSaNmjGsYPR266"
    },
    {
      "id": "4",
      "service_name": "ସମ୍ରାଟ ହୋଟେଲ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/pi7gNjXLVDRrZXFg9"
    },
    {
      "id": "5",
      "service_name": "ଦାମୋଦର ଭକ୍ତ ନିବାସ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/g22BvJfesHUdyMLEA"
    },
    {
      "id": "6",
      "service_name": "ଅଲାଗଡା ଶନି ମନ୍ଦିର ଛକ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/fFgRNRnEjZfMmkYz6"
    },
    {
      "id": "7",
      "service_name": "ନାରାୟଣ ଟୁର୍ ଟ୍ରାଭେଲ୍ସ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/rUsuo6etndShGtNfA"
    },
    {
      "id": "8",
      "service_name": "ନୀଳାଦ୍ରି ଭକ୍ତ ନିବାସ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/iBVVZpEE6q2RahSH6"
    },
    {
      "id": "9",
      "service_name": "ଟାଉନ୍ ଥାନା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/AmXg18cjZmkKsk7a9"
    },
    {
      "id": "10",
      "service_name": "ଗୁରୁ ଏଷ୍ଟେଟ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/DHTu2GS4hL8HWn5E8"
    },
    {
      "id": "11",
      "service_name": "ଓଡ଼ିଶା ହ୍ୟାଣ୍ଡଲୁମ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/NXnYCFC7qu8upKD5A"
    },
    {
      "id": "12",
      "service_name": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ଲାଇବ୍ରେରୀ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/nGBpJq29XgfjxtYs6"
    },
    {
      "id": "13",
      "service_name": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ଭକ୍ତ ନିବାସ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/W4MyiV4ZnyxBeokaA"
    },
    {
      "id": "14",
      "service_name": "ବମ୍ବେ ଷ୍ଟାଇଲ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/k4yZGiXxXpoi4iay5"
    },
    {
      "id": "15",
      "service_name": "ଶୁଭମ ରେଷ୍ଟୁରାଣ୍ଟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/HwvVLpxK1eAss7Zq8"
    },
    {
      "id": "16",
      "service_name": "ଲାଇଫ୍ ଔଷଧ ଦୋକାନ ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/B95dumFDUeAtWSSZ9"
    },
    {
      "id": "17",
      "service_name": "ହରପ୍ରିୟା ଲଜ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/jZ7FT7J3hrUR3Exw7"
    },
    {
      "id": "18",
      "service_name": "ପତଞ୍ଜଳି ଷ୍ଟୋର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/6km5rhAg33ykrWyA6"
    },
    {
      "id": "19",
      "service_name": "କଳିପଦ ମୋଟର୍ସ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hnQqPx1oxY8bMfpG8"
    },
    {
      "id": "20",
      "service_name": "ଜଗନ୍ନାଥ ପାର୍କିଂ, ବଗଲା ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/dc2osHfCPJ1pj8zd8"
    },
    {
      "id": "21",
      "service_name": "ବଗଲା ଶୌଚାଳୟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/QyxgWuY7vzFEMQGm7"
    },
    {
      "id": "22",
      "service_name": "ବଗଲା ଭିଆଇପି ସୁଟ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/eeW9ZraQBM7sQQXSA"
    },
    {
      "id": "23",
      "service_name": "ପୁରୁଣା ଅକ୍ଷୟପାତ୍ର ଘର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/4h94DrCfsKPtwwCF8"
    },
    {
      "id": "24",
      "service_name": "ସମ୍ବାଦ କାର୍ଯ୍ୟାଳୟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ErR823d7KnZQuyAt5"
    },
    {
      "id": "25",
      "service_name": "ସେଲ୍ ଡଟ୍ କମ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/HNyZhAnjP9MeaPHZ7"
    },
    {
      "id": "26",
      "service_name": "ଫ୍ୟାମିଲି ୱର୍ଲ୍ଡ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Fcn4V2BRAiLQm9on7"
    },
    {
      "id": "27",
      "service_name": "ଜନ ଔଷଧି",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/nCTazuqx8yN5MYVh7"
    },
    {
      "id": "28",
      "service_name": "ରଣ ପୂର୍ବ ଭଣ୍ଡାର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/GTmNuJqhXLLBKAcj7"
    },
    {
      "id": "29",
      "service_name": "ଆବାନ୍ସ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hrLJ3hkNsFS5FXNdA"
    },
    {
      "id": "30",
      "service_name": "ବଳଗଣ୍ଡି ବିଦ୍ୟାଳୟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/F6Q1fTiZzWRcKbvC9"
    },
    {
      "id": "31",
      "service_name": "ନିଦାନ ଏ ପାଥୋଲାବ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/xETKkfBmw2kttAaL8"
    },
    {
      "id": "32",
      "service_name": "ଜାନକୀ ରେସିଡେନ୍ସି",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/o7VrZyqtX5guJzPR7"
    },
    {
      "id": "33",
      "service_name": "ବ୍ଲଡ୍ ବ୍ୟାଙ୍କ ସାଇଡ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/DE3nXKAxFc483wDq8"
    },
    {
      "id": "34",
      "service_name": "ମେଡିକାଲ୍ ଶୌଚାଳୟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/q831U7c1R4QoKs7CA"
    },
    {
      "id": "35",
      "service_name": "ମେଡିକାଲ୍ ସ୍କୁଏର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BnAwhQjL6ZJtr69A9"
    },
    {
      "id": "36",
      "service_name": "ମେଡିକାଲ୍ ଫ୍ରଣ୍ଟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/B2mxaCAGmiFQegw49"
    },
    {
      "id": "37",
      "service_name": "ବିଷ୍ଣୁପ୍ରିୟା ଡେଣ୍ଟାଲ୍ କ୍ଲିନିକ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ofXABD8kPTtRV8dk8"
    },
    {
      "id": "38",
      "service_name": "ଗ୍ରାଣ୍ଡ ଆସିୟାନା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/tZHwFwHjy4xpjt3W9"
    },
    {
      "id": "39",
      "service_name": "ଲକ୍ଷ୍ମୀ ଇଲେକ୍ଟ୍ରିକାଲ୍ ଷ୍ଟୋପ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/J4w4ZRKmKEiDktJq6"
    },
    {
      "id": "40",
      "service_name": "ହୋଟେଲ ତ୍ରିମୂର୍ତ୍ତି ହାଇଟ୍ସ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/iBfZapH3fSXesDBN6"
    },
    {
      "id": "41",
      "service_name": "ମୋବ୍ କେୟାର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/LD5eRzW7Hh7rbGsv5"
    },
    {
      "id": "42",
      "service_name": "କିଶୋର କ୍ଲବ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/tGwU65jhrzw8RwqA8"
    },
    {
      "id": "43",
      "service_name": "ପଦ୍ମନାବ ଷ୍ଟୋର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/6hUp2f8bmJHSSJri7"
    },
    {
      "id": "44",
      "service_name": "ଶଙ୍ଖେଶ୍ୱରୀ ମନ୍ଦିର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/kxf3eg5oakd1Ht9h8"
    },
    {
      "id": "45",
      "service_name": "ସାରଦା ମଣ୍ଡପ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/mka6H9nLsf1mi68V9"
    },
    {
      "id": "46",
      "service_name": "ପାଲ ହାଉସ୍, ସଂଗ୍ରାମ କ୍ଲବ୍ ଲେନ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/3H4LWEVaNJgYLski7"
    },
    {
      "id": "47",
      "service_name": "ସଂଗ୍ରାମ କ୍ଲବ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/jnWzyuELMBmPbQ2g9"
    },
    {
      "id": "48",
      "service_name": "ମହିମା ଅଟୋ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/X6jNTtR25q7mHGbH6"
    },
    {
      "id": "49",
      "service_name": "ଏ ୱାନ ମେଡିକାଲ୍ ଷ୍ଟୋର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/yZ7eStNs55Q3Vvsn9"
    },
    {
      "id": "50",
      "service_name": "କୃଷ୍ଣା ଅଟୋ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/PAcTFBjX9ys4s2mz9"
    },
    {
      "id": "51",
      "service_name": "ସାଇ ମୋବାଇଲ୍ ପଏଣ୍ଟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/oPY8C4DpGSaZfqZo9"
    },
    {
      "id": "52",
      "service_name": "ମେମେଇ ଚାରଣ ଦାସ ଘର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/PFCtSaVC8PHPqD1Z9"
    },
    {
      "id": "53",
      "service_name": "ପୋଲିସ ଅବକାଶ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/JGQFhdQy1yzaQw3w9"
    },
    {
      "id": "54",
      "service_name": "ୟୁନିଅନ୍ ବ୍ୟାଙ୍କ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/mmzk89gXjSeMMqL88"
    },
    {
      "id": "55",
      "service_name": "ଫ୍ରେଣ୍ଡସ୍ କ୍ଲବ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/VFtfGGDuGhwHeSYM8"
    },
    {
      "id": "56",
      "service_name": "ମହାବୀର ଭେରାଇଟ୍ ଷ୍ଟୋର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/wJ3cqmUP4aTRhXEi8"
    },
    {
      "id": "57",
      "service_name": "ନାକଚଣା ଦ୍ୱାର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BMCbLEeVnNVELqBd8"
    },
    {
      "id": "58",
      "service_name": "ହୋଟେଲ ପୂର୍ଣ୍ଣମାସୀ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/6BrP6XXpckxtfErS7"
    },
    {
      "id": "59",
      "service_name": "ଇସିଏଚଏସ  ପଲି କ୍ଲିନିକ୍ |",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/oFZoqRDPTjUg6t15A"
    },
    {
      "id": "60",
      "service_name": "କଳିଙ୍ଗ ଭବନ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Us8RQPmPrC8iGu6u6"
    },
    {
      "id": "61",
      "service_name": "ଦକ୍ଷିଣା କାଳୀ କର୍ମଶାଳା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BNh2nLKkYRLUXTwp8"
    },
    {
      "id": "62",
      "service_name": "ଅଭୟ ମହାବୀର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hs3RkSteYCEyGinKA"
    },
    {
      "id": "63",
      "service_name": "ଓମ ବ୍ୟାଟେରି",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/9ifP1oCA2SCwczKaA"
    },
    {
      "id": "64",
      "service_name": "ବଡ଼ ଶଙ୍ଖ ଉପ ପାଠଶାଳା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Ebp5S3unqRV4hawo7"
    },
    {
      "id": "65",
      "service_name": "ସୁଦର୍ଶନ ନଗର ପାଖ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/JjBWo7vxjct39CX2A"
    },
    {
      "id": "66",
      "service_name": "ଆର୍. କେ. ସାମଲ ଘର ପଛ ପଟେ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/2xbKSJFKCpLxw2XU9"
    },
    {
      "id": "67",
      "service_name": "ଶ୍ରୀ ରାମ ଏଣ୍ଟରପ୍ରାଇଜ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/VSbSSJSMVMFvNZEW6"
    },
    {
      "id": "68",
      "service_name": "ଶ୍ରୀ ଗୁରୁ କୃପା ଚୁଷି ମହଲ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Nz3WUsSnHygrXmzF8"
    },
    {
      "id": "69",
      "service_name": "ରେଡକ୍ରସ୍ ରୋଡ୍ ପ୍ରବେଶ ପଏଣ୍ଟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/8qzgPEEVdycL5qv99"
    },
    {
      "id": "70",
      "service_name": "ପାଖାପାଖି ଫଳ ଫାକଟ୍ରି ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/SkEuhuoRXvYaaUPn7"
    },
    {
      "id": "71",
      "service_name": "ଏସ. ବି. ଆଇ. ବ୍ୟାଙ୍କ, ବଡ଼ ଶଙ୍ଖ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/fdNKy1LY9wFapM697"
    },
    {
      "id": "72",
      "service_name": "ରାଜଧାନୀ ଫର୍ଣିଚର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Lw84E6jbsQcENMcq7"
    },
    {
      "id": "73",
      "service_name": "ସୁକ ପ୍ରଭା ଦନ୍ତ ଚିକିତ୍ସାଳୟ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/1kHAaeyrm1jU68TG7"
    },
    {
      "id": "74",
      "service_name": "ଆଲମଚଣ୍ଡୀ ସ୍ପେୟାର୍ ପାର୍ଟ୍ସ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/qu2SQQy1qJj9Pn6C8"
    },
    {
      "id": "75",
      "service_name": "ମଳି ଜଗା ମହାବୀର ମନ୍ଦିର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/YUr22HxeLFkzEPPt7"
    },
    {
      "id": "76",
      "service_name": "ସନ୍ଧ୍ୟାରାଣୀ ଭେରାଇଟି ଷ୍ଟୋର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/3xovQCM13arW3mhu6"
    },
    {
      "id": "77",
      "service_name": "ହୋଟେଲ ନୀଳମାଧବ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/QdaBjKVy6QaPi6CP8"
    },
    {
      "id": "78",
      "service_name": "ଖୁଣ୍ଟିଆ ପେଟ୍ରୋଲ ପମ୍ପ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/uPabQ5M4TPUkA312A"
    },
    {
      "id": "79",
      "service_name": "ଶ୍ରୀ ଗୋବିନ୍ଦ ଔଷଧ ଦୋକାନ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BoMFbrv5a4cyBbas8"
    },
    {
      "id": "80",
      "service_name": "ମୋବ୍ ଡାକ୍ତର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/JHvTxrwavnoDx7xu8"
    },
    {
      "id": "81",
      "service_name": "ସାଲବେଗ ସମାଧି",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/vgv1K2zVy5SbhCZNA"
    },
    {
      "id": "82",
      "service_name": "ପେପର୍ ହୋମ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/bGtVWpRXWxPUKwBz9"
    },
    {
      "id": "83",
      "service_name": "ହୋଟେଲ ସନ୍ତୋଷ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/HX9QC6CquWjZANP49"
    },
    {
      "id": "84",
      "service_name": "ଟେକ୍ ଗୁରୁ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/yNsKBUdxEDd1nQvP6"
    },
    {
      "id": "85",
      "service_name": "ସଂଯୁକ୍ତା ଇଲେକ୍ଟ୍ରୋନିକ୍ସ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/VDVWF87QVbNdbY7a8"
    },
    {
      "id": "86",
      "service_name": "ଜଗନ୍ନାଥ ଇଲେକ୍ଟ୍ରିକାଲ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ai63vkr4dVjdhb1L8"
    },
    {
      "id": "87",
      "service_name": "ହରିବୋଲ ଲଜ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ZVwRqaeGs47RW6TG9"
    },
    {
      "id": "88",
      "service_name": "ପୁରୀ ବ୍ୟାଟେରି ହାଉସ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/WgkpKxsTGwJWz1on8"
    },
    {
      "id": "89",
      "service_name": "ପଦ୍ମାବତୀ ଭବନ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/2oUkkf6C9JCzRghZ7"
    },
    {
      "id": "90",
      "service_name": "ସାହୁ ପ୍ୟାଲେସ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/SYUTkFVgqhxhjZE4A"
    },
    {
      "id": "91",
      "service_name": "ମାଉସୀମା ମନ୍ଦିର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/q5JYFk3AYPWDnpjD8"
    },
    {
      "id": "92",
      "service_name": "ସ୍ନେହା ମୋବ୍ ଦୋକାନ ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/KV88z3Aywj6NMxnt7"
    },
    {
      "id": "93",
      "service_name": "ଫ୍ରେଣ୍ଡସ୍ କେକ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/6AmVzKmcZwD5XrASA"
    },
    {
      "id": "94",
      "service_name": "ସେବାୟନ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/kPcSQHrXx4sg4wDJA"
    },
    {
      "id": "95",
      "service_name": "ନାରାୟଣ ମିଶ୍ର ଚାଟ ଦୋକାନ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/a4h6TexRpW9Mny249"
    },
    {
      "id": "96",
      "service_name": "ନାୟକ ପ୍ଲାଜା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/W33Vu62e8TRPfMTGA"
    },
    {
      "id": "97",
      "service_name": "ପାରାଡାଇଜ୍ ହୋଟେଲ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/yuLsFKzjXA7N8AhM8"
    },
    {
      "id": "98",
      "service_name": "ପାରାଡାଇଜ୍ ହୋଟେଲ ଦ୍ୱିତୀୟ ଗେଟ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/1hgMFsh4L5txH7iq6"
    },
    {
      "id": "99",
      "service_name": "ମିଶ୍ର ଟ୍ରାଭେଲ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/JrZKN6Gh2Z16arVc8"
    },
    {
      "id": "100",
      "service_name": "ଫ୍ୟାସନ୍ ଆଇକନ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/qwHdTVZ8UQp5h8Xt6"
    },
    {
      "id": "101",
      "service_name": "ଲର୍ଡସ୍ ଟେଲର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/NxpPCeJKo4gMmQ4y9"
    },
    {
      "id": "102",
      "service_name": "ମା ବିମଳା ମୋବ ଦୋକାନ ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/gKkSNkbF4mqtmRhV6"
    },
    {
      "id": "103",
      "service_name": "ହରିୟାଣା ହ୍ୟାଣ୍ଡଲୁମ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/9ZzD8DW21S6ngqDW7"
    },
    {
      "id": "104",
      "service_name": "ଜନତା ଟକିଜ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/okAbypin8JLNJhqq5"
    },
    {
      "id": "105",
      "service_name": "ଚୌଧୁରୀ ଘର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/v45hMKVpL8WrhUpB6"
    },
    {
      "id": "106",
      "service_name": "ବଜାର କୋଲକାତା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/T9Bu5MgCjRm4vUNY8"
    },
    {
      "id": "107",
      "service_name": "ଗୋଏଙ୍କା ଧର୍ମଶାଳା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/zD746i41vUYHHeVEA"
    },
    {
      "id": "108",
      "service_name": "ନୀଳାଚଳ ଭକ୍ତ ନିବାସ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/3NamNWbRTJ42EP7V7"
    },
    {
      "id": "109",
      "service_name": "ଅନ୍ନପୂର୍ଣ୍ଣା ଥିଏଟର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/vjEkMLqiYr1DhhK89"
    },
    {
      "id": "110",
      "service_name": "ଗଙ୍ଗାଧର ଆଶ୍ରମ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/at39uVBqTf6XzgcVA"
    },
    {
      "id": "111",
      "service_name": "ଅନ୍ନପୂର୍ଣ୍ଣା ଲଜ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/RAcR2hZ6RxssfjPF8"
    },
    {
      "id": "112",
      "service_name": "କୁମାର କୁମାର ଓଡ଼ିଶା ହ୍ୟାଣ୍ଡଲୁମ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/d8AodKVhJcPNCDTG8"
    },
    {
      "id": "113",
      "service_name": "ସବଜୀ ହୋଟେଲ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/TuxBysa3KLN33Tn88"
    },
    {
      "id": "114",
      "service_name": "ମା ମରିଚେଇ ମନ୍ଦିର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/CtNEXBn8YW6pcZYS7"
    },
    {
      "id": "115",
      "service_name": "ହୋଟେଲ୍ ଶ୍ରୀ ଜିଉ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/tbVMCnvyr3VwnGpj8"
    },
    {
      "id": "116",
      "service_name": "ସୂର୍ଯ୍ୟ କମ୍ପ୍ଲେକ୍ସ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/7wUjQFrnnQSDQpGB8"
    },
    {
      "id": "117",
      "service_name": "ରାଜା ନଅର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/EnbZpyD8p2y1HFba6"
    },
    {
      "id": "118",
      "service_name": "ଦିଗବାରେଣି",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/CvoTZ5dKd1JJYrwW9"
    },
    {
      "id": "119",
      "service_name": "ଇ.ଏସ୍.ଆଇ ଏବଂ ଜି.ଏସ୍.ଟି ଅତିଥି ଗୃହ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/FhHmDD3byWRZ6caf7"
    },
    {
      "id": "120",
      "service_name": "ପୁରୀ ହୋଟେଲ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/pnLULhRACnPS1bAN9"
    },
    {
      "id": "121",
      "service_name": " ଭିକ୍ଟୋରିଆ କ୍ଲବ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/iFPgzWNi7rSogbv47"
    },
    {
      "id": "122",
      "service_name": "ମହୋଦଧି",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hrENGUzFj1TmQHRSA"
    },
    {
      "id": "123",
      "service_name": "ସାଗରିକା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hpaZc9LJESpPxNkYA"
    },
    {
      "id": "124",
      "service_name": "ବଙ୍ଗଲକ୍ଷ୍ମୀ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5hiKFCuE4WFB8jWi7"
    },
    {
      "id": "125",
      "service_name": "ଅତିଥି ହୋଟେଲ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/eY5zzihfwPUCaNvP6"
    },
    {
      "id": "126",
      "service_name": "ଗୋଛିକାର ହାଉସ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/kNcLUrNtNpoWxoTf7"
    },
    {
      "id": "127",
      "service_name": "ହୋଟେଲ କାମେଲିଆ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/rUpdPRgW8sJ3JAyt5"
    },
    {
      "id": "128",
      "service_name": "ଏସ୍‌ୟୁଭି ପ୍ୟାଲେସ ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/b5FpJbwJWzyVs76M9"
    },
    {
      "id": "129",
      "service_name": "ବିର୍ଲା ଅତିଥି ଗୃହ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/VVkrGgMztAnpscZw8"
    },
    {
      "id": "130",
      "service_name": "ସ୍ୱର୍ଗଦ୍ୱାର ସାମ୍ନା",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/8i5pUrytqaFE7wKUA"
    },
    {
      "id": "131",
      "service_name": "ଲକି ଇଣ୍ଡିଆ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/b2cbKd384eQFZWQg8"
    },
    {
      "id": "132",
      "service_name": "ଲାଇଟ୍ ହାଉସ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BryrQNHE4H6zorbr9"
    },
    {
      "id": "133",
      "service_name": "ହୋଟେଲ ଫର୍ଚ୍ୟୁନ୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/e3vFDnGYEkwkvzHd6"
    },
    {
      "id": "134",
      "service_name": "ସାଗର ବିହାର",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/sW4ET5ydgH8Yao8Q7"
    },
    {
      "id": "135",
      "service_name": "ନୀଳାଦ୍ରି ପ୍ରିମିୟର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/qGSgyZiZ56dm3CGy6"
    },
    {
      "id": "136",
      "service_name": "କ୍ୟାଫେ ସେଣ୍ଟର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/4nAu4gYtX29xiiaG6"
    },
    {
      "id": "137",
      "service_name": "ହୋଟେଲ ଏମ୍ପୋରିୟର୍",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/edeSDhEc8rsWBSf97"
    }
  ];

  const english_data = [
    {
      "id": "1",
      "service_name": "Kahneyalal Marwadi Hotel",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/QTKg4r42BJHxAvCN7"
    },
    {
      "id": "2",
      "service_name": "Dudhwala Dharamasala",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5YRyAVqQZiL4JX7t9"
    },
    {
      "id": "3",
      "service_name": "Hotel DharmaJyoti",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ZNsTSaNmjGsYPR266"
    },
    {
      "id": "4",
      "service_name": "Samrat Hotel",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/pi7gNjXLVDRrZXFg9"
    },
    {
      "id": "5",
      "service_name": "Damodar Bhakta Nivas",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/g22BvJfesHUdyMLEA"
    },
    {
      "id": "6",
      "service_name": "Allaagada Sani Mandira Chhaka",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/fFgRNRnEjZfMmkYz6"
    },
    {
      "id": "7",
      "service_name": "Narayn Tour Travels",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/rUsuo6etndShGtNfA"
    },
    {
      "id": "8",
      "service_name": "Niladri Bhakta Nivas",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/iBVVZpEE6q2RahSH6"
    },
    {
      "id": "9",
      "service_name": "Town Thana",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/AmXg18cjZmkKsk7a9"
    },
    {
      "id": "10",
      "service_name": "Guru Estate",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/DHTu2GS4hL8HWn5E8"
    },
    {
      "id": "11",
      "service_name": "Odisha Handloom",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/NXnYCFC7qu8upKD5A"
    },
    {
      "id": "12",
      "service_name": "Jagannath Ballav Libarary",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/nGBpJq29XgfjxtYs6"
    },
    {
      "id": "13",
      "service_name": "Jagannath Ballav Bhakta Nivas",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/W4MyiV4ZnyxBeokaA"
    },
    {
      "id": "14",
      "service_name": "Bombay Style",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/k4yZGiXxXpoi4iay5"
    },
    {
      "id": "15",
      "service_name": "Subham Resturant",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/HwvVLpxK1eAss7Zq8"
    },
    {
      "id": "16",
      "service_name": "Life Medicine Store",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/B95dumFDUeAtWSSZ9"
    },
    {
      "id": "17",
      "service_name": "Harapriya Lodge",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/jZ7FT7J3hrUR3Exw7"
    },
    {
      "id": "18",
      "service_name": "Patanjali Store",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/6km5rhAg33ykrWyA6"
    },
    {
      "id": "19",
      "service_name": "Kalipad Motors",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hnQqPx1oxY8bMfpG8"
    },
    {
      "id": "20",
      "service_name": "Jagannath Parking,Bagala",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/dc2osHfCPJ1pj8zd8"
    },
    {
      "id": "21",
      "service_name": "Bagala Sauchalaya",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/QyxgWuY7vzFEMQGm7"
    },
    {
      "id": "22",
      "service_name": "Bagala VIP Suit",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/eeW9ZraQBM7sQQXSA"
    },
    {
      "id": "23",
      "service_name": "Old Akshyapatra House",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/4h94DrCfsKPtwwCF8"
    },
    {
      "id": "24",
      "service_name": "Sambad Office",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ErR823d7KnZQuyAt5"
    },
    {
      "id": "25",
      "service_name": "Cell Dot Com",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/HNyZhAnjP9MeaPHZ7"
    },
    {
      "id": "26",
      "service_name": "Family World",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Fcn4V2BRAiLQm9on7"
    },
    {
      "id": "27",
      "service_name": "Jan Ousadi",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/nCTazuqx8yN5MYVh7"
    },
    {
      "id": "28",
      "service_name": "Rana Puspa Bhandar",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/GTmNuJqhXLLBKAcj7"
    },
    {
      "id": "29",
      "service_name": "Abansh",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hrLJ3hkNsFS5FXNdA"
    },
    {
      "id": "30",
      "service_name": "Balagandi School",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/F6Q1fTiZzWRcKbvC9"
    },
    {
      "id": "31",
      "service_name": "Nidan A Patholab",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/xETKkfBmw2kttAaL8"
    },
    {
      "id": "32",
      "service_name": "Janaki Residency ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/o7VrZyqtX5guJzPR7"
    },
    {
      "id": "33",
      "service_name": "Blood Bank Side",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/DE3nXKAxFc483wDq8"
    },
    {
      "id": "34",
      "service_name": "Medical Souchayala",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/q831U7c1R4QoKs7CA"
    },
    {
      "id": "35",
      "service_name": "Medical Square",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BnAwhQjL6ZJtr69A9"
    },
    {
      "id": "36",
      "service_name": "Medical Front",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/B2mxaCAGmiFQegw49"
    },
    {
      "id": "37",
      "service_name": "Bishnupriya Dental Clinic",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ofXABD8kPTtRV8dk8"
    },
    {
      "id": "38",
      "service_name": "Grand Asiyana",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/tZHwFwHjy4xpjt3W9"
    },
    {
      "id": "39",
      "service_name": "Laxmi Electrical Shop",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/J4w4ZRKmKEiDktJq6"
    },
    {
      "id": "40",
      "service_name": "Hotel Trumurti Heights",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/iBfZapH3fSXesDBN6"
    },
    {
      "id": "41",
      "service_name": "Mob Care",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/LD5eRzW7Hh7rbGsv5"
    },
    {
      "id": "42",
      "service_name": "Kishore Club",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/tGwU65jhrzw8RwqA8"
    },
    {
      "id": "43",
      "service_name": "Padmanav Store",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/6hUp2f8bmJHSSJri7"
    },
    {
      "id": "44",
      "service_name": "Sankheswari Temple",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/kxf3eg5oakd1Ht9h8"
    },
    {
      "id": "45",
      "service_name": "Sarada Mandap",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/mka6H9nLsf1mi68V9"
    },
    {
      "id": "46",
      "service_name": "Pal House,Sangram Club Lane",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/3H4LWEVaNJgYLski7"
    },
    {
      "id": "47",
      "service_name": "Sangram Club",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/jnWzyuELMBmPbQ2g9"
    },
    {
      "id": "48",
      "service_name": "Mahima Auto",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/X6jNTtR25q7mHGbH6"
    },
    {
      "id": "49",
      "service_name": "A One Medical Store",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/yZ7eStNs55Q3Vvsn9"
    },
    {
      "id": "50",
      "service_name": "Krishna Auto",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/PAcTFBjX9ys4s2mz9"
    },
    {
      "id": "51",
      "service_name": "Sai Mobile Point",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/oPY8C4DpGSaZfqZo9"
    },
    {
      "id": "52",
      "service_name": "Memei Chaaran Das House",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/PFCtSaVC8PHPqD1Z9"
    },
    {
      "id": "53",
      "service_name": "Police Abakash",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/JGQFhdQy1yzaQw3w9"
    },
    {
      "id": "54",
      "service_name": "Union Bank",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/mmzk89gXjSeMMqL88"
    },
    {
      "id": "55",
      "service_name": "Friends' Club",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/VFtfGGDuGhwHeSYM8"
    },
    {
      "id": "56",
      "service_name": "Mahaveer Veriety Store",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/wJ3cqmUP4aTRhXEi8"
    },
    {
      "id": "57",
      "service_name": "Naka chana Dwara",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BMCbLEeVnNVELqBd8"
    },
    {
      "id": "58",
      "service_name": "Hotel Purnamasi",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/6BrP6XXpckxtfErS7"
    },
    {
      "id": "59",
      "service_name": "ECHS Poly Clinic",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/oFZoqRDPTjUg6t15A"
    },
    {
      "id": "60",
      "service_name": "Kalinga Bhaban",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Us8RQPmPrC8iGu6u6"
    },
    {
      "id": "61",
      "service_name": "Dakhina Kali Work shop",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BNh2nLKkYRLUXTwp8"
    },
    {
      "id": "62",
      "service_name": "Abhaya Mahavir",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hs3RkSteYCEyGinKA"
    },
    {
      "id": "63",
      "service_name": "Om Battery",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/9ifP1oCA2SCwczKaA"
    },
    {
      "id": "64",
      "service_name": "Bada Sankha UP School",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Ebp5S3unqRV4hawo7"
    },
    {
      "id": "65",
      "service_name": "Sudarshan Nagar Near ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/JjBWo7vxjct39CX2A"
    },
    {
      "id": "66",
      "service_name": "R K Samal House Back Side",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/2xbKSJFKCpLxw2XU9"
    },
    {
      "id": "67",
      "service_name": "Sri Ram Enterprise",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/VSbSSJSMVMFvNZEW6"
    },
    {
      "id": "68",
      "service_name": "Sri Guru Krupa Chusi Mhal",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Nz3WUsSnHygrXmzF8"
    },
    {
      "id": "69",
      "service_name": "Red Cross Road Entry Point",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/8qzgPEEVdycL5qv99"
    },
    {
      "id": "70",
      "service_name": "Fruit Factory Near",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/SkEuhuoRXvYaaUPn7"
    },
    {
      "id": "71",
      "service_name": "SBI Bank,Bada Sankha",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/fdNKy1LY9wFapM697"
    },
    {
      "id": "72",
      "service_name": "Rajadhani Furniture",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Lw84E6jbsQcENMcq7"
    },
    {
      "id": "73",
      "service_name": "Suka Prava Danta Chikitsalaya",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/1kHAaeyrm1jU68TG7"
    },
    {
      "id": "74",
      "service_name": "Alamchandi spare parts",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/qu2SQQy1qJj9Pn6C8"
    },
    {
      "id": "75",
      "service_name": "Mali Jaga Mahavir Temple",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/YUr22HxeLFkzEPPt7"
    },
    {
      "id": "76",
      "service_name": "Sandhyarani Veriety Store",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/3xovQCM13arW3mhu6"
    },
    {
      "id": "77",
      "service_name": "Hotel Nilamadhaba",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/QdaBjKVy6QaPi6CP8"
    },
    {
      "id": "78",
      "service_name": "Khuntia Petrol Pump",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/uPabQ5M4TPUkA312A"
    },
    {
      "id": "79",
      "service_name": "Sri Gobinda Medicine Store",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BoMFbrv5a4cyBbas8"
    },
    {
      "id": "80",
      "service_name": "Mob Doctor",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/JHvTxrwavnoDx7xu8"
    },
    {
      "id": "81",
      "service_name": "Salabeg Samadhi",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/vgv1K2zVy5SbhCZNA"
    },
    {
      "id": "82",
      "service_name": "Paper Home",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/bGtVWpRXWxPUKwBz9"
    },
    {
      "id": "83",
      "service_name": "Hotel Santosh",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/HX9QC6CquWjZANP49"
    },
    {
      "id": "84",
      "service_name": "Tech Guru",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/yNsKBUdxEDd1nQvP6"
    },
    {
      "id": "85",
      "service_name": "Sanjukta Electronics",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/VDVWF87QVbNdbY7a8"
    },
    {
      "id": "86",
      "service_name": "Jagannath Electrical",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ai63vkr4dVjdhb1L8"
    },
    {
      "id": "87",
      "service_name": "Haribol Lodge",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ZVwRqaeGs47RW6TG9"
    },
    {
      "id": "88",
      "service_name": "Puri Battery House",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/WgkpKxsTGwJWz1on8"
    },
    {
      "id": "89",
      "service_name": "Padmabati Bhaban",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/2oUkkf6C9JCzRghZ7"
    },
    {
      "id": "90",
      "service_name": "Sahoo Palace",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/SYUTkFVgqhxhjZE4A"
    },
    {
      "id": "91",
      "service_name": "Mausimaa Temple",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/q5JYFk3AYPWDnpjD8"
    },
    {
      "id": "92",
      "service_name": "Sneha Mob shop",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/KV88z3Aywj6NMxnt7"
    },
    {
      "id": "93",
      "service_name": "Friends cake",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/6AmVzKmcZwD5XrASA"
    },
    {
      "id": "94",
      "service_name": "Sebayan",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/kPcSQHrXx4sg4wDJA"
    },
    {
      "id": "95",
      "service_name": "Narayan Mishra Chhata Shop",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/a4h6TexRpW9Mny249"
    },
    {
      "id": "96",
      "service_name": "Nayak Plaza",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/W33Vu62e8TRPfMTGA"
    },
    {
      "id": "97",
      "service_name": "Paradise Hotel",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/yuLsFKzjXA7N8AhM8"
    },
    {
      "id": "98",
      "service_name": "Paradise Hotel 2nd Gate",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/1hgMFsh4L5txH7iq6"
    },
    {
      "id": "99",
      "service_name": "Mishra Travel",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/JrZKN6Gh2Z16arVc8"
    },
    {
      "id": "100",
      "service_name": "Fashion Icon",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/qwHdTVZ8UQp5h8Xt6"
    },
    {
      "id": "101",
      "service_name": "Lords Tailor",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/NxpPCeJKo4gMmQ4y9"
    },
    {
      "id": "102",
      "service_name": "Maa Bimala Mob Shop",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/gKkSNkbF4mqtmRhV6"
    },
    {
      "id": "103",
      "service_name": "Hariyana Handloom",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/9ZzD8DW21S6ngqDW7"
    },
    {
      "id": "104",
      "service_name": "Janata Talkies",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/okAbypin8JLNJhqq5"
    },
    {
      "id": "105",
      "service_name": "Choudhury House",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/v45hMKVpL8WrhUpB6"
    },
    {
      "id": "106",
      "service_name": "Bazar Kolkata",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/T9Bu5MgCjRm4vUNY8"
    },
    {
      "id": "107",
      "service_name": "Goenka Dharamsala",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/zD746i41vUYHHeVEA"
    },
    {
      "id": "108",
      "service_name": "Nilachala Bhakta Nibas",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/3NamNWbRTJ42EP7V7"
    },
    {
      "id": "109",
      "service_name": "Arnapurna Theater",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/vjEkMLqiYr1DhhK89"
    },
    {
      "id": "110",
      "service_name": "Gangadhar Ashram",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/at39uVBqTf6XzgcVA"
    },
    {
      "id": "111",
      "service_name": "Annapurna Lodge",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/RAcR2hZ6RxssfjPF8"
    },
    {
      "id": "112",
      "service_name": "Kumar Odisha Handloom",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/d8AodKVhJcPNCDTG8"
    },
    {
      "id": "113",
      "service_name": "Sabaji Hotel",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/TuxBysa3KLN33Tn88"
    },
    {
      "id": "114",
      "service_name": "Maa Marichei Temple",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/CtNEXBn8YW6pcZYS7"
    },
    {
      "id": "115",
      "service_name": "Hotel Sri Jew",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/tbVMCnvyr3VwnGpj8"
    },
    {
      "id": "116",
      "service_name": "Surya Complex",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/7wUjQFrnnQSDQpGB8"
    },
    {
      "id": "117",
      "service_name": "Raja Nahar",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/EnbZpyD8p2y1HFba6"
    },
    {
      "id": "118",
      "service_name": "Digabareni",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/CvoTZ5dKd1JJYrwW9"
    },
    {
      "id": "119",
      "service_name": "E.S.I & G.S.T Guest House",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/FhHmDD3byWRZ6caf7"
    },
    {
      "id": "120",
      "service_name": "Puri Hotel",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/pnLULhRACnPS1bAN9"
    },
    {
      "id": "121",
      "service_name": "Vicctoria Club",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/iFPgzWNi7rSogbv47"
    },
    {
      "id": "122",
      "service_name": "Mohadadhi",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hrENGUzFj1TmQHRSA"
    },
    {
      "id": "123",
      "service_name": "Sagarika",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/hpaZc9LJESpPxNkYA"
    },
    {
      "id": "124",
      "service_name": "Bangalaxmi",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5hiKFCuE4WFB8jWi7"
    },
    {
      "id": "125",
      "service_name": "Atithi Hotel",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/eY5zzihfwPUCaNvP6"
    },
    {
      "id": "126",
      "service_name": "Gochikar House",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/kNcLUrNtNpoWxoTf7"
    },
    {
      "id": "127",
      "service_name": "Hotel Camelia",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/rUpdPRgW8sJ3JAyt5"
    },
    {
      "id": "128",
      "service_name": "SUV Palace",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/b5FpJbwJWzyVs76M9"
    },
    {
      "id": "129",
      "service_name": "Birla Guest House",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/VVkrGgMztAnpscZw8"
    },
    {
      "id": "130",
      "service_name": "Swargadwara Front",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/8i5pUrytqaFE7wKUA"
    },
    {
      "id": "131",
      "service_name": "Lucky India",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/b2cbKd384eQFZWQg8"
    },
    {
      "id": "132",
      "service_name": "Light House",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BryrQNHE4H6zorbr9"
    },
    {
      "id": "133",
      "service_name": "Hotel Fourtune",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/e3vFDnGYEkwkvzHd6"
    },
    {
      "id": "134",
      "service_name": "Sagar Vihar ",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/sW4ET5ydgH8Yao8Q7"
    },
    {
      "id": "135",
      "service_name": "HOTEL NILADRI PREMIUM",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/qGSgyZiZ56dm3CGy6"
    },
    {
      "id": "136",
      "service_name": "Café Center",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/4nAu4gYtX29xiiaG6"
    },
    {
      "id": "137",
      "service_name": "Hotel Emporier",
      "photo": require('../../assets/offlineData/waterPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/edeSDhEc8rsWBSf97"
    }
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [drinkingWater, setDrinkingWater] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        // getDrinkingWater(value);
        if (value === 'Odia') {
          setDrinkingWater(odia_data);
        } else if (value === 'English') {
          setDrinkingWater(english_data);
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
      // getDrinkingWater(selectedLanguage);
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

  const getDrinkingWater = async (language) => {
    try {
      setLoading(true);
      const response = await fetch(`${base_url}api/get-all-service-list/${language}`);
      const responseData = await response.json();
      if (responseData.status) {
        const filtered = responseData.data.filter(item => item.service_type === 'drinking_water');
        // const filteredData = filtered.filter(item => item.language === selectedLanguage);
        setDrinkingWater(filtered);
      }
    } catch (error) {
      console.error('Error fetching life guard booths:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // getDrinkingWater(selectedLanguage);
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
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ପାନୀୟ ଜଳ' : 'Drinking Water'}</Text>
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
              <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ବିଶୁଦ୍ଧ ପାନୀୟ ଜଳ' : 'Clean Drinking Water'}</Text>
              <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ତୀର୍ଥଯାତ୍ରୀଙ୍କ ପାଇଁ ମଧୁର ଏବଂ ପରିଷ୍କାର ପାଣି।' : 'Fresh And Clean Water For Pilgrims.'}</Text>
              {/* <View style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Drink Now →</Text>
              </View> */}
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
              <Image source={require('../../assets/image/drinkingWater32.png')} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
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
            data={drinkingWater}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View
                // onPress={() => openMap(item.google_map_link)}
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
                <View style={{ width: '68%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                    {item.service_name || 'Drinking Water'}
                  </Text>

                  {item.landmark &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                      <MaterialIcons name="location-on" size={14} color="#999" />
                      <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                        {item.landmark}, {item.district}
                      </Text>
                    </View>
                  }

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
                  </View>

                  {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <MaterialIcons name="access-time" size={13} color="#999" />
                    <Text style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>Open: {item.opening_time} - {item.closing_time}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <FontAwesome5 name="air-freshener" size={13} color="#28a745" />
                    <Text style={{ fontSize: 13, marginLeft: 5, color: '#28a745', textTransform: 'capitalize' }}>{item.status}</Text>
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
});
