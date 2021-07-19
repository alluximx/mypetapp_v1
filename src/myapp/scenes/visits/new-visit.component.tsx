import React from 'react';
import ContentView from '../../layouts/visits/add/new-visit';

export const newVisitScreen = ({navigation, route}) : React.ReactElement => {
    return <ContentView navigation={navigation} route={route} />;
}