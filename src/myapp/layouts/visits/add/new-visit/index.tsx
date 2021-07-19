import React from 'react';
// My Components
import DefaultLayout from '../../../../components/layouts/default-layout';
import TitleHeader from '../../../../components/texts/title-header';

export default ({navigation, route}) : React.ReactElement => {

    return (
        <DefaultLayout>
            <TitleHeader>
                Nueva Visita
            </TitleHeader>
        </DefaultLayout>
    );
};