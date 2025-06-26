import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

  // const odia_data = [
  //   {
  //     "id": 135,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ଇନ୍ଦ୍ରଦ୍ୟୁମ୍ନ ପୋଖରୀ ଶୌଚାଳୟ ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745502772_Screenshot 2025-04-24 192210.png",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8194879,85.8384714,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c6b1ca5fa8c3:0x7578f8856d7e061f!8m2!3d19.8194879!4d85.8410463!16s%2Fg%2F11fd774t47?hl=en&entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": "07381276847",
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ଇନ୍ଦ୍ରଦ୍ୟୁମ୍ନ ପୋଖରୀ ଛକ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Indrayumna Tank Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T07:47:41.000000Z",
  //     "updated_at": "2025-05-27T05:36:58.000000Z"
  //   },
  //   {
  //     "id": 136,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ସୁଲଭ ଶୌଚାଳୟ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749035719_t1.jpg",
  //     "google_map_link": "https://www.google.com/search?sca_esv=7e5953c6ea857c85&tbm=lcl&sxsrf=AE3TifPt3hUoqn9_PNt9OtcwTf0Sk0lHtA:1749100324863&q=toilet+in+puri&rflfq=1&num=10&sa=X&ved=2ahUKEwi_4Ki8wtmNAxVr1DgGHaOREu0QjGp6BAgkEAE&biw=1536&bih=695&dpr=1.25#rlfi=hd:;si:11009517094594421378,l,Cg50b2lsZXQgaW4gcHVyaUj-mv6uqa-AgAhaHBAAGAAYAiIOdG9pbGV0IGluIHB1cmkqBAgDEACSAQ9wdWJsaWNfYmF0aHJvb22qAU0KCC9tLzA5ZzF3EAEqCiIGdG9pbGV0KAAyHxABIhvwkT_NRck9S8Ndf6bas1apeAkhFB4Fm6bUuQwyEhACIg50b2lsZXQgaW4gcHVyaQ;mv:[[19.813903297528825,85.8417745563271],[19.802799807500698,85.81896492394333]]",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ଗ୍ରାଣ୍ଡ ରୋଡ୍",
  //     "pincode": "୭୫୨୦୦୨ ",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା ",
  //     "country": "ଭାରତ",
  //     "description": "Nrusingha Temple Toilet Puri",
  //     "status": "active",
  //     "created_at": "2025-04-18T07:52:10.000000Z",
  //     "updated_at": "2025-06-05T00:02:54.000000Z"
  //   },
  //   {
  //     "id": 137,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ  ଶୌଚାଳୟ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745502567_Screenshot 2025-04-24 191839.png",
  //     "google_map_link": "https://www.google.com/maps/place/Jagannath+Ballav+Souchalay/@19.798892,85.7997206,15z/data=!4m6!3m5!1s0x3a19c785cf3f9831:0x7db5bd75d8d15466!8m2!3d19.8116268!4d85.8248328!16s%2Fg%2F11ry0l6pgs?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ଜଗନ୍ନାଥ ମନ୍ଦିର, ଉତ୍ତର ଦ୍ୱାର ନିକଟରେ,  ଗ୍ରାଣ୍ଡ ରୋଡ଼",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Toilet Near By Gundichha Temple",
  //     "status": "active",
  //     "created_at": "2025-04-18T07:57:43.000000Z",
  //     "updated_at": "2025-06-05T00:44:14.000000Z"
  //   },
  //   {
  //     "id": 138,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ଏସବିଏମ ଶୌଚାଳୟ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745734199_Screenshot 2025-04-27 113905.png",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8136681,85.8038393,15z/data=!4m6!3m5!1s0x3a19c69961e0a421:0x4c05c99e3c651708!8m2!3d19.8136681!4d85.8228937!16s%2Fg%2F11fd77cx32?entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ନରେନ୍ଦ୍ର କୋଣ\n",
  //     "pincode": "୭୫୨୦୦୧",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Mashan Chandi Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:03:08.000000Z",
  //     "updated_at": "2025-06-04T23:59:30.000000Z"
  //   },
  //   {
  //     "id": 139,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ମ୍ୟୁନିସିପାଲ ମାର୍କେଟ ଏସବିଏମ ଶୌଚାଳୟ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745502256_Screenshot 2025-04-24 191340.png",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8136681,85.8038393,15z/data=!4m7!3m6!1s0x3a19c69ef7a00b41:0xb186cd7f9c61cb43!8m2!3d19.808971!4d85.8247924!15sCi50b2lsZXRzIG5lYXIgVGVtcGxlIGRlIEphZ2FubmF0aCwgUHVyaSwgT2Rpc2hhkgEPcHVibGljX2JhdGhyb29tqgFsCggvbS8wOWcxdxABKgsiB3RvaWxldHMoADIfEAEiG5VyuiDEJrdEmroFyDMVIaoQQYQzcvF9usmuLTIwEAIiLHRvaWxldHMgbmVhciB0ZW1wbGUgZGUgamFnYW5uYXRoIHB1cmkgb2Rpc2hh4AEA!16s%2Fg%2F11gnsgkbc3?entry=tts&g_ep=EgoyMDI1MDYwMS4wIPu8ASoASAFQAw%3D%3D&skid=2f9dd0cb-114e-4802-b06e-7d2cd565d723https://www.google.com/maps/place/SBM+Toilet/@19.8136681,85.8038393,15z/data=!4m14!1m7!3m6!1s0x3a19c69ef7a00b41:0xb186cd7f9c61cb43!2sSBM+Toilet!8m2!3d19.808971!4d85.8247924!16s%2Fg%2F11gnsgkbc3!3m5!1s0x3a19c69ef7a00b41:0xb186cd7f9c61cb43!8m2!3d19.808971!4d85.8247924!16s%2Fg%2F11gnsgkbc3?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ମ୍ୟୁନିସିପାଲ୍ ମାର୍କେଟ୍",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Gundichha Temple Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:06:58.000000Z",
  //     "updated_at": "2025-06-04T21:55:17.000000Z"
  //   },
  //   {
  //     "id": 140,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ବସଷ୍ଟାଣ୍ଡ ପାଖ ଶୌଚାଳୟ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749093261_77.jpg",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8153634,85.829393,16.05z/data=!4m6!3m5!1s0x3a19c6af86eddebb:0xd5c57ebb066fcc49!8m2!3d19.8155518!4d85.838566!16s%2Fg%2F11gnsgsqn6?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ଗୁଣ୍ଡିଚା ମନ୍ଦିର ବସ୍ ଷ୍ଟାଣ୍ଡ ନିକଟରେ",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Bus Stand Puri Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:11:26.000000Z",
  //     "updated_at": "2025-06-04T21:57:26.000000Z"
  //   },
  //   {
  //     "id": 141,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ସାର୍ବଜନିକ ଶୌଚାଳୟ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749100621_toilet.jpg",
  //     "google_map_link": "https://www.google.co.in/maps/place/Sulabh+Shouchalaya+Public+Toilet/@19.8045025,85.8176178,780m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a19c4279ec6642f:0x98c9a97773e42282!8m2!3d19.8044975!4d85.8201927!16s%2Fg%2F11hbby_3cz?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ମନ୍ଦିର ରାସ୍ତା, ଦୋଳମଣ୍ଡପ ସାହି",
  //     "pincode": "୭୫୨୦୦୨",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Sangram Club Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:14:23.000000Z",
  //     "updated_at": "2025-06-06T04:03:03.000000Z"
  //   },
  //   {
  //     "id": 142,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ରେଳ ଷ୍ଟେସନ ଶୌଚାଳୟ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745501564_Screenshot 2025-04-24 190150.png",
  //     "google_map_link": "https://www.google.co.in/maps/place/Railwaystation+Toilet/@19.8081068,85.8351728,780m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a19c782afb82979:0xeeb14c81c88ca8d!8m2!3d19.8081018!4d85.8377477!16s%2Fg%2F11f61gys86?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ବାଲିକୁଦା ସାହି",
  //     "pincode": "୭୫୨୦୦୧",
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Sarba Mangala W.S.H.G.Narendar Kona Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:19:58.000000Z",
  //     "updated_at": "2025-06-06T04:03:18.000000Z"
  //   },
  //   {
  //     "id": 143,
  //     "language": "Odia",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "ନରେନ୍ଦ୍ର ଶୌଚାଳୟ",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745502146_Screenshot 2025-04-24 191152.png",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8136681,85.8038393,15z/data=!4m6!3m5!1s0x3a19c698c33143dd:0x84784e1d1bb7f0c6!8m2!3d19.8129954!4d85.8261797!16s%2Fg%2F11gv0xfrwm?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "ନରେନ୍ଦ୍ର ଟ୍ୟାଙ୍କ",
  //     "pincode": null,
  //     "city_village": "",
  //     "district": "ପୁରୀ",
  //     "state": "ଓଡ଼ିଶା",
  //     "country": "ଭାରତ",
  //     "description": "Sulabha Shauchalya Puri Municipality",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:28:24.000000Z",
  //     "updated_at": "2025-06-05T00:34:01.000000Z"
  //   },
  // ];

  // const english_data = [
  //   {
  //     "id": 52,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "Indrayumna Tank Toilet",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745502772_Screenshot 2025-04-24 192210.png",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8194879,85.8384714,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c6b1ca5fa8c3:0x7578f8856d7e061f!8m2!3d19.8194879!4d85.8410463!16s%2Fg%2F11fd774t47?hl=en&entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": "07381276847",
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Indradyumna, Chhak",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Indrayumna Tank Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T07:47:41.000000Z",
  //     "updated_at": "2025-06-03T05:32:53.000000Z"
  //   },
  //   {
  //     "id": 53,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "Sulabh Shauchalaya & Bath Complex .",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749035719_t1.jpg",
  //     "google_map_link": "https://www.google.com/maps/place/Sulabh+Shauchalaya+%26+Bath+Complex+./@19.8031105,85.8130374,15z/data=!4m6!3m5!1s0x3a19c69ebd65cf09:0xf44d09eaede1952c!8m2!3d19.8103658!4d85.8238145!16s%2Fg%2F11ckw28c4_?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Grand Rd",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Nrusingha Temple Toilet Puri",
  //     "status": "active",
  //     "created_at": "2025-04-18T07:52:10.000000Z",
  //     "updated_at": "2025-06-04T06:07:34.000000Z"
  //   },
  //   {
  //     "id": 54,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "Jagannath Ballav Souchalay\n",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745502567_Screenshot 2025-04-24 191839.png",
  //     "google_map_link": "https://www.google.com/maps/place/Jagannath+Ballav+Souchalay/@19.798892,85.7997206,15z/data=!4m6!3m5!1s0x3a19c785cf3f9831:0x7db5bd75d8d15466!8m2!3d19.8116268!4d85.8248328!16s%2Fg%2F11ry0l6pgs?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Jagannath temple, Near Uttar Dwara, Grand Rd",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Toilet Near By Gundichha Temple",
  //     "status": "active",
  //     "created_at": "2025-04-18T07:57:43.000000Z",
  //     "updated_at": "2025-06-04T21:49:11.000000Z"
  //   },
  //   {
  //     "id": 55,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "SBM Toilet",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745734199_Screenshot 2025-04-27 113905.png",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8136681,85.8038393,15z/data=!4m6!3m5!1s0x3a19c69961e0a421:0x4c05c99e3c651708!8m2!3d19.8136681!4d85.8228937!16s%2Fg%2F11fd77cx32?entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Narendra Kona",
  //     "pincode": "752001",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Mashan Chandi Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:03:08.000000Z",
  //     "updated_at": "2025-06-04T23:57:48.000000Z"
  //   },
  //   {
  //     "id": 56,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "Municipal Market SBM Toilet",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749038138_t5.jpg",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8136681,85.8038393,15z/data=!4m7!3m6!1s0x3a19c69ef7a00b41:0xb186cd7f9c61cb43!8m2!3d19.808971!4d85.8247924!15sCi50b2lsZXRzIG5lYXIgVGVtcGxlIGRlIEphZ2FubmF0aCwgUHVyaSwgT2Rpc2hhkgEPcHVibGljX2JhdGhyb29tqgFsCggvbS8wOWcxdxABKgsiB3RvaWxldHMoADIfEAEiG5VyuiDEJrdEmroFyDMVIaoQQYQzcvF9usmuLTIwEAIiLHRvaWxldHMgbmVhciB0ZW1wbGUgZGUgamFnYW5uYXRoIHB1cmkgb2Rpc2hh4AEA!16s%2Fg%2F11gnsgkbc3?entry=tts&g_ep=EgoyMDI1MDYwMS4wIPu8ASoASAFQAw%3D%3D&skid=2f9dd0cb-114e-4802-b06e-7d2cd565d723https://www.google.com/maps/place/SBM+Toilet/@19.8136681,85.8038393,15z/data=!4m14!1m7!3m6!1s0x3a19c69ef7a00b41:0xb186cd7f9c61cb43!2sSBM+Toilet!8m2!3d19.808971!4d85.8247924!16s%2Fg%2F11gnsgkbc3!3m5!1s0x3a19c69ef7a00b41:0xb186cd7f9c61cb43!8m2!3d19.808971!4d85.8247924!16s%2Fg%2F11gnsgkbc3?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Municipal Market",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Gundichha Temple Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:06:58.000000Z",
  //     "updated_at": "2025-06-04T23:57:35.000000Z"
  //   },
  //   {
  //     "id": 57,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "Narendra Tank SBM Toilet\n",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745502146_Screenshot 2025-04-24 191152.png",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8136681,85.8038393,15z/data=!4m6!3m5!1s0x3a19c698c33143dd:0x84784e1d1bb7f0c6!8m2!3d19.8129954!4d85.8261797!16s%2Fg%2F11gv0xfrwm?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Narendra Tank",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Bus Stand Puri Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:11:26.000000Z",
  //     "updated_at": "2025-06-04T05:17:20.000000Z"
  //   },
  //   {
  //     "id": 58,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "Bus Stand Toilet",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749093261_77.jpg",
  //     "google_map_link": "https://www.google.com/maps/place/SBM+Toilet/@19.8153634,85.829393,16.05z/data=!4m6!3m5!1s0x3a19c6af86eddebb:0xd5c57ebb066fcc49!8m2!3d19.8155518!4d85.838566!16s%2Fg%2F11gnsgsqn6?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Near Gundicha Temple Bus Stand",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Sangram Club Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:14:23.000000Z",
  //     "updated_at": "2025-06-05T03:14:21.000000Z"
  //   },
  //   {
  //     "id": 59,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "Sulabh Shouchalaya Public Toilet",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1749100621_toilet.jpg",
  //     "google_map_link": "https://www.google.co.in/maps/place/Sulabh+Shouchalaya+Public+Toilet/@19.8045025,85.8176178,780m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a19c4279ec6642f:0x98c9a97773e42282!8m2!3d19.8044975!4d85.8201927!16s%2Fg%2F11hbby_3cz?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": "Temple Rd, Dolamandap Sahi",
  //     "pincode": "752001",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Sarba Mangala W.S.H.G.Narendar Kona Toilet",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:19:58.000000Z",
  //     "updated_at": "2025-06-06T04:02:46.000000Z"
  //   },
  //   {
  //     "id": 60,
  //     "language": "English",
  //     "temple_id": "TEMPLE25402",
  //     "service_type": "toilet",
  //     "service_name": "Railway Station Toilet",
  //     "photo": "https://shreejagannathadham.com/uploads/public_services/1745501564_Screenshot 2025-04-24 190150.png",
  //     "google_map_link": "https://www.google.co.in/maps/place/Railwaystation+Toilet/@19.8081068,85.8351728,780m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a19c782afb82979:0xeeb14c81c88ca8d!8m2!3d19.8081018!4d85.8377477!16s%2Fg%2F11f61gys86?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D",
  //     "contact_no": null,
  //     "whatsapp_no": null,
  //     "opening_time": "06:00",
  //     "closing_time": "05:59",
  //     "start_date": null,
  //     "end_date": null,
  //     "landmark": " Balikuda Sahi",
  //     "pincode": "752002",
  //     "city_village": "Puri",
  //     "district": "Puri",
  //     "state": "Odisha",
  //     "country": "India",
  //     "description": "Toilet Red Cross Road",
  //     "status": "active",
  //     "created_at": "2025-04-18T08:23:33.000000Z",
  //     "updated_at": "2025-06-06T03:59:00.000000Z"
  //   },
  // ];

  const odia_data = [
    {
      "id": 1,
      "service_name": "ତାଳବଣିଆ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/fk8Vi7ussxywJoMU8",
      "Toilets_no": "୧୪"
    },
    {
      "id": 2,
      "service_name": "ଉଦ୍ୟାନ ବିଭାଗ କ୍ଷେତ୍ର",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/x6Xx6sDHZkUZAsMZA",
      "Toilets_no": "୪"
    },
    {
      "id": 3,
      "service_name": "ବ୍ଲୁ ଫ୍ଲାଗ୍ ସମୁଦ୍ରତଟ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/cuRyfbEQ3WiYH5DG7",
      "Toilets_no": "୬"
    },
    {
      "id": 4,
      "service_name": "ଦିଗବାରେଣି",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/RbzJtnj92CZ7dd3V9",
      "Toilets_no": "୧୦"
    },
    {
      "id": 5,
      "service_name": "ଏସ୍‌.ସି‌.ଏସ୍‌ କଲେଜ୍",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5Eah8HVf75Lx6YPCA",
      "Toilets_no": "୧୦"
    },
    {
      "id": 6,
      "service_name": "ଯାତ୍ରିକା",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Xs1b6rEaaa5PTRBu7",
      "Toilets_no": "୮"
    },
    {
      "id": 7,
      "service_name": "ନାଲି ପଡିଆ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/rQJipmioqng3qtZLA",
      "Toilets_no": "୪"
    },
    {
      "id": 8,
      "service_name": "ସୁଖଲତା ସ୍ମୃତି ଉଚ୍ଚ ବିଦ୍ୟାଳୟ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/bHqPAsP62j2rqYqLA",
      "Toilets_no": "୪"
    },
    {
      "id": 9,
      "service_name": "ଗଦାଧର ଉଚ୍ଚ ବିଦ୍ୟାଳୟ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/vcXQDczLgKXawFKn9",
      "Toilets_no": "୬"
    },
    {
      "id": 10,
      "service_name": "ଲୋକନାଥ ପାର୍କିଂ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ZmpKrA3ctGitonPg7",
      "Toilets_no": "୪"
    },
    {
      "id": 11,
      "service_name": "ଫ୍ଲୋରିଶ୍ ଇଣ୍ଡିଆ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/cWAmyp6UfzmWBSaN9",
      "Toilets_no": "୬"
    },
    {
      "id": 12,
      "service_name": "ବାଘ ଆଖଡା ମଠ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/WdsFSWPkEjqXbxxn6",
      "Toilets_no": "୪"
    },
    {
      "id": 13,
      "service_name": "ବଗଲା ଧର୍ମଶାଳା",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/KbovczaWdkUZwqg37",
      "Toilets_no": "୪"
    },
    {
      "id": 14,
      "service_name": "ବ୍ଲୁ ଲିଲି ହୋଟେଲ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/N4u9UfeBEH1DiMjD7",
      "Toilets_no": "୪"
    },
    {
      "id": 15,
      "service_name": "ଶନି ମନ୍ଦିର ପାଖ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/A7GaaJ9XRoMHtPeY6",
      "Toilets_no": "୫"
    },
    {
      "id": 16,
      "service_name": "ଷ୍ଟାର୍ଲିଙ୍ଗ୍ ହୋଟେଲ ପାଖ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/gTx5eQPTU9xNbqRYA",
      "Toilets_no": "୫"
    },
    {
      "id": 17,
      "service_name": "ସୂର୍ଯ୍ୟ ମଲ୍ ସହ କଲେଜ୍",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/bjbxSsiUkz6J5Z5s5",
      "Toilets_no": "୧୨"
    },
    {
      "id": 18,
      "service_name": "ଶ୍ରୀ ସେତୁ ଗେଟ୍ ନିକଟ ଅସ୍ଥାୟୀ ହେଲିପ୍ୟାଡ ପଡିଆ ପାଖ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5iomuAmQq56yEzqA8",
      "Toilets_no": "୪"
    },
    {
      "id": 19,
      "service_name": "ଶ୍ରୀ ସେତୁ ଗେଟ୍ ନିକଟ ମାଟିତୋଟା ଖେଳ ପଡିଆ ପାଖ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BwLgeCjBWzmYnLjL7",
      "Toilets_no": "୪"
    },
    {
      "id": 20,
      "service_name": "ଇଣ୍ଡୋର୍ ଷ୍ଟାଡିୟମ୍",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/jVN46vqbxzHxhpi56",
      "Toilets_no": "୨୦"
    },
    {
      "id": 21,
      "service_name": "ବିଧାୟକ ଅତିଥି ଗୃହ ପାଖ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/7RcsvNYNsHsd1tDX9",
      "Toilets_no": "୬"
    },
    {
      "id": 22,
      "service_name": "ଭୂଦାନ ଖେଳ ପଡିଆ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Tb9oCWbjEtYxRUht5",
      "Toilets_no": "୮"
    },
    {
      "id": 23,
      "service_name": "ତାଳବଣିଆ ପଡିଆ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/fk8Vi7ussxywJoMU8",
      "Toilets_no": "୮"
    },
    {
      "id": 24,
      "service_name": "ହେଲିପ୍ୟାଡ୍",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5ApAm12DhAwhhiVK9",
      "Toilets_no": "୮"
    },
    {
      "id": 25,
      "service_name": "ସରକାରୀ ଆଇ.ଟି.ଆଇ କଲେଜ୍",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/EY6LwB6Q2yyHDVKT7",
      "Toilets_no": "୮"
    },
    {
      "id": 26,
      "service_name": "ତାଳବଣିଆ କେନ୍ଦ୍ରୀୟ ବିଦ୍ୟାଳୟ ରୋଡ୍ ପାଖରେ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/CAV8iAfcqXcgheiN8",
      "Toilets_no": "୮"
    }
  ];

  const english_data = [
    {
      "id": 1,
      "service_name": "Talabania",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/fk8Vi7ussxywJoMU8",
      "Toilets_no": "14"
    },
    {
      "id": 2,
      "service_name": "Horticulture Farm",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/x6Xx6sDHZkUZAsMZA",
      "Toilets_no": "4"
    },
    {
      "id": 3,
      "service_name": "Blue Flag Beach",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/cuRyfbEQ3WiYH5DG7",
      "Toilets_no": "6"
    },
    {
      "id": 4,
      "service_name": "Digabareni",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/RbzJtnj92CZ7dd3V9",
      "Toilets_no": "10"
    },
    {
      "id": 5,
      "service_name": "S.C.S College",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5Eah8HVf75Lx6YPCA",
      "Toilets_no": "14"
    },
    {
      "id": 6,
      "service_name": "Jatrika",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Xs1b6rEaaa5PTRBu7",
      "Toilets_no": "8"
    },
    {
      "id": 7,
      "service_name": "Nali Field",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/rQJipmioqng3qtZLA",
      "Toilets_no": "4"
    },
    {
      "id": 8,
      "service_name": "Sukhalata Memorial High School",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/bHqPAsP62j2rqYqLA",
      "Toilets_no": "4"
    },
    {
      "id": 9,
      "service_name": "Gadadhara High School",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/vcXQDczLgKXawFKn9",
      "Toilets_no": "6"
    },
    {
      "id": 10,
      "service_name": "Lokanath Parking",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/ZmpKrA3ctGitonPg7",
      "Toilets_no": "4"
    },
    {
      "id": 11,
      "service_name": "Flourish India",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/cWAmyp6UfzmWBSaN9",
      "Toilets_no": "6"
    },
    {
      "id": 12,
      "service_name": "Bagha Akheda Matha",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/WdsFSWPkEjqXbxxn6",
      "Toilets_no": "4"
    },
    {
      "id": 13,
      "service_name": "Bagala Dharmashala",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/KbovczaWdkUZwqg37",
      "Toilets_no": "4"
    },
    {
      "id": 14,
      "service_name": "Blue lily Hotel",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/N4u9UfeBEH1DiMjD7",
      "Toilets_no": "4"
    },
    {
      "id": 15,
      "service_name": "Near Sani Temple",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/A7GaaJ9XRoMHtPeY6",
      "Toilets_no": "5"
    },
    {
      "id": 16,
      "service_name": "Near Sterling Hotel",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/gTx5eQPTU9xNbqRYA",
      "Toilets_no": "5"
    },
    {
      "id": 17,
      "service_name": "Suraj Mall Saha College",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/bjbxSsiUkz6J5Z5s5",
      "Toilets_no": "12"
    },
    {
      "id": 18,
      "service_name": "Near Temporary Helipad Field near Shree Setu Gate",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5iomuAmQq56yEzqA8",
      "Toilets_no": "4"
    },
    {
      "id": 19,
      "service_name": "Near Matitota playfield near Shree Setu Gate",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/BwLgeCjBWzmYnLjL7",
      "Toilets_no": "4"
    },
    {
      "id": 20,
      "service_name": "Indoor Stadium",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/jVN46vqbxzHxhpi56",
      "Toilets_no": "20"
    },
    {
      "id": 21,
      "service_name": "Near MLA Guest House",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/7RcsvNYNsHsd1tDX9",
      "Toilets_no": "6"
    },
    {
      "id": 22,
      "service_name": "Bhudan Playground",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/Tb9oCWbjEtYxRUht5",
      "Toilets_no": "8"
    },
    {
      "id": 23,
      "service_name": "Talabania Field",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/fk8Vi7ussxywJoMU8",
      "Toilets_no": "8"
    },
    {
      "id": 24,
      "service_name": "Helipad ",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/5ApAm12DhAwhhiVK9",
      "Toilets_no": "8"
    },
    {
      "id": 25,
      "service_name": "Govt ITI College",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/EY6LwB6Q2yyHDVKT7",
      "Toilets_no": "8"
    },
    {
      "id": 26,
      "service_name": "Talabania Kendriya Vidyalaya Road Side",
      "photo": require('../../assets/offlineData/toiletPhoto.jpeg'),
      "google_map_link": "https://maps.app.goo.gl/CAV8iAfcqXcgheiN8",
      "Toilets_no": "8"
    }
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [toilet, setToilet] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        // getToilet(value);
        if (value === 'Odia') {
          setToilet(odia_data);
        } else if (value === 'English') {
          setToilet(english_data);
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
      // getToilet(selectedLanguage);
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

  const getToilet = async (language) => {
    try {
      setLoading(true);
      const response = await fetch(`${base_url}api/get-all-service-list/${language}`);
      const responseData = await response.json();
      if (responseData.status) {
        const filtered = responseData.data.filter(item => item.service_type === 'toilet');
        // const filteredData = filtered.filter(item => item.language === selectedLanguage);
        setToilet(filtered);
      }
    } catch (error) {
      console.error('Error fetching life guard booths:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // getToilet(selectedLanguage);
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
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଶୌଚାଳୟ' : 'Toilet'}</Text>
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
              <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ସଫା ଶୌଚାଳୟ ବ୍ୟବହାର କରନ୍ତୁ' : 'Use Clean Toilet'}</Text>
              <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ନିକଟରେ ଉପଲବ୍ଧ କିଛି ଶୌଚାଳୟ।' : 'Some Of The Available Nearby Toilet.'}</Text>
              {/* <View style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Check Now →</Text>
              </View> */}
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
              <Image source={require('../../assets/image/toilet543.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
            </View>
          </View>
        </View>

        {/* Toilet List */}
        {loading ? (
          <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#341551" />
            <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={toilet}
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
                <View style={{ width: '65%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                    {item.service_name || 'Toilet Name'}
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
