import React, {useRef, useState, useCallback} from 'react';
// My Components
import DefaultLayout from '../../../../components/layouts/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import AnchorText from '../../../../components/texts/anchor-text';
import {StyleSheet, View} from 'react-native';
import {Button, Layout, Text, Icon} from '@ui-kitten/components';
import globalColors from '../../../../styles/colors';
import DatepickerInput from '../../../../components/inputs/date-picker';
import UserInput from '../../../../components/inputs/user-input';
import UserTextArea from '../../../../components/inputs/user-textAtea';
import globalVars from '../../../../styles/vars';
import {useEffect} from 'react';
import useAddVisitMedical from '../../../../hooks/visits/useAddVisitMedical';
import useUpdateVisitMedical from '../../../../hooks/visits/useUpdateVisitMedical';
import VisitsImgCard from '../../../../components/cards/visits-img-card';
import CustomModal from '../../../../components/modals/custom-modal';
import useDeleteVisit from '../../../../hooks/visits/useDeleteVisit';
import CustomSpinner from '../../../../components/custom-spinner';
import AddButton from '../../../../components/buttons/add-button';
export default ({navigation, route}): React.ReactElement => {
  const {id, breed, name, pet_age, sex} = route.params.pet;
  const idVisit = route.params.visit.idVisit;
  const title = route.params.visit.title;
  const details = route.params.visit.details;
  const date = route.params.visit.date;
  const images = route.params.visit.images;
  let imgAdi = [];
  images.map((expense) => {
    return !expense.is_prescription && imgAdi.push(expense);
  });
  let imgRec = [];
  images.map((expense) => {
    expense.is_prescription && imgRec.push(expense);
  });
  const recetaImg = imgRec.length > 0 ? [imgRec[0]] : [];
  const additionalImg1 = imgAdi.length > 0 ? [imgAdi[0]] : [];
  const additionalImg2 = imgAdi.length > 1 ? [imgAdi[1]] : [];
  const additionalImg3 = imgAdi.length > 2 ? [imgAdi[2]] : [];
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
  const [prescriptionValue, setPrescriptionValueValue] = useState(null); //prescription
  const [additional1, setAdditional1] = useState(null);
  const [additional2, setAdditional2] = useState(null);
  const [additional3, setAdditional3] = useState(null);
  const [prescriptionEliminar, setPrescriptionEliminar] = useState([]);
  const [deleteAdditional1, setDeleteAdditional1] = useState([]);
  const [deleteAdditional2, setDeleteAdditional2] = useState([]);
  const [deleteAdditional3, setDeleteAdditional3] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const useDelete = useDeleteVisit();
  const prescription = {name: 'Fotografía receta', nameSeg: 'Receta'};
  const additional = {name: 'Fotografía adicional', nameSeg: 'Adicional'};
  const titleHeader = route.params.isGuardar
    ? 'Nueva Visita'
    : 'Editar Visita ';
  const onSave = () => {
    setIsLoading(true);
    setIsLoad(true);
    const newData = {
      ...form,
      prescriptionValue:
        prescriptionValue != null ? prescriptionValue.assets[0] : [],
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
      prescriptionValue:
        prescriptionValue != null ? prescriptionValue.assets[0] : [],
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
      <CustomModal
        labelAccept="Entendido"
        title="Eliminar Registro"
        text="¿Estás seguro de que quieres eliminar este registro?"
        onAccept={onDeleteAccept}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
      <TitleHeader>{titleHeader}</TitleHeader>
      <Layout style={styles.formLayout}>
        <View style={styles.formInput}>
          <DatepickerInput
            currentValue={form.visit_date}
            onSelect={(visit_date) => setForm({...form, visit_date})}
            placeholder="Fecha de visita"
          />
        </View>
        <View>
          <UserInput
            placeholder="Motivo"
            value={form.title}
            onChangeText={(value: string) => {
              setForm({...form, title: value});
            }}
          />
        </View>
        <View>
          <UserTextArea
            placeholder="Notas"
            value={form.details}
            onChangeText={(value: string) => {
              setForm({...form, details: value});
            }}
          />
        </View>
        <VisitsImgCard
          obj={prescription}
          value={recetaImg}
          onChangeText={(value: any) => {
            setPrescriptionValueValue(value);
            !route.params.isGuardar && setIsLoading(false);
          }}
          onDelete={onRecetaClick}
        />
        <VisitsImgCard
          obj={additional}
          value={additionalImg1}
          onChangeText={(value) => {
            setAdditional1(value);
            !route.params.isGuardar && setIsLoading(false);
          }}
          onDelete={onAdditional1Click}
        />
        <VisitsImgCard
          obj={additional}
          value={additionalImg2}
          onChangeText={(value) => {
            setAdditional2(value);
            !route.params.isGuardar && setIsLoading(false);
          }}
          onDelete={onAdditional2Click}
        />
        <VisitsImgCard
          obj={additional}
          value={additionalImg3}
          onChangeText={(value) => {
            setAdditional3(value);
            !route.params.isGuardar && setIsLoading(false);
          }}
          onDelete={onAdditional3Click}
        />
        {!route.params.isGuardar && (
          <View>
            <Text
              style={styles.eliminar}
              onPress={() => setIsModalVisible(true)}>
              Eliminar
            </Text>
          </View>
        )}
      </Layout>
    </DefaultLayout>
  );
};
const styles = StyleSheet.create({
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
    marginTop: 10,
  },
});
