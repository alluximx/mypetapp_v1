import { StyleService, useStyleSheet, Layout, Text, Input, Icon, Card, List } from "@ui-kitten/components";
import React from "react";
import DefaultLayout from "../../../components/layouts/default-layout";
import globalColors from "../../../styles/colors";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import style from "src/myapp/styles/style";

const InfBreedScreen = () => {
    const styles = useStyleSheet(themedStyles);
    const data = [
        { name: "Doberman", content: "" },
        { name: "Golden Retriver", content: "" },
        { name: "Pug", content: "" },
        { name: "Chihuahua", content: "" },
        { name: "Pastor Aleman", content: "" },
        { name: "Pomeranian", content: "" },
    ];
    const [breeds, onChangeBreed] = React.useState(data);
    const onFilter = (event: string) => {
        let aux = data.filter(breed => {
            return breed.name.toLocaleUpperCase().indexOf(event.toLocaleUpperCase()) >= 0;
        });
        if (event == '') {
            aux = aux.length > 0 ? aux : data;
        }
        onChangeBreed(aux);
    }
    const renderIcon = (props) => (
        <TouchableWithoutFeedback>
            <Icon {...props} name='maximize-outline' />
        </TouchableWithoutFeedback>
    );
    const renderServiceItem = service => {
        return (
            <Card style={styles.cardStyle}>
                <Text style={styles.tituloCard}>{service.item.name}</Text>
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
                <Layout style={styles.cardLayout}>
                    {
                        breeds.length > 0 ?
                            <List
                                style={styles.servicesContainer}
                                data={breeds}
                                renderItem={renderServiceItem}
                            />
                            :
                            <Card style={styles.cardStyle}>
                                <Text style={styles.tituloCard}>No hay datos</Text>
                            </Card>
                    }
                </Layout>
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
    }, tituloCard: { fontFamily: 'Montserrat-Bold', fontSize: 20 }
});
export default InfBreedScreen;