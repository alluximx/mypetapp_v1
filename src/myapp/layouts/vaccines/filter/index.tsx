import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
// Global Styles.
import globalColors from '../../../styles/colors';
// Hooks.
import useGetVaccineIndex from '../../../hooks/vaccines/useGetVaccineIndex';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import DatepickerInput from '../../../components/inputs/date-picker';

export default ({navigation, route}): React.ReactElement => {
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [rangeDate, setRangeDate] = useState(route.params.rangeDate);

  const {data: productsData, isLoading: productsLoading} = useGetVaccineIndex(
    route.params.petId,
    'true',
    route.params.typeId,
    rangeDate,
  );

  useEffect(() => {
    if (initialDate !== '' && finalDate !== '') {
      setRangeDate(`${initialDate},${finalDate}`);
      route.params.setRangeDate(`${initialDate},${finalDate}`);
    }
  }, [initialDate, finalDate]);

  useEffect(() => {
    const isDDisabled = initialDate === '' || finalDate === '';
    setIsDisabled(isDDisabled);
  }, [initialDate, finalDate]);

  const clearFilters = () => {
    setInitialDate('');
    setFinalDate('');
    setRangeDate('');
    route.params.setRangeDate('');
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <AnchorText
            style={styles.headerRight}
            isDisabled={isDisabled}
            onPress={() => navigation.goBack()}>
            Aplicar
          </AnchorText>
        );
      },
    });
  }, [navigation, isDisabled]);

  return productsLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <TitleHeader>Filtros</TitleHeader>
      <DefaultText style={styles.results}>
        {productsData.data.length ?? 0} resultados
      </DefaultText>

      <DefaultText style={styles.results}>
        Escoge un rango de fechas
      </DefaultText>
      <DatepickerInput
        currentValue={initialDate}
        onSelect={(vaccine_date) => {
          const formattedDate = moment(vaccine_date).format('YYYY-MM-DD');
          setInitialDate(formattedDate);
        }}
        placeholder="Fecha Inicial"
      />

      <DatepickerInput
        currentValue={finalDate}
        onSelect={(vaccine_date) => {
          const formattedDate = moment(vaccine_date).format('YYYY-MM-DD');
          setFinalDate(formattedDate);
        }}
        placeholder="Fecha Final"
        maxDate={moment().toDate()}
      />
      <AnchorText style={styles.clearFilters} onPress={clearFilters}>
        Limpiar filtros
      </AnchorText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  results: {marginBottom: 24},
  headerRight: {alignSelf: 'center'},
  brandSelector: {marginBottom: 32},
  pricesBoundsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectorContainer: {
    backgroundColor: globalColors.greenSecondary,
    width: 34,
    height: 34,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: globalColors.white,
    borderStyle: 'solid',
  },
  selector: {
    height: 6,
    width: 12,
  },
  sliderTrack: {
    backgroundColor: globalColors.lightGray,
    height: 4,
    marginLeft: 5,
  },
  sliderActiveTrack: {
    backgroundColor: globalColors.greenSecondary,
  },
  clearFilters: {
    textAlign: 'center',
    marginTop: 24,
  },
});
