import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Index = () => {

  const english_data = [
    {
      "id": "1",
      "police_station": "City Division",
      "location": "Sub Divisional Police Office (City), Puri,",
      "contact": "",
      "map": "https://maps.app.goo.gl/JoC8mv4JZBDXcz3z5"
    },
    {
      "id": "2",
      "police_station": "BALIAPANDA POLICE STATION",
      "location": "At- Baliapanda, PS-Baliapanda, Dist-Puri,PIN-752001",
      "contact": "06752-222043",
      "map": "https://maps.app.goo.gl/uuPekTF7jzywfE7U7"
    },
    {
      "id": "3",
      "police_station": "Baselishahi Police Station",
      "location": "At- Baselisahi, PS-Baselisahi, Dist-Puri,PIN-752001",
      "contact": "06752-230191",
      "map": "https://maps.app.goo.gl/1z9MsqcQfYi1kGZQ9"
    },
    {
      "id": "4",
      "police_station": "Kumbharapada Police Station",
      "location": "At- Kumbharapada, PS-Kumbharapada, Dist-Puri",
      "contact": "06752-222014",
      "map": "https://maps.app.goo.gl/v8tHRCBpC6H9rDX37"
    },
    {
      "id": "5",
      "police_station": "SEA BEACH POLICE STATION",
      "location": "At-Seabeach,PO-Mochisahichhak,Dist-Puri,PIN-752001",
      "contact": "06752 - 222025",
      "map": "https://maps.app.goo.gl/HHEiVQvdxHvfpmtr5"
    },
    {
      "id": "6",
      "police_station": "Singhadawar Police Station",
      "location": "AT- Singhadwar,PO-MochisahiChhak,Dist-Puri,PIN-752001",
      "contact": "06752 - 252470",
      "map": "https://maps.app.goo.gl/kwqgs5PPqPijkmLD9"
    },
    {
      "id": "7",
      "police_station": "Puri Town Police Station",
      "location": "AT-Grand Road, Dist-Puri,PIN-752001",
      "contact": "06752 - 222039",
      "map": "https://maps.app.goo.gl/LRgY7QfPVd3WRWfQ9"
    },
    {
      "id": "8",
      "police_station": "Special Police Station(energy),Puri",
      "location": "Campus of CESU ,PIN-752002",
      "contact": "06752 - 223525",
      "map": ""
    },
    {
      "id": "9",
      "police_station": "Talabania Police Station, Puri",
      "location": "Talabania,PIN-752002",
      "contact": "06752-251158",
      "map": "https://maps.app.goo.gl/tsShTAYFmAZj9c41A"
    },
    {
      "id": "10",
      "police_station": "Traffic Police station",
      "location": "Grand Road Medical Square,Puri,",
      "contact": "06752-228888(O)",
      "map": ""
    },
    {
      "id": "11",
      "police_station": "SDPO, Sadar",
      "location": "Sub Divisional Police Office (Sadar), Puri",
      "contact": "06752-223563(O)",
      "map": "https://maps.app.goo.gl/2KxVPeEjDaRJaKnB9"
    },
    {
      "id": "12",
      "police_station": "Brahmagiri Police Station",
      "location": "At- Brahmagiri, PS-Brahmagiri, Dist-Puri",
      "contact": "06752-235530",
      "map": "https://maps.app.goo.gl/Do9pAvszKyyMmst79"
    },
    {
      "id": "13",
      "police_station": "Chandanapur Police Station",
      "location": "At- Chandanapur, PS-Chandanapur, Dist-Puri,PIN-752012",
      "contact": "06752-274435",
      "map": "https://maps.app.goo.gl/HEuXG9armZ5wHoiA9"
    },
    {
      "id": "14",
      "police_station": "Gadisagada Police Station",
      "location": "AT-Gadisagada,PO-Gadisagada,Dist-Puri,PIN-752017",
      "contact": "06752-214040",
      "map": "https://maps.app.goo.gl/jYJYUnhoyGhSFSMM8"
    },
    {
      "id": "15",
      "police_station": "Krushnaprsad Police Station",
      "location": "At- KrushnaprasadGard,PO-Panikuda,Dist-Puri,PIN-752030",
      "contact": "06756-216080",
      "map": "https://maps.app.goo.gl/cYRKZUEqXQRRFbZn7"
    },
    {
      "id": "16",
      "police_station": "Arakhakuda Marine Police Station",
      "location": "At- Brahmagiri, PS-Brahmagiri, Dist-Puri",
      "contact": "06752-225559",
      "map": "https://maps.app.goo.gl/W6fcbKejW4ZAY5e37"
    },
    {
      "id": "17",
      "police_station": "Sadar Police Station",
      "location": "At- Police Line,PO_Police Line,Dist-Puri",
      "contact": "06752-222043",
      "map": "https://maps.app.goo.gl/i5fExdRLZdToPpG19"
    },
    {
      "id": "18",
      "police_station": "Penthakata Marine Police Station",
      "location": "",
      "contact": "06752-225559",
      "map": "https://maps.app.goo.gl/YNprsSMG4dQy9ZQPA"
    },
    {
      "id": "19",
      "police_station": "SDPO, Pipili",
      "location": "Sub Divisional Police Office,Pipili, Puri",
      "contact": "06758-242813(O)",
      "map": "https://maps.app.goo.gl/ZCKUCkQdve9F1do18"
    },
    {
      "id": "20",
      "police_station": "Delanga Police Station",
      "location": "At- Delanga, PS-Delanga, Dist-Puri",
      "contact": "06758 - 242222",
      "map": "https://maps.app.goo.gl/UqkhqCZh5nHnz7xC9"
    },
    {
      "id": "21",
      "police_station": "Balanga Police Station",
      "location": "At- Balanga, PS-Balanga, Dist-Puri, PIN-752105",
      "contact": "06758-259236",
      "map": "https://maps.app.goo.gl/ojLDoPpbXqdSEm4P6"
    },
    {
      "id": "22",
      "police_station": "Kanas Police Station",
      "location": "At- Kanas, PS-Kanas , Dist-Puri, PIN-752105",
      "contact": "06758-259236",
      "map": "https://maps.app.goo.gl/LugJnSiXv97ABmyq7"
    },
    {
      "id": "23",
      "police_station": "Pipili police Station",
      "location": "At- Pipili, PS-Pipili, Dist-Puri,PIN-752104",
      "contact": "06758 - 240722",
      "map": "https://maps.app.goo.gl/Riv3s5MJxn4mX1cX8"
    },
    {
      "id": "24",
      "police_station": "Satyabadi Police Station",
      "location": "At-Sakhigopal,PO-Satyabadi,PIN-752014",
      "contact": "06752 - 272228",
      "map": "https://maps.app.goo.gl/E3H3AYYSZdNLqQD87"
    },
    {
      "id": "25",
      "police_station": "SDPO Nimapada",
      "location": "Sub Divisional Police Office Nimapada, Puri",
      "contact": "06758-250295",
      "map": "https://maps.app.goo.gl/dGcRAb4EKxxHiJoBA"
    },
    {
      "id": "26",
      "police_station": "ASTARANGA POLICE STATION",
      "location": "At- Astaranga, PS-Astaranga, Dist-Puri, PIN-752109",
      "contact": "06758 - 230314",
      "map": "https://maps.app.goo.gl/v7CjRRL6rb1gvvTc9"
    },
    {
      "id": "27",
      "police_station": "GOP Police Station",
      "location": "At- Gop, PS-Gop, Dist-Puri",
      "contact": "06758 - 257465",
      "map": "https://maps.app.goo.gl/WDgp9BeEAApTjFFT7"
    },
    {
      "id": "28",
      "police_station": "Kakatpur Police Station",
      "location": "At- Kakatpur, PS-Kakatpur, Dist-Puri,Pin-752108",
      "contact": "06758-231134",
      "map": "https://maps.app.goo.gl/iHYpGHXSd7dMpXgk7"
    },
    {
      "id": "29",
      "police_station": "Konark Police Station",
      "location": "At- Konark, PS-Konark, Dist-Puri,PIN- 752111",
      "contact": "06758-236825",
      "map": "https://maps.app.goo.gl/ZzbF69E8i7mgxpT87"
    },
    {
      "id": "30",
      "police_station": "Nimapada Police Station",
      "location": "At- Nimapada, PS-Nimapada, Dist-Puri,PIN-752106",
      "contact": "06758 - 250223",
      "map": "https://maps.app.goo.gl/auc8CSyLENmfgD4B8"
    },
    {
      "id": "31",
      "police_station": "Ramchandi Police Station",
      "location": "At-Ramachandi,PO- Khalakatapatana,PIN-752111",
      "contact": "06758-213111",
      "map": "https://maps.app.goo.gl/go5T5hXFLT6EN9Sb9"
    },
    {
      "id": "32",
      "police_station": "Astaranga Marine Police Station",
      "location": "At- Astaranga, PS-Astaranga, Dist-Puri",
      "contact": "97768 41135",
      "map": "https://maps.app.goo.gl/EY5skmwNaW2zfciA9"
    },
    {
      "id": "33",
      "police_station": "Chandrabhaga Marine Police Station",
      "location": "At-Ramachandi,PO- Khalakatapatana,PIN-752111",
      "contact": "83288 24818",
      "map": "https://maps.app.goo.gl/7KJymWuWkaTpVBHg7"
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

  const odia_policeOutPost = [
    {
      "id": "1",
      "location": "ଆଶ୍ରମ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8148463,85.8270648"
    },
    {
      "id": "2",
      "location": "ଜଟିଆ ବାବାଜୀ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8148277,85.8273863"
    },
    {
      "id": "3",
      "location": "ଗରୁଡ଼ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8196934,85.8329194"
    },
    {
      "id": "4",
      "location": "ମାଟିଆ ପଡ଼ା ଛକ ",
      "map": "https://www.google.com/maps?q=19.8182336,85.8401268"
    },
    {
      "id": "5",
      "location": "ବାନାମ୍ବର ଛକ  ",
      "map": "https://www.google.com/maps?q=19.8206542,85.8320715"
    },
    {
      "id": "6",
      "location": "ଦେବିଘାଟ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8151602,85.8242696"
    },
    {
      "id": "7",
      "location": "ଅଠରନଳା ",
      "map": "https://www.google.com/maps?q=19.8206311,85.8320812"
    },
    {
      "id": "8",
      "location": "ମଙ୍ଗଳାଘାଟ ",
      "map": "https://www.google.com/maps?q=19.8132055,85.8077432"
    },
    {
      "id": "9",
      "location": "ମାଟିତୋଟା ପାର୍କିଂ-୧ ",
      "map": "https://www.google.com/maps?q=19.8197391,85.8176231"
    },
    {
      "id": "10",
      "location": "ମାଟିତୋଟା ପାର୍କିଂ-୨ ",
      "map": "https://www.google.com/maps?q=19.8238057,85.8177596"
    },
    {
      "id": "11",
      "location": "ଶ୍ରୀ ସେତୁ ପ୍ରବେଶ ପଥ ",
      "map": "https://www.google.com/maps?q=19.8217985,85.8165204"
    },
    {
      "id": "12",
      "location": "ସବ୍ କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ -ଜେବିପିସି ",
      "map": "https://www.google.com/maps?q=19.8125932,85.8247367"
    },
    {
      "id": "13",
      "location": "ସବ୍ କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ - ବଡ଼ଶଙ୍ଖ ",
      "map": "https://www.google.com/maps?q=19.8142104,85.8334129"
    },
    {
      "id": "14",
      "location": "ହର୍ଟିକଲଚର ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8244630,85.8560756"
    },
    {
      "id": "15",
      "location": "ସବ୍ କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ - ତାଳବଣିଆ ",
      "map": "https://www.google.com/maps?q=19.8244630,85.8560756"
    },
    {
      "id": "16",
      "location": "ଗ୍ରୀଡ ଷ୍ଟେସନ୍ ",
      "map": "https://www.google.com/maps?q=19.8243113,85.8542741"
    },
    {
      "id": "17",
      "location": "ବାଲିଘାଟ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8241899,85.8502126"
    },
    {
      "id": "18",
      "location": "ସବ୍ କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ - ଗୁଣ୍ଡିଚା ବାଡ଼ି ",
      "map": "https://www.google.com/maps?q=19.8166818,85.8388377"
    },
    {
      "id": "19",
      "location": "ଶରଧା ବାଲି ",
      "map": "https://www.google.com/maps?q=19.8159576,85.8382962"
    },
    {
      "id": "20",
      "location": "ବସ ଷ୍ଟାଣ୍ଡ ପ୍ରବେଶ ପଥ ",
      "map": "https://www.google.com/maps?q=19.8156093,85.8383730"
    },
    {
      "id": "21",
      "location": "ବସ ଷ୍ଟାଣ୍ଡ ପଛ ଦ୍ବାର ",
      "map": "https://www.google.com/maps?q=19.8145719,85.8394445"
    },
    {
      "id": "22",
      "location": "ନାକଚଣା ଦ୍ବାର ",
      "map": "https://www.google.com/maps?q=19.8158005,85.8390905"
    },
    {
      "id": "23",
      "location": "ତାଳବଣିଆ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8128030,85.8500862"
    },
    {
      "id": "24",
      "location": "ଇଣ୍ଡୋର ଷ୍ଟାଡିୟମ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8098051,85.8536076"
    },
    {
      "id": "25",
      "location": "ବିଧାନସଭା ଅତିଥି ଭବନ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8083787,85.8495937"
    },
    {
      "id": "26",
      "location": "ଆଇଟିଆଇ ଛକ",
      "map": "https://www.google.com/maps?q=19.8088427,85.8483911"
    },
    {
      "id": "27",
      "location": "ଭୁଦାନ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8110479,85.8509361"
    },
    {
      "id": "28",
      "location": "ବିଏନଆର ଛକ ",
      "map": "https://www.google.com/maps?q=19.8019291,85.8390767"
    },
    {
      "id": "29",
      "location": "ପେଣ୍ଠ କଟା ଛକ ",
      "map": "https://www.google.com/maps?q=19.8052010,85.8512044"
    },
    {
      "id": "30",
      "location": "ହେଲିପ୍ୟାଡ଼ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8102237,85.8477601"
    },
    {
      "id": "31",
      "location": "କେନ୍ଦ୍ର ବିଦ୍ୟାଳୟ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8149580,85.8498136"
    },
    {
      "id": "32",
      "location": "ତୋଷାଳି ",
      "map": "https://www.google.com/maps?q=19.8360428,85.8875637"
    },
    {
      "id": "33",
      "location": "ସୁରଜ ମଲ୍ଲ ସାହା କଲେଜ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8118709,85.7933712"
    },
    {
      "id": "34",
      "location": "ସବ୍ କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ - ଷ୍ଟରଲିଂ ",
      "map": "https://www.google.com/maps?q=19.7858482,85.7872598"
    },
    {
      "id": "35",
      "location": "ଷ୍ଟରଲିଂ ଛକ ପାର୍କିଂ -୧ ",
      "map": "https://www.google.com/maps?q=19.7865546,85.7873423"
    },
    {
      "id": "36",
      "location": "ଷ୍ଟରଲିଂ ଛକ ପାର୍କିଂ -୨ ",
      "map": "https://www.google.com/maps?q=19.7863981,85.7869745"
    },
    {
      "id": "37",
      "location": "ଷ୍ଟରଲିଂ ଛକ ପାର୍କିଂ -୩ ",
      "map": "https://www.google.com/maps?q=19.7858482,85.7872598"
    },
    {
      "id": "38",
      "location": "ଲାଇଟ ହାଉସ ",
      "map": "https://www.google.com/maps?q=19.7892642,85.8059280"
    },
    {
      "id": "39",
      "location": "ଯାତ୍ରିକା ",
      "map": "https://www.google.com/maps?q=19.7903009,85.8087118"
    },
    {
      "id": "40",
      "location": "ନାଲି ପଡ଼ିଆ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.7915063,85.8082367"
    },
    {
      "id": "41",
      "location": "ଦିଗବାରେଣୀ ",
      "map": "https://www.google.com/maps?q=19.7956254,85.8255936"
    },
    {
      "id": "42",
      "location": "ଶ୍ରୀ ସେତୁ ପ୍ରବେଶ ପଥ ",
      "map": "https://www.google.com/maps?q=19.8217985,85.8165204"
    },
    {
      "id": "43",
      "location": "ସ୍ବାମୀ ନାରାୟଣ ମନ୍ଦିର ",
      "map": "https://www.google.com/maps?q=19.8021376,85.8421405"
    },
    {
      "id": "44",
      "location": "ଲୋକନାଥ ମନ୍ଦିର ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8027894,85.8027603"
    },
    {
      "id": "45",
      "location": "ଗଦାଧର ଉଚ୍ଚ ବିଦ୍ୟାଳୟ",
      "map": "https://www.google.com/maps?q=19.8040092,85.8108368"
    },
    {
      "id": "46",
      "location": "ପୁରୁଣା ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8101868,85.8249201"
    },
    {
      "id": "47",
      "location": "ସବ୍ କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ - ଗଦାଧର ଉଚ୍ଚ ବିଦ୍ୟାଳୟ",
      "map": "https://www.google.com/maps?q=19.8040414,85.8109400"
    },
    {
      "id": "48",
      "location": "ମନ୍ଦିର ଅଫିସ ",
      "map": "https://www.google.com/maps?q=19.8047350,85.8193937"
    },
    {
      "id": "49",
      "location": "ଜଗବଳିଆ ଲଜ୍ ",
      "map": "https://www.google.com/maps?q=19.8046464,85.8198497"
    },
    {
      "id": "50",
      "location": "ବାଟଗାଁ ",
      "map": "https://www.google.com/maps?q=19.8515791,85.8363989"
    },
    {
      "id": "51",
      "location": "ମାରିନା ବିଚ୍ ରିସର୍ଟ ",
      "map": "https://www.google.com/maps?q=19.7876168,85.8007614"
    },
    {
      "id": "52",
      "location": "ସମଙ୍ଗ ଗାଁ ",
      "map": "https://www.google.com/maps?q=19.8418599,85.8654801"
    },
    {
      "id": "53",
      "location": "ବାଇଦାସ ନଗର ଛକ ",
      "map": "https://www.google.com/maps?q=19.8359557,85.8872703"
    },
    {
      "id": "54",
      "location": "କୋକୋ ପାମ୍ ",
      "map": "https://www.google.com/maps?q=19.7891200,85.8053433"
    },
    {
      "id": "55",
      "location": "କାଠପୋଲ ",
      "map": "https://www.google.com/maps?q=19.8688651,85.8269337"
    },
    {
      "id": "56",
      "location": "ଝାଡେଶ୍ଵରୀ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8080204,85.8330652"
    },
    {
      "id": "57",
      "location": "ସୁବାସ ବୋଷ ଛକ ",
      "map": "https://www.google.com/maps?q=19.7998664,85.8315327"
    },
    {
      "id": "58",
      "location": "ନିଳାଚଳ ଅଶୋକ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.7997219,85.8317037"
    },
    {
      "id": "59",
      "location": "ବ୍ଲୁ ଫ୍ଲାଗ ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.7995074,85.8302147"
    },
    {
      "id": "60",
      "location": "ଗାଣ୍ଡୁଆ ଚଉରା ଛକ ",
      "map": "https://www.google.com/maps?q=19.8031266,85.8176536"
    },
    {
      "id": "61",
      "location": "ଗଡ଼ନ୍ତି ଛକ ",
      "map": "https://www.google.com/maps?q=19.8059438,85.8171768"
    },
    {
      "id": "62",
      "location": "ମାର୍କେଟ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8102966,85.8251293"
    },
    {
      "id": "63",
      "location": "ଦଶାବତାର ମଠ ",
      "map": "https://www.google.com/maps?q=19.8163578,85.8385232"
    },
    {
      "id": "64",
      "location": "ଜିଲ୍ଲା ଡାକ୍ତରଖାନା ପରିସର ",
      "map": "https://www.google.com/maps?q=19.8135789,85.8311730"
    },
    {
      "id": "65",
      "location": "ଘୋଡାବଜାର ଛକ ",
      "map": "https://www.google.com/maps?q=19.8058107,85.8374108"
    },
    {
      "id": "66",
      "location": "ମରିଚ କୋଟ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8072630,85.8219016"
    },
    {
      "id": "67",
      "location": "ମୋଚି ସାହି ଛକ ",
      "map": "https://www.google.com/maps?q=19.8014900,85.8256090"
    },
    {
      "id": "68",
      "location": "ଗୋପାଳ ସ୍ବାମୀ ଛକ ",
      "map": "https://www.google.com/maps?q=19.7977847,85.8242931"
    },
    {
      "id": "69",
      "location": "ଚୈତନ୍ୟ ଛକ ",
      "map": "https://www.google.com/maps?q=19.7932578,85.8186269"
    },
    {
      "id": "70",
      "location": "କାକୁଡିଖାଇ ଛକ ",
      "map": "https://www.google.com/maps?q=19.8035963,85.8168483"
    },
    {
      "id": "71",
      "location": "ମାଳତିପାଟପୁର ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8673822,85.8291331"
    },
    {
      "id": "72",
      "location": "ସବ୍ କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ - ମାଳତିପାଟପୁର ପାର୍କିଂ ",
      "map": "https://www.google.com/maps?q=19.8673822,85.8291331"
    },
    {
      "id": "73",
      "location": "ସୁନାର ଗୌରାଙ୍ଗ ",
      "map": "https://www.google.com/maps?q=19.8033398,85.8449515"
    },
    {
      "id": "74",
      "location": "ସିଆଇ ଅଫିସ ",
      "map": "https://www.google.com/maps?q=19.8022304,85.8400695"
    },
    {
      "id": "75",
      "location": "ମହୋଦଧି ",
      "map": "https://www.google.com/maps?q=19.7941045,85.8211888"
    },
    {
      "id": "76",
      "location": "ସର୍କିଟ ହାଉସ ",
      "map": "https://www.google.com/maps?q=19.7975061,85.8272358"
    }
  ];

  const english_policeOutPost = [
    {
      "id": "1",
      "location": "Ashrama chakka",
      "map": "https://www.google.com/maps?q=19.8148463,85.8270648"
    },
    {
      "id": "2",
      "location": "Jatiababaji chakka",
      "map": "https://www.google.com/maps?q=19.8148277,85.8273863"
    },
    {
      "id": "3",
      "location": "Garuda chakka",
      "map": "https://www.google.com/maps?q=19.8196934,85.8329194"
    },
    {
      "id": "4",
      "location": "Matia pada chakka",
      "map": "https://www.google.com/maps?q=19.8182336,85.8401268"
    },
    {
      "id": "5",
      "location": "Banambar crossing",
      "map": "https://www.google.com/maps?q=19.8206542,85.8320715"
    },
    {
      "id": "6",
      "location": "Debighata chakka ",
      "map": "https://www.google.com/maps?q=19.8151602,85.8242696"
    },
    {
      "id": "7",
      "location": "Atharnala ",
      "map": "https://www.google.com/maps?q=19.8206311,85.8320812"
    },
    {
      "id": "8",
      "location": "Mangalaghata",
      "map": "https://www.google.com/maps?q=19.8132055,85.8077432"
    },
    {
      "id": "9",
      "location": "Matitotta parking 1",
      "map": "https://www.google.com/maps?q=19.8197391,85.8176231"
    },
    {
      "id": "10",
      "location": "Matitotta parking2",
      "map": "https://www.google.com/maps?q=19.8238057,85.8177596"
    },
    {
      "id": "11",
      "location": "Shree setu entry point ",
      "map": "https://www.google.com/maps?q=19.8217985,85.8165204"
    },
    {
      "id": "12",
      "location": "Sub control room at JBPC",
      "map": "https://www.google.com/maps?q=19.8125932,85.8247367"
    },
    {
      "id": "13",
      "location": "Sub control room at Badasanka",
      "map": "https://www.google.com/maps?q=19.8142104,85.8334129"
    },
    {
      "id": "14",
      "location": "Horticulture parking ",
      "map": "https://www.google.com/maps?q=19.8244630,85.8560756"
    },
    {
      "id": "15",
      "location": "Sub control room at Talabania ",
      "map": "https://www.google.com/maps?q=19.8244630,85.8560756"
    },
    {
      "id": "16",
      "location": "Grid station ",
      "map": "https://www.google.com/maps?q=19.8243113,85.8542741"
    },
    {
      "id": "17",
      "location": "Balighat Chowk ",
      "map": "https://www.google.com/maps?q=19.8241899,85.8502126"
    },
    {
      "id": "18",
      "location": "Sub controle room at gundicha badi",
      "map": "https://www.google.com/maps?q=19.8166818,85.8388377"
    },
    {
      "id": "19",
      "location": "Saradhabali",
      "map": "https://www.google.com/maps?q=19.8159576,85.8382962"
    },
    {
      "id": "20",
      "location": "Bustand entry gate",
      "map": "https://www.google.com/maps?q=19.8156093,85.8383730"
    },
    {
      "id": "21",
      "location": "Bustand back gate",
      "map": "https://www.google.com/maps?q=19.8145719,85.8394445"
    },
    {
      "id": "22",
      "location": "Nakachana dyura",
      "map": "https://www.google.com/maps?q=19.8158005,85.8390905"
    },
    {
      "id": "23",
      "location": "Talabania parking",
      "map": "https://www.google.com/maps?q=19.8128030,85.8500862"
    },
    {
      "id": "24",
      "location": "Indore stadiumparking",
      "map": "https://www.google.com/maps?q=19.8098051,85.8536076"
    },
    {
      "id": "25",
      "location": "Ola guest house",
      "map": "https://www.google.com/maps?q=19.8083787,85.8495937"
    },
    {
      "id": "26",
      "location": "Iti chowk",
      "map": "https://www.google.com/maps?q=19.8088427,85.8483911"
    },
    {
      "id": "27",
      "location": "Bhudan chakka",
      "map": "https://www.google.com/maps?q=19.8110479,85.8509361"
    },
    {
      "id": "28",
      "location": "Bnr chaka",
      "map": "https://www.google.com/maps?q=19.8019291,85.8390767"
    },
    {
      "id": "29",
      "location": "Pentha kata chowk",
      "map": "https://www.google.com/maps?q=19.8052010,85.8512044"
    },
    {
      "id": "30",
      "location": "Helipad parking",
      "map": "https://www.google.com/maps?q=19.8102237,85.8477601"
    },
    {
      "id": "31",
      "location": "Central school",
      "map": "https://www.google.com/maps?q=19.8149580,85.8498136"
    },
    {
      "id": "32",
      "location": "Toshali",
      "map": "https://www.google.com/maps?q=19.8360428,85.8875637"
    },
    {
      "id": "33",
      "location": "Suraj malhha saha college",
      "map": "https://www.google.com/maps?q=19.8118709,85.7933712"
    },
    {
      "id": "34",
      "location": "Sub controle steraling",
      "map": "https://www.google.com/maps?q=19.7858482,85.7872598"
    },
    {
      "id": "35",
      "location": "Sterling chakka 1",
      "map": "https://www.google.com/maps?q=19.7865546,85.7873423"
    },
    {
      "id": "36",
      "location": "Sterling chakka 2",
      "map": "https://www.google.com/maps?q=19.7863981,85.7869745"
    },
    {
      "id": "37",
      "location": "Sterling3",
      "map": "https://www.google.com/maps?q=19.7858482,85.7872598"
    },
    {
      "id": "38",
      "location": "Light house",
      "map": "https://www.google.com/maps?q=19.7892642,85.8059280"
    },
    {
      "id": "39",
      "location": "Yatrika",
      "map": "https://www.google.com/maps?q=19.7903009,85.8087118"
    },
    {
      "id": "40",
      "location": "Nali field parking ",
      "map": "https://www.google.com/maps?q=19.7915063,85.8082367"
    },
    {
      "id": "41",
      "location": "Digabareni",
      "map": "https://www.google.com/maps?q=19.7956254,85.8255936"
    },
    {
      "id": "42",
      "location": "Shree setu entry point",
      "map": "https://www.google.com/maps?q=19.8217985,85.8165204"
    },
    {
      "id": "43",
      "location": "Swami narayani temple",
      "map": "https://www.google.com/maps?q=19.8021376,85.8421405"
    },
    {
      "id": "44",
      "location": "Lokanath temple parking ",
      "map": "https://www.google.com/maps?q=19.8027894,85.8027603"
    },
    {
      "id": "45",
      "location": "Gadadhar high school",
      "map": "https://www.google.com/maps?q=19.8040092,85.8108368"
    },
    {
      "id": "46",
      "location": "Old jagganath balhab parking",
      "map": "https://www.google.com/maps?q=19.8101868,85.8249201"
    },
    {
      "id": "47",
      "location": "Gadadhar (subcontrole room)",
      "map": "https://www.google.com/maps?q=19.8040414,85.8109400"
    },
    {
      "id": "48",
      "location": "Temple op",
      "map": "https://www.google.com/maps?q=19.8047350,85.8193937"
    },
    {
      "id": "49",
      "location": "Jagabalia lodge",
      "map": "https://www.google.com/maps?q=19.8046464,85.8198497"
    },
    {
      "id": "50",
      "location": "Batagaon",
      "map": "https://www.google.com/maps?q=19.8515791,85.8363989"
    },
    {
      "id": "51",
      "location": "Marina beach resort",
      "map": "https://www.google.com/maps?q=19.7876168,85.8007614"
    },
    {
      "id": "52",
      "location": "Samangara village",
      "map": "https://www.google.com/maps?q=19.8418599,85.8654801"
    },
    {
      "id": "53",
      "location": "Baidasnagarchaka",
      "map": "https://www.google.com/maps?q=19.8359557,85.8872703"
    },
    {
      "id": "54",
      "location": "Coco palm",
      "map": "https://www.google.com/maps?q=19.7891200,85.8053433"
    },
    {
      "id": "55",
      "location": "Kathapola",
      "map": "https://www.google.com/maps?q=19.8688651,85.8269337"
    },
    {
      "id": "56",
      "location": "Jhadeswari chakka",
      "map": "https://www.google.com/maps?q=19.8080204,85.8330652"
    },
    {
      "id": "57",
      "location": "Subas boss chakka",
      "map": "https://www.google.com/maps?q=19.7998664,85.8315327"
    },
    {
      "id": "58",
      "location": "Nilachal ashok parking",
      "map": "https://www.google.com/maps?q=19.7997219,85.8317037"
    },
    {
      "id": "59",
      "location": "Blue flag parking ",
      "map": "https://www.google.com/maps?q=19.7995074,85.8302147"
    },
    {
      "id": "60",
      "location": "Gandua choura chakka",
      "map": "https://www.google.com/maps?q=19.8031266,85.8176536"
    },
    {
      "id": "61",
      "location": "Gadanti chak",
      "map": "https://www.google.com/maps?q=19.8059438,85.8171768"
    },
    {
      "id": "62",
      "location": "Market chaka",
      "map": "https://www.google.com/maps?q=19.8102966,85.8251293"
    },
    {
      "id": "63",
      "location": "Dasaabatara matha",
      "map": "https://www.google.com/maps?q=19.8163578,85.8385232"
    },
    {
      "id": "64",
      "location": "Inside dhh puri",
      "map": "https://www.google.com/maps?q=19.8135789,85.8311730"
    },
    {
      "id": "65",
      "location": "Ghodabajar chaka",
      "map": "https://www.google.com/maps?q=19.8058107,85.8374108"
    },
    {
      "id": "66",
      "location": "Marchikot chakka",
      "map": "https://www.google.com/maps?q=19.8072630,85.8219016"
    },
    {
      "id": "67",
      "location": "Mochi sahi chaka",
      "map": "https://www.google.com/maps?q=19.8014900,85.8256090"
    },
    {
      "id": "68",
      "location": "Gopal swami chaka",
      "map": "https://www.google.com/maps?q=19.7977847,85.8242931"
    },
    {
      "id": "69",
      "location": "Chaitanya chakka ",
      "map": "https://www.google.com/maps?q=19.7932578,85.8186269"
    },
    {
      "id": "70",
      "location": "Kakudikhai chaka",
      "map": "https://www.google.com/maps?q=19.8035963,85.8168483"
    },
    {
      "id": "71",
      "location": "MLatipatpur parking",
      "map": "https://www.google.com/maps?q=19.8673822,85.8291331"
    },
    {
      "id": "72",
      "location": "MLatipatpur  sub controle room",
      "map": "https://www.google.com/maps?q=19.8673822,85.8291331"
    },
    {
      "id": "73",
      "location": "Sunera gouranga",
      "map": "https://www.google.com/maps?q=19.8033398,85.8449515"
    },
    {
      "id": "74",
      "location": "Ci office ",
      "map": "https://www.google.com/maps?q=19.8022304,85.8400695"
    },
    {
      "id": "75",
      "location": "Mahadadhi",
      "map": "https://www.google.com/maps?q=19.7941045,85.8211888"
    },
    {
      "id": "76",
      "location": "Circuit house ",
      "map": "https://www.google.com/maps?q=19.7975061,85.8272358"
    }
  ];

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [allPoliceStation, setAllPoliceStation] = useState([]);
  const [allPoliceOutPost, setAllPoliceOutPost] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedTab, setSelectedTab] = useState('policeStation');
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const loadLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedLanguage');
      if (value !== null) {
        if (value === 'Odia') {
          setAllPoliceStation(odia_data);
          setAllPoliceOutPost(odia_policeOutPost);
        } else if (value === 'English') {
          setAllPoliceStation(english_data);
          setAllPoliceOutPost(english_policeOutPost);
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

  const openMap = (url) => {
    Linking.openURL(url);
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
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ପୋଲିସ' : 'Police'}</Text>
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
              <Text style={{ color: '#ddd', fontSize: 14, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଆପାତଃକାଳୀନ ପରିସ୍ଥିତି ପାଇଁ ନିକଟସ୍ଥ ଥାନା ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।' : "In case of emergency please contact nearest Police Station."}</Text>
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
              <Image source={require('../../assets/image/police.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, margin: 15, padding: 5 }}>
          <LinearGradient
            colors={selectedTab === 'policeStation' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
              borderRadius: 10,
              paddingVertical: 8,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => setSelectedTab('policeStation')}>
              <Text style={{ color: selectedTab === 'policeStation' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                {selectedLanguage === 'Odia' ? 'ପୋଲିସ୍ ଷ୍ଟେସନ' : 'Police Station'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={selectedTab === 'policeOutPost' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
              borderRadius: 10,
              paddingVertical: 8,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => setSelectedTab('policeOutPost')}>
              <Text style={{ color: selectedTab === 'policeOutPost' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                {selectedLanguage === 'Odia' ? 'ପୋଲିସ୍ ଆଉଟ୍ ପୋଷ୍ଟ' : 'Police Out Post'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {selectedTab === "policeStation" &&
          <View style={{ paddingHorizontal: 15, marginTop: 0 }}>
            {allPoliceStation.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.stationName}>{item.police_station}</Text>

                <Text style={styles.label}>{selectedLanguage === 'Odia' ? 'ଠିକଣା:' : 'Location:'}</Text>
                <Text style={styles.value}>{item.location || '-'}</Text>

                {item.contact &&
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={styles.label}>{selectedLanguage === 'Odia' ? 'ଯୋଗାଯୋଗ:' : 'Contact:'}</Text>
                    <TouchableOpacity onPress={() => linkPhone(item.contact)}>
                      <Text style={[styles.value, { color: '#1e40af', marginLeft: 5 }]}>
                        {item.contact}
                      </Text>
                    </TouchableOpacity>
                  </View>
                }

                {item.map ? (
                  <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() => Linking.openURL(item.map)}
                  >
                    <Text style={styles.mapButtonText}>
                      {selectedLanguage === 'Odia' ? 'ମାନଚିତ୍ର ଦେଖନ୍ତୁ' : 'View on Map'}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
          </View>
        }

        {selectedTab === "policeOutPost" &&
          <FlatList
            data={allPoliceOutPost}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View
                style={{
                  width: '100%',
                  height: 100,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 12,
                  paddingHorizontal: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}
              >
                <View style={{ width: '30%', justifyContent: 'center', backgroundColor: '#dedfe0', borderRadius: 6 }}>
                  <Image source={require('../../assets/offlineData/policeoutpost.png')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                </View>

                {/* Text Content */}
                <View style={{ width: '65%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                    {item.location || 'Outpost Name'}
                  </Text>

                  {/* Buttons */}
                  <View style={styles.buttonRow}>
                    <LinearGradient
                      colors={['#FFA726', '#F06292']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.bookNowButton}
                    >
                      <TouchableOpacity onPress={() => openMap(item.map)}>
                        <Text style={styles.bookNowText}>Direction</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            )}
          />
        }
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#341551',
    fontFamily: 'FiraSans-SemiBold',
    textTransform: 'capitalize'
  },
  label: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'FiraSans-Regular'
  },
  value: {
    fontSize: 14,
    color: '#000',
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
