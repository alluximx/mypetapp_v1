import { Layout, StyleService, useStyleSheet, Text, List } from "@ui-kitten/components";
import React, { useLayoutEffect } from "react"
import { Image, Dimensions } from 'react-native';
import DefaultLayout from "../../../components/layouts/default-layout";
import globalColors from '../../../styles/colors';
import AddButton from '../../../components/buttons/add-button'
import GenericCard from '../../../components/cards/generic-card';
export default ({ navigation, route }): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const data = [
        {
            date: new Date(),
            title: 'Vómitos y fiebre',
            content: 'El veterinario dijo que era una reacción normal por la vacuna que le pussieron.',
            buttonText: 'Editar',
            buttonAlign: 'right',
            images: ["../assets/dog-visit.png", "../assets/dog-visit.png"],
            styleCard: {}
        },
        {
            date: new Date(),
            title: 'Vómitos y fiebre',
            content: 'El veterinario dijo que era una reacción normal por la vacuna que le pussieron.',
            buttonText: 'Editar',
            buttonAlign: 'right',
            images: ["../assets/dog-visit.png", "../assets/dog-visit.png"],
            styleCard: {}
        },
        {
            date: null,
            title: 'Patita lastimada',
            content: 'Hay que llevar a Valerio a una terapia especial para que se pueda recuperar totalmemte y no siga cojeando. El veterinario va a pasar el contacto de una clínica especializada.',
            buttonText: 'Editar',
            buttonAlign: 'right',
            images: ["../assets/dog-visit.png", "../assets/dog-visit.png"],
            styleCard: {}
        }
    ];
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AddButton style={{ backgroundColor: globalColors.backgroundDefault }}
                    iconStyle={{ tintColor: globalColors.greenSecondary, height: 35, width: 35 }} onAdd={() => navigation.navigate('AddVisit', {})} />
            ),
        });
    }, [navigation]);
    const renderServiceItem = (service) => {
        return (<GenericCard data={service.item}/>);
    };
    if (data.length > 0) {

        return (
            <DefaultLayout
                style={[styles.container, { color: 'black' }]}>
                <Layout style={[styles.formContainer, { backgroundColor: globalColors.backgroundDefault }]} >
                    <Text style={styles.title}>
                        Visitas Veterinario
                    </Text>
                    <List
                        style={styles.servicesContainer}
                        data={data}
                        renderItem={renderServiceItem}
                    />
                </Layout>
            </DefaultLayout>
        );
    } else {

        return (
            <DefaultLayout
                style={[styles.container, { color: 'black' }]}>
                <Layout style={[styles.formContainer, { backgroundColor: globalColors.backgroundDefault }]} >
                    <Image
                        style={styles.dogImage}
                        source={require('../assets/dog-visit.png')}
                    />
                    <Text style={styles.h1}>
                        Visitas Veterinario.
                    </Text>
                    <Text style={styles.textLabel} category='label'>
                        Aún no has agregado visitas al
                    </Text>
                    <Text style={styles.textLabel} category='label'>
                        veterinario para tu mascota
                    </Text>
                </Layout>
            </DefaultLayout>
        );
    }
}
const { width, height } = Dimensions.get('window');
const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.backgroundDefault,
        paddingHorizontal: 0,
    },
    formContainer: {
        flex: 1,
        paddingTop: 0,
        width: width,
    },
    h1: {
        color: globalColors.black,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        alignSelf: 'center'
    },
    textLabel: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        alignSelf: 'center',
        lineHeight: 24,
        color: '#707070'
    },
    dogImage: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: 390,
        maxHeight: 390,
        marginVertical: 5,
    },
    cardSection: {
        marginTop: 32,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        paddingTop: 32,
    },
    headerRight: {
        color: globalColors.black,
        marginRight: 12,
    },
    h1Card: {
        color: globalColors.black,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        marginTop: 4
    },
    title: {
        color: globalColors.black,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 24
    },
    labelCard: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: '#707070',
        marginTop: 8

    },
    cardStyle: {
        marginLeft: 24,
        marginTop: 24,
        marginRight: 24
    },
    addButton: {
        height: 40,
        width: 40,
        minWidth: 0,
        minHeight: 0,
        borderRadius: 40,
        backgroundColor: globalColors.greenSecondary,
        borderWidth: 0,
    }, servicesContainer: {
        backgroundColor: 'transparent',
        marginBottom: 10,
        width: width,
        marginTop: 10
    },
    servicesContentContainer: {
        flexDirection: 'row',
        paddingBottom: 8,
        backgroundColor: 'transparent',
        width: width,
    }
});