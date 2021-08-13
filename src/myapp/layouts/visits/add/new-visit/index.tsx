import React, {useEffect, useState} from 'react';
import {Text} from '@ui-kitten/components';
import {ImageURISource, ScrollView, StyleSheet, View} from 'react-native';
// Global Styles.
import globalColors from '../../../../styles/colors';
import globalVars from '../../../../styles/vars';
// Hooks.
import useAddMedicalVisit from '../../../../hooks/visits/useAddVisitMedical';
import useDeleteMedicalVisit from '../../../../hooks/visits/useDeleteVisit';
import useSetNavigationHeaders from '../../../../hooks/navigation/useSetNavigationHeaders';
import useUpdateMedicalVisit from '../../../../hooks/visits/useUpdateVisitMedical';
// Models.
import {VisitImage} from '../../../../types/models';
// My Components
import CustomModal from '../../../../components/modals/custom-modal';
import CustomSpinner from '../../../../components/custom-spinner';
import DatepickerInput from '../../../../components/inputs/date-picker';
import DefaultLayout from '../../../../components/layouts/default-layout';
import TitleHeader from '../../../../components/texts/title-header';
import UserInput from '../../../../components/inputs/user-input';
import UserTextArea from '../../../../components/inputs/user-textAtea';
import ImageInputCard from '../../../../components/cards/image-input-card';

export default ({navigation, route}): React.ReactElement => {
  const {date, details, idVisit, images, title} = route.params.visit;

  const prescriptionImage = images.find(
    (image: VisitImage) => image.is_prescription,
  );
  const [prescription, setPrescription] = useState<ImageURISource>(
    prescriptionImage ? {uri: prescriptionImage.file} : null,
  );

  // Order additional images.
  const additionalImages = images.filter((image: VisitImage) => {
    return !image.is_prescription;
  });

  const [additional1, setAdditional1] = useState<ImageURISource>(
    additionalImages[0] ? {uri: additionalImages[0].file} : null,
  );
  const [additional2, setAdditional2] = useState<ImageURISource>(
    additionalImages[1] ? {uri: additionalImages[1].file} : null,
  );
  const [additional3, setAdditional3] = useState<ImageURISource>(
    additionalImages[2] ? {uri: additionalImages[2].file} : null,
  );

  const addQuery = useAddMedicalVisit();
  const updateQuery = useUpdateMedicalVisit();
  const deleteQuery = useDeleteMedicalVisit();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    id: idVisit,
    user_pet: route.params.pet.id,
    visit_date: date,
    title: title,
    details: details,
  });

  const formattedSubmission = () => {
    setIsLoading(true);
    // Add images to form request.
    const newData = {
      ...form,
      prescription,
      additional1,
      additional2,
      additional3,
      imagesChanges,
    };
    return newData;
  };

  const onSave = () => addQuery.mutate(formattedSubmission());
  const onUpdate = () => updateQuery.mutate(formattedSubmission());
  const onDeleteAccept = () => deleteQuery.mutate(idVisit);

  const [imagesChanges, setImagesChanges] = useState({
    prescriptionChange: {type: null, id: prescriptionImage?.id},
    additional1Change: {type: null, id: additionalImages[0]?.id},
    additional2Change: {type: null, id: additionalImages[1]?.id},
    additional3Change: {type: null, id: additionalImages[2]?.id},
  });

  const checkIfChanged = (variable, original) => {
    return variable?.uri !== original?.file ? true : false;
  };

  const getChangeType = (variable, original, changed) => {
    // If changed and is not null...
    return changed
      ? variable
        ? // If original was null...
          !original
          ? 'created'
          : 'updated'
        : 'deleted'
      : null;
  };

  const isDisabled =
    (!form.visit_date || form.visit_date === date) &&
    (!form.title || form.title === title) &&
    (!form.details || form.details === details) &&
    !Object.values(imagesChanges).some(
      (image: {type: string | null; id: string}) => {
        return image.type !== null;
      },
    );

  useSetNavigationHeaders({
    isDisabled,
    isLoading,
    navigation,
    onRightPress: !route.params.isEdit ? onSave : onUpdate,
    setIsLoading,
    data: {...form, prescription, additional1, additional2, additional3},
  });

  useEffect(() => {
    const prescriptionChanged = checkIfChanged(prescription, prescriptionImage);
    const additional1Changed = checkIfChanged(additional1, additionalImages[0]);
    const additional2Changed = checkIfChanged(additional2, additionalImages[1]);
    const additional3Changed = checkIfChanged(additional3, additionalImages[2]);

    const prescriptionChangeType = getChangeType(
      prescription,
      prescriptionImage,
      prescriptionChanged,
    );
    const additional1ChangeType = getChangeType(
      additional1,
      additionalImages[0],
      additional1Changed,
    );
    const additional2ChangeType = getChangeType(
      additional2,
      additionalImages[1],
      additional2Changed,
    );
    const additional3ChangeType = getChangeType(
      additional3,
      additionalImages[2],
      additional3Changed,
    );

    setImagesChanges({
      prescriptionChange: {
        ...imagesChanges.prescriptionChange,
        type: prescriptionChangeType,
      },
      additional1Change: {
        ...imagesChanges.additional1Change,
        type: additional1ChangeType,
      },
      additional2Change: {
        ...imagesChanges.additional2Change,
        type: additional2ChangeType,
      },
      additional3Change: {
        ...imagesChanges.additional3Change,
        type: additional3ChangeType,
      },
    });
  }, [prescription, additional1, additional2, additional3]);

  return isLoading ? (
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
        <TitleHeader style={styles.titleHeader}>
          {!route.params.isEdit ? 'Nueva Visita' : 'Editar Visita '}
        </TitleHeader>
        <DatepickerInput
          currentValue={form.visit_date}
          minDate={new Date()}
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
        <ImageInputCard
          image={prescription}
          label="Fotografía receta"
          filledLabel="Receta"
          setImage={setPrescription}
        />
        <ImageInputCard
          image={additional1}
          label="Fotografía adicional"
          filledLabel="Adicional"
          setImage={setAdditional1}
        />
        <ImageInputCard
          image={additional2}
          label="Fotografía adicional"
          filledLabel="Adicional"
          setImage={setAdditional2}
        />
        <ImageInputCard
          image={additional3}
          label="Fotografía adicional"
          filledLabel="Adicional"
          setImage={setAdditional3}
        />
        {route.params.isEdit && (
          <View>
            <Text
              style={styles.deleteButton}
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
  closeIcon: {
    tintColor: globalColors.greenSecondary,
    height: 35,
    width: 35,
    paddingRight: 0,
  },
  titleHeader: {paddingBottom: 10},
  headerRight: {
    marginRight: 12,
  },
  deleteButton: {
    fontFamily: globalVars.fontBold,
    color: globalColors.red,
    textAlign: 'center',
    marginVertical: 16,
  },
});
