import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Index = () => {

  const english_data = [
    {
      "id": "1",
      "organisationname": "Reliance",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "27/6/2025"
    },
    {
      "id": "4",
      "organisationname": " Vedant ",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "27/6/2025"
    },
    {
      "id": "7",
      "organisationname": "Nalco",
      "location": "Paradise hotel front",
      "map": "https://maps.app.goo.gl/qzDrgpbdyngNHaXX8",
      "date": "27/6/2025"
    },
    {
      "id": "8",
      "organisationname": "ARSS",
      "location": "Bagala Dharmsala",
      "map": "https://maps.app.goo.gl/7eBJ8hHs8ezLVfiP8",
      "date": "27/6/2025"
    },
    {
      "id": "9",
      "organisationname": "Akshaya Patra Foundation",
      "location": "Akshaya Patra Foundation building front",
      "map": "https://maps.app.goo.gl/7AyQAYqBTomWtBuh6",
      "date": "27/6/2025"
    },
    {
      "id": "10",
      "organisationname": "Maa Hingula Arnna Bhoga Committee",
      "location": "Balagandi",
      "map": "https://maps.app.goo.gl/MpC3PSt9W152LhUC6",
      "date": "27/6/2025"
    },
    {
      "id": "11",
      "organisationname": "Rotary Club",
      "location": "Medical Chack",
      "map": "https://maps.app.goo.gl/b9WYioBNoF9QKtgcA",
      "date": "27/6/2025"
    },
    {
      "id": "12",
      "organisationname": "SNM Charitable Trust",
      "location": "Badashankha",
      "map": "https://maps.app.goo.gl/tYv6WEXWZDoGGywC8",
      "date": "27/6/2025"
    },
    {
      "id": "13",
      "organisationname": "Reliance Foundation",
      "location": "Bholanath School",
      "map": "https://maps.app.goo.gl/N7CzsLApDDeQFp1P8",
      "date": "27/6/2025"
    },
    {
      "id": "16",
      "organisationname": "Jindal",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/U6ErBJgsV6jxasj76",
      "date": "27/6/2025"
    },
    {
      "id": "19",
      "organisationname": "Reliance Foundation",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/94QctXZTGZgNgnKn9",
      "date": "27/6/2025"
    },
    {
      "id": "22",
      "organisationname": "Vedant",
      "location": "Puri Bus Stand, Near Tarini Temple",
      "map": "https://maps.app.goo.gl/eMtP7GyuuCtWZBYY8",
      "date": "27/6/2025"
    },
    {
      "id": "25",
      "organisationname": "Nalco",
      "location": "Railway station",
      "map": "https://maps.app.goo.gl/X9EbbkcnWPY2GyLY8",
      "date": "27/6/2025"
    },
    {
      "id": "26",
      "organisationname": "JSPL",
      "location": "Railway station",
      "map": "https://maps.app.goo.gl/8qpqYNpmNqTSuyyw8",
      "date": "27/6/2025"
    },
    {
      "id": "29",
      "organisationname": "Dolagovinda Malati Charitable Trust",
      "location": "Railway station",
      "map": "https://maps.app.goo.gl/4c8sXwKKrkEYbHCd6",
      "date": "27/6/2025"
    },
    {
      "id": "30",
      "organisationname": "Railway Station Auto Chalak Sangha",
      "location": "Railway station",
      "map": "https://maps.app.goo.gl/oNRVAehTzZ7Y1jtf7",
      "date": "27/6/2025"
    },
    {
      "id": "31",
      "organisationname": "OPEPA ESA",
      "location": "Ayurvedic College front",
      "map": "https://maps.app.goo.gl/HYD43YD1EyfGYVjS7",
      "date": "27/6/2025"
    },
    {
      "id": "32",
      "organisationname": "Atharnala Unayan Committee",
      "location": "Atharnala",
      "map": "https://maps.app.goo.gl/dMA2TM2qyythFy3PA",
      "date": "27/6/2025"
    },
    {
      "id": "35",
      "organisationname": "Kumbharpada Association",
      "location": "Near Kumbharpada Police Station",
      "map": "https://maps.app.goo.gl/TE28KmUa28jbMFQp9",
      "date": "27/6/2025"
    },
    {
      "id": "5",
      "organisationname": " Vedant ",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "4/7/2025"
    },
    {
      "id": "23",
      "organisationname": "Vedant",
      "location": "Puri Bus Stand, Near Tarini Temple",
      "map": "https://maps.app.goo.gl/eMtP7GyuuCtWZBYY8",
      "date": "4/7/2025"
    },
    {
      "id": "2",
      "organisationname": "Reliance",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "5/7/2025"
    },
    {
      "id": "6",
      "organisationname": " Vedant ",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "5/7/2025"
    },
    {
      "id": "14",
      "organisationname": "Reliance Foundation",
      "location": "Bholanath School",
      "map": "https://maps.app.goo.gl/N7CzsLApDDeQFp1P8",
      "date": "5/7/2025"
    },
    {
      "id": "17",
      "organisationname": "Jindal",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/U6ErBJgsV6jxasj76",
      "date": "5/7/2025"
    },
    {
      "id": "20",
      "organisationname": "Reliance Foundation",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/94QctXZTGZgNgnKn9",
      "date": "5/7/2025"
    },
    {
      "id": "24",
      "organisationname": "Vedant",
      "location": "Puri Bus Stand, Near Tarini Temple",
      "map": "https://maps.app.goo.gl/eMtP7GyuuCtWZBYY8",
      "date": "5/7/2025"
    },
    {
      "id": "27",
      "organisationname": "JSPL",
      "location": "Railway station",
      "map": "https://maps.app.goo.gl/8qpqYNpmNqTSuyyw8",
      "date": "5/7/2025"
    },
    {
      "id": "33",
      "organisationname": "Atharnala Unayan Committee",
      "location": "Atharnala",
      "map": "https://maps.app.goo.gl/dMA2TM2qyythFy3PA",
      "date": "5/7/2025"
    },
    {
      "id": "3",
      "organisationname": "Reliance",
      "location": "JBPC",
      "map": "https://maps.app.goo.gl/MZHKm9ZU4DLPKdSw5",
      "date": "6/7/2025"
    },
    {
      "id": "15",
      "organisationname": "Reliance Foundation",
      "location": "Bholanath School",
      "map": "https://maps.app.goo.gl/N7CzsLApDDeQFp1P8",
      "date": "6/7/2025"
    },
    {
      "id": "18",
      "organisationname": "Jindal",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/U6ErBJgsV6jxasj76",
      "date": "6/7/2025"
    },
    {
      "id": "21",
      "organisationname": "Reliance Foundation",
      "location": "Puri Bus Stand",
      "map": "https://maps.app.goo.gl/94QctXZTGZgNgnKn9",
      "date": "6/7/2025"
    },
    {
      "id": "28",
      "organisationname": "JSPL",
      "location": "Railway station",
      "map": "https://maps.app.goo.gl/8qpqYNpmNqTSuyyw8",
      "date": "6/7/2025"
    },
    {
      "id": "34",
      "organisationname": "Atharnala Unayan Committee",
      "location": "Atharnala",
      "map": "https://maps.app.goo.gl/dMA2TM2qyythFy3PA",
      "date": "6/7/2025"
    }
  ];

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

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        if (value === 'Odia') {
          setAllFreeFood(odia_data);
        } else if (value === 'English') {
          setAllFreeFood(english_data);
        }
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

        {/* <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{
            backgroundColor: '#ff9900',
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center',
            marginVertical: 20,
            width: '90%',
            alignSelf: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14 }}>
            {moment(selectedDate).format('dddd, MMM D, YYYY')}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )} */}

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
                          {moment(item.date, 'DD/MM/YYYY').format('DD MMM YYYY')}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => Linking.openURL(item.map)} style={{ position: 'absolute', right: 10, bottom: 10 }}>
                        <FontAwesome5 name='directions' size={30} color={isEven ? "#fff" : "#000"} />
                      </TouchableOpacity>
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
