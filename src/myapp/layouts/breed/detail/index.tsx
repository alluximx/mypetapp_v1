import React, { useEffect } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native';
// Global Styles.
import globalColors from '../../../styles/colors';
// My Components.
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import { Icon, Layout, List, Button } from "@ui-kitten/components";
export default ({ navigation, route }): React.ReactElement => {
    const data = [route.params.breed];
    const image = require("../assets/dog-notFound.jpg");
    const renderDataItem = (service) => {
        let energy_level = [];
        for (let index = 0; index < service.item.energy_level; index++) {
            energy_level.push({ num: 'si' });

        }
        for (let index = parseInt(service.item.energy_level); index < 5; index++) {
            energy_level.push({ num: 'no' });

        }
        let slobber_level = [];
        for (let index = 0; index < service.item.slobber_level; index++) {
            slobber_level.push({ num: 'si' });

        }
        for (let index = parseInt(service.item.slobber_level); index < 5; index++) {
            slobber_level.push({ num: 'no' });

        }
        let snoring_level = [];
        for (let index = 0; index < service.item.snoring_level; index++) {
            snoring_level.push({ num: 'si' });

        }
        for (let index = parseInt(service.item.snoring_level); index < 5; index++) {
            snoring_level.push({ num: 'no' });

        }
        let barking_level = [];
        for (let index = 0; index < service.item.barking_level; index++) {
            barking_level.push({ num: 'si' });

        }
        for (let index = parseInt(service.item.barking_level); index < 5; index++) {
            barking_level.push({ num: 'no' });

        }
        let attention_level = [];
        for (let index = 0; index < service.item.attention_level; index++) {
            attention_level.push({ num: 'si' });

        }
        for (let index = parseInt(service.item.attention_level); index < 5; index++) {
            attention_level.push({ num: 'no' });

        }
        return (
            <View style={styles.servicesContainer}>
                <Text style={styles.subtitulo}>Descripción general</Text>
                <Text style={styles.label}>{service.item.description}</Text>
                <Text style={styles.subtitulo}>Tamaño</Text>
                <Text style={styles.label}>{service.item.size.name}</Text>
                <Text style={styles.subtitulo}>Peso</Text>
                <Text style={styles.label}>Entre de {service.item.min_weight} y {service.item.max_weight} kg</Text>
                <Text style={styles.subtitulo}>Altura</Text>
                <Text style={styles.label}>Entre de {service.item.min_height} y {service.item.max_height} cm</Text>
                <Text style={styles.subtitulo}>Esperanza de vida</Text>
                <Text style={styles.label}>{service.item.life_expectancy} años</Text>
                <Text style={styles.subtitulo}>Criado para</Text>
                <Text style={styles.label}>{service.item.purpose}</Text>
                <Text style={styles.subtitulo}>Principales características</Text>
                <Text style={styles.label}>{service.item.main_characteristics}</Text>
                <Text style={styles.subtitulo}>Nivel energético</Text>
                <List
                    style={styles.servicesContainer}
                    horizontal={true}
                    data={energy_level}
                    renderItem={renderpawPrintItem}
                />
                <Text style={styles.subtitulo}>Tendencia a babear</Text>
                <List
                    style={styles.servicesContainer}
                    horizontal={true}
                    data={slobber_level}
                    renderItem={renderpawPrintItem}
                />
                <Text style={styles.subtitulo}>Tendencia a roncar</Text>
                <List
                    style={styles.servicesContainer}
                    horizontal={true}
                    data={snoring_level}
                    renderItem={renderpawPrintItem}
                />
                <Text style={styles.subtitulo}>Tendencia a ladrar</Text>
                <List
                    style={styles.servicesContainer}
                    horizontal={true}
                    data={barking_level}
                    renderItem={renderpawPrintItem}
                />
                <Text style={styles.subtitulo}>Necesidad de atención</Text>
                <List
                    style={styles.servicesContainer}
                    horizontal={true}
                    data={attention_level}
                    renderItem={renderpawPrintItem}
                />
            </View>
        )
    }
    const StarIcon = (props) => (
        <Icon {...props} name='star' />
    );

    const renderpawPrintItem = (service) => {
        return service.item.num == "si" ?
            //<Button style={{ margin: 2 }} appearance='ghost' status='success' accessoryLeft={StarIcon} />
            <Image style={styles.pawPrint} source={require('../assets/pawColor.png')} />
            :
            //<Button style={{ margin: 2 }} appearance='ghost' status='basic'  accessoryLeft={StarIcon} />
            <Image style={styles.pawPrint} source={require('../assets/paw.png')} />
            ;
    }
    const renderpawNnotItem = (service) => {
        console.log("antes");
        console.log(service.item.num);
        return (
            <Button style={{ margin: 2 }} appearance='ghost' status='success' accessoryLeft={StarIcon} />
            //<Image style={styles.pawPrint} source={require('../../../assets/images/menu/my-profile.png')} />
        )
    }
    return (
        <>
            <ImageBackground source={image} resizeMode="cover" style={styles.petImageContainer} />
            <ScrollView>
            <DefaultLayout
                statusBarTranslucent
                statusBarStyle={"light-content"}
                statusBarBackgroundColor={"transparent"}
                style={styles.container}>
                <DefaultLayout
                    statusBarTranslucent
                    statusBarBackgroundColor={"transparent"}
                    style={styles.cardSection}>
                    <TitleHeader style={styles.bottomSpace}>{route.params.breed.breed.name}</TitleHeader>
                    <List
                        style={styles.servicesContainer}
                        data={data}
                        renderItem={renderDataItem}
                    />
                </DefaultLayout>
            </DefaultLayout>
            </ScrollView>
        </>
    );
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
    },
    petDataCards: {
        flexDirection: 'row',
        marginTop: 32,
        paddingHorizontal: 24,
    },
    petImageContainer: {
        width: width,
        flex: 1,
        height: height / 2,
        resizeMode: 'cover',
        position: 'absolute'
    },
    petImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        overflow: 'hidden',
    },
    cardSection: {
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,        
        marginTop: height / 2 - 20,
    },
    bottomSpace: {
        marginBottom: 24,
    },
    servicesContainer: {
        backgroundColor: "transparent",
        marginBottom: 10

    },
    subtitulo: {
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        marginTop: 32
    }, label: {
        fontSize: 16,
        fontFamily: "Montserrat-Medium",
        marginTop: 8,
        textAlign: 'justify',
        color: '#707070'
    },
    pawPrint: {
        width: 60,
        height: 60
    }
});