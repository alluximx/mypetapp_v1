import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, ImageURISource, StyleSheet, View} from 'react-native';
import {Card, List} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks.
import useGetPet from '../../../hooks/user/useGetPet';
import useMyPetImage from '../../../hooks/pets/useMyPetImage';
import useGetVaccineReminder from '../../../hooks/vaccines/useGetVaccineReminder';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import PetDataCard from '../../../components/cards/pet-data-card';
import PreviewableImage from '../../../components/modals/previewable-image';
import TitleHeader from '../../../components/texts/title-header';
import ReminderArea from '../../../components/reminder-area';

const servicesList = [
  {
    serviceName: 'Visitas',
    icon: require('../../../assets/images/menu/visits-detail.png'),
    screen: 'ServicesDoc',
  },
  {
    serviceName: 'Vacunas',
    icon: require('../../../assets/images/menu/vaccines.png'),
    screen: 'VaccinesIndex',
  },
  {
    serviceName: 'Desparasitaciones',
    icon: require('../../../assets/images/menu/deworming.png'),
    screen: 'DewormingHistory',
  },
];

const sexDirectory = {
  M: 'Macho',
  H: 'Hembra',
};

export default ({navigation, route}): React.ReactElement => {
  const [pet, setPet] = useState(route.params.pet);

  const {data: petData, isLoading, isSuccess} = useGetPet(
    route.params.petId,
    route.params.petId !== null ? false : true,
  );

  useEffect(() => {
    if (route.params.petId) {
      if (petData?.data) {
        setPet(petData.data);
      }
    }
  }, [isSuccess, route.params]);

  const {id, breed, name, pet_age, sex} = pet || {};
  const {years, months} = pet_age || {};
  // Format age.
  const monthsMessage = `${months} ${months === 1 ? 'Mes' : 'Meses'}`;
  const yearsMessage = `${years} ${years === 1 ? 'Año' : 'Años'}`;
  const formattedAge =
    years > 0 ? `${yearsMessage} ${monthsMessage}` : monthsMessage;

  const [image, setImage] = useState<ImageURISource>(null);
  const [reminders, setReminders] = useState([]);

  const {data: petImage} = useMyPetImage(id);
  const reminderDate = useGetVaccineReminder(id);

  useEffect(() => {
    if (petImage) {
      setImage({
        uri: petImage.data[0]?.file,
      });
    }
  }, [petImage]);

  useEffect(() => {
    if (reminderDate.data) {
      setReminders(reminderDate.data.data);
    }
  }, [reminderDate.data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AnchorText
          style={styles.headerRight}
          onPress={() =>
            navigation.navigate('EditPet', {
              pet,
              petImage: image,
              petImageId: petImage.data[0]?.id,
            })
          }
          isSubmit>
          Editar
        </AnchorText>
      ),
    });
  }, [navigation, image]);

  const renderServiceItem = (service) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(service.item.screen, {pet});
      }}
      style={styles.serviceContainer}>
      <Card activeOpacity={0.8} style={styles.serviceIconContainer}>
        <Image style={styles.serviceIcon} source={service.item.icon} />
      </Card>
      <DefaultText style={styles.serviceNameText} wrapText>
        {service.item.serviceName}
      </DefaultText>
    </TouchableOpacity>
  );

  const renderServiceReminderItem = (service) => {
    const auxData = {
      id_record: service.item.id,
      date: service.item.reminder,
      name: service.item.vaccine_registered.vaccine_name,
      is_vaccine: service.item.is_vaccine,
    };
    return <ReminderArea navigation={navigation} data={auxData} />;
  };

  function customSort(a, b) {
    const Item1 = a.reminder;
    const Item2 = b.reminder;
    if (Item1 > Item2) {
      return 1;
    }
    if (Item1 < Item2) {
      return -1;
    }
    return 0;
  }

  reminders.sort(customSort);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <View style={styles.petImageContainer}>
        <PreviewableImage source={image} style={styles.petImage} />
        <View style={styles.petDataContainer}>
          <TitleHeader style={styles.whiteText}>{name}</TitleHeader>
          <DefaultText style={styles.whiteText}>{breed?.name}</DefaultText>
        </View>
      </View>
      <View style={styles.petDataCards}>
        <PetDataCard title={sexDirectory[sex]} subtitle="Sexo" />
        <PetDataCard title={formattedAge} subtitle="Edad" />
      </View>
      <DefaultLayout
        statusBarBackgroundColor={globalColors.greenSecondary}
        statusBarStyle="light-content"
        style={styles.cardSection}>
        <View>
          <TitleHeader style={styles.bottomSpace}>
            Historial Clínico
          </TitleHeader>
          <List
            style={styles.servicesContainer}
            contentContainerStyle={styles.servicesContentContainer}
            horizontal={true}
            data={servicesList}
            renderItem={renderServiceItem}
          />
        </View>
        <List
          style={styles.servicesContainer}
          data={reminders}
          renderItem={renderServiceReminderItem}
        />
      </DefaultLayout>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.greenSecondary,
    paddingTop: 32,
    paddingHorizontal: 0,
  },
  headerRight: {
    color: globalColors.white,
    marginRight: 12,
  },
  whiteText: {
    color: globalColors.white,
  },
  petDataCards: {
    flexDirection: 'row',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  petImageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  petDataContainer: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  cardSection: {
    marginTop: 32,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingTop: 32,
  },
  bottomSpace: {
    marginBottom: 24,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 8,
  },
  servicesContentContainer: {
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  serviceContainer: {
    marginRight: 33,
    alignItems: 'center',
  },
  serviceIconContainer: {
    borderRadius: 16,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  serviceIcon: {
    height: 40,
    width: 40,
  },
  serviceNameText: {
    color: globalColors.black,
    fontSize: 14,
    fontFamily: globalVars.fontRegular,
    textAlign: 'center',
    maxWidth: 80,
  },
});
