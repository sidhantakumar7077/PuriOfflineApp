import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Index = () => {

  const english_data = [
    {
      "organisation": "Art of Giving , Bhubaneswar",
      "location": "Bholanath Bidyapitha",
      "map_url": "https://maps.app.goo.gl/rYNKjnAw1bsNEFzh7",
      "service": "Bedded AC Hospital Facilities AMBULANCE SERVICES",
      "contact no": ""
    },
    {
      "organisation": "Art of Giving , Bhubaneswar",
      "location": "Town P.S",
      "map_url": "https://maps.app.goo.gl/4dgvByp5EgyFSczX6",
      "service": "AMBULANCE SERVICES",
      "contact no": ""
    },
    {
      "organisation": "Bharat Scout and Guide",
      "location": "Infornt of Balabhadra Chariot",
      "map_url": "https://maps.app.goo.gl/GJbJ18wkmDmNco4CA",
      "service": "STRETCHER SERVICES , VOLUNTEERS SERVICES",
      "contact no": "9861236464"
    },
    {
      "organisation": "Bharat Scout and Guide",
      "location": "Behind Jagannath Chariot",
      "map_url": "https://maps.app.goo.gl/8EQ49em9cTSGvZgo8",
      "service": "STRETCHER SERVICES , VOLUNTEERS SERVICES",
      "contact no": "9861236464"
    },
    {
      "organisation": "Bharat Scout and Guide , Odisha , BBSR",
      "location": "Jagannath Temple to Gundicha Temple",
      "map_url": "",
      "service": "STRETCHER SERVICES",
      "contact no": ""
    },
    {
      "organisation": "Bhoomika,Eye Hospital,BBSR",
      "location": "Dudwala Dharmasala",
      "map_url": "https://maps.app.goo.gl/CkfHdh8X1ZgeiiPFA",
      "service": "AMBULANCE SERVICES , FIRST AID SERVICES",
      "contact no": "9437230032"
    },
    {
      "organisation": "CARE Hospital, BBSR",
      "location": "Light House Square",
      "map_url": "https://maps.app.goo.gl/HryBvAAadpcLaTt79",
      "service": "AMBULANCE SERVICES , FIRST AID SERVICES , STRETCHER SERVICES",
      "contact no": "9438183368"
    },
    {
      "organisation": "Hi-Tech Hospital , BBSR",
      "location": "Uttara Dwara",
      "map_url": "https://maps.app.goo.gl/HvSwDu3eKSX1XFh57",
      "service": "Bedded AC Hospital Facilities",
      "contact no": ""
    },
    {
      "organisation": "Hi-Tech Hospital , BBSR",
      "location": "Inside Bus Stand Premises",
      "map_url": "https://maps.app.goo.gl/mtTfFeK96C3MQrdj7",
      "service": "Bedded AC Hospital Facilities , AMBULANCE SERVICES",
      "contact no": ""
    },
    {
      "organisation": "Indian Redcross Society",
      "location": "Gundicha Temple",
      "map_url": "https://maps.app.goo.gl/LdaC5ZBuUo9YNhJW7",
      "service": "VOLUNTEERS SERVICES",
      "contact no": ""
    },
    {
      "organisation": "Indian Redcross Society",
      "location": "Town P.S",
      "map_url": "https://maps.app.goo.gl/4dgvByp5EgyFSczX6",
      "service": "VOLUNTEERS SERVICES",
      "contact no": ""
    },
    {
      "organisation": "Indian Redcross Society",
      "location": "Utkal Hindi Bidyapitha",
      "map_url": "https://maps.app.goo.gl/vm395eHMbzeSKcBU8",
      "service": "Bedded AC Hospital Facilities",
      "contact no": "6371822801, 907863013"
    },
    {
      "organisation": "Kalinga Hospital , BBSR",
      "location": "Swastik Mandap(Badasankha)",
      "map_url": "https://maps.app.goo.gl/bZ7NQqws6KK7LEBY6",
      "service": "AMBULANCE SERVICES , FIRST AID SERVICES",
      "contact no": ""
    },
    {
      "organisation": "Manipal Hospital , BBSR",
      "location": "D.H.H. , Puri",
      "map_url": "https://maps.app.goo.gl/gPG8riG52GfpAc5n7",
      "service": "Bike Ambulance",
      "contact no": ""
    },
    {
      "organisation": "Manipal Hospital , BBSR",
      "location": "VIP Movement",
      "map_url": "",
      "service": "Bike Ambulance",
      "contact no": ""
    },
    {
      "organisation": "Manipal Hospital , BBSR",
      "location": "Puri Hotel",
      "map_url": "https://maps.app.goo.gl/tS6CZyZRvyd1eAuPA",
      "service": "AMBULANCE SERVICES , FIRST AID CENTRES",
      "contact no": "9938765068"
    },
    {
      "organisation": "Manjari Devi College of Nursingh , BBSR",
      "location": "Naka Chana Dwara",
      "map_url": "https://maps.app.goo.gl/fSSe7Dq9o7t34Gpc9",
      "service": "AMBULANCE SERVICES , FIRST AID CENTRES",
      "contact no": ""
    },
    {
      "organisation": "Sevashree , Cuttack",
      "location": "Utkal Hindi Bidyapitha",
      "map_url": "https://maps.app.goo.gl/vm395eHMbzeSKcBU8",
      "service": "Bedded AC Hospital Facilities",
      "contact no": "9861170814"
    },
    {
      "organisation": "Shree Hospital, BBSR",
      "location": "Nilachal Bhakta Nivas",
      "map_url": "https://maps.app.goo.gl/HmYW6ECwi13UmdUb6",
      "service": "AMBULANCE SERVICES , FIRST AID CENTRES",
      "contact no": "7008898319 , 9040096451"
    },
    {
      "organisation": "Shri Jagannath Sanskrit University , Puri",
      "location": "Balagandi(Near Brundabati Niwas)",
      "map_url": "https://maps.app.goo.gl/rfXZDHcTQ2Ru7Gk97",
      "service": "AMBULANCE SERVICES , STRETCHER SERVICES , VOLUNTEERS SERVICES , FIRST AID CENTRES",
      "contact no": ""
    },
    {
      "organisation": "St. John Ambulance, BBSR",
      "location": "Infornt of Vithal Kamat, Sea Beach",
      "map_url": "https://maps.app.goo.gl/xnwWo5W4TRHTNYgj6",
      "service": "AMBULANCE SERVICES",
      "contact no": ""
    },
    {
      "organisation": "St. John Ambulance, BBSR",
      "location": "Railway Station",
      "map_url": "https://maps.app.goo.gl/xZFmVV7ETDFeedcb8",
      "service": "FIRST AID CENTRES",
      "contact no": ""
    },
    {
      "organisation": "St. John Ambulance, BBSR",
      "location": "Marichikot Chhaka",
      "map_url": "https://maps.app.goo.gl/6izpTGyZMYsB91Rc8",
      "service": "AMBULANCE SERVICES , VOLUNTEERS SERVICES , FIRST AID CENTRES",
      "contact no": ""
    },
    {
      "organisation": "St. John Ambulance, BBSR",
      "location": "Infornt of Balabhadra Chariot",
      "map_url": "https://maps.app.goo.gl/GJbJ18wkmDmNco4CA",
      "service": "AMBULANCE SERVICES",
      "contact no": ""
    },
    {
      "organisation": "St. John Ambulance, BBSR",
      "location": "Behind Jagannath Chariot",
      "map_url": "https://maps.app.goo.gl/8EQ49em9cTSGvZgo8",
      "service": "AMBULANCE SERVICES",
      "contact no": ""
    },
    {
      "organisation": "SUM Ultimate Hosp , BBSR",
      "location": "Infornt of Vithal Kamat, Sea Beach",
      "map_url": "https://maps.app.goo.gl/xnwWo5W4TRHTNYgj6",
      "service": "AMBULANCE SERVICES",
      "contact no": ""
    },
    {
      "organisation": "Utkal Hospital , BBSR",
      "location": "Puri Hotel",
      "map_url": "https://maps.app.goo.gl/tS6CZyZRvyd1eAuPA",
      "service": "AMBULANCE SERVICES , FIRST AID CENTRES",
      "contact no": "9439857942 , 8847862877"
    }
  ];

  const odia_data = [
    {
      "id": "1",
      "police_station": "ସିଟି ବିଭାଗ",
      "location": "ସବ୍‌ ଡିଭିଜନାଲ୍ ପୁଲିସ୍ ଅଫିସ୍ (ସିଟି), ପୁରୀ",
      "contact": "୦୬୭୫୨-୨୨୨୦୪୩",
      "map": "https://maps.app.goo.gl/JoC8mv4JZBDXcz3z5",
      "": ""
    },
    {
      "id": "2",
      "police_station": "ବଳିଆପଣ୍ଡା ଥାନା",
      "location": "ବଳିଆପଣ୍ଡା, ଥାନା - ବଳିଆପଣ୍ଡା, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୦୦୧",
      "contact": "୦୬୭୫୨-୨୨୨୦୪୩",
      "map": "https://maps.app.goo.gl/uuPekTF7jzywfE7U7",
      "": ""
    },
    {
      "id": "3",
      "police_station": "ବାସେଳିସାହି ଥାନା",
      "location": "ବାସେଳିସାହି, ଥାନା - ବାସେଳିସାହି, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୦୦୧",
      "contact": "୦୬୭୫୨-୨୩୦୧୯୧",
      "map": "https://maps.app.goo.gl/1z9MsqcQfYi1kGZQ9",
      "": ""
    },
    {
      "id": "4",
      "police_station": "କୁମ୍ଭାରପଡା ଥାନା",
      "location": "କୁମ୍ଭାରପଡା, ଥାନା - କୁମ୍ଭାରପଡା, ଜିଲ୍ଲା - ପୁରୀ",
      "contact": "୦୬୭୫୨-୨୨୨୦୧୪",
      "map": "https://maps.app.goo.gl/v8tHRCBpC6H9rDX37",
      "": ""
    },
    {
      "id": "5",
      "police_station": "ସମୁଦ୍ରତଟ ଥାନା",
      "location": "ସମୁଦ୍ରକୂଳ, ଡାକଘର - ମୋଚିସାହି ଛକ, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୦୦୧",
      "contact": "୦୬୭୫୨-୨୨୨୦୨୫",
      "map": "https://maps.app.goo.gl/HHEiVQvdxHvfpmtr5",
      "": ""
    },
    {
      "id": "6",
      "police_station": "ସିଂହଦ୍ୱାର ଥାନା",
      "location": "ସିଂହଦ୍ୱାର, ଡାକଘର - ମୋଚିସାହି ଛକ, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୦୦୧",
      "contact": "୦୬୭୫୨-୨୫୨୪୭୦",
      "map": "https://maps.app.goo.gl/kwqgs5PPqPijkmLD9",
      "": ""
    },
    {
      "id": "7",
      "police_station": "ପୁରୀ ସହର ଥାନା",
      "location": "ଗ୍ରାଣ୍ଡ ରୋଡ, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୦୦୧",
      "contact": "୦୬୭୫୨-୨୨୨୦୩୯",
      "map": "https://maps.app.goo.gl/LRgY7QfPVd3WRWfQ9",
      "": ""
    },
    {
      "id": "8",
      "police_station": "ବିଶେଷ ଥାନା (ଊର୍ଜା), ପୁରୀ",
      "location": "ସିଇଏସ୍‌ୟୁ କ୍ୟାମ୍ପସ୍, ପିନ୍ - ୭୫୨୦୦୨",
      "contact": "୦୬୭୫୨-୨୨୩୫୨୫",
      "map": "",
      "": ""
    },
    {
      "id": "9",
      "police_station": "ତାଳବଣିଆ ଥାନା, ପୁରୀ",
      "location": "ତାଳବଣିଆ, ପିନ୍ - ୭୫୨୦୦୨",
      "contact": "୦୬୭୫୨-୨୫୧୧୫୮",
      "map": "https://maps.app.goo.gl/tsShTAYFmAZj9c41A",
      "": ""
    },
    {
      "id": "10",
      "police_station": "ଟ୍ରାଫିକ୍ ଥାନା",
      "location": "ଗ୍ରାଣ୍ଡ ରୋଡ ମେଡିକାଲ୍ ଚକ, ପୁରୀ",
      "contact": "୦୬୭୫୨-୨୨୮୮୮୮ (କାର୍ଯ୍ୟାଳୟ)",
      "map": "",
      "": ""
    },
    {
      "id": "11",
      "police_station": "ଏସ୍‌ଡିପିଓ, ସଦର",
      "location": "ସବ୍‌ ଡିଭିଜନାଲ୍ ପୁଲିସ୍ ଅଫିସ୍ (ସଦର), ପୁରୀ",
      "contact": "୦୬୭୫୨-୨୨୩୫୬୩ (କାର୍ଯ୍ୟାଳୟ)",
      "map": "https://maps.app.goo.gl/2KxVPeEjDaRJaKnB9",
      "": ""
    },
    {
      "id": "12",
      "police_station": "ବ୍ରହ୍ମଗିରି ଥାନା",
      "location": "ବ୍ରହ୍ମଗିରି, ଥାନା - ବ୍ରହ୍ମଗିରି, ଜିଲ୍ଲା - ପୁରୀ",
      "contact": "୦୬୭୫୨-୨୩୫୫୩୦",
      "map": "https://maps.app.goo.gl/Do9pAvszKyyMmst79",
      "": ""
    },
    {
      "id": "13",
      "police_station": "ଚନ୍ଦନପୁର ଥାନା",
      "location": "ଚନ୍ଦନପୁର, ଥାନା - ଚନ୍ଦନପୁର, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୦୧୨",
      "contact": "୦୬୭୫୨-୨୭୪୪୩୫",
      "map": "https://maps.app.goo.gl/HEuXG9armZ5wHoiA9",
      "": ""
    },
    {
      "id": "14",
      "police_station": "ଗଡିଶଗଡ଼ ଥାନା",
      "location": "ଗଡିଶଗଡ଼, ଡାକଘର - ଗଡିଶଗଡ଼, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୦୧୭",
      "contact": "୦୬୭୫୨-୨୧୪୦୪୦",
      "map": "https://maps.app.goo.gl/jYJYUnhoyGhSFSMM8",
      "": ""
    },
    {
      "id": "15",
      "police_station": "କୃଷ୍ଣପ୍ରସାଦ ଥାନା",
      "location": "କୃଷ୍ଣପ୍ରସାଦ ଗଡ଼, ଡାକଘର - ପାଣିକୁଡ଼ା, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୦୩୦",
      "contact": "୦୬୭୫୬-୨୧୬୦୮୦",
      "map": "https://maps.app.goo.gl/cYRKZUEqXQRRFbZn7",
      "": ""
    },
    {
      "id": "16",
      "police_station": "ଅରଖାକୁଡ଼ା ମେରାଇନ୍ ଥାନା",
      "location": "ବ୍ରହ୍ମଗିରି, ଥାନା - ବ୍ରହ୍ମଗିରି, ଜିଲ୍ଲା - ପୁରୀ",
      "contact": "୦୬୭୫୨-୨୨୫୫୫୯",
      "map": "https://maps.app.goo.gl/W6fcbKejW4ZAY5e37",
      "": ""
    },
    {
      "id": "17",
      "police_station": "ସଦର ଥାନା",
      "location": "ପୁଲିସ୍ ଲାଇନ୍, ଡାକଘର - ପୁଲିସ୍ ଲାଇନ୍, ଜିଲ୍ଲା - ପୁରୀ",
      "contact": "୦୬୭୫୨-୨୨୨୦୪୩",
      "map": "https://maps.app.goo.gl/i5fExdRLZdToPpG19",
      "": ""
    },
    {
      "id": "18",
      "police_station": "ପେଣ୍ଠକଟା ମେରାଇନ୍ ଥାନା",
      "location": "",
      "contact": "୦୬୭୫୨-୨୨୫୫୫୯",
      "map": "https://maps.app.goo.gl/YNprsSMG4dQy9ZQPA",
      "": ""
    },
    {
      "id": "19",
      "police_station": "ଏସ୍‌ଡିପିଓ, ପିପିଲି",
      "location": "ସବ୍‌ ଡିଭିଜନାଲ୍ ପୁଲିସ୍ ଅଫିସ୍ (ପିପିଲି), ପୁରୀ",
      "contact": "୦୬୭୫୮-୨୪୨୮୧୩ (କାର୍ଯ୍ୟାଳୟ)",
      "map": "https://maps.app.goo.gl/ZCKUCkQdve9F1do18",
      "": ""
    },
    {
      "id": "20",
      "police_station": "ଡେଲାଙ୍ଗ ଥାନା",
      "location": "ଡେଲାଙ୍ଗ, ଥାନା - ଡେଲାଙ୍ଗ, ଜିଲ୍ଲା - ପୁରୀ",
      "contact": "୦୬୭୫୮-୨୪୨୨୨୨",
      "map": "https://maps.app.goo.gl/UqkhqCZh5nHnz7xC9",
      "": ""
    },
    {
      "id": "21",
      "police_station": "ବଳଙ୍ଗ ଥାନା",
      "location": "ବଳଙ୍ଗ, ଥାନା - ବଳଙ୍ଗ, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୧୦୫",
      "contact": "୦୬୭୫୮-୨୫୯୨୩୬",
      "map": "https://maps.app.goo.gl/ojLDoPpbXqdSEm4P6",
      "": ""
    },
    {
      "id": "22",
      "police_station": "କଣାସ ଥାନା",
      "location": "କଣାସ, ଥାନା - କଣାସ, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୧୦୫",
      "contact": "୦୬୭୫୮-୨୫୯୨୩୬",
      "map": "https://maps.app.goo.gl/LugJnSiXv97ABmyq7",
      "": ""
    },
    {
      "id": "23",
      "police_station": "ପିପିଲି ଥାନା",
      "location": "ପିପିଲି, ଥାନା - ପିପିଲି, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୧୦୪",
      "contact": "୦୬୭୫୮-୨୪୦୭୨୨",
      "map": "https://maps.app.goo.gl/Riv3s5MJxn4mX1cX8",
      "": ""
    },
    {
      "id": "24",
      "police_station": "ସତ୍ୟବାଦୀ ଥାନା",
      "location": "ସାଖିଗୋପାଳ, ଡାକଘର - ସତ୍ୟବାଦୀ, ପିନ୍ - ୭୫୨୦୧୪",
      "contact": "୦୬୭୫୨-୨୭୨୨୨୮",
      "map": "https://maps.app.goo.gl/E3H3AYYSZdNLqQD87",
      "": ""
    },
    {
      "id": "25",
      "police_station": "ଏସ୍‌ଡିପିଓ, ନିମାପଡ଼ା",
      "location": "ସବ୍‌ ଡିଭିଜନାଲ୍ ପୁଲିସ୍ ଅଫିସ୍ (ନିମାପଡ଼ା), ପୁରୀ",
      "contact": "୦୬୭୫୮-୨୫୦୨୯୫",
      "map": "https://maps.app.goo.gl/dGcRAb4EKxxHiJoBA",
      "": ""
    },
    {
      "id": "26",
      "police_station": "ଅସ୍ତରଙ୍ଗ ଥାନା",
      "location": "ଅସ୍ତରଙ୍ଗ, ଥାନା - ଅସ୍ତରଙ୍ଗ, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୧୦୯",
      "contact": "୦୬୭୫୮-୨୩୦୩୧୪",
      "map": "https://maps.app.goo.gl/v7CjRRL6rb1gvvTc9",
      "": ""
    },
    {
      "id": "27",
      "police_station": "ଗୋପ ଥାନା",
      "location": "ଗୋପ, ଥାନା - ଗୋପ, ଜିଲ୍ଲା - ପୁରୀ",
      "contact": "୦୬୭୫୮-୨୫୭୪୬୫",
      "map": "https://maps.app.goo.gl/WDgp9BeEAApTjFFT7",
      "": ""
    },
    {
      "id": "28",
      "police_station": "କାକଟପୁର ଥାନା",
      "location": "କାକଟପୁର, ଥାନା - କାକଟପୁର, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୧୦୮",
      "contact": "୦୬୭୫୮-୨୩୧୧୩୪",
      "map": "https://maps.app.goo.gl/iHYpGHXSd7dMpXgk7",
      "": ""
    },
    {
      "id": "29",
      "police_station": "କୋଣାର୍କ ଥାନା",
      "location": "କୋଣାର୍କ, ଥାନା - କୋଣାର୍କ, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୧୧୧",
      "contact": "୦୬୭୫୮-୨୩୬୮୨୫",
      "map": "https://maps.app.goo.gl/ZzbF69E8i7mgxpT87",
      "": ""
    },
    {
      "id": "30",
      "police_station": "ନିମାପଡ଼ା ଥାନା",
      "location": "ନିମାପଡ଼ା, ଥାନା - ନିମାପଡ଼ା, ଜିଲ୍ଲା - ପୁରୀ, ପିନ୍ - ୭୫୨୧୦୬",
      "contact": "୦୬୭୫୮-୨୫୦୨୨୩",
      "map": "https://maps.app.goo.gl/auc8CSyLENmfgD4B8",
      "": ""
    },
    {
      "id": "31",
      "police_station": "ରାମଚଣ୍ଡି ଥାନା",
      "location": "ରାମଚଣ୍ଡି, ଡାକଘର - ଖଳାକଟପାଟଣା, ପିନ୍ - ୭୫୨୧୧୧",
      "contact": "୦୬୭୫୮-୨୧୩୧୧୧",
      "map": "https://maps.app.goo.gl/go5T5hXFLT6EN9Sb9",
      "": ""
    },
    {
      "id": "32",
      "police_station": "ଅସ୍ତରଙ୍ଗ ମେରାଇନ୍ ଥାନା",
      "location": "ଅସ୍ତରଙ୍ଗ, ଥାନା - ଅସ୍ତରଙ୍ଗ, ଜିଲ୍ଲା - ପୁରୀ",
      "contact": "୯୭୭୬୮ ୪୧୧୩୫",
      "map": "https://maps.app.goo.gl/EY5skmwNaW2zfciA9",
      "": ""
    },
    {
      "id": "33",
      "police_station": "ଚନ୍ଦ୍ରଭାଗା ମେରାଇନ୍ ଥାନା",
      "location": "ରାମଚଣ୍ଡି, ଡାକଘର - ଖଳାକଟପାଟଣା, ପିନ୍ - ୭୫୨୧୧୧",
      "contact": "୮୩୨୮୮ ୨୪୮୧୮",
      "map": "https://maps.app.goo.gl/7KJymWuWkaTpVBHg7",
      "": ""
    }
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [allHospital, setAllHospital] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        if (value === 'Odia') {
          setAllHospital(odia_data);
        } else if (value === 'English') {
          setAllHospital(english_data);
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
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଆଶୁଚିକିତ୍ସା କେନ୍ଦ୍ର' : 'First Aid'}</Text>
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
              <Text style={{ color: '#ddd', fontSize: 14, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ତୁରନ୍ତ ଚିକିତ୍ସା ପାଇଁ ନିମ୍ନ ଆଶୁଚିକିତ୍ସା କେନ୍ଦ୍ରକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।' : "For any First Aid please go to the below places."}</Text>
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
              <Image source={require('../../assets/image/hospital.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          {allHospital.map((item, index) => (
            <View key={index} style={styles.card}>

              {/* Location */}
              {item.location ? (
                <>
                  <Text style={styles.titleText}>
                    {selectedLanguage === 'Odia' ? 'ଅବସ୍ଥାନ:' : 'Location:'}  {item.location}
                  </Text>
                </>
              ) : null}

              {/* Organization Name */}
              <Text style={styles.valueText}>{selectedLanguage === 'Odia' ? 'ସେବା ପ୍ରଦାନକାରୀ:' : 'Provider Name:'} {item.organisation}</Text>

              {/* Services */}
              {item.service ? (
                <>
                  <Text style={styles.labelText}>
                    {selectedLanguage === 'Odia' ? 'ସେବା:' : 'Service:'}
                  </Text>
                  <Text style={styles.valueText}>{item.service}</Text>
                </>
              ) : null}

              {/* Contact */}
              {item['contact no'] || item.contact ? (
                <>
                  <Text style={styles.labelText}>
                    {selectedLanguage === 'Odia' ? 'ଯୋଗାଯୋଗ:' : 'Contact:'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => linkPhone(item['contact no'] || item.contact)}
                  >
                    <Text style={[styles.valueText, { color: '#1e3a8a', fontWeight: 'bold' }]}>
                      {item['contact no'] || item.contact}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : null}

              {/* Map Button */}
              {(item.map || item.map_url) ? (
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => Linking.openURL(item.map || item.map_url)}
                >
                  <Text style={styles.mapButtonText}>
                    {selectedLanguage === 'Odia' ? 'ମାନଚିତ୍ର ଦେଖନ୍ତୁ' : 'View on Map'}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </View>

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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#341551',
    fontFamily: 'FiraSans-SemiBold',
    marginBottom: 6
  },
  labelText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
    fontFamily: 'FiraSans-Regular'
  },
  valueText: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'FiraSans-Regular'
  },
  mapButton: {
    marginTop: 10,
    backgroundColor: '#341551',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'FiraSans-Regular'
  }
});
