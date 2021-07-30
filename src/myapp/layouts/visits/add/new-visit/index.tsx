import React, {useRef, useState, useCallback} from 'react';
// My Components
import DefaultLayout from '../../../../components/layouts/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import AnchorText from '../../../../components/texts/anchor-text';
import {StyleSheet, View, Image} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import globalColors from '../../../../styles/colors';
import DatepickerInput from '../../../../components/inputs/date-picker';
import UserInput from '../../../../components/inputs/user-input';
import UserTextArea from '../../../../components/inputs/user-textAtea';
import globalVars from '../../../../styles/vars';
import {useEffect} from 'react';
import useAddVisitMedical from '../../../../hooks/visits/useAddVisitMedical';
import useUpdateVisitMedical from '../../../../hooks/visits/useUpdateVisitMedical';
import VisitsImgCard from '../../../../components/cards/image-input-card';
import CustomModal from '../../../../components/modals/custom-modal';
import useDeleteVisit from '../../../../hooks/visits/useDeleteVisit';
import {ScrollView} from 'react-native-gesture-handler';

export default ({navigation, route}): React.ReactElement => {
  const {id, breed, name, pet_age, sex} = route.params.pet;
  const idVisit = route.params.visit.idVisit;
  const title = route.params.visit.title;
  const details = route.params.visit.details;
  const date = route.params.visit.date;
  const addVisitMedicalQuery = useAddVisitMedical();
  const updateVisitMedicalQuery = useUpdateVisitMedical();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState(
    route.params.isGuardar
      ? {
          user_pet: id,
          visit_date: date,
          title: title,
          details: details,
        }
      : {
          id: idVisit,
          user_pet: id,
          visit_date: date,
          title: title,
          details: details,
        },
  );
  const [isLoading, setIsLoading] = useState(true);
  const useDelete = useDeleteVisit();
  const receta = {name: 'Fotografía receta', nameSeg: 'Receta'};
  const adicional = {name: 'Fotografía adicional', nameSeg: 'Adicional'};
  const titleHeader = route.params.isGuardar
    ? 'Nueva Visita'
    : 'Editar Visita ';
  const onSave = () => {
    addVisitMedicalQuery.mutate(form);
  };
  const onUpdate = () => {
    updateVisitMedicalQuery.mutate(form);
  };
  route.params.isGuardar
    ? navigation.setOptions({
        headerRight: () => (
          <AnchorText
            style={styles.headerRight}
            isDisabled={isLoading}
            onPress={onSave}>
            Guardar
          </AnchorText>
        ),
      })
    : navigation.setOptions({
        headerRight: () => (
          <AnchorText
            style={styles.headerRight}
            isDisabled={isLoading}
            onPress={onUpdate}>
            Editar
          </AnchorText>
        ),
      });
  useEffect(() => {
    if (form.details && form.title && form.visit_date) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [navigation, form, isLoading]);
  const onDeleteAccept = () => {
    useDelete.mutate(idVisit);
  };
  return (
    <DefaultLayout>
      <ScrollView>
        <CustomModal
          labelAccept="Entendido"
          title="Eliminar Registro"
          text="¿Estás seguro de que quieres eliminar este registro?"
          onAccept={onDeleteAccept}
          onCancel={() => setIsModalVisible(false)}
          showCancel={true}
          visible={isModalVisible}
        />
        <TitleHeader style={{paddingBottom: 10}}>{titleHeader}</TitleHeader>
        <DatepickerInput
          currentValue={form.visit_date}
          onSelect={(visit_date) => setForm({...form, visit_date})}
          placeholder="Fecha de visita"
        />
        <UserInput
          placeholder="Motivo"
          value={form.title}
          onChangeText={(value: string) => {
            setForm({...form, title: value});
          }}
        />
        <UserTextArea
          placeholder="Notas"
          value={form.details}
          onChangeText={(value: string) => {
            setForm({...form, details: value});
          }}
        />
        <VisitsImgCard obj={receta} />
        <VisitsImgCard obj={adicional} />
        <VisitsImgCard obj={adicional} />
        <VisitsImgCard obj={adicional} />
        {!route.params.isGuardar && (
          <View>
            <Text
              style={styles.eliminar}
              onPress={() => setIsModalVisible(true)}>
              Eliminar
            </Text>
          </View>
        )}
      </ScrollView>
    </DefaultLayout>
  );
};
const styles = StyleSheet.create({
  headerRight: {
    marginRight: 12,
  },
  formLayout: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 22,
    backgroundColor: globalColors.backgroundDefault,
  },
  formInput: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: globalColors.lightGreen,
    borderRadius: 10,
    minHeight: 130,
    fontSize: 18,
  },
  textAreaContainer: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: globalColors.lightGreen,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    fontSize: 18,
    textAlignVertical: 'top',
  },
  inputLabel: {
    position: 'absolute',
    left: 16,
    color: globalColors.darkGray,
    fontSize: 14,
    fontFamily: globalVars.fontRegular,
  },
  card: {
    height: 56,
    borderRadius: 10,
    marginTop: 16,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  addImg: {
    textAlign: 'right',
    color: globalColors.greenSecondary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    width: '28%',
    paddingTop: 14,
  },
  addtext: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    width: '70%',
    paddingTop: 14,
  },
  addImg2: {
    textAlign: 'right',
    color: globalColors.red,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    width: '29%',
    paddingTop: 14,
  },
  addtext2: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    width: '55%',
    paddingTop: 14,
  },
  eliminar: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: globalColors.red,
    textAlign: 'center',
    marginVertical: 16,
  },
});
