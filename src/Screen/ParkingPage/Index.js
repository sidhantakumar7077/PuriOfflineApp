import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

    const odia_data = [
        {
            "id": 12,
            "temple_id": "TEMPLE25402",
            "language": "odia",
            "vehicle_type": "[\"four wheeler\",\"three wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
            "parking_name": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ କମପ୍ଲେକ୍ସ",
            "parking_availability": "୨୫୦୦",
            "map_url": "https://maps.app.goo.gl/jvrpx6cg9stQdYAu5",
            "parking_photo": require('../../assets/offlineData/parking/JBPCMultiLevelParking.jpeg'),
            "area_type": "[\"cover\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "ଚନ୍ଦନଚକଡା ପାଖ,",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ନରେନ୍ଦ୍ର କୋଣ",
            "district": "ପୁରୀ",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-27T08:02:59.000000Z",
            "updated_at": "2025-06-03T07:48:56.000000Z"
        },
        {
            "id": 15,
            "temple_id": "TEMPLE25402",
            "language": "odia",
            "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"three wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
            "parking_name": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ",
            "parking_availability": "୧୦୦୦",
            "map_url": "https://maps.app.goo.gl/k7C1XZDiXLnJRnkG7",
            "parking_photo": require('../../assets/offlineData/parking/Jagannathballavparking.jpeg'),
            "area_type": "[\"open\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "ବେଣ୍ଟ ପୋଖରୀ ପାଖ,",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ରୋଡ଼",
            "district": "ପୁରୀ",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-27T10:56:26.000000Z",
            "updated_at": "2025-06-03T07:49:23.000000Z"
        },
        {
            "id": 18,
            "temple_id": "TEMPLE25402",
            "language": "odia",
            "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"three wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
            "parking_name": "ପୁରୀ ମ୍ୟୁନିସିପାଲଟି ମାର୍କେଟ ପାର୍କିଂ",
            "parking_availability": "୫୦୦",
            "map_url": "https://maps.app.goo.gl/gxvdwVJ9BgzCSS4W8",
            "parking_photo": require('../../assets/offlineData/parking/PuriMunicipalityMarketParking.jpeg'),
            "area_type": "[\"cover\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "ଗ୍ରାଣ୍ଡ ରୋଡ଼,",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ବଳଗଣ୍ଡି",
            "district": "ପୁରୀ",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-27T11:09:28.000000Z",
            "updated_at": "2025-06-03T07:49:51.000000Z"
        },
        {
            "id": 17,
            "temple_id": "TEMPLE25402",
            "language": "odia",
            "vehicle_type": "[\"four wheeler\",\"three wheeler\"]",
            "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
            "parking_name": "ପୁରୁଷୋତ୍ତମ କାର ପାର୍କିଂ",
            "parking_availability": "୨୦୦୦",
            "map_url": "https://maps.app.goo.gl/8gFer4JLuo1D94Gy5",
            "parking_photo": require('../../assets/offlineData/parking/PurushottamMultiLevel.jpeg'),
            "area_type": "[\"cover\"]",
            "parking_management": "[\"automated\"]",
            "landmark": "ହସ୍ପିଟାଲ ପାଖରେ,",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ପୁରୁଣା ଜେଲ ରୋଡ଼, ବଳଗଣ୍ଡି ଛକ",
            "district": "ପୁରୀ",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-27T11:05:41.000000Z",
            "updated_at": "2025-06-03T07:49:40.000000Z"
        },
        {
            "id": 20,
            "temple_id": "TEMPLE25402",
            "language": "odia",
            "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"normal\"]",
            "parking_name": "ମହୋଦଧି ମାର୍କେଟ କମପ୍ଲେକ୍ସ",
            "parking_availability": "1500",
            "map_url": "https://www.google.co.in/maps/place/Mahodadhi+Market+Complex/@19.8020324,85.8231102,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c53d069e5d5b:0x94e4f45321d05369!8m2!3d19.8020324!4d85.8256851!16s%2Fg%2F11js3bqfgy?entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D",
            "parking_photo": require('../../assets/offlineData/parking/MahodadhiMarketComplexParking.jpeg'),
            "area_type": "[\"cover\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "ମାଛ ମାର୍କେଟ, ଭାନୁମତୀ ରୋଡ଼,",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ଦୋଳମଣ୍ଡପ ସାହି",
            "district": "ପୁରୀ",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-23T08:54:43.000000Z",
            "updated_at": "2025-06-03T07:50:05.000000Z"
        },
        {
            "id": 150,
            "temple_id": "TEMPLE25402",
            "language": "Odia",
            "vehicle_type": "[\"two wheeler\", \"four wheeler\"]",
            "pass_type": null,
            "parking_name": "ବ୍ଲୂ ଫ୍ଲାଗ ବିଚ୍",
            "parking_availability": null,
            "map_url": "https://maps.app.goo.gl/cuRyfbEQ3WiYH5DG7",
            "parking_photo": require('../../assets/offlineData/parkingmap/Buleflagbeach.jpeg'),
            "area_type": null,
            "parking_management": null,
            "landmark": "ସୁବାସ ବୋଷ ଛକ",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ଚକ୍ରତୀର୍ଥ ରୋଡ଼",
            "district": "ପୁରୀ",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-06-21T04:43:52.000000Z",
            "updated_at": "2025-06-21T21:20:38.000000Z"
        },
        {
            "id": 19,
            "temple_id": "TEMPLE25402",
            "language": "Odia",
            "vehicle_type": "[\"four wheeler\",\"three wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
            "parking_name": "ଯାତ୍ରିକା ପାର୍କିଂ",
            "parking_availability": "୧୦୦୦",
            "map_url": "https://maps.app.goo.gl/A1EHW2AY3qss5ugt8",
            "parking_photo": require('../../assets/offlineData/parking/JatricaParking.jpeg'),
            "area_type": "[\"open\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "ବତୀ ଖୁଣ୍ଟ ପାଖରେ,",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ନୂଆ ମେରାଇନ ଡ୍ରାଇଭ ରୋଡ଼",
            "district": "ପୁରୀ",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-27T11:12:08.000000Z",
            "updated_at": "2025-06-03T07:49:56.000000Z"
        },
        // {
        //     "id": 13,
        //     "temple_id": "TEMPLE25402",
        //     "language": "odia",
        //     "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"three wheeler\",\"heavy vehicle\",\"electric vehicle\"]",
        //     "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
        //     "parking_name": "ସମଙ୍ଗ ପାର୍କିଂ",
        //     "parking_availability": "1000",
        //     "map_url": "https://maps.app.goo.gl/KzTdE2zn82A1NJ246",
        //     "parking_photo": require('../../assets/offlineData/parking/SamangParking.jpeg'),
        //     "area_type": "[\"open\"]",
        //     "parking_management": "[\"manual\"]",
        //     "landmark": "ୱାଟକୋ ପାଖରେ,",
        //     "pincode": "୭୫୨୦୦୨",
        //     "city_village": "କନ୍ଥାପୁର ରୋଡ଼",
        //     "district": "ପୁରୀ",
        //     "state": "Odisha",
        //     "country": "India",
        //     "status": "active",
        //     "created_at": "2025-04-27T09:06:50.000000Z",
        //     "updated_at": "2025-06-03T07:49:10.000000Z"
        // },
        // {
        //     "id": 14,
        //     "temple_id": "TEMPLE25402",
        //     "language": "odia",
        //     "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"three wheeler\",\"heavy vehicle\",\"electric vehicle\"]",
        //     "pass_type": "[\"normal\"]",
        //     "parking_name": "ଫ୍ଲୋରିଶ  ଇଣ୍ଡିଆ ପାର୍କିଂ",
        //     "parking_availability": "୫୦୦",
        //     "map_url": "https://maps.app.goo.gl/6SwaqFTCSkfH3Z976",
        //     "parking_photo": require('../../assets/offlineData/parking/FlourishindiaParking.jpeg'),
        //     "area_type": "[\"open\"]",
        //     "parking_management": "[\"manual\"]",
        //     "landmark": "ନବକଳେବର ରୋଡ଼,",
        //     "pincode": "୭୫୨୦୦୧",
        //     "city_village": null,
        //     "district": "ପୁରୀ",
        //     "state": "Odisha",
        //     "country": "India",
        //     "status": "active",
        //     "created_at": "2025-04-27T10:50:40.000000Z",
        //     "updated_at": "2025-06-03T07:49:17.000000Z"
        // },
        // {
        //     "id": 16,
        //     "temple_id": "TEMPLE25402",
        //     "language": "Odia",
        //     "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"three wheeler\",\"heavy vehicle\"]",
        //     "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
        //     "parking_name": "ଲୋକନାଥ ମନ୍ଦିର ପାର୍କିଂ",
        //     "parking_availability": "୧୦୦୦",
        //     "map_url": "https://maps.app.goo.gl/ARZfmaMhsagqY23P6",
        //     "parking_photo": require('../../assets/offlineData/parking/LoknathTempleParking.jpeg'),
        //     "area_type": "[\"open\"]",
        //     "parking_management": "[\"manual\"]",
        //     "landmark": "ଲୋକନାଥ ମନ୍ଦିର ପାଖରେ,",
        //     "pincode": "୭୫୨୦୦୧",
        //     "city_village": "ଲୋକନାଥ ମନ୍ଦିର ରୋଡ଼",
        //     "district": "ପୁରୀ",
        //     "state": "Odisha",
        //     "country": "India",
        //     "status": "active",
        //     "created_at": "2025-04-27T11:00:02.000000Z",
        //     "updated_at": "2025-06-03T07:52:32.000000Z"
        // },
    ];

    const english_data = [
        {
            "id": 1,
            "temple_id": "TEMPLE25402",
            "language": "English",
            "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"three wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
            "parking_name": "JBPC Multi Level Parking",
            "parking_availability": "2500",
            "map_url": "https://maps.app.goo.gl/jvrpx6cg9stQdYAu5",
            "parking_photo": require('../../assets/offlineData/parking/JBPCMultiLevelParking.jpeg'),
            "area_type": "[\"cover\"]",
            "parking_management": "[\"automated\",\"manual\"]",
            "landmark": "Narendra kona, near chandan chakada,",
            "pincode": "752001",
            "city_village": null,
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-01T04:39:23.000000Z",
            "updated_at": "2025-06-03T07:47:38.000000Z"
        },
        {
            "id": 6,
            "temple_id": "TEMPLE25402",
            "language": "English",
            "vehicle_type": "[\"four wheeler\",\"three wheeler\",\"heavy vehicle\",\"electric vehicle\"]",
            "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
            "parking_name": "Jagannath ballav Parking",
            "parking_availability": "5000",
            "map_url": "https://www.google.co.in/maps/place/Jagannath+ballav+parking/@19.8121611,85.8236903,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNRXTze-8eQw_9qQ3fyxg8SqBCs0VsYODWEV_0e!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipNRXTze-8eQw_9qQ3fyxg8SqBCs0VsYODWEV_0e%3Dw203-h114-k-no!7i4624!8i2608!4m11!1m2!2m1!1sshree+jagannath+praking+grand+road!3m7!1s0x3a19c786875c2975:0x65ee6acce6d3c05f!8m2!3d19.8121611!4d85.8236903!10e5!15sCiJzaHJlZSBqYWdhbm5hdGggcGFya2luZyBncmFudCByb2FkWiQiInNocmVlIGphZ2FubmF0aCBwYXJraW5nIGdyYW50IHJvYWSSAQtwYXJraW5nX2xvdJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOMmFsbHBUbE5uRUFF4AEA-gEECAAQQw!16s%2Fg%2F11sq14z8cc?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
            "parking_photo": require('../../assets/offlineData/parking/Jagannathballavparking.jpeg'),
            "area_type": "[\"cover\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "Jagannath Ballav Rd,",
            "pincode": "752001",
            "city_village": "",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-18T00:25:19.000000Z",
            "updated_at": "2025-06-03T09:39:00.000000Z"
        },
        {
            "id": 9,
            "temple_id": "TEMPLE25402",
            "language": "english",
            "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"three wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"normal\"]",
            "parking_name": "Puri Municipality Market Parking",
            "parking_availability": "2000",
            "map_url": "https://www.google.co.in/maps/place/PURI+MUNICIPALITY+MARKET+BUILDING/@19.8107189,85.8277736,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDpnvH44AE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAB5caB-8GWo2ZFxbGUZc6P1R5wOOI4knixUSHj2SUA9lTiQW2Km9W5u2uup9Q7XpRWWAG56K-QXS-FdpRIrXk11KqyuDtbEMYcwY-0h6LVIdGX-PjnhQ4v-ty9jo-thsX2cBt7yFtC9V_A%3Dw229-h100-k-no!7i3231!8i1406!4m11!1m2!2m1!1smunicipality+market+complex!3m7!1s0x3a19c732b95dd61b:0x4ec503f1c97d78a7!8m2!3d19.8107189!4d85.8277736!10e5!15sChttdW5pY2lwYWxpdHkgbWFya2V0IGNvbXBsZXhaHSIbbXVuaWNpcGFsaXR5IG1hcmtldCBjb21wbGV4kgELc3VwZXJtYXJrZXSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTTVhbVpNZGxsUkVBRaoBRBABMh8QASIbhTx8bGjNCOpzYli3XyKkstJefVKLbQkenQZdMh8QAiIbbXVuaWNpcGFsaXR5IG1hcmtldCBjb21wbGV44AEA-gEFCK4BEEM!16s%2Fg%2F11tgf2gm_t?entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D",
            "parking_photo": require('../../assets/offlineData/parking/PuriMunicipalityMarketParking.jpeg'),
            "area_type": "[\"open\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "Grand Rd,",
            "pincode": "752001",
            "city_village": "Balagandi",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-23T08:22:35.000000Z",
            "updated_at": "2025-06-03T07:48:36.000000Z"
        },
        {
            "id": 11,
            "temple_id": "TEMPLE25402",
            "language": "english",
            "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"normal\"]",
            "parking_name": "Mahodadhi Market Complex Parking",
            "parking_availability": "1500",
            "map_url": "https://www.google.co.in/maps/place/Mahodadhi+Market+Complex/@19.8020324,85.8231102,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c53d069e5d5b:0x94e4f45321d05369!8m2!3d19.8020324!4d85.8256851!16s%2Fg%2F11js3bqfgy?entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D",
            "parking_photo": require('../../assets/offlineData/parking/MahodadhiMarketComplexParking.jpeg'),
            "area_type": "[\"cover\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "Fish Market, Bhanumati Rd,",
            "pincode": "752001",
            "city_village": "Dolamandap Sahi",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-23T08:54:43.000000Z",
            "updated_at": "2025-06-03T07:48:50.000000Z"
        },
        {
            "id": 123,
            "temple_id": "TEMPLE25402",
            "language": "English",
            "vehicle_type": "[\"two wheeler\", \"four wheeler\"]",
            "pass_type": null,
            "parking_name": "Blue flag beach Parking",
            "parking_availability": null,
            "map_url": "https://maps.app.goo.gl/JRJsgtHoURveo2Cq9",
            "parking_photo": require('../../assets/offlineData/parkingmap/Buleflagbeach.jpeg'),
            "area_type": null,
            "parking_management": null,
            "landmark": "Subas Bose Chhaka",
            "pincode": "752001",
            "city_village": "Chakratirtha Road",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-06-21T04:34:10.000000Z",
            "updated_at": "2025-06-21T21:20:38.000000Z"
        },
        {
            "id": 8,
            "temple_id": "TEMPLE25402",
            "language": "English",
            "vehicle_type": "[\"four wheeler\",\"three wheeler\",\"heavy vehicle\",\"electric vehicle\"]",
            "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
            "parking_name": "Purushottam Multi Level parking",
            "parking_availability": "2000",
            "map_url": "https://www.google.co.in/maps/place/Purushottam+car+parking+,Puri/@19.8153491,85.8311238,17z/data=!4m10!1m2!2m1!1sSRI+PURUSOTTAM+prking!3m6!1s0x3a19c70045d2c8a7:0xe14b4b8fe5be55c!8m2!3d19.8151696!4d85.8309232!15sChZTUkkgUFVSVVNPVFRBTSBwYXJraW5nWhgiFnNyaSBwdXJ1c290dGFtIHBhcmtpbmeSARRwdWJsaWNfcGFya2luZ19zcGFjZZoBJENoZERTVWhOTUc5blMwVkpRMEZuVFVSSk0yRlhWM1JSUlJBQuABAPoBBAgAEDo!16s%2Fg%2F11vrfn_ngn?entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D",
            "parking_photo": require('../../assets/offlineData/parking/PurushottamMultiLevel.jpeg'),
            "area_type": "[\"cover\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "Balagandi,",
            "pincode": "752001",
            "city_village": null,
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-23T08:06:11.000000Z",
            "updated_at": "2025-06-03T07:54:28.000000Z"
        },
        {
            "id": 10,
            "temple_id": "TEMPLE25402",
            "language": "english",
            "vehicle_type": "[\"four wheeler\",\"electric vehicle\"]",
            "pass_type": "[\"normal\"]",
            "parking_name": "Jatrica  Parking",
            "parking_availability": "1000",
            "map_url": "https://www.google.co.in/maps/place/Puri+Municipalities+4+wheeler+Parking/@19.7903241,85.8086628,17z/data=!4m15!1m8!3m7!1s0x3a19c5003f7dfd2d:0x336b88998d9e0023!2sPuri+Municipalities+4+wheeler+Parking!8m2!3d19.790343!4d85.808706!10e5!16s%2Fg%2F11w8l2ckg5!3m5!1s0x3a19c5003f7dfd2d:0x336b88998d9e0023!8m2!3d19.790343!4d85.808706!16s%2Fg%2F11w8l2ckg5?entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D",
            "parking_photo": require('../../assets/offlineData/parking/JatricaParking.jpeg'),
            "area_type": "[\"open\"]",
            "parking_management": "[\"manual\"]",
            "landmark": "New Marine Drive Rd,",
            "pincode": "752001",
            "city_village": null,
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-23T08:46:18.000000Z",
            "updated_at": "2025-06-03T07:48:43.000000Z"
        },
        // {
        //     "id": 3,
        //     "temple_id": "TEMPLE25402",
        //     "language": "English",
        //     "vehicle_type": "[\"four wheeler\",\"three wheeler\",\"heavy vehicle\"]",
        //     "pass_type": "[\"normal\"]",
        //     "parking_name": "Samang Parking",
        //     "parking_availability": "1000",
        //     "map_url": "https://www.google.co.in/maps/place/Samanga+Parking/@19.8238575,85.8083614,17z/data=!4m6!3m5!1s0x3a19c7006686ac75:0xb245952e4d5d5d26!8m2!3d19.8238575!4d85.8083614!16s%2Fg%2F11vk8pp02p?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
        //     "parking_photo": require('../../assets/offlineData/parking/SamangParking.jpeg'),
        //     "area_type": "[\"cover\",\"open\"]",
        //     "parking_management": "[\"manual\"]",
        //     "landmark": "Kanthapur Rd, Near by Watco,",
        //     "pincode": "752002",
        //     "city_village": null,
        //     "district": "Puri",
        //     "state": "Odisha",
        //     "country": "India",
        //     "status": "active",
        //     "created_at": "2025-04-18T00:04:49.000000Z",
        //     "updated_at": "2025-06-03T07:47:32.000000Z"
        // },
        // {
        //     "id": 5,
        //     "temple_id": "TEMPLE25402",
        //     "language": "English",
        //     "vehicle_type": "[\"four wheeler\",\"three wheeler\",\"heavy vehicle\",\"electric vehicle\"]",
        //     "pass_type": "[\"normal\"]",
        //     "parking_name": "Flourish India Parking",
        //     "parking_availability": "500",
        //     "map_url": "https://www.google.co.in/maps/place/Flourish+India+Parking+Puri/@19.8112269,85.8031312,17z/data=!4m6!3m5!1s0x3a19c71dfb85c3e1:0x3eee4d9ffaed5693!8m2!3d19.8112269!4d85.8031312!16s%2Fg%2F11s428tf8s?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
        //     "parking_photo": require('../../assets/offlineData/parking/FlourishindiaParking.jpeg'),
        //     "area_type": "[\"open\"]",
        //     "parking_management": "[\"manual\"]",
        //     "landmark": "Nabakalebara Rd,",
        //     "pincode": "752001",
        //     "city_village": null,
        //     "district": "Puri",
        //     "state": "Odisha",
        //     "country": "India",
        //     "status": "active",
        //     "created_at": "2025-04-18T00:20:56.000000Z",
        //     "updated_at": "2025-06-03T07:50:18.000000Z"
        // },
        // {
        //     "id": 7,
        //     "temple_id": "TEMPLE25402",
        //     "language": "English",
        //     "vehicle_type": "[\"two wheeler\",\"four wheeler\",\"three wheeler\",\"electric vehicle\"]",
        //     "pass_type": "[\"vip\",\"vvip\",\"normal\",\"sebayat\"]",
        //     "parking_name": "Loknath Temple Parking",
        //     "parking_availability": "1000",
        //     "map_url": "https://www.google.co.in/maps/place/Temple+Parking,+Loknath+temple,+Puri/@19.803374,85.8034142,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPTltXIlsxmeCqiozENWddacFjBSivLtswCX-w6!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipPTltXIlsxmeCqiozENWddacFjBSivLtswCX-w6%3Dw152-h86-k-no!7i1920!8i1080!4m7!3m6!1s0x3a19c5e9a81bf7a7:0xb6886635d1e05d1!8m2!3d19.8035345!4d85.8033058!10e5!16s%2Fg%2F11s38gqhqq?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
        //     "parking_photo": require('../../assets/offlineData/parking/LoknathTempleParking.jpeg'),
        //     "area_type": "[\"open\"]",
        //     "parking_management": "[\"manual\"]",
        //     "landmark": " Loknath Temple Rd,",
        //     "pincode": "752001",
        //     "city_village": "Jibaramjee Palli",
        //     "district": "puri",
        //     "state": "Odisha",
        //     "country": "India",
        //     "status": "active",
        //     "created_at": "2025-04-18T00:29:12.000000Z",
        //     "updated_at": "2025-06-03T07:51:45.000000Z"
        // }
    ];

    // const odia_data = [
    //     {
    //         "id": 132,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ କମପ୍ଲେକ୍ସ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/iHH7xAUyvGN1Yqwu8",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Jbpc.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ମାର୍କେଟ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ନରେନ୍ଦ୍ର କୋଣ",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 133,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଲୋକନାଥ ମନ୍ଦିର ପାର୍କିଂ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/ZmpKrA3ctGitonPg7",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Lokanathtempleparking.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଲୋକନାଥ ମନ୍ଦିର",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ଲୋକନାଥ ମନ୍ଦିର ରୋଡ଼",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 134,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଗଦାଧର ଉଚ୍ଚ ବିଦ୍ୟାଳୟ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/vcXQDczLgKXawFKn9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Gadadharhighschool.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ବୃଷଭ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ୱାର୍ଡ ନମ୍ବର-୫",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 135,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଆଇ.ଟି.ଆଇ ପାର୍କିଂ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/EY6LwB6Q2yyHDVKT7",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/ITIparking.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ତାଳବଣିଆ / ହେଲିପ୍ୟାଡ଼ ଛକ",
    //         "pincode": "୭୫୨୦୦୨",
    //         "city_village": "ରତନ ରୋଡ଼, ଶ୍ରୀ ବିହାର , ପେଣ୍ଠକଟା",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 136,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ତାଳବଣିଆ ହେଲିପ୍ୟାଡ଼ ପାର୍କିଂ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/5ApAm12DhAwhhiVK9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/helipadParking.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ତାଳବଣିଆ / ହେଲିପ୍ୟାଡ଼ ଛକ",
    //         "pincode": "୭୫୨୦୦୨",
    //         "city_village": "ବଡ଼ ଶିରେଇ",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 137,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଇନଡୋର୍ ଷ୍ଟାଡିୟମ ପାର୍କିଂ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/jVN46vqbxzHxhpi56",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Indoorstadium.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ତାଳବଣିଆ / ହେଲିପ୍ୟାଡ଼ ଛକ",
    //         "pincode": "୭୫୨୦୦୨",
    //         "city_village": "ପେଣ୍ଠକଟା",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 138,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ହର୍ଟିକଲଚର ପଡ଼ିଆ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/x6Xx6sDHZkUZAsMZA",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Horticulturefield.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଗ୍ରୀଡ ଷ୍ଟେସନ୍",
    //         "pincode": "୭୫୨୦୦୩",
    //         "city_village": "ପୁରୁଷୋତ୍ତମ ନଗର",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 131,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"heavy vehicle\", \"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଫ୍ଲୋରିଶ ଇଣ୍ଡିଆ ପଡ଼ିଆ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/cWAmyp6UfzmWBSaN9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Flourishindia.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ମଙ୍ଗଳା ଘାଟ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ନବକଳେବର ରୋଡ଼",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 139,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ତାଳବଣିଆ ମାଛ ମାର୍କେଟ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/bHKrgY8E3ZHTBj51A",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Talabinafishmarket.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଗ୍ରୀଡ ଷ୍ଟେସନ୍",
    //         "pincode": "୭୫୨୦୦୩",
    //         "city_village": "ପୁରୁଷୋତ୍ତମ ନଗର",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 140,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଯାତ୍ରିକା",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/Xs1b6rEaaa5PTRBu7",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Yatriak.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଲାଇଟ ହାଉସ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ନିଉ ମେରାଇନ୍ ଡ୍ରାଇଭ ରୋଡ଼",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 141,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ନାଲି ପଡ଼ିଆ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/rQJipmioqng3qtZLA",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Nalifield.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଲାଇଟ ହାଉସ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ଲାଇଟ ହାଉସ ଲେନ",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:42:02.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 142,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଷ୍ଟରଲିଂ ରିସର୍ଟ ଛକ ରୋଡ଼ ସାଇଡ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/gEt1EuUB2F8AhNgb6",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/SterlingresortchhakaRoadSide.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଷ୍ଟରଲିଂ ରିସର୍ଟ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ସିପସରୁବାଲି",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 143,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଷ୍ଟରଲିଂ ରିସର୍ଟ ଛକ ରୋଡ଼ ତଳ ପଟ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/VAJ8YuHWWzQBhitS9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Sterlingresortchhakabelowroad.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଷ୍ଟରଲିଂ ରିସର୍ଟ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ସିପସରୁବାଲି",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 144,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଷ୍ଟରଲିଂ ରିସର୍ଟ ଛକ ଡାହାଣ ପଟ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/UgF5e3Ki82FWucvh7",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/SterlingResortchhakarightside.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଷ୍ଟରଲିଂ ରିସର୍ଟ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ସିପସରୁବାଲି",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 145,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଓଡ଼ିଶା ବିଧାନ ସଭା ଅତିଥି ଭବନ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/7RcsvNYNsHsd1tDX9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Olaguesthouse.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ପେଣ୍ଠକଟା ଛକ",
    //         "pincode": "୭୫୨୦୦୩",
    //         "city_village": "ଶିଖା ରୋଡ଼, ପେଣ୍ଠକଟା",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 146,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ସୁରଜ ମଲ୍ଲ ସାହା କଲେଜ ପଡ଼ିଆ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/bjbxSsiUkz6J5Z5s5",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/SurajMallaSahaCollegeGround.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ମଙ୍ଗଳା ଘାଟ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ନବକଳେବର ରୋଡ଼, ସିପସରୁବାଲି",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 147,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ପୁରୁଣା ଜେ.ବି.ପି.ସି",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/fJFRjyCZAq74R7Ma6",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Jbpc.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ମାର୍କେଟ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ନରେନ୍ଦ୍ର କୋଣ",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 148,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ମାଟିତୋଟା ଖେଳ ପଡ଼ିଆ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/BwLgeCjBWzmYnLjL7",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/MatitotaPlayground.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ମଙ୍ଗଳା ଘାଟ  ଛକ",
    //         "pincode": "୭୫୨୦୦୨",
    //         "city_village": "ମାଟିତୋଟା ରୋଡ଼",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 149,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ମାଟିତୋଟା ହେଲିପ୍ୟାଡ଼ ପାର୍କିଂ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/5iomuAmQq56yEzqA8",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Matitotahelipadground.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଶ୍ରୀ ସେତୁ",
    //         "pincode": "୭୫୨୦୦୨",
    //         "city_village": "ମାଟିତୋଟା ରୋଡ଼",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 150,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ବ୍ଲୂ ଫ୍ଲାଗ ବିଚ୍",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/cuRyfbEQ3WiYH5DG7",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Buleflagbeach.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ସୁବାସ ବୋଷ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ଚକ୍ରତୀର୍ଥ ରୋଡ଼",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 151,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ନୀଳାଚଳ ଅଶୋକ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/BH1EbNYW2zKWWhtp6",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Nilachalashok.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ସୁବାସ ବୋଷ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ଚକ୍ରତୀର୍ଥ ରୋଡ଼",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 152,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\", \"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଜେଲ ରୋଡ଼ ପାର୍କିଂ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/tnJrMiDD9b5mJYxy7",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Jailroadparking.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ହସ୍ପିଟାଲ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "କୁମ୍ଭାରପଡା",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 153,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"four wheeler\", \"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ଦିଗବାରେଣୀ ପାର୍କିଂ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/RbzJtnj92CZ7dd3V9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Digabareniparking.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ଦିଗବାରେଣୀ ଛକ",
    //         "pincode": "୭୫୨୦୦୧",
    //         "city_village": "ଚକ୍ରତୀର୍ଥ ରୋଡ଼",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 154,
    //         "temple_id": "TEMPLE25402",
    //         "language": "Odia",
    //         "vehicle_type": "[\"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "ହଲିଡେ ରିସର୍ଟ ପାଖ",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/AxiAU94674Sinh32A",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Holidayresortside.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "ବି ନ ଆର ଛକ",
    //         "pincode": "୭୫୨୦୦୨",
    //         "city_village": "ଚକ୍ରତୀର୍ଥ ରୋଡ଼, ବଡ଼ ଶିରେଇ",
    //         "district": "ପୁରୀ",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:43:52.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     }
    // ];

    // const english_data = [
    //     {
    //         "id": 105,
    //         "temple_id": "TEMPLE25402",
    //         "language": "English",
    //         "vehicle_type": "['four wheeler']",
    //         "pass_type": null,
    //         "parking_name": "JBPC Parking",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/aTkzVwHpyP2Sa7NY6",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Jbpc.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "Market Chhaka",
    //         "pincode": "752001",
    //         "city_village": "Narendrakona",
    //         "district": "Puri",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:31:58.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 125,
    //         "temple_id": "TEMPLE25402",
    //         "language": "English",
    //         "vehicle_type": "[\"four wheeler\", \"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "Purushottam Parking",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/ryAdpfVb48jjkSQ27",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Jailroadparking.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "Hospital Chhaka",
    //         "pincode": "752001",
    //         "city_village": "Kumbharpada",
    //         "district": "Puri",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:34:10.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 106,
    //         "temple_id": "TEMPLE25402",
    //         "language": "English",
    //         "vehicle_type": "['four wheeler']",
    //         "pass_type": null,
    //         "parking_name": "Lokanath Temple Parking",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/ZmpKrA3ctGitonPg7",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Lokanathtempleparking.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "Lokanath Temple",
    //         "pincode": "752001",
    //         "city_village": "Loknath Temple Rd",
    //         "district": "Puri",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:31:58.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     // {
    //     //     "id": 107,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "['four wheeler']",
    //     //     "pass_type": null,
    //     //     "parking_name": "Gadadhar High School Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/vcXQDczLgKXawFKn9",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Gadadharhighschool.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Brushav Chhaka",
    //     //     "pincode": "752001",
    //     //     "city_village": "Ward No-5",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:31:58.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 108,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "['four wheeler']",
    //     //     "pass_type": null,
    //     //     "parking_name": "ITI Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/EY6LwB6Q2yyHDVKT7",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/ITIparking.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Talabania/ Helipad Chhaka",
    //     //     "pincode": "752002",
    //     //     "city_village": "Ratan Rd, Shree Vihar, Penthakata",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:31:58.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 104,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "['heavy vehicle', 'four wheeler']",
    //     //     "pass_type": null,
    //     //     "parking_name": "Flourish India",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/4JTt2gp3dbpmdHKL8",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Flourishindia.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Mangalaghat",
    //     //     "pincode": "752001",
    //     //     "city_village": "Nabakalebar Road",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:31:58.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 109,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "['four wheeler']",
    //     //     "pass_type": null,
    //     //     "parking_name": "Helipad Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/5ApAm12DhAwhhiVK9",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/helipadParking.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Talabania/ Helipad Chhaka",
    //     //     "pincode": "752002",
    //     //     "city_village": "Badasirei",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:31:58.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 110,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "['four wheeler']",
    //     //     "pass_type": null,
    //     //     "parking_name": "Indoor Stadium Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/jVN46vqbxzHxhpi56",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Indoorstadium.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Talabania/ Helipad Chhaka",
    //     //     "pincode": "752002",
    //     //     "city_village": "Penthakata",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:31:58.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 111,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "['four wheeler']",
    //     //     "pass_type": null,
    //     //     "parking_name": "Horticulture Field Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/x6Xx6sDHZkUZAsMZA",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Horticulturefield.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Grid Station",
    //     //     "pincode": "752003",
    //     //     "city_village": "Purussottam Nagar",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:31:58.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 112,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "['four wheeler']",
    //     //     "pass_type": null,
    //     //     "parking_name": "Talabania Fish Market Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/bHKrgY8E3ZHTBj51A",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Talabinafishmarket.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Grid Station",
    //     //     "pincode": "752003",
    //     //     "city_village": "Purussottam Nagar",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:31:58.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     {
    //         "id": 113,
    //         "temple_id": "TEMPLE25402",
    //         "language": "English",
    //         "vehicle_type": "[\"four wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "Jatrika Parking",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/bCdqovdRzgz74ggF9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Yatriak.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "Light House",
    //         "pincode": "752001",
    //         "city_village": "New Marine Drive Road",
    //         "district": "Puri",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:34:10.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     // {
    //     //     "id": 114,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"four wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Nali Field Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/8M4M4wVtyds7hwt97",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Nalifield.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Light House",
    //     //     "pincode": "752001",
    //     //     "city_village": "Lighthouse Lane",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 115,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"four wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Sterling Resort Chhaka Road side Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/gEt1EuUB2F8AhNgb6",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/SterlingresortchhakaRoadSide.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Sterling Chhaka",
    //     //     "pincode": "752001",
    //     //     "city_village": "Sipasurubili",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 116,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"four wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Sterling Resort Chhaka Below Road Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/VAJ8YuHWWzQBhitS9",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Sterlingresortchhakabelowroad.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Sterling Chhaka",
    //     //     "pincode": "752001",
    //     //     "city_village": "Sipasurubili",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 117,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"four wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Sterling Resort Chhaka Right side Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/UgF5e3Ki82FWucvh7",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/SterlingResortchhakarightside.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Sterling Chhaka",
    //     //     "pincode": "752001",
    //     //     "city_village": "Sipasurubili",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 118,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"four wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Odisha Legislative Assembly Guest House Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/7RcsvNYNsHsd1tDX9",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Olaguesthouse.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Penthakata Chhaka",
    //     //     "pincode": "752003",
    //     //     "city_village": "Shikha Rd, Penthakata",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 119,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"four wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Suraj Malla Saha College Ground Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/bjbxSsiUkz6J5Z5s5",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/SurajMallaSahaCollegeGround.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Mangalaghat",
    //     //     "pincode": "752001",
    //     //     "city_village": "Nabakalebar Road, Sipasurubili",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 120,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"two wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Old JBPC Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/fJFRjyCZAq74R7Ma6",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Jbpc.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Market Chhaka",
    //     //     "pincode": "752001",
    //     //     "city_village": "Narendrakona",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 121,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"two wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Matitota Play Ground Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/BwLgeCjBWzmYnLjL7",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/MatitotaPlayground.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Mangalaghat chhaka",
    //     //     "pincode": "752002",
    //     //     "city_village": "Matitota Road",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     // {
    //     //     "id": 122,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"two wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Matitota Helipad Ground Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/5iomuAmQq56yEzqA8",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Matitotahelipadground.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Srisetu",
    //     //     "pincode": "752002",
    //     //     "city_village": "Matitota Road",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     {
    //         "id": 123,
    //         "temple_id": "TEMPLE25402",
    //         "language": "English",
    //         "vehicle_type": "[\"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "Blue flag beach Parking",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/JRJsgtHoURveo2Cq9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Buleflagbeach.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "Subas Bose Chhaka",
    //         "pincode": "752001",
    //         "city_village": "Chakratirtha Road",
    //         "district": "Puri",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:34:10.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     // {
    //     //     "id": 124,
    //     //     "temple_id": "TEMPLE25402",
    //     //     "language": "English",
    //     //     "vehicle_type": "[\"two wheeler\"]",
    //     //     "pass_type": null,
    //     //     "parking_name": "Nilachal Ashok Parking",
    //     //     "parking_availability": null,
    //     //     "map_url": "https://maps.app.goo.gl/BH1EbNYW2zKWWhtp6",
    //     //     "parking_photo": require('../../assets/offlineData/parkingmap/Nilachalashok.jpeg'),
    //     //     "area_type": null,
    //     //     "parking_management": null,
    //     //     "landmark": "Subas Bose Chhaka",
    //     //     "pincode": "752001",
    //     //     "city_village": "Chakratirtha Road",
    //     //     "district": "Puri",
    //     //     "state": "Odisha",
    //     //     "country": "India",
    //     //     "status": "active",
    //     //     "created_at": "2025-06-21T04:34:10.000000Z",
    //     //     "updated_at": "2025-06-21T21:20:38.000000Z"
    //     // },
    //     {
    //         "id": 126,
    //         "temple_id": "TEMPLE25402",
    //         "language": "English",
    //         "vehicle_type": "[\"four wheeler\", \"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "Digabareni Parking",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/RbzJtnj92CZ7dd3V9",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Digabareniparking.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "Digabareni Chhaka",
    //         "pincode": "752001",
    //         "city_village": "Chakratirtha Road",
    //         "district": "Puri",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:34:10.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     },
    //     {
    //         "id": 127,
    //         "temple_id": "TEMPLE25402",
    //         "language": "English",
    //         "vehicle_type": "[\"two wheeler\"]",
    //         "pass_type": null,
    //         "parking_name": "Holiday Resort side Parking",
    //         "parking_availability": null,
    //         "map_url": "https://maps.app.goo.gl/AxiAU94674Sinh32A",
    //         "parking_photo": require('../../assets/offlineData/parkingmap/Holidayresortside.jpeg'),
    //         "area_type": null,
    //         "parking_management": null,
    //         "landmark": "BNR Chhaka",
    //         "pincode": "752002",
    //         "city_village": "Chakra Tirtha Rd, Badasirei",
    //         "district": "Puri",
    //         "state": "Odisha",
    //         "country": "India",
    //         "status": "active",
    //         "created_at": "2025-06-21T04:34:10.000000Z",
    //         "updated_at": "2025-06-21T21:20:38.000000Z"
    //     }
    // ];

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [allParking, setAllParking] = useState([]);
    const [selectedTab, setSelectedTab] = useState('FourWheelers');

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getAllParking(value);
                if (value === 'Odia') {
                    setAllParking(odia_data);
                } else if (value === 'English') {
                    setAllParking(english_data);
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
            // getAllParking(selectedLanguage);
            loadLanguage();
        }, 2000);
    }, []);

    const filteredParkingList = selectedTab === 'TwoWheelers'
        ? allParking.filter(item => item.vehicle_type?.toLowerCase().includes('two wheeler'))
        : allParking.filter(item => item.vehicle_type?.toLowerCase().includes('four wheeler'));

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

    const getAllParking = async (language) => {
        try {
            setSpinner(true);
            const response = await fetch(`${base_url}api/get-parking/${language}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                setSpinner(false);
                // const filteredData = responseData.data.filter(item => item.language === selectedLanguage);
                setAllParking(responseData.data);
                // console.log("Parking Data:", filteredData);
            }
        } catch (error) {
            console.log('Error fetching parking data:', error);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            // getAllParking(selectedLanguage);
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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ପାର୍କିଂ' : 'Parking'}</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଯାନବାହାନ ପାର୍କିଂ ସ୍ଥଳ' : 'Vehicle Parking'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଆପଣ ଆପଣଙ୍କର ଦୁଇ ଏବଂ ଚାରି ଚକିଆ ଯାନ ନିମ୍ନଲିଖିତ ପାର୍କିଂ ସ୍ଥାନଗୁଡ଼ିକରେ ପାର୍କ କରିପାରିବେ।' : 'You Can Park Your Two & Four Wheelers At The Following Parking Places.'}</Text>
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Online →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 30 }}>
                            <Image source={require('../../assets/image/parking765.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, margin: 15, padding: 5 }}>
                    <LinearGradient
                        colors={selectedTab === 'FourWheelers' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            backgroundColor: selectedTab === 'FourWheelers' ? '#4B0082' : 'transparent',
                            borderRadius: 10,
                            paddingVertical: 8,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => setSelectedTab('FourWheelers')}>
                            <Text style={{ color: selectedTab === 'FourWheelers' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                                {selectedLanguage === 'Odia' ? 'ଚାରି ଚକିଆ' : 'Four Wheelers'}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={selectedTab === 'TwoWheelers' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            backgroundColor: selectedTab === 'TwoWheelers' ? '#4B0082' : 'transparent',
                            borderRadius: 10,
                            paddingVertical: 8,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => setSelectedTab('TwoWheelers')}>
                            <Text style={{ color: selectedTab === 'TwoWheelers' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                                {selectedLanguage === 'Odia' ? 'ଦୁଇ ଚକିଆ' : 'Two Wheelers'}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                {spinner ? (
                    <View style={{ flex: 1, alignSelf: 'center', top: '40%' }}>
                        <Text style={{ color: '#341551', fontSize: 17 }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredParkingList}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.map_url)}
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
                                    {item.parking_photo ?
                                        // <Image source={{ uri: item.parking_photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        <Image source={item.parking_photo} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        :
                                        <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                    }
                                </View>

                                <View style={{ width: '55%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                                        {item.parking_name}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            {item.landmark} {item.district}
                                        </Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            24/7
                                        </Text>
                                    </View> */}

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <FontAwesome5 name="parking" size={13} color={'#28a745'} />
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                marginLeft: 4,
                                                fontFamily: 'FiraSans-Regular',
                                                color: '#28a745',
                                            }}
                                        >
                                            {item.parking_availability} Spots Available
                                        </Text>
                                    </View> */}
                                    {/* <TouchableOpacity style={{ marginTop: 5, borderRadius: 5, alignSelf: 'flex-start' }}>
                                        <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-SemiBold' }}>Book Now →</Text>
                                    </TouchableOpacity> */}
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
        overflow: 'hidden',
    }
});