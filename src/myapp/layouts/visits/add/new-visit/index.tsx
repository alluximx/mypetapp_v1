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
  const adicionalImg1 = imgAdi.length > 0 ? [imgAdi[0]] : [];
  const adicionalImg2 = imgAdi.length > 1 ? [imgAdi[1]] : [];
  const adicionalImg3 = imgAdi.length > 2 ? [imgAdi[2]] : [];
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
  const [recetaValue, setRecetaValue] = useState(null);
  const [adicional1, setAdicional1] = useState(null);
  const [adicional2, setAdicional2] = useState(null);
  const [adicional3, setAdicional3] = useState(null);
  const [recetaEliminar, setRecetaEliminar] = useState([]);
  const [eliminarAdicional1, setEliminarAdicional1] = useState([]);
  const [eliminarAdicional2, setEliminarAdicional2] = useState([]);
  const [eliminarAdicional3, setEliminarAdicional3] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const useDelete = useDeleteVisit();
  const receta = {name: 'Fotografía receta', nameSeg: 'Receta'};
  const adicional = {name: 'Fotografía adicional', nameSeg: 'Adicional'};
  const titleHeader = route.params.isGuardar
    ? 'Nueva Visita'
    : 'Editar Visita ';
  const onSave = () => {
    setIsLoading(true);
    setIsLoad(true);
    const newData = {
      ...form,
      recetaValue: recetaValue != null ? recetaValue.assets[0] : [],
      adicional1: adicional1 != null ? adicional1.assets[0] : [],
      adicional2: adicional2 != null ? adicional2.assets[0] : [],
      adicional3: adicional3 != null ? adicional3.assets[0] : [],
    };

    addVisitMedicalQuery.mutate(newData);
  };
  const onUpdate = () => {
    setIsLoading(true);
    setIsLoad(true);
    const newData = {
      ...form,
      recetaValue: recetaValue != null ? recetaValue.assets[0] : [],
      adicional1: adicional1 != null ? adicional1.assets[0] : [],
      adicional2: adicional2 != null ? adicional2.assets[0] : [],
      adicional3: adicional3 != null ? adicional3.assets[0] : [],
      recetaEli: recetaEliminar,
      eliAdicional1: eliminarAdicional1,
      eliAdicional2: eliminarAdicional2,
      eliAdicional3: eliminarAdicional3,
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
    setRecetaEliminar(param);
    !route.params.isGuardar && setIsLoading(false);
  };
  const onAdicional1Click = (param) => {
    setEliminarAdicional1(param);
    !route.params.isGuardar && setIsLoading(false);
  };
  const onAdicional2Click = (param) => {
    setEliminarAdicional2(param);
    !route.params.isGuardar && setIsLoading(false);
  };
  const onAdicional3Click = (param) => {
    setEliminarAdicional3(param);
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
          obj={receta}
          value={recetaImg}
          onChangeText={(value: any) => {
            setRecetaValue(value);
            !route.params.isGuardar && setIsLoading(false);
          }}
          onDelete={onRecetaClick}
        />
        <VisitsImgCard
          obj={adicional}
          value={adicionalImg1}
          onChangeText={(value) => {
            setAdicional1(value);
            !route.params.isGuardar && setIsLoading(false);
          }}
          onDelete={onAdicional1Click}
        />
        <VisitsImgCard
          obj={adicional}
          value={adicionalImg2}
          onChangeText={(value) => {
            setAdicional2(value);
            !route.params.isGuardar && setIsLoading(false);
          }}
          onDelete={onAdicional2Click}
        />
        <VisitsImgCard
          obj={adicional}
          value={adicionalImg3}
          onChangeText={(value) => {
            setAdicional3(value);
            !route.params.isGuardar && setIsLoading(false);
          }}
          onDelete={onAdicional3Click}
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
