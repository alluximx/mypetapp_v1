import { Layout, StyleService, useStyleSheet, Text, Icon, TopNavigationAction, Card } from "@ui-kitten/components";
import React, { useLayoutEffect } from "react"
import { KeyboardAvoidingView, View, Image, Dimensions } from 'react-native';
import globalColors from '../../styles/colors';
export interface DatosGeneric {
    date?: Date | null,
    title: string,
    content: string,
    buttonText: string,
    buttonAling: string,
    imagenes?: string[]
}
const GenericCard = (props): React.ReactElement=> {
    const styles = useStyleSheet(themedStyles);
    const stylesCart = useStyleSheet(defaultStyle(props.datos.buttonAling));
    return (
        <Card style={styles.cardStyle}>
            {props.datos.date ? <Text style={styles.labelDate}>{props.datos.date.getDate()}/{(props.datos.date.getMonth() + 1)}/{props.datos.date.getFullYear()}</Text> : <Text></Text>}
            <Text style={styles.h1Card}>{props.datos.title}</Text>
            <Text style={styles.labelCard}>{props.datos.content}</Text>
            {
                props.datos.imagenes.length > 0 ?
                    props.datos.imagenes.map((img: string) => {
                        return (<Image
                            style={{ height: 50, width: 50, marginTop: 2 }}
                            source={require("../../layouts/visits/assets/dog-visit.png")}
                        />)
                    })
                    :
                    <Text></Text>
            }
            <Text style={stylesCart.header}>{props.datos.buttonText}</Text>
        </Card>
    );
}
const { width, height } = Dimensions.get('window');
const themedStyles = StyleService.create({
    h1Card: {
        color: globalColors.black,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        marginTop: 4
    },
    title: {
        color: globalColors.black,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 24
    },
    labelCard: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: '#707070',
        marginTop: 8
    },
    labelDate: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#707070',
        marginTop: 8
    },
    cardStyle: {
        marginLeft: 24,
        marginTop: 16,
        marginRight: 24,
        borderRadius: 18
    }
});
const defaultStyle = (tipo) => StyleService.create({
    header: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        textAlign: tipo,
        color: globalColors.greenSecondary,
        marginTop: 16
    }
});
export default GenericCard;