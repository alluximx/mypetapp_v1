import { StyleService, useStyleSheet, Layout, Text, Input, Icon, Card, List, Spinner } from "@ui-kitten/components";
import React, { useEffect } from "react";
import DefaultLayout from "../../../components/layouts/default-layout";
import globalColors from "../../../styles/colors";
import { Dimensions, TouchableWithoutFeedback, Image, View } from "react-native";
import useBreedsInformation from "../../../hooks/breed/useBreedsInformation";
import style from "src/myapp/styles/style";

const InfBreedScreen = ({ navigation }): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const data = [
        { name: "Doberman", content: "" },
        { name: "Golden Retriver", content: "" },
        { name: "Pug", content: "" },
        { name: "Chihuahua", content: "" },
        { name: "Pastor Aleman", content: "" },
        { name: "Pomeranian", content: "" },
    ];
    const datos = useBreedsInformation();
    const [breeds, setBreeds] = React.useState([]);
    const [list, setList] = React.useState([]);
    useEffect(() => {
        if (datos.data) {
            setBreeds(datos.data.data);
            setList(datos.data.data);
        }
    }, [datos.data]);
    const onFilter = async (event: string) => {
        let aux = list.filter(breed => {
            return breed.breed.name.toLocaleUpperCase().indexOf(event.toLocaleUpperCase()) >= 0;
        });
        if (event == '') {
            //aux.push(datos.refetch());
            datos.refetch();
        }
        setBreeds(aux);
    }
    const renderIcon = (props) => (
        <TouchableWithoutFeedback>
            <Icon {...props} name='maximize-outline' />
        </TouchableWithoutFeedback>
    );
    const renderServiceItem = service => {
        return (
            <Card style={styles.cardStyle}>
                <Text style={styles.tituloCard}>{service.item.breed.name}</Text>
            </Card>
        )
    }
    return (
        <DefaultLayout style={[styles.container, { color: 'black' }]}>
            <Layout style={[styles.formContainer, { backgroundColor: globalColors.backgroundDefault }]} >
                <Text style={styles.title}>Características de Razas</Text>
                <Input
                    accessoryLeft={renderIcon}
                    size='large'
                    style={styles.filter}
                    placeholder='Nombre'
                    onChangeText={onFilter}
                />

                {
                    datos.isLoading ?
                        <View style={styles.viewContainer}>
                            <Spinner size='large' status='success' />
                        </View>
                        :
                        breeds.length > 0 ?
                            <Layout style={styles.cardLayout}>
                                <List
                                    style={styles.servicesContainer}
                                    data={breeds}
                                    renderItem={renderServiceItem}
                                />
                            </Layout>
                            :
                            <Layout style={[styles.formContainer, { backgroundColor: globalColors.backgroundDefault }]}>
                                <Image
                                    style={styles.imgNot}
                                    source={require('../assets/breed-not-found.png')}
                                />
                                <Text style={styles.labelNot}>
                                    No se encontraron resultados
                                </Text>
                            </Layout>
                }

            </Layout>
        </DefaultLayout>
    );
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
    title: {
        marginTop: 20,
        marginLeft: 24,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,

    }, filter: {
        margin: 24,
        borderRadius: 4,
    },
    cardLayout: {
        margin: 24,
        backgroundColor: globalColors.backgroundDefault
    },
    cardStyle: {
        marginBottom: 24,
        borderRadius: 16
    }, servicesContainer: {
        backgroundColor: 'transparent'
    }, tituloCard: { fontFamily: 'Montserrat-Bold', fontSize: 20 },
    imgNot: {
        width: width,
        height: 320,

    },
    labelNot: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 8,
        marginLeft: 24,
        marginRight: 24
    }, viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default InfBreedScreen;