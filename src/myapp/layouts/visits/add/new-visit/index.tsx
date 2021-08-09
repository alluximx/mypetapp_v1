import React, {useEffect, useState} from 'react';
import {Icon, Text} from '@ui-kitten/components';
import {ImageSourcePropType, ScrollView, StyleSheet, View} from 'react-native';
// Global Styles.
import globalColors from '../../../../styles/colors';
import globalVars from '../../../../styles/vars';
// Hooks.
import useAddVisitMedical from '../../../../hooks/visits/useAddVisitMedical';
import useDeleteVisit from '../../../../hooks/visits/useDeleteVisit';
import useUpdateVisitMedical from '../../../../hooks/visits/useUpdateVisitMedical';
// My Components
import AnchorText from '../../../../components/texts/anchor-text';
import CustomModal from '../../../../components/modals/custom-modal';
import CustomSpinner from '../../../../components/custom-spinner';
import DatepickerInput from '../../../../components/inputs/date-picker';
import DefaultLayout from '../../../../components/layouts/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
import UserTextArea from '../../../../components/inputs/user-textAtea';
import VisitsImgCard from '../../../../components/cards/image-input-card';

export default ({navigation, route}): React.ReactElement => {
  const {date, details, idVisit, images, title} = route.params.visit;
  const [prescription, setPrescription] = useState<ImageSourcePropType>(null);
  // const [additional1, setAdditional] = useState<ImageSourcePropType>(null);
  // const [prescription, setPrescription] = useState<ImageSourcePropType>(null);
  // const [prescription, setPrescription] = useState<ImageSourcePropType>(null);

  let imgAdi = [];

  images.map((expense) => {
    return !expense.is_prescription && imgAdi.push(expense);
  });

  let imgRec = [];

  images.map((expense) => {
    expense.is_prescription && imgRec.push(expense);
  });

  const addVisitMedicalQuery = useAddVisitMedical();
  const updateVisitMedicalQuery = useUpdateVisitMedical();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState(
    route.params.isGuardar
      ? {
          user_pet: route.params.pet.id,
          visit_date: date,
          title: title,
          details: details,
        }
      : {
          id: idVisit,
          user_pet: route.params.pet.id,
          visit_date: date,
          title: title,
          details: details,
        },
  );
  const [isLoading, setIsLoading] = useState(true);

  const [additional1, setAdditional1] = useState(null);
  const [additional2, setAdditional2] = useState(null);
  const [additional3, setAdditional3] = useState(null);
  const [prescriptionEliminar, setPrescriptionEliminar] = useState([]);
  const [deleteAdditional1, setDeleteAdditional1] = useState([]);
  const [deleteAdditional2, setDeleteAdditional2] = useState([]);
  const [deleteAdditional3, setDeleteAdditional3] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const useDelete = useDeleteVisit();
  // const prescription = {name: 'Fotografía receta', nameSeg: 'Receta'};
  const additional = {name: 'Fotografía adicional', nameSeg: 'Adicional'};
  const titleHeader = route.params.isGuardar
    ? 'Nueva Visita'
    : 'Editar Visita ';
  const onSave = () => {
    setIsLoading(true);
    setIsLoad(true);
    const newData = {
      ...form,
      // prescriptionValue:
      //   prescriptionValue != null ? prescriptionValue.assets[0] : [],
      additional1: additional1 != null ? additional1.assets[0] : [],
      additional2: additional2 != null ? additional2.assets[0] : [],
      additional3: additional3 != null ? additional3.assets[0] : [],
    };

    addVisitMedicalQuery.mutate(newData);
  };
  const onUpdate = () => {
    setIsLoading(true);
    setIsLoad(true);
    const newData = {
      ...form,
      // prescriptionValue:
      //   prescriptionValue != null ? prescriptionValue.assets[0] : [],
      additional1: additional1 != null ? additional1.assets[0] : [],
      additional2: additional2 != null ? additional2.assets[0] : [],
      additional3: additional3 != null ? additional3.assets[0] : [],
      prescriptionEli: prescriptionEliminar,
      eliAdditional1: deleteAdditional1,
      eliAdditional2: deleteAdditional2,
      eliAdditional3: deleteAdditional3,
    };
    updateVisitMedicalQuery.mutate(newData);
  };
  route.params.isGuardar
    ? navigation.setOptions({
        headerLeft: () => (
          <Icon
            style={{
              tintColor: globalColors.greenSecondary,
              height: 35,
              width: 35,
              paddingRight: 0,
            }}
            name="close"
            onPress={() => navigation.goBack()}
          />
        ),
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
        headerLeft: () => (
          <Icon
            style={{
              tintColor: globalColors.greenSecondary,
              height: 35,
              width: 35,
              paddingRight: 0,
            }}
            name="close"
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () => (
          <AnchorText
            style={styles.headerRight}
            isDisabled={isLoading}
            onPress={onUpdate}>
            Guardar
          </AnchorText>
        ),
      });
  useEffect(() => {
    route.params.isGuardar
      ? form.details && form.title && form.visit_date
        ? setIsLoading(false)
        : setIsLoading(true)
      : form.details != details ||
        form.title != title ||
        form.visit_date != date
      ? setIsLoading(false)
      : null;
  }, [navigation, form, isLoading]);
  const onDeleteAccept = () => {
    setIsLoad(true);
    useDelete.mutate(idVisit);
  };
  const onRecetaClick = (param) => {
    setPrescriptionEliminar(param);
    !route.params.isGuardar && setIsLoading(false);
  };
  const onAdditional1Click = (param) => {
    setDeleteAdditional1(param);
    !route.params.isGuardar && setIsLoading(false);
  };
  const onAdditional2Click = (param) => {
    setDeleteAdditional2(param);
    !route.params.isGuardar && setIsLoading(false);
  };
  const onAdditional3Click = (param) => {
    setDeleteAdditional3(param);
    !route.params.isGuardar && setIsLoading(false);
  };
  return isLoad ? (
    <CustomSpinner />
  ) : (
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
        <TitleHeader style={styles.titleHeader}>{titleHeader}</TitleHeader>
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
        <VisitsImgCard
          image={prescription}
          label="Receta"
          setImage={setPrescription}
        />
        {/* <VisitsImgCard obj={receta} />
        <VisitsImgCard obj={adicional} />
        <VisitsImgCard obj={adicional} />
        <VisitsImgCard obj={adicional} /> */}
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
  titleHeader: {paddingBottom: 10},
  headerRight: {
    marginRight: 12,
  },
  formLayout: {
    marginTop: 22,
    backgroundColor: globalColors.backgroundDefault,
  },
  formInput: {
    marginBottom: 8,
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
