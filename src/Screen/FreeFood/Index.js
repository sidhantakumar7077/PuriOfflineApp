import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import moment from 'moment';

const Index = () => {

  const english_data = [
    {
      "id": "002",
      "organisationname": "Reliance",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "Bahuda"
    },
    {
      "id": "006",
      "organisationname": " Vedant ",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "Bahuda"
    },
    {
      "id": "014",
      "organisationname": "Reliance Foundation",
      "location": "Bholanath School",
      "map": "https://maps.app.goo.gl/N7CzsLApDDeQFp1P8",
      "date": "Bahuda"
    },
    {
      "id": "017",
      "organisationname": "Jindal",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/U6ErBJgsV6jxasj76",
      "date": "Bahuda"
    },
    {
      "id": "020",
      "organisationname": "Reliance Foundation",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/94QctXZTGZgNgnKn9",
      "date": "Bahuda"
    },
    {
      "id": "024",
      "organisationname": "Vedant",
      "location": "Puri Bus Stand, Near Tarini Temple",
      "map": "https://maps.app.goo.gl/eMtP7GyuuCtWZBYY8",
      "date": "Bahuda"
    },
    {
      "id": "027",
      "organisationname": "JSPL",
      "location": "Railway station",
      "map": "https://maps.app.goo.gl/8qpqYNpmNqTSuyyw8",
      "date": "Bahuda"
    },
    {
      "id": "033",
      "organisationname": "Atharnala Unayan Committee",
      "location": "Atharnala",
      "map": "https://maps.app.goo.gl/dMA2TM2qyythFy3PA",
      "date": "Bahuda"
    },
    {
      "id": "03",
      "organisationname": "Reliance",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "Sunabesha"
    },
    {
      "id": "015",
      "organisationname": "Reliance Foundation",
      "location": "Bholanath School",
      "map": "https://maps.app.goo.gl/N7CzsLApDDeQFp1P8",
      "date": "Sunabesha"
    },
    {
      "id": "018",
      "organisationname": "Jindal",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/U6ErBJgsV6jxasj76",
      "date": "Sunabesha"
    },
    {
      "id": "021",
      "organisationname": "Reliance Foundation",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/94QctXZTGZgNgnKn9",
      "date": "Sunabesha"
    },
    {
      "id": "028",
      "organisationname": "JSPL",
      "location": "Railway station",
      "map": "https://maps.app.goo.gl/8qpqYNpmNqTSuyyw8",
      "date": "Sunabesha"
    },
    {
      "id": "034",
      "organisationname": "Atharnala Unayan Committee",
      "location": "Atharnala",
      "map": "https://maps.app.goo.gl/dMA2TM2qyythFy3PA",
      "date": "Sunabesha"
    },



    {
      "id": "1",
      "organisationname": "A5S",
      "location": "BALAGANDI",
      "date": "Bahuda"
    },
    {
      "id": "2",
      "organisationname": "ADHIKAR FOUNDATION",
      "location": "BAGHAAKHADA MATHA, BADASANKHA",
      "date": "Ratha Yatra to Sunabesha"
    },
    {
      "id": "3",
      "organisationname": "AKASH SOCIAL CULTURAL ORGANISATION",
      "location": "NEAR LIONS GATE, BACKSIDE OF MANGU MUTH",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "4",
      "organisationname": "AKHANDA BHARAT KESHARIYA HINDU PARISADA",
      "location": "TALABANIA, PURI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "5",
      "organisationname": "AKHILA BHARATIYA VIDYAPITHA PARISHAD, PURI",
      "location": "CSU SADASHIV PARISHAR, CHANDAN HAJURI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "6",
      "organisationname": "AKHILA BISHWA GAYATRI PARIWAR",
      "location": "NABAKALEBAR ROAD, PURI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "7",
      "organisationname": "AKSHAYA PATRA FOUNDATION, MANGALAGHAT,PURI",
      "location": "AKSHAYA PATRA FOUNDATION",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "8",
      "organisationname": "ALL ODISHA 108 AMBULANCE KARMACHARI MAHASANGHA",
      "location": "NEAR MEDICAL SQUARE TO BADASANKHA PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "9",
      "organisationname": "ALOK KUMAR DASH & OTHERS",
      "location": "ANNAYA RESPORT",
      "date": "Suna Besha"
    },
    {
      "id": "10",
      "organisationname": "ANCHALIKA SANSKRUTIKA ANUSTHAN, BARANGA",
      "location": "IN FRONT OF INDIAN BANK",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "11",
      "organisationname": "ANNAPURNA CHARITABLE TRUST",
      "location": "PURI RAILWAY STATION",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "12",
      "organisationname": "ANTARJATIKA ASOBHANIYATA NIRODHA ANDOLAN",
      "location": "NRUSINGHA MANDIR, NEAR GUNDICHA TEMPLE",
      "date": "Ratha Yatra to Bahuda"
    },
    {
      "id": "13",
      "organisationname": "ANUSTHAN AMARA",
      "location": "SRI KRUSHNA CINEMA LANE",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "14",
      "organisationname": "APANANKA SEBARE, CT Road",
      "location": "BALAGANDI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "15",
      "organisationname": "ARAMBHA, BADASANKHA, PURI",
      "location": "BADASANKHA",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "16",
      "organisationname": "ARUNDHANTI JEWELLERS, PURI",
      "location": "In front of Arundhanti Jewellers",
      "date": "Bahuda & Suna Besha"
    },
    {
      "id": "17",
      "organisationname": "ARYALEX FOUNDATION FOR SOCIAL ACTIVITIES",
      "location": "NEAR TOWN THANA PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "18",
      "organisationname": "ASSOCIATION OF HELP, PURI",
      "location": "RAILWAY STATION, BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "19",
      "organisationname": "ATH ROCKS PARIBAR ODISHA",
      "location": "NEAR BHAGABANA LODGE, BADASANKHA, BADADANDA PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "20",
      "organisationname": "BADA DANDA SEBA",
      "location": "MARICHIKOTE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "21",
      "organisationname": "BALISAHI CLUB, PURI",
      "location": "Near Ram Mandir",
      "date": "Bahuda"
    },
    {
      "id": "22",
      "organisationname": "BARUNEI YOUTH CLUB, PURI",
      "location": "SRI JAGANNATHA BALLAVMATH ( RATHA YATRA, BAHUDA & SUNA BESHA) & INFRONT OF NAKACHANA &UNION BANK OF INDIA",
      "date": "Ratha Yatra & BAHUDA"
    },
    {
      "id": "23",
      "organisationname": "BHARAT BIKASH PARISHAD, PURI",
      "location": "BALAGANDI & MUNICIPALITY MARKET",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "24",
      "organisationname": "BHARAT SEVASHRAM SANGHA",
      "location": "SEABEACH &ASHRAM COMPOUND",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "25",
      "organisationname": "BHARAT VIKAS PARISHAD",
      "location": "NEAR MAUSIMA TEMPLE",
      "date": "Ratha Yatra & bahuda"
    },
    {
      "id": "26",
      "organisationname": "BHARATIYA MAJDOOR SANGHA, PURI ZILLA",
      "location": "LOKANATH GUEST HOUSE",
      "date": "Bahuda"
    },
    {
      "id": "27",
      "organisationname": "BINAPANI YUBAKA SANGHA & PATHAGARA, PURI",
      "location": "GRAND ROAD",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "28",
      "organisationname": "BIRAHAREKRUSHNAPUR HIGH SCHOOL 1999 BATHCH GROUP",
      "location": "HAREKRUSHNAPUR CHHAK",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "29",
      "organisationname": "BISWA AZADI THENGA BAHINI JAJPUR",
      "location": "BALISAHI PS, UTTARDWAR, GOUDIA MATHA",
      "date": "Ratha Yatr to Niladri Bije"
    },
    {
      "id": "30",
      "organisationname": "BISWA HINDU PARISHAD, PURBA PRANTA, ODISHA, CTC",
      "location": "GONEKA DHARMASALA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "31",
      "organisationname": "BISWA HINDU PARISHAD, PURI",
      "location": "BAGLA DHARMASALA",
      "date": "Ratha Yatra to Bahuda"
    },
    {
      "id": "32",
      "organisationname": "BISWAKALYANA ADHAYATMIKA CHETANA SANGHA, BADASANKHA, PURI",
      "location": "NARAYAN MANDAP",
      "date": "Ratha Yatra to Bahuda"
    },
    {
      "id": "33",
      "organisationname": "BISWAKARMA TAXI DRIVER SANGHA",
      "location": "In front of Bagla Dharmasala",
      "date": "Bahuda"
    },
    {
      "id": "34",
      "organisationname": "BISWAS FOUNDATION",
      "location": "JAGANNATH BALLAV",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "35",
      "organisationname": "BM FOUNDATION (A CSR UNIT OF BM ALLIANCE CONSULTANCY SERVICES PVT LTD.)",
      "location": "CENTRAL SCHOOL TALBANIA, GUNDIICHHA TEMPLE, BADA DANDA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "36",
      "organisationname": "CAPITAL ACADEMY OF NURSING",
      "location": "NAKA CHANA DWAR",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "37",
      "organisationname": "CARE OF ODISHA, PURI",
      "location": "MEDICAL CHHAK",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "38",
      "organisationname": "CHAUDHURY BHABAN",
      "location": "IN FRONT OF PARADISE HOTEL",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "39",
      "organisationname": "CHILD HELP FOUNDATION, MIRA ROAD, MUMBAI",
      "location": "TALABANIA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "40",
      "organisationname": "CHINKI LINKI CHARITABLE TRUST, CTC",
      "location": "PURI CLUB",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "41",
      "organisationname": "CITIZEN CENTRIC SERVICES",
      "location": "JAGANNATH BALLAV",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "42",
      "organisationname": "CITIZEN'S HUMAN RIGHTS CLINIC",
      "location": "GUNDICHA MANDIR",
      "date": "Bahuda & Suna Besha"
    },
    {
      "id": "43",
      "organisationname": "CONSUMER WELFARE & LEGAL COMPLIANCE COMMISSION",
      "location": "JAIL ROAD",
      "date": "Ratha Yatra, Bahuda & Aadharpana"
    },
    {
      "id": "44",
      "organisationname": "CUTTACK BHUBANESWAR MINITRUCK MALIKA MAHASANGHA",
      "location": "KISHOR CLUB,BADASANKHA,PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "45",
      "organisationname": "DARJI POKHARI LAXMI PUJA COMMITTEE",
      "location": "DARJIPOKHARI CHHAK",
      "date": "RATHA YATRA & BAHUDA"
    },
    {
      "id": "46",
      "organisationname": "DEB SEBA SAMITY",
      "location": "AT NAYAK PLAZA COMPLEX, GRAND ROAD, PURI",
      "date": "BAHUDA & SUNA BESHA"
    },
    {
      "id": "47",
      "organisationname": "DEBYUG FOUNDATION",
      "location": "HATI AKHADA MATHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "48",
      "organisationname": "DHARMA JAGARAN SAMITI",
      "location": "In front of Municipal Market Complex",
      "date": "Bahuda"
    },
    {
      "id": "49",
      "organisationname": "DIPTI RANJAN NAYAK AND OTHERS",
      "location": "BADASANKHA VEGETABLE MARKET",
      "date": "Netra Utsav & Suna Besha"
    },
    {
      "id": "50",
      "organisationname": "FAITH CHARITABLE TRUST",
      "location": "Behera Sweets, Gajapati Nagar",
      "date": "Bahuda"
    },
    {
      "id": "51",
      "organisationname": "FOR OTHERS",
      "location": "NEAR JANATA HALL, GRAND ROAD",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "52",
      "organisationname": "GANAPATI SAMITI",
      "location": "BHOLANATH SCHOOL",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "53",
      "organisationname": "GANDHI ENGINEERING COLLEGE (GEC AUTONOMOUS) BHUBANESWAR",
      "location": "BALAGANDI, PURI",
      "date": "Bahuda"
    },
    {
      "id": "54",
      "organisationname": "GANDHIJI SAMAJIKA ANUSTHAN, PURI",
      "location": "CITY ROAD, PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "55",
      "organisationname": "GAYATRI BIRESWAR SUKLA EDUCATIONAL AND CHARITABLE TRUST",
      "location": "INFRONT OF CATHOLIC CHURCH",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "56",
      "organisationname": "GHODA BAZAR, GANESH SEBA SAMITEE, PURI",
      "location": "GHODA BAZAR, STATION ROAD",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "57",
      "organisationname": "GODABARI AGRO MACHINARY & SERVICES INDIA PVT. LTD.",
      "location": "NEAR, STATE BANK ATM, GUNDICHA TEMPLE, PURI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "58",
      "organisationname": "GOLDEN EAGLE CHARITABLE TRUST",
      "location": "SUDARSAN NAGAR,INFRONT OF HARAMANI BHABAN& SUREBUY STORE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "59",
      "organisationname": "GOLDEN EAGLE FOUNDATION",
      "location": "INFRONT OF SUREBUY STORE PURI,NEAR SUDARSHAN NAGAR SAHI.,BADASANKHA ,PURI -2",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "60",
      "organisationname": "GOPABANDHU CHARITABLE TRUST",
      "location": "HDFC BANK, GRAND ROAD",
      "date": "Ratha Yatra to Niladri Bije"
    },
    {
      "id": "61",
      "organisationname": "GOPABANDHU SEBA SAMABAYA, PURI",
      "location": "Near Nuanai Bridge",
      "date": "Bahuda"
    },
    {
      "id": "62",
      "organisationname": "GOPABANDHU SEBA SANGHA BHADRAK",
      "location": "HERA GOURI SAHI CHOWK(OPPOSITE OF BALAGANDI HIGH SCHOOL)",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "63",
      "organisationname": "GOPINATH CLUB, HARIHAR VIHAR, PURI",
      "location": "NEAR BHOLANATH BIDYAPITHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "64",
      "organisationname": "GOPINATH GAJAPATI BHUYAN CHARITABLE TRUST",
      "location": "HAREKRUSHNA BHABAN, GADANTI CHHAK BALISAHI",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "65",
      "organisationname": "GUNDICHAGHAR BYABASAYEE SANGHA",
      "location": "IN SIDE OF ABAKASH LANE",
      "date": "Ratha Yatra to Suna Besha"
    },
    {
      "id": "66",
      "organisationname": "GURU BHAI BHAUNI SEBA SANGHA TRUST",
      "location": "RADHAKANTA MATHA , GAMBHIRA, BALISAHI",
      "date": "Bahuda"
    },
    {
      "id": "67",
      "organisationname": "GURU PRASAD WELFARE FOUNDATION, BAMANALA, P-URI",
      "location": "IN FRONT OF AKHAYA PATRA FOUNDATION",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "68",
      "organisationname": "GURUDWARA SINGH SABHA",
      "location": "AT AJAYA AGARWAL HOUSE AT GRAND ROAD OF AKSHYA PATRA FOUNDATION",
      "date": "Ratha Yatra to Suna Besha"
    },
    {
      "id": "69",
      "organisationname": "HAPPINESS FOUNDATION",
      "location": "MARKET SQUARE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "70",
      "organisationname": "HELP TO OTHER",
      "location": "NEAR MARKET CHHAK",
      "date": "Bahuda"
    },
    {
      "id": "71",
      "organisationname": "HELPING HAND ORGANISATION",
      "location": "SRIKHETRA COLONY",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "72",
      "organisationname": "HOPE IS LIFE CHARITABLE TRUST",
      "location": "TALABANIA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "73",
      "organisationname": "IIFL FINANCE, VIP ROAD",
      "location": "Near PKDA Office",
      "date": "Bahuda"
    },
    {
      "id": "74",
      "organisationname": "IMFA (INDIAN METALS & FERRO ALLOYS LIMITED), BHUBANESWAR",
      "location": "Bagla Dharmasala",
      "date": "Bahuda"
    },
    {
      "id": "75",
      "organisationname": "INTERNATIONAL HUMAN RIGHTS STATE YOUTH CELL",
      "location": "BUS STAND",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "76",
      "organisationname": "INTERNATIONAL INDECENCY PREVENTION MOVEMENT",
      "location": "NAKA CHANA DWAR",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "77",
      "organisationname": "INTERNATIONAL INDIAN HUMAN RIGHTS DEFENDERS",
      "location": "BHOLANATH VIDYAPITHA",
      "date": "Ratha Yatra to Bahuda"
    },
    {
      "id": "78",
      "organisationname": "INTERNATIONAL SOCIETY FOR SRI JAGANNATH CONSCIOUSNESS",
      "location": "JAGANNATH BALLAV",
      "date": "Ratha Yatra, Sandhyadarshan & Bahuda"
    },
    {
      "id": "79",
      "organisationname": "ISSWAR - INDIA SOCIETY FOR SOCIAL WELFARE ACTION & REASEARCH .",
      "location": "EMAAR MATHA CHAKADA",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "80",
      "organisationname": "JAGADISH ROUT & OTHERS",
      "location": "BADASANKHA NUSAHI",
      "date": "Bahuda"
    },
    {
      "id": "81",
      "organisationname": "JAGANNATH FOUNDATION",
      "location": "BASELI SAHI,NEAR BARABATI KALYANI MANDAP, LOKANATHA ROAD",
      "date": "Ratha Yatra to Suna Besha"
    },
    {
      "id": "82",
      "organisationname": "JAGANNATH TATWA & SANATAN DHARMA PRACHAR TRUST",
      "location": "INFRONT OF PURI CLUB, SUBAS BOSE CHHAK, PURI",
      "date": "Ratha Yatra to Suna Besha"
    },
    {
      "id": "83",
      "organisationname": "JAGATGURU THAKURA SHRI SHRI ABHIRAM PARAMAHANSHA DEB ASHRAM",
      "location": "MEDICAL SQUARE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "84",
      "organisationname": "JAGESWARI CHARITABLE TRUST",
      "location": "SAMANGA PARKING",
      "date": "RATHA YATRA TO BAHUDA"
    },
    {
      "id": "85",
      "organisationname": "JANAHITA YUBAKA SANGHA, BALASORE, ODISHA",
      "location": "BADADANDA AND VIP ROAD NEAR HOTEL DALMA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "86",
      "organisationname": "JAY JAGANNATH SEBASANGHA, CHENDIPADA, ANUGUL",
      "location": "NEAR JHARANA ELECTRONICS, RECDCROSS ROAD",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "87",
      "organisationname": "JAY JAGANNATH SEVA SANGHA",
      "location": "BALAGANDI CHAKKA, GRAND ROAD,PURI",
      "date": "Bahuda & Suna Besha"
    },
    {
      "id": "88",
      "organisationname": "JAYA JAGANNATH SEBA SAMITI MACHUA BAZAR, CUTTACK",
      "location": "INDIAN BANK SANI MANDIRA CHHALKS",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "89",
      "organisationname": "JEEVAN JYOTI SANGATHAN, Bhadrak",
      "location": "MARKET CHHAKA,NEAR MUNICIPALITY PURI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "90",
      "organisationname": "JEEVAN SEVA FOUNDATION, Cuttack",
      "location": "INDIAN BANK",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "91",
      "organisationname": "JHADESWARI CLUB",
      "location": "Jhadeswari Club",
      "date": "Suna Besha"
    },
    {
      "id": "92",
      "organisationname": "JIBAN JAGRUTI WELFARE TRUST, BBSR",
      "location": "NANDIGHOSA PLAZA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "93",
      "organisationname": "KAIBALYA",
      "location": "SHARADHABALI PURI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "94",
      "organisationname": "KALINGA GAURAB KALA & SANSKRUTI PARAMPARA TRUST, BBSR",
      "location": "BALAGANDI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "95",
      "organisationname": "KALINGA KACHARA JATI MAHASABHA",
      "location": "Near Balagandi Chhak",
      "date": "Bahuda"
    },
    {
      "id": "96",
      "organisationname": "KALINGA SAMAJA SEBA SANGATHAN",
      "location": "MEDICAL SQUIRE ,GRAND ROAD, PURI",
      "date": "Bahuda"
    },
    {
      "id": "97",
      "organisationname": "KALINGA VAISHYA SANGHA",
      "location": "SWOSTIK MANDAP, BADASANKHA, PURI",
      "date": "Bahuda"
    },
    {
      "id": "98",
      "organisationname": "KALINGA VAISYA YUBAK SANGH",
      "location": "JANHIMUNDIA CHHAK",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "99",
      "organisationname": "KALYANI CHARITABLE TRUST",
      "location": "JAGANATH BALLAV PARKING",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "100",
      "organisationname": "KESHARIYA HINDUPARISHAD BHARATA",
      "location": "MEDICAL CHHAK",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "101",
      "organisationname": "KONARK SEBA SANGATHAN",
      "location": "NEAR BLOOD BANK OFFICE",
      "date": "Ratha Yatra to Suna Besha"
    },
    {
      "id": "102",
      "organisationname": "KSHAYATRIYA KHANDAYAT MAHASANGHA, ODISHA",
      "location": "TALABANIA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "103",
      "organisationname": "KUMAR UTSAB SAMITTEEE,PURI",
      "location": "BOARDING SQURE,HERAGOHARI SAHI",
      "date": "Bahuda & Suna Besha"
    },
    {
      "id": "104",
      "organisationname": "LAXMINRUSINGHA LABOUR CONTRAC COOPERATIVE SOCIETY LTD., JAJPUR",
      "location": "Near Kumbharpada Police Station Chhak",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "105",
      "organisationname": "LIFE FOR THE MANKIND",
      "location": "NEAR BADA SANKHA, GAJAPATI NAGAR GALI CHHAK",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "106",
      "organisationname": "LIFE STORY HISTORY CHARITABLE TRUST, JAGATSINGHPUR",
      "location": "GAJAPATI NAGAR",
      "date": "RATHA YATRA & BAHUDA"
    },
    {
      "id": "107",
      "organisationname": "LIONS CLUB OF PURI",
      "location": "Near Temple Office",
      "date": "Bahuda"
    },
    {
      "id": "108",
      "organisationname": "LIVING HUMANITY",
      "location": "Near Arnapurna Theater",
      "date": "Bahuda"
    },
    {
      "id": "109",
      "organisationname": "LIYANSH FITNESS, PENTHAKATA",
      "location": "PKRIT CHHAK AND NEAR TARINI TEMPLE CHHAK",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "110",
      "organisationname": "M/S COMPUTER & CARTRIDGE SOLUTION",
      "location": "NEAR SBI, BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "111",
      "organisationname": "M/S GRAND FURNITURE",
      "location": "MAAUSIMA TEMPLE, BALAGANDI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "112",
      "organisationname": "M/s Kar & Brothers",
      "location": "Near Raja Nahar",
      "date": "Niladri Beje"
    },
    {
      "id": "113",
      "organisationname": "M/S NEW GRAND FURNITURE",
      "location": "MAAUSIMA TEMPLE, BALAGANDI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "114",
      "organisationname": "M/S S.K ENTERPRISE",
      "location": "NEAR MAUSI MAA MANDIR",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "115",
      "organisationname": "MAA BASANTEI CLUB",
      "location": "CHARINALA ,NEAR THE BATAMANGALA TEMPLE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "116",
      "organisationname": "MAA BAUTI SEVA SANGATHAN",
      "location": "BADA DANDA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "117",
      "organisationname": "MAA BHAGABATI TRUST, PURI",
      "location": "BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "118",
      "organisationname": "MAA KHETRAPAL HELPS FOUNDATION AND CHARITABLE TRUST, INDRAPAL, SATYABHAMAPUR, KHORDHA",
      "location": "BADA DANDA UTTARA PARSWA MAUSI MAA MANDIR, BUS STAND OUT GATE",
      "date": "Bahuda"
    },
    {
      "id": "119",
      "organisationname": "MAA MAHALAXMI MANDIR PUJA COMMITTEE",
      "location": "Shreekhetra Colony",
      "date": "Bahuda"
    },
    {
      "id": "120",
      "organisationname": "MAA SANTOSHI HELP FOUNDATION",
      "location": "GOVT SCHOOL BADASANKHA FRONT",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "121",
      "organisationname": "MAHABAHU SEBA PARISHAD TRUST",
      "location": "RED CROSS, ROAD, PURI",
      "date": "Bahuda"
    },
    {
      "id": "122",
      "organisationname": "MAHESH STEEL TRUST",
      "location": "Talabania",
      "date": "Bahuda"
    },
    {
      "id": "123",
      "organisationname": "MANA ADHIKARA SURAKSHAYA SANGHA",
      "location": "OUT SIDE OF UTTARDWARA",
      "date": "Niladri Beje"
    },
    {
      "id": "124",
      "organisationname": "MANABA ADHIKAR SURAKSHAYA SANGHA",
      "location": "NEAR JAGANNATH TEMPLE",
      "date": "Niladri Beje"
    },
    {
      "id": "125",
      "organisationname": "MANAV SEBA HI MADHAH BE SEBA CHARITABLE TRUST",
      "location": "MUNA MEDICALS, GAJAPATI NAGAR",
      "date": "Bahuda"
    },
    {
      "id": "126",
      "organisationname": "MARUTI SENA CHARITABLE TRUST",
      "location": "S.C.S. COLLEGE SQUARE, PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "127",
      "organisationname": "MARWADI YUBA MANCHA, BALU BAZAR, CTC",
      "location": "MAUSIMAA MANDIR, GRAND ROAD",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "128",
      "organisationname": "MARWARI YUVA MANCH, CUTTACK",
      "location": "IN FRONT OF MAUSI MAA MANDIR",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "129",
      "organisationname": "MATRUBHUMI ODISHA",
      "location": "BADADANDA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "130",
      "organisationname": "MISSION ODISHA, PURI",
      "location": "SEA BEACH & GUNDICHA TEMPLE",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "131",
      "organisationname": "MO SEVA MO PARIBAR",
      "location": "BADASANKHA NUA SAHI",
      "date": "Ratha Yatra to Suna Besha"
    },
    {
      "id": "132",
      "organisationname": "MOHAPATRA FOUNDATION, DUTTA TOTA, PURI",
      "location": "MEDICAL CHHAKA & MARKET CHHAKA",
      "date": "Netra Utsav, Ratha Yatra & Bahuda"
    },
    {
      "id": "133",
      "organisationname": "MULTI PURPOSE YOUBA SAMANTA CHARITABLE TRUST",
      "location": "IN FRONT OF HOTEL MANDAKINI",
      "date": "Netra Utsav, Ratha Yatra & Bahuda"
    },
    {
      "id": "134",
      "organisationname": "NARASINGH YOUTH ASSOCIATION",
      "location": "MATIAPADACHHALKA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "135",
      "organisationname": "NARAYAN CHARITABLE TRUST",
      "location": "Market Chhak & VIP Road",
      "date": "Bahuda"
    },
    {
      "id": "136",
      "organisationname": "NARI MANGAL MAHILA SAMITI, PANCHUPALLA, GUALIPADA, PURI",
      "location": "NEAR GOVT. WOMEN'S COLLEGE, GHODA BAZAR",
      "date": "Bahuda"
    },
    {
      "id": "137",
      "organisationname": "NATIONAL AID FOR RURAL DEVELOPMENT (NARD), BHARATIPUR, PURI",
      "location": "NEAR DIGABARENI CHHAK",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "138",
      "organisationname": "NATIONAL SERVICE SCHEME BUREAU",
      "location": "BADASNKHA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "139",
      "organisationname": "NEELACHAL GREEN",
      "location": "Near Balagandi Chhak",
      "date": "Bahuda"
    },
    {
      "id": "140",
      "organisationname": "NIKHILA UTKAL BISWAKARMA SAMITI",
      "location": "MEDICAL SQUARE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "141",
      "organisationname": "NILA CHALA SARASWATA SANGHA,",
      "location": "IN FRONT OF ZILLA SCHOOL, PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "142",
      "organisationname": "NILACHAL BARISTHA NAGARIKA MANCHA",
      "location": "SARADHABALI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "143",
      "organisationname": "NILACHAL SAKAHARI RANGANI SAMAG",
      "location": "CHUDANGASAHI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "144",
      "organisationname": "NILACHALA JANA SEBA TRUST",
      "location": "NEAR BUS STAND",
      "date": "Bahuda & Suna Besha"
    },
    {
      "id": "145",
      "organisationname": "NISHIGANDHA NARI SASHAKTI KARAN, KHORDHA",
      "location": "OUTER SHREE MANDIR & GUNDICHA MANDIR",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "146",
      "organisationname": "ODISHA BIKASH MAHAMANCHA, BBSR",
      "location": "(INSIDE THE POLICE ABAKASH GATE) & SUNA BESHA (BALAGANDI)",
      "date": "Bahuda"
    },
    {
      "id": "147",
      "organisationname": "ODISHA CONSTRUCTION WORKERS UNION",
      "location": "GRAND ROAD",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "148",
      "organisationname": "ODISHA DRIVER MAHA SANGHA",
      "location": "Near Bholanatha Bidyapitha",
      "date": "Bahuda"
    },
    {
      "id": "149",
      "organisationname": "ODISHA GRAMEEN BANK, PURI MAIN BRANCH",
      "location": "IN FRONT OF ODISHA GRAMEEN BANK, MAIN BRANCH, PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "150",
      "organisationname": "ODISHA JUBA CHETANA SANGHATHAN",
      "location": "DASHA ABATARA MATHA PARISARA, NEAR GUNDICHA TEMPLE",
      "date": "Ratha Yatra to Bahuda"
    },
    {
      "id": "151",
      "organisationname": "ODISHA KSHATRIYA MAHASANGHA, ODISHA",
      "location": "TALABANIA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "152",
      "organisationname": "ODISHA MOTOR CHALAK SANGHA",
      "location": "TALABANIA INDOOR STADIUM",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "153",
      "organisationname": "ODISHA POWER TRANSMISSION CORPORATION LIMITED, BHUBANESWAR",
      "location": "Grid Sub Station & in front of Sangram Club",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "154",
      "organisationname": "ODISHA SERVICE CENTER FOR THE DIVYANGA PEOPLE, PURI",
      "location": "Hatisal & Camp Area",
      "date": "Ratha Yatra to Bahuda"
    },
    {
      "id": "155",
      "organisationname": "OM SRI SRI TRINATHA DEBAYA TRAVEL AGENT ASSOCIATION, PURI",
      "location": "STATION ROAD",
      "date": "Bahuda"
    },
    {
      "id": "156",
      "organisationname": "OMM SATYAM CHARITABLE TRUST, ODISHA",
      "location": "Near Sangram Club",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "157",
      "organisationname": "PANCHASAKHA SEBA PARISHAD",
      "location": "MARKET CHHAKA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "158",
      "organisationname": "PARSURAM SWEETS & DRY FRUITS",
      "location": "Near Parsuram Sweets",
      "date": "Bahuda & Suna Besha"
    },
    {
      "id": "159",
      "organisationname": "PATITAPABANA SEVA SANGHA,PURI",
      "location": "ANNAPURNA LODGE",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "160",
      "organisationname": "PRAJNANA MISSION",
      "location": "IN FRONT OF HOTEL SARASWATI, BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "161",
      "organisationname": "PRASANT KUMAR MISHRA & ASSOCIATES",
      "location": "BADASANKHA NEAR MAA SHANKHESWARI TEMPLE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "162",
      "organisationname": "PRATISHRUTI",
      "location": "NEAR VENKETSWARI TEMPLE, BALISAHI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "163",
      "organisationname": "PRAYAS TELEVISION",
      "location": "IN FRONT OF GUNDICHA TEMPLE",
      "date": "Netra Utsav & Bahuda"
    },
    {
      "id": "164",
      "organisationname": "PURBASHA TARINI MAA SOCIO ECONOMICAL DEVELOPMENT ORGANISATION",
      "location": "NEAR GUNDICHA MANDIR, BADASANKHA",
      "date": "Sandhya Darshan, Bahuda, Suna Besha & Niladri Beja"
    },
    {
      "id": "165",
      "organisationname": "PURI BEACH LIFE GUARD MAHASANGHA",
      "location": "SEA BEACH",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "166",
      "organisationname": "PURI BOXING ACADEMY",
      "location": "IN FRONT OF BADASANKHA NIRBANI LANE, GRAND ROAD",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "167",
      "organisationname": "PURI BSNL LABOUR UNION (BPLU) PURI",
      "location": "TELEPHONE BHAWAN, RED CROSS ROAD",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "168",
      "organisationname": "PURI DISTRICT EX SERVICE S LEAG",
      "location": "OUT GATE BUS STAND",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "169",
      "organisationname": "PURI DISTRICT KHO KHO ASSOCIATION",
      "location": "IN FRONT OF BALAGANDI HIGH SCHOOL",
      "date": "Bahuda"
    },
    {
      "id": "170",
      "organisationname": "PURI DISTRICT MALLAKHAMB ASSOCIATION",
      "location": "SIDHAMAVIR ROAD",
      "date": "Bahuda"
    },
    {
      "id": "171",
      "organisationname": "PURI RAILWAY STATION TAXI ASSOCIATION",
      "location": "Railway Station",
      "date": "Suna Besha"
    },
    {
      "id": "172",
      "organisationname": "PURI ROTARI CLUB",
      "location": "BALAGANDI",
      "date": "Suna Besha"
    },
    {
      "id": "173",
      "organisationname": "PURI SEVA SAMITI",
      "location": "MARCHIKOTE SQUARE",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "174",
      "organisationname": "PURI STATION AUTO CHALAK SANGHA, STATION ROAD, PURI-2",
      "location": "IN FRONT OF RAILWAY STATION PARKING",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "175",
      "organisationname": "PURI URBAN & RURAL DEVELOPMENT COOPERATIVE SOCIETY LTD",
      "location": "TULASI LODGE, NEAR MUFTI OUTLET, BALAGANDI SQUARE, GRAND ROAD",
      "date": "Ratha Yatra & Suna Besha"
    },
    {
      "id": "176",
      "organisationname": "PURI YOUTH CO-ORDINATION COMMITTEE",
      "location": "FOR GUNDICHA YATRA- IN FRONT OF RAJA NAHARA & FOR BAUDA YATRA INFRONT OF MAUSIMAA TEMPLE",
      "date": "Ratha Yatra to Niladri Bije"
    },
    {
      "id": "177",
      "organisationname": "PURI ZILLA BARISTHA NAGARIK SURAKSHYA MANCHA",
      "location": "POLICE ABAKASH LANE, PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "178",
      "organisationname": "PURI ZILLA BARISTHA NAGARIKA MANCHA",
      "location": "BAGHA AKHADA MATHA, BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "179",
      "organisationname": "PURI ZILLA BRAHMANA MAHASABHA",
      "location": "DASA ABATARA MATHA, GUNDICHA TEMPLE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "180",
      "organisationname": "PURI ZILLA CHESS SANGHA",
      "location": "GUNDICHA TEMPLE",
      "date": "Sandhya Darshan"
    },
    {
      "id": "181",
      "organisationname": "PURI ZILLA GOPAL SAMAJ TRUST, ODISHA",
      "location": "SANGRAM CLUB, BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "182",
      "organisationname": "PURI ZILLA SENIOR CITIZENS FORUM",
      "location": "BAGHA AKHADA MATHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "183",
      "organisationname": "PURI ZILLA SOUNDHIKA SEVA SANGHA",
      "location": "TALAMALI SAHI, IN FRONT OF ICICI BANK",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "184",
      "organisationname": "PURNANDA SAI FOUNDATION, BALANGA, PURI",
      "location": "IN FRONT OF RAILWAY KALYANA MANDAP",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "185",
      "organisationname": "RAJNARAYAN PAL",
      "location": "SANGRAM CLUB LANE, NEAR BADASANKHA, PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "186",
      "organisationname": "RASHTRIYA LOTUS CHARITABLE TRUST",
      "location": "MEDICAL CHHAKA, GUNDICHA TEMPLE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "187",
      "organisationname": "RAY OF HOPE FOUNDATION - ROHF",
      "location": "IN FRONT OF TOWN THANA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "188",
      "organisationname": "RITAM LEGAL (ADVOCATE & ADVISORY), NEW DELHI",
      "location": "GUNDICHA TEMPLE",
      "date": "Bahuda"
    },
    {
      "id": "189",
      "organisationname": "RITSIKA FOUNDATION",
      "location": "ADJACENT TO HOTEL ROYAL TRIDEV, CHAKRA TIRTHA ROAD , PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "190",
      "organisationname": "ROTARY CLUB OF PURI SAGAR, PURI,",
      "location": "SANGRAM CLUB-RATHAYATRA, C NET COMPUTER & HERA GOHIRI SAHI, BOARDING CHHAK - BAHUDA & SUNA BESHA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "191",
      "organisationname": "ROTARY CLUB OF SHRI JAGANNATH DHAM",
      "location": "SWOSTIK MANDAP, BADASANKHA, PURI",
      "date": "Bahuda"
    },
    {
      "id": "192",
      "organisationname": "ROTARY CLUB, PURI",
      "location": "BALAGANDI",
      "date": "Bahuda"
    },
    {
      "id": "193",
      "organisationname": "RURAL ECONOMIC DEVELOPMENT FORUM",
      "location": "FRIENDS CLUB",
      "date": "Bahuda"
    },
    {
      "id": "194",
      "organisationname": "S & S CHARITABLE TRUST",
      "location": "SHARADHABALI IN FRONT OF KRISHNA AUTO",
      "date": "Ratha Yatra, Sandhyadarshan & Bahuda"
    },
    {
      "id": "195",
      "organisationname": "SAGAR BANDHU TRUST",
      "location": "MARKET CHHAKA, RAILWAY STATION",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "196",
      "organisationname": "SAHA CHARITABLE TRUST",
      "location": "Near Helipad",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "197",
      "organisationname": "SAHIBHAI",
      "location": "IN FRONT OF BHAKTASALEBEGA AND LUNCH MEDICAL SQ BACK SIDE OF BIJU BABU STACHUE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "198",
      "organisationname": "SAI SHREEKHETRA S.H.G.",
      "location": "GRAND ROAD",
      "date": "Ratha Yatra to Suna Besha"
    },
    {
      "id": "199",
      "organisationname": "SAKHI & NISHIGANDHA NARI SASAKTIKARAN",
      "location": "GRAND ROAD",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "200",
      "organisationname": "SAMARPAN",
      "location": "BALAGANDI CHHAKA,GRAND ROAD,PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "201",
      "organisationname": "SAMARPAN CHARITABLE TRUST",
      "location": "IN FRONT OF MAAUSIMA TEMPLE",
      "date": "Suna Besha"
    },
    {
      "id": "202",
      "organisationname": "SAMBHAB CHARITABLE TRUST",
      "location": "INFRONT OR NEAR OF TANISHQ JEWELLERY",
      "date": "Ratha Yatra to Niladri Bije"
    },
    {
      "id": "203",
      "organisationname": "SAMBHAVANA TRUST",
      "location": "CT ROAD NEAR BNR HOTEL PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "204",
      "organisationname": "SANATANI KESHARIYA HINDU BAHINI, ODISHA",
      "location": "IN FRONT OF AKSHAYA PATRA FOUNDATION & BADASANKHA IN FRONT OF SBI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "205",
      "organisationname": "SANKALP FOUNDATION TRUST ODISHA PURI",
      "location": "NEAR MANGALA GHAT BRIDGE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "206",
      "organisationname": "SANSKAR T.V.",
      "location": "GUNDICHA TEMPLE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "207",
      "organisationname": "SANYUKT ORGANISATION",
      "location": "MEDICAL SQUARE",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "208",
      "organisationname": "SARASWATA SEBA SANGHA",
      "location": "BADASANKHA, UTSAV ANGAN MANDAP",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "209",
      "organisationname": "SARASWATA SEVAK SANGHA, UTKAL BIBHAGA, GOUTAM NAGAR, BBSR",
      "location": "BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "210",
      "organisationname": "SARASWATI SHISHU VIDYA MANDIR , MADHUBAN , PURI",
      "location": "NEAR GUNDICHA TEMPLE ,INFRONT OF BHAKTA NIVAS",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "211",
      "organisationname": "SARBANETRA FOUNDATION TRUST",
      "location": "TALABANIA PUMP HOUSE SIDE",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "212",
      "organisationname": "SATYA CHHAYA CHARITABLE TRUST",
      "location": "NEAR GUNDICHA TEMPLE",
      "date": "Ratha Yatra to Niladri Bije"
    },
    {
      "id": "213",
      "organisationname": "SAVE COASTAL LIFE",
      "location": "PURI KONARK ROAD BALIGHAI CHHAK ON RATHAJATRA AND SUNABESA DAY AND PURI BRAHMAGIRI ROAD",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "214",
      "organisationname": "SAWAN KIRPAL RUHANI MISSION",
      "location": "TALABANIA PARKING",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "215",
      "organisationname": "SC/ST ADHIKAR FOUNDATION TRUST",
      "location": "IN FORNT OF PARADISE HOTEL, MARKET SQUARE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "216",
      "organisationname": "SEBA EDUCATIONAL CHARITABLE TRUST",
      "location": "BALAGANDI CHHAKA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "217",
      "organisationname": "SELF EMPOWERMENT GROUP",
      "location": "SANGRAM CLUB , BALAGANDI CHHAKA & NARENDRA KONA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "218",
      "organisationname": "SENIOR CITIZENS CLUB,",
      "location": "NEAR MAA MANGALA TEMPLE, SRIKHETRA COLONY PURI",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "219",
      "organisationname": "SHANTI",
      "location": "TOWN HALL CHHAKA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "220",
      "organisationname": "SHIKSHAYA BIKASH SAMITEE, ODISHA",
      "location": "RAILWAY STATION & GUNDICHA MANDIR",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "221",
      "organisationname": "SHIKSHYA BIKASH SAMITEE, VIDYA BHARATI",
      "location": "IN FRONT OF RAILWAY STATION",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "222",
      "organisationname": "SHRADHA EDUCATIONAL CHARITABLE TRUST",
      "location": "BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "223",
      "organisationname": "SHREE BINAYAK SARBA SHIKSHYA PATHAGARARA KARMAKARTA",
      "location": "KHAKI MATHA NUASAHI, BADA DANDA, PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "224",
      "organisationname": "SHREE JAGANNATH EDUCATIONAL & SOCIAL SERVICE WELFARE TRUST",
      "location": "NEAR BHOLANATH VIDYAPITHA",
      "date": "Ratha Yatra & Niladri Bije"
    },
    {
      "id": "225",
      "organisationname": "SHREE JAGANNATH NAISHABIDYALAYA AND PRAUDHA SHIKSHAYA MANDALA, PURI",
      "location": "NAKACHANA DWARA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "226",
      "organisationname": "SHREE JAGANNATH PURI RATHYATRA SHARBAT SEVA",
      "location": "BESIDE UTKAL HINDI BIDYAPITH",
      "date": "Ratha Yatra, Bahuda & Niladri Bije"
    },
    {
      "id": "227",
      "organisationname": "SHREE JAGANNATH SEVA PRATISTHAN FOUNDATION",
      "location": "SRIMANDIR TO GUNDICHA TEMPLE",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "228",
      "organisationname": "SHREE JAGANNATH YUVA VAHINI",
      "location": "GUNDICHA MANDIR, NAKACHANA DWAR, PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "229",
      "organisationname": "SHREE JAGANNATHA BHAKTA SEBA SANSTHA",
      "location": "MARICHIKOTTA CHHAKA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "230",
      "organisationname": "SHREE JAGANNATHA ZILLA MAHILA MAHASANGHA",
      "location": "RAILWAY STATION",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "231",
      "organisationname": "SHREE KHETRA BHAGABATA CHARITABLE TRUST",
      "location": "OPPOSITE AKHAYA PATRA FOUNDATION TO NEAR BINJHARPUR, CHOUDHURY KOTHI.",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "232",
      "organisationname": "SHREE KHETRA BIKASH MANCHA",
      "location": "PARADISE HOTEL",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "233",
      "organisationname": "SHREE KRISHNA FOUNDATION",
      "location": "Market Chhak, Opposite to Jagannath Ballav (Near Lord's Tailor)",
      "date": "Suna Besha"
    },
    {
      "id": "234",
      "organisationname": "SHREE KUTCH KADVA PATIDAR SAMAJ , BHUBANESWAR",
      "location": "BESIDE JANTA TALKIES , BADADANDA ROAD",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "235",
      "organisationname": "SHREE SANKHA KHETRA FOUNDATION TRUST,",
      "location": "BUS STAND",
      "date": "Bahuda"
    },
    {
      "id": "236",
      "organisationname": "SHREE SATYA SAI SEBA SANGHATHAN",
      "location": "SANGRAM CLUB, STATION ROAD",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "237",
      "organisationname": "SHREE SEBA",
      "location": "MEDICAL CHHA, BADASANKHA, MARKET CHHAKA",
      "date": "Ratha Yatra to Niladri Bije"
    },
    {
      "id": "238",
      "organisationname": "SHREE SHREE NILACHAL SAKAHARI RANGANI SAMAJ",
      "location": "CHUDANGA SAHI , KALIA DHARMASALA",
      "date": "Bahuda"
    },
    {
      "id": "239",
      "organisationname": "SHREE SHREE RAGHUNATH RAM DAYA PARISHAD",
      "location": "IN FRONT OF SARADHA MANDAP",
      "date": "Ratha Yatra to Bahuda"
    },
    {
      "id": "240",
      "organisationname": "SHREE SHREE TRINATH MANDIRA COMMITTEE, SARBODAYA NAGAR, PURI",
      "location": "SARBODAYA NAGAR , ASHRAM CHHALKA, PURI-2",
      "date": "Bahuda"
    },
    {
      "id": "241",
      "organisationname": "SHREEKHETRA SEBA SANGHA",
      "location": "HATI AKHADA MATHA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "242",
      "organisationname": "SHREEKHETRA SHREE RAM MAHOSTAVA SEBA SAMITTEE",
      "location": "HATI AKHADA MATHA, MAUSIMAA MANDIR, DUTTA TOTA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "243",
      "organisationname": "SHREEKHETRA SWACHHASEBI SANGATHAN",
      "location": "Near Satya Narayan Temple",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "244",
      "organisationname": "SHRI MAHABIR YUBAKA SANGHA",
      "location": "NARENDRAKONA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "245",
      "organisationname": "SHRI SHRI AVAYA MAHAVIR MANDIR",
      "location": "In front of SHRI SHRI AVAYA MAHAVIR MANDIR",
      "date": "Bahuda"
    },
    {
      "id": "246",
      "organisationname": "SHRI SHRI BABA KAPALESWARA URNNAYAN PARISHAD",
      "location": "JAGANNATH KUMBHAKAR NIJAGA, SARADHABALI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "247",
      "organisationname": "SHRIKHETRA PRIVATE BUS WONER ASSOCIATION",
      "location": "INSIDE HOTEL MANDAKINI, MEDICAL CHHALKA",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "248",
      "organisationname": "SHRIPATI VIDYARTHI TRUST, PURI",
      "location": "MARICHIKOTE CHHALKA",
      "date": "Ratha Yatra to Bahuda"
    },
    {
      "id": "249",
      "organisationname": "SHRREKHETRADHIPATI ADHYATMIKA JYOTRIVASTU GABESANA PRATISHTHAN, MATITOTA, PURI",
      "location": "VEDBHABAN, SWARGADWAR ROAD",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "250",
      "organisationname": "SIVA SAMPURNA FOUNDATION, GOTALIBINDHA, SATYABHAMAPUR, BBSR, KHORDHA",
      "location": "BADA DANDA UTTARA PARSWA MAUSI MAA MANDIR, BUS STAND OUT GATE",
      "date": "Bahuda"
    },
    {
      "id": "251",
      "organisationname": "SRI JAGANATH ANURAGI TRUST",
      "location": "Near Upasana Leathe, Badasankha",
      "date": "Bahuda"
    },
    {
      "id": "252",
      "organisationname": "SRI JAGANNATH CHETANA ANTARJATIYA CHARANA GOSTHI, PURI",
      "location": "INDIAN BANK SANI MANDIRA CHHALKS",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "253",
      "organisationname": "SRI RADHAKANTA MATH",
      "location": "RADHAKANTA MATHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "254",
      "organisationname": "SRI SWAMINARAYAN SEVA SANSTHAN PURI",
      "location": "INSIDE ABAKASH LANE",
      "date": "Bahuda"
    },
    {
      "id": "255",
      "organisationname": "SRI YOGA VEDANT SEWA SAMITI, BBSR",
      "location": "GANESH MANDIR, IN FRONT OF MUNICIPALITY MARKET PURI",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "256",
      "organisationname": "SRIKHETRA MAA GAJALAXMI PUJA COMMITTEE",
      "location": "GAJAPATI NAGAR CHHAKA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "257",
      "organisationname": "SRIKHETRA SEVA SANGHA, BHUBANESWAR",
      "location": "HATI AKHADA MATHA",
      "date": "Ratha Yatra, Sandhyadarshan & Bahuda"
    },
    {
      "id": "258",
      "organisationname": "SRIKHETRA YOUTH FORUM",
      "location": "BHOLANATH VIDYAPITH",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "259",
      "organisationname": "SUBHADRA INFRA PROJECTS PVT.LTD",
      "location": "SARADHABALI NEAR GUNDICHA MANDIR, BUS STAND SITE ROAD,HOTEL SAI SASWATIGALI, BADASANKHA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "260",
      "organisationname": "SUBHAM SENAPATI & OTHERS",
      "location": "Near Hotel Mandakini",
      "date": "Bahuda"
    },
    {
      "id": "261",
      "organisationname": "SUNFISH COMPANY",
      "location": "NEAR TANSHIQ JEWELLERS",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "262",
      "organisationname": "SUSAMA ENTERPRISES",
      "location": "MUNICIPSLITY MARKET(DAITAPADASAHI)",
      "date": "Bahuda"
    },
    {
      "id": "263",
      "organisationname": "SWAPNO FOUNDATION, CUTTACK",
      "location": "MAUSIMAA TEMPLE, GRAND ROAD",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "264",
      "organisationname": "SWARNA UTKAL VARATI SEBA FOUNDATION , JAJPUR",
      "location": "MEDICAL CHHALKA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "265",
      "organisationname": "THE ART OF LIVING",
      "location": "SURYA COMPLEX",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "266",
      "organisationname": "THE MIRROR",
      "location": "ABAKASH LANE",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "267",
      "organisationname": "UNIQUE FAMILY CHARITABLE TRUST",
      "location": "Khaki Matha Nuasahi",
      "date": "Bahuda"
    },
    {
      "id": "268",
      "organisationname": "URJABAN ODISHA TRUST",
      "location": "MEDICAL CHHAKA, BALAGANDI CHHAKA, RED CROSS ROAD",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "269",
      "organisationname": "URNNATI CHARITABLE TRUST, PURI",
      "location": "TALABANIA HELIPAD CHHAKA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "270",
      "organisationname": "UTKAL BIDYUT KARMACHARI SANGHA",
      "location": "NEAR MAUSIMAA MANDIR",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "271",
      "organisationname": "UTKAL BIPARNNA SAHAYATA SAMITTEE",
      "location": "BADA DANDA, MARICHIKOTE",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "272",
      "organisationname": "UTKAL HELPING & FOUNDATION",
      "location": "GRAND ROAD",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "273",
      "organisationname": "UTKAL PRADESHIK MARWARI SAMMELEN",
      "location": "NEAR HOTEL NAYAK PLAZA",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "274",
      "organisationname": "UTKAL SABAR MAHASANGHA, PURI",
      "location": "HATI SHALA, NEAR GUNDICHA TEMPLE",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "275",
      "organisationname": "VIKAS",
      "location": "INFRONT OF AKHAYA PATRA FOUNDATION",
      "date": "Ratha Yatra & Bahuda"
    },
    {
      "id": "276",
      "organisationname": "VIKASHARTHE VIDYARATHI TRUST",
      "location": "SHREE SADASHIVA CAMPUS",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    },
    {
      "id": "277",
      "organisationname": "VIVEKANANDA YUBA SHAKTI, SANGHATHAN",
      "location": "IN FRONT OF BHOLANATH HIGH SCHOOL& IN FRONT OF JAGANNATH BALLAV",
      "date": "Ratha Yatra, Bahuda & Sunabesha"
    }
  ]

  const odia_data = [
    {
      "id": "1",
      "organisationname": "ରିଲାଏନସ୍",
      "location": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ କମପ୍ଲେକ୍ସ ",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "27/6/2025"
    },
    {
      "id": "2",
      "organisationname": " ବେଦାନ୍ତ  ",
      "location": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ କମପ୍ଲେକ୍ସ ",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "27/6/2025"
    },
    {
      "id": "3",
      "organisationname": "ନାଲକୋ ",
      "location": "ପାରାଡ଼ାଇଜ ହୋଟେଲ ସାମନା ",
      "map": "https://maps.app.goo.gl/qzDrgpbdyngNHaXX8",
      "date": "27/6/2025"
    },
    {
      "id": "4",
      "organisationname": "ଏ.ଆର.ଏସ.ଏସ.",
      "location": "ବଗଳା ଧର୍ମଶାଳା ",
      "map": "https://maps.app.goo.gl/7eBJ8hHs8ezLVfiP8",
      "date": "27/6/2025"
    },
    {
      "id": "5",
      "organisationname": "ଅକ୍ଷୟ ପାତ୍ର ଫାଉଣ୍ଡେସନ ",
      "location": "ଅକ୍ଷୟ ପାତ୍ର ଫାଉଣ୍ଡେସନ ବିଲ୍ଡିଂ ସାମନା ",
      "map": "https://maps.app.goo.gl/7AyQAYqBTomWtBuh6",
      "date": "27/6/2025"
    },
    {
      "id": "6",
      "organisationname": "ମା ହିଙ୍ଗୁଳା ଅନ୍ନ ଭୋଗ କମିଟି ",
      "location": "ବଳଗଣ୍ଡି ",
      "map": "https://maps.app.goo.gl/MpC3PSt9W152LhUC6",
      "date": "27/6/2025"
    },
    {
      "id": "7",
      "organisationname": "ରୋଟାରୀ କ୍ଲବ ",
      "location": "ମେଡ଼ିକାଲ ଛକ ",
      "map": "https://maps.app.goo.gl/b9WYioBNoF9QKtgcA",
      "date": "27/6/2025"
    },
    {
      "id": "8",
      "organisationname": "ଏସ.ଏନ.ଏମ. ଚାରିଟେବଲ୍ ଟ୍ରଷ୍ଟ ",
      "location": "ବଡ଼ଶଙ୍ଖ ",
      "map": "https://maps.app.goo.gl/tYv6WEXWZDoGGywC8",
      "date": "27/6/2025"
    },
    {
      "id": "9",
      "organisationname": "ରିଲାଏନସ୍ ଫାଉଣ୍ଡେସନ ",
      "location": "ଭୋଳାନାଥ ବିଦ୍ୟାଳୟ ପରିସର ",
      "map": "https://maps.app.goo.gl/N7CzsLApDDeQFp1P8",
      "date": "27/6/2025"
    },
    {
      "id": "10",
      "organisationname": "ଜିନ୍ଦଲ ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ ",
      "map": "https://maps.app.goo.gl/U6ErBJgsV6jxasj76",
      "date": "27/6/2025"
    },
    {
      "id": "11",
      "organisationname": "ରିଲାଏନସ୍ ଫାଉଣ୍ଡେସନ ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ ",
      "map": "https://maps.app.goo.gl/94QctXZTGZgNgnKn9",
      "date": "27/6/2025"
    },
    {
      "id": "12",
      "organisationname": "ବେଦାନ୍ତ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ, ତାରିଣୀ ମନ୍ଦିର ପାଖ ",
      "map": "https://maps.app.goo.gl/eMtP7GyuuCtWZBYY8",
      "date": "27/6/2025"
    },
    {
      "id": "13",
      "organisationname": "ନାଲକୋ",
      "location": "ରେଲୱେ ଷ୍ଟେସନ୍ ",
      "map": "https://maps.app.goo.gl/X9EbbkcnWPY2GyLY8",
      "date": "27/6/2025"
    },
    {
      "id": "14",
      "organisationname": "ଜେ.ଏସ.ପି.ଏଲ. ",
      "location": "ରେଲୱେ ଷ୍ଟେସନ୍ ",
      "map": "https://maps.app.goo.gl/8qpqYNpmNqTSuyyw8",
      "date": "27/6/2025"
    },
    {
      "id": "15",
      "organisationname": "ଦୋଳଗୋବିନ୍ଦ ମାଳତି ଚାରିଟେବଲ୍ ଟ୍ରଷ୍ଟ",
      "location": "ରେଲୱେ ଷ୍ଟେସନ୍ ",
      "map": "https://maps.app.goo.gl/4c8sXwKKrkEYbHCd6",
      "date": "27/6/2025"
    },
    {
      "id": "16",
      "organisationname": "ରେଲୱେ ଷ୍ଟେସନ୍ ଅଟୋ ଚାଳକ ସଙ୍ଘ ",
      "location": "ରେଲୱେ ଷ୍ଟେସନ୍ ",
      "map": "https://maps.app.goo.gl/oNRVAehTzZ7Y1jtf7",
      "date": "27/6/2025"
    },
    {
      "id": "17",
      "organisationname": "ଓସେପା କର୍ମଚାରୀ ସଙ୍ଘ ",
      "location": "ଆୟୁର୍ବେଦିକ କଲେଜ ସାମନା ",
      "map": "https://maps.app.goo.gl/HYD43YD1EyfGYVjS7",
      "date": "27/6/2025"
    },
    {
      "id": "18",
      "organisationname": "ଅଠରନଳା ଉନ୍ନୟନ କମିଟି ",
      "location": "ଅଠରନଳା ",
      "map": "https://maps.app.goo.gl/dMA2TM2qyythFy3PA",
      "date": "27/6/2025"
    },
    {
      "id": "19",
      "organisationname": "କୁମ୍ଭାରପଡ଼ା ଆସୋସିଏସନ ",
      "location": "କୁମ୍ଭାରପଡ଼ା ପୋଲିସ ଥାନା ପାଖ ",
      "map": "https://maps.app.goo.gl/TE28KmUa28jbMFQp9",
      "date": "27/6/2025"
    },
    {
      "id": "22",
      "organisationname": " ବେଦାନ୍ତ ",
      "location": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ କମପ୍ଲେକ୍ସ ",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "4/7/2025"
    },
    {
      "id": "122",
      "organisationname": "ବେଦାନ୍ତ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ, ତାରିଣୀ ମନ୍ଦିର ପାଖ ",
      "map": "https://maps.app.goo.gl/eMtP7GyuuCtWZBYY8",
      "date": "4/7/2025"
    },
    {
      "id": "111",
      "organisationname": "ରିଲାଏନସ୍",
      "location": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ କମପ୍ଲେକ୍ସ ",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "5/7/2025"
    },
    {
      "id": "222",
      "organisationname": " ବେଦାନ୍ତ ",
      "location": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ କମପ୍ଲେକ୍ସ ",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "5/7/2025"
    },
    {
      "id": "99",
      "organisationname": "ରିଲାଏନସ୍ ଫାଉଣ୍ଡେସନ ",
      "location": "ଭୋଳାନାଥ ବିଦ୍ୟାଳୟ ପରିସର ",
      "map": "https://maps.app.goo.gl/N7CzsLApDDeQFp1P8",
      "date": "5/7/2025"
    },
    {
      "id": "100",
      "organisationname": "ଜିନ୍ଦଲ ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ ",
      "map": "https://maps.app.goo.gl/U6ErBJgsV6jxasj76",
      "date": "5/7/2025"
    },
    {
      "id": "11111",
      "organisationname": "ରିଲାଏନସ୍ ଫାଉଣ୍ଡେସନ ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ ",
      "map": "https://maps.app.goo.gl/94QctXZTGZgNgnKn9",
      "date": "5/7/2025"
    },
    {
      "id": "1222",
      "organisationname": "ବେଦାନ୍ତ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ, ତାରିଣୀ ମନ୍ଦିର ପାଖ ",
      "map": "https://maps.app.goo.gl/eMtP7GyuuCtWZBYY8",
      "date": "5/7/2025"
    },
    {
      "id": "140",
      "organisationname": "ଜେ.ଏସ.ପି.ଏଲ. ",
      "location": "ରେଲୱେ ଷ୍ଟେସନ୍ ",
      "map": "https://maps.app.goo.gl/8qpqYNpmNqTSuyyw8",
      "date": "5/7/2025"
    },
    {
      "id": "180",
      "organisationname": "ଅଠରନଳା ଉନ୍ନୟନ କମିଟି ",
      "location": "ଅଠରନଳା ",
      "map": "https://maps.app.goo.gl/dMA2TM2qyythFy3PA",
      "date": "5/7/2025"
    },
    {
      "id": "1111",
      "organisationname": "ରିଲାଏନସ୍",
      "location": "ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ କମପ୍ଲେକ୍ସ ",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "6/7/2025"
    },
    {
      "id": "999",
      "organisationname": "ରିଲାଏନସ୍ ଫାଉଣ୍ଡେସନ ",
      "location": "ଭୋଳାନାଥ ବିଦ୍ୟାଳୟ ପରିସର ",
      "map": "https://maps.app.goo.gl/N7CzsLApDDeQFp1P8",
      "date": "6/7/2025"
    },
    {
      "id": "1000",
      "organisationname": "ଜିନ୍ଦଲ ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ ",
      "map": "https://maps.app.goo.gl/U6ErBJgsV6jxasj76",
      "date": "6/7/2025"
    },
    {
      "id": "111111",
      "organisationname": "ରିଲାଏନସ୍ ଫାଉଣ୍ଡେସନ ",
      "location": "ପୁରୀ ବସ ଷ୍ଟାଣ୍ଡ ",
      "map": "https://maps.app.goo.gl/94QctXZTGZgNgnKn9",
      "date": "6/7/2025"
    },
    {
      "id": "1400",
      "organisationname": "ଜେ.ଏସ.ପି.ଏଲ. ",
      "location": "ରେଲୱେ ଷ୍ଟେସନ୍ ",
      "map": "https://maps.app.goo.gl/8qpqYNpmNqTSuyyw8",
      "date": "6/7/2025"
    },
    {
      "id": "1800",
      "organisationname": "ଅଠରନଳା ଉନ୍ନୟନ କମିଟି ",
      "location": "ଅଠରନଳା ",
      "map": "https://maps.app.goo.gl/dMA2TM2qyythFy3PA",
      "date": "6/7/2025"
    }
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [allFreeFood, setAllFreeFood] = useState([]);
  // const [groupedData, setGroupedData] = useState({});
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    const data = english_data;

    const filtered = data.filter(item =>
      item.organisationname.toLowerCase().includes(text.toLowerCase()) ||
      item.location.toLowerCase().includes(text.toLowerCase())
    );
    setAllFreeFood(filtered);
  };

  const handleClear = () => {
    setSpinner(true);
    setSearchText('');
    setTimeout(() => {
      const data = english_data;
      setAllFreeFood(data);
      setSpinner(false);
    }, 500);
  };

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        // if (value === 'Odia') {
        //   setAllFreeFood(odia_data);
        // } else if (value === 'English') {
        //   setAllFreeFood(english_data);
        // }
        setAllFreeFood(english_data);
        setSelectedLanguage(value);
      }
    } catch (error) {
      // console.log('Error loading language from storage:', error);
    }
  };

  // const groupByDate = (data) => {
  //   const filteredData = data.filter(item =>
  //     item &&
  //     typeof item.organisationname === 'string' &&
  //     item.organisationname.trim() !== '' &&
  //     typeof item.location === 'string' &&
  //     item.location.trim() !== '' &&
  //     moment(item.date, 'D/M/YYYY', true).isValid()
  //   );

  //   const grouped = filteredData.reduce((acc, item) => {
  //     if (!acc[item.date]) {
  //       acc[item.date] = [];
  //     }
  //     acc[item.date].push(item);
  //     return acc;
  //   }, {});

  //   // Sort keys
  //   const sorted = Object.keys(grouped)
  //     .sort((a, b) => moment(a, 'D/M/YYYY').toDate() - moment(b, 'D/M/YYYY').toDate())
  //     .reduce((acc, key) => {
  //       acc[key] = grouped[key];
  //       return acc;
  //     }, {});

  //   setGroupedData(sorted);
  // };

  // const flattenGroupedData = () => {
  //   const flatData = [];

  //   Object.keys(groupedData || {}).sort((a, b) =>
  //     moment(a, 'D/M/YYYY').toDate() - moment(b, 'D/M/YYYY').toDate()
  //   ).forEach(date => {
  //     const items = Array.isArray(groupedData[date]) ? groupedData[date] : [];

  //     // Filter out invalid items first
  //     const validItems = items.filter(
  //       item =>
  //         item &&
  //         typeof item.organisationname === 'string' &&
  //         item.organisationname.trim() !== '' &&
  //         typeof item.location === 'string' &&
  //         item.location.trim() !== '' &&
  //         moment(item.date, 'D/M/YYYY', true).isValid()
  //     );

  //     if (validItems.length > 0) {
  //       flatData.push({ type: 'header', date });

  //       validItems.forEach(item => {
  //         flatData.push({ ...item, type: 'item' });
  //       });
  //     }
  //   });

  //   return flatData;
  // };

  // const flatListData = flattenGroupedData();

  // useEffect(() => {
  //   filterDataByDate(selectedDate);
  // }, [allFreeFood, selectedDate]);

  // const filterDataByDate = (date) => {
  //   const formatted = moment(date).format('D/M/YYYY');
  //   const filtered = allFreeFood.filter(item => item.date === formatted);
  //   setFilteredFood(filtered);
  // };

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
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଖାଦ୍ୟ' : 'Food'}</Text>
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
              <Text style={{ color: '#ddd', fontSize: 14, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ନିଃଶୁଳ୍କ ଖାଦ୍ୟ ଉପଲବ୍ଧ ଅଞ୍ଚଳ ତଳେ ଦେଖନ୍ତୁ।' : "See below for the Free Food location."}</Text>
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
              <Image source={require('../../assets/image/freefood21.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
            </View>
          </View>
        </View>

        {/* Search Box */}
        <View style={{ paddingHorizontal: 16, marginTop: 20, marginBottom: 6 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
              elevation: 1,
            }}
          >
            <Ionicons name="search" size={20} color="#666" style={{ marginRight: 8 }} />

            <TextInput
              value={searchText}
              placeholder={'Enter Food Name...'}
              placeholderTextColor="#aaa"
              style={{
                flex: 1,
                height: 44,
                fontSize: 15,
                color: '#000',
                fontFamily: 'FiraSans-Regular',
              }}
              onChangeText={handleSearch}
            />
            {searchText !== '' && (
              <TouchableOpacity onPress={handleClear} style={{ marginLeft: 8 }}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {spinner ? (
          <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#341551" />
            <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
          </View>
        ) : (
          allFreeFood.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ fontSize: 14, color: '#777' }}>
                {selectedLanguage === 'Odia'
                  ? 'ଏହି ତାରିଖ ପାଇଁ କୌଣସି ତଥ୍ୟ ମିଳିଲାନାହିଁ'
                  : 'No data available for this date.'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={allFreeFood}
              scrollEnabled={false}
              keyExtractor={(item, index) =>
                item.type === 'item' && item.id ? item.id.toString() : `header-${index}`
              }
              renderItem={({ item, index }) => {
                const isEven = index % 2 === 0;
                const CardWrapper = isEven ? LinearGradient : View;
                const cardProps = isEven
                  ? {
                    colors: ['#F06292', '#FFA726'],
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0 },
                    style: styles.festivalCard,
                  }
                  : { style: styles.festivalCard };

                return (
                  <CardWrapper {...cardProps}>
                    <View style={styles.innerCard}>
                      <View style={styles.cardHeader}>
                        <Text style={[styles.cardTitle, { color: isEven ? "#fff" : "#000" }]}>{item.organisationname}</Text>
                      </View>
                      <Text style={[styles.cardSubTitle, { color: isEven ? "#fff" : "#000" }]}>{item.location}</Text>
                      <View style={styles.cardDetails}>
                        <MaterialIcons name="event" size={18} color={isEven ? "#fff" : "#000"} />
                        <Text style={[styles.cardDate, { color: isEven ? "#fff" : "#000" }]}>
                          {/* {moment(item.date, 'DD/MM/YYYY').format('DD MMM YYYY')} */}
                          {item.date}
                        </Text>
                      </View>
                      {/* <TouchableOpacity onPress={() => Linking.openURL(item.map)} style={{ position: 'absolute', right: 10, bottom: 10 }}>
                        <FontAwesome5 name='directions' size={30} color={isEven ? "#fff" : "#000"} />
                      </TouchableOpacity> */}
                    </View>
                  </CardWrapper>
                );
              }}
            />
          )
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
  },
  festivalCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden', // important for gradient and border radius!
  },

  innerCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'transparent', // so gradient shows if it's even item
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },

  cardTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'FiraSans-Medium',
  },

  cardSubTitle: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'FiraSans-Medium',
  },

  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  cardDate: {
    fontSize: 15,
    color: '#eeeeee', // lighter text on gradient
    marginLeft: 8,
    fontFamily: 'FiraSans-Regular',
  },
});
