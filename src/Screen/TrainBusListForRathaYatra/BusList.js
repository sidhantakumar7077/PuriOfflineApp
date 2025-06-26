import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    Image,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const BusList = () => {
    
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const trainData = [
        {
            "id": 1,
            "startingpoint": "Kantamal",
            "serviceType": "Hi-Comf",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "18:40"
        },
        {
            "id": 2,
            "startingpoint": "Keonjhar",
            "serviceType": "Hi-Comf",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "16:10"
        },
        {
            "id": 3,
            "startingpoint": "Kamaladhi",
            "serviceType": "Hi-Comf",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "13:05"
        },
        {
            "id": 4,
            "startingpoint": "Motu",
            "serviceType": "Hi-Tech",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "08:30"
        },
        {
            "id": 5,
            "startingpoint": "Umerkote",
            "serviceType": "Ac Dlx",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "08:00"
        },
        {
            "id": 6,
            "startingpoint": "Kullad",
            "serviceType": "Hi-Tech",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "12:50"
        },
        {
            "id": 7,
            "startingpoint": "Odagaon",
            "serviceType": "Hi-Comf",
            "destination": "bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "11:45"
        },
        {
            "id": 8,
            "startingpoint": "Jambu",
            "serviceType": "Hi-Comf",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "11:15"
        },
        {
            "id": 9,
            "startingpoint": "Sinapali",
            "serviceType": "Hi-Tech",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "08:00"
        },
        {
            "id": 10,
            "startingpoint": "IB Thermal",
            "serviceType": "Hi-Tech",
            "destination": "Bbsr",
            "extendedupto": "puri",
            "arrivalTimeatPuri": "08:50"
        },
        {
            "id": 11,
            "startingpoint": "Kiribur",
            "serviceType": "Ac Dlx",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "17:30"
        },
        {
            "id": 12,
            "startingpoint": "Jharsuguda",
            "serviceType": "Ac Dlx",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "08:10"
        },
        {
            "id": 13,
            "startingpoint": "Malkangiri",
            "serviceType": "Ac Dlx",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "09:50"
        },
        {
            "id": 14,
            "startingpoint": "Seragada",
            "serviceType": "Ac Dlx",
            "destination": "Bbsr",
            "extendedupto": "puri",
            "arrivalTimeatPuri": "13:00"
        },
        {
            "id": 15,
            "startingpoint": "Parlekhmundi",
            "serviceType": "Ac Dlx",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "06:00"
        },
        {
            "id": 16,
            "startingpoint": "Jeypore",
            "serviceType": "Volvo",
            "destination": "Bbsr",
            "extendedupto": "puri",
            "arrivalTimeatPuri": "08:00"
        },
        {
            "id": 17,
            "startingpoint": "Indravati",
            "serviceType": "Volvo",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "09:45"
        },
        {
            "id": 18,
            "startingpoint": "Koraput",
            "serviceType": "Volvo",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "08:45"
        },
        {
            "id": 19,
            "startingpoint": "Rourkela",
            "serviceType": "Volvo",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "07:40"
        },
        {
            "id": 20,
            "startingpoint": "Kantamal",
            "serviceType": "Volvo",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "07:30"
        },
        {
            "id": 21,
            "startingpoint": "Mukhiguda",
            "serviceType": "Hi-Tech",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "10:15"
        },
        {
            "id": 22,
            "startingpoint": "Raygada",
            "serviceType": "Hi-Tech",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "07:15"
        },
        {
            "id": 23,
            "startingpoint": "Nabrangpur",
            "serviceType": "Hi-Tech",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "09:45"
        },
        {
            "id": 24,
            "startingpoint": "Lanjigarh",
            "serviceType": "Hi-Tech",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "09:35"
        },
        {
            "id": 25,
            "startingpoint": "Gunupur",
            "serviceType": "Volvo",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "08:15"
        },
        {
            "id": 26,
            "startingpoint": "Bhawanipatna",
            "serviceType": "Ac Dlx",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "09:15"
        },
        {
            "id": 27,
            "startingpoint": "Th rampur",
            "serviceType": "Hi-Tech",
            "destination": "Bbsr",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "08:10"
        },
        {
            "id": 28,
            "startingpoint": "Jeypore",
            "serviceType": "Hi-Tech",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "11:00"
        },
        {
            "id": 29,
            "startingpoint": "Nabrangpur",
            "serviceType": "Hi-Tech",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "09:30"
        },
        {
            "id": 30,
            "startingpoint": "Berhampur",
            "serviceType": "VOLVO",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "02:00"
        },
        {
            "id": 31,
            "startingpoint": "Bolangir",
            "serviceType": "Ac Dlx",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "09:30"
        },
        {
            "id": 32,
            "startingpoint": "Bargarh",
            "serviceType": "Ac Dlx",
            "destination": "Ctc",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "08:30"
        },
        {
            "id": 33,
            "startingpoint": "Khariar Road",
            "serviceType": "Ac Dlx",
            "destination": "Puri",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "07:30"
        },
        {
            "id": 34,
            "startingpoint": "Berhampur",
            "serviceType": "Ac Dlx",
            "destination": "Puri",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "20:46"
        },
        {
            "id": 35,
            "startingpoint": "Hinjili",
            "serviceType": "Hi-Comf",
            "destination": "Puri",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "11:45"
        },
        {
            "id": 36,
            "startingpoint": "Jagatsinghpur",
            "serviceType": "Hi-Comf",
            "destination": "Puri",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "09:50"
        },
        {
            "id": 37,
            "startingpoint": "Kotsamalai",
            "serviceType": "Ac Dlx",
            "destination": "Puri",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "07:25"
        },
        {
            "id": 38,
            "startingpoint": "Bhanjanagar",
            "serviceType": "Ac Dlx",
            "destination": "Puri",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "05:50"
        },
        {
            "id": 39,
            "startingpoint": "Paralekhamundi",
            "serviceType": "Hi-tech",
            "destination": "Puri",
            "extendedupto": "Puri",
            "arrivalTimeatPuri": "14:20"
        }
    ];

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                setSelectedLanguage(value);
            }
        } catch (error) {
            console.log('Error loading language:', error);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            loadLanguage();
        }, 2000);
    };

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

    useEffect(() => {
        if (isFocused) {
            loadLanguage();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>
                            {selectedLanguage === 'Odia' ? 'ବସ୍ ତାଲିକା' : 'Bus List'}
                        </Text>
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
                    <View style={styles.headerRow}>
                        <View style={{ width: '75%' }}>
                            <Text style={styles.headerTitle}>
                                {selectedLanguage === 'Odia'
                                    ? 'ପୁରୀକୁ ଆନୁମାନିକ ବସ ଚଳାଚଳ ସମୟ'
                                    : 'Tentative Bus Timing to Puri.'}
                            </Text>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 60 }}>
                            <Image
                                source={require('../../assets/image/busicon.png')}
                                style={{ width: 80, height: 80, resizeMode: 'contain' }}
                            />
                        </View>
                    </View>
                </View>

                {/* Table Header */}
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerCell, { width: '10%' }]}>#</Text>
                        <Text style={[styles.headerCell, { width: '35%' }]}>Starting Point</Text>
                        {/* <Text style={[styles.headerCell, { width: '20%' }]}>Service</Text> */}
                        <Text style={[styles.headerCell, { width: '20%' }]}>Dest</Text>
                        <Text style={[styles.headerCell, { width: '20%' }]}>Upto</Text>
                        <Text style={[styles.headerCell, { width: '15%' }]}>Time</Text>
                    </View>

                    {/* Table Rows */}
                    {trainData.map((item, index) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={[styles.cell, { width: '10%' }]}>{index + 1}</Text>
                            <Text style={[styles.cell, { width: '35%' }]}>{item.startingpoint}</Text>
                            {/* <Text style={[styles.cell, { width: '20%' }]}>{item.serviceType}</Text> */}
                            <Text style={[styles.cell, { width: '20%' }]}>{item.destination}</Text>
                            <Text style={[styles.cell, { width: '20%' }]}>{item.extendedupto}</Text>
                            <Text style={[styles.cell, { width: '15%' }]}>{item.arrivalTimeatPuri}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

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
        marginLeft: 6,
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#341551',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
        paddingHorizontal: 15,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'FiraSans-Regular',
    },
    tableContainer: {
        margin: 15,
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 10,
        elevation: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#aaa',
        paddingBottom: 8,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 6,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 14,
        fontFamily: 'FiraSans-SemiBold',
    },
    cell: {
        fontSize: 13,
        color: '#333',
        fontFamily: 'FiraSans-Regular',
    }
});

export default BusList;
