import React, {useEffect} from 'react';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import UserInput from '../../../components/inputs/user-input';
import {useState} from 'react';
import CustomButton from '../../../components/buttons/custom-button';
import {View, ScrollView} from 'react-native';
import OptionSelect from '../../../components/inputs/option-select';
import CustomModal from '../../../components/modals/custom-modal';
import UserTextArea from '../../../components/inputs/user-textAtea';
import useAdoption from '../../../hooks/adoption/useAdoption';
import useStates from '../../../hooks/util/useState';
import DropdownPicker from '../../../components/inputs/dropdown-picker';
import MunicipalityDrop from '../../../components/adoption/municipality-drop';
import CloseButton from '../../../components/buttons/close-button';

export default ({navigation, route}): React.ReactElement => {
  const [form, setForm] = useState({
    cel: '',
    sex: '',
    age: '',
    tel: '',
    occupation: '',
    street: '',
    number: '',
    cp: '',
    cologne: '',
    city: '',
    municipality: '',
    state: '',
    qpet: '',
    qact: '',
    reason: '',
    qcount: '',
    qallirgic: '',
    qresource: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateList, setStateList] = useState([]);
  const useAddQuery = useAdoption();
  const dataStates = useStates();
  const isDisable =
    form.age !== '' &&
    form.sex !== '' &&
    form.occupation !== '' &&
    form.street !== '' &&
    form.number !== '' &&
    form.cp.length === 5 &&
    form.cel.length === 10 &&
    form.tel.length === 10 &&
    form.cologne !== '' &&
    form.city !== '' &&
    form.municipality !== '' &&
    form.state !== '' &&
    form.qpet !== '' &&
    form.qact !== '' &&
    form.reason.length >= 20 &&
    form.qcount !== '' &&
    form.qallirgic !== '' &&
    form.qresource !== '';

  useEffect(() => {
    if (dataStates.data) {
      const aux = [];
      dataStates.data.data.forEach((element) => {
        aux.push({
          value: element.id,
          label: element.name,
        });
      });
      setStateList(aux);
    }
  }, [dataStates.data, dataStates.isFetched]);

  const sexOptions = [
    {key: 'M', value: 'Hombre'},
    {key: 'H', value: 'Mujer'},
  ];
  const optionsRes = [
    {key: 'S', value: 'Si'},
    {key: 'N', value: 'No'},
  ];
  const onAdoption = () => {
    const request = {
      adoption_publication: route.params.adoption.id,
      profile_data: {
        age: form.age,
        occupation: form.occupation,
        mobile: form.cel,
        phone_number: form.tel,
      },
      questionnaire: [
        {
          question: '¿Has tenido alguna mascota?',
          answer: form.qpet === 'S' ? 'Si' : 'No',
        },
        {
          question: '¿Actualmente tienes alguna mascota?',
          answer: form.qact === 'S' ? 'Si' : 'No',
        },
        {
          question: '¿Qué te motivó a adoptar?',
          answer: form.reason,
        },
        {
          question:
            '¿Las personas que viven en tu casa están de acuerdo en adoptar?',
          answer: form.qcount === 'S' ? 'Si' : 'No',
        },
        {
          question: '¿Tú o alguien en el hogar son alérgicos a los perros?',
          answer: form.qallirgic === 'S' ? 'Si' : 'No',
        },
        {
          question:
            '¿Consideras que tienes los recursos suficientes para cubrir los gastos necesarios de tu mascota?',
          answer: form.qresource === 'S' ? 'Si' : 'No',
        },
      ],
      address: {
        street: form.street,
        number: form.number,
        colony: form.cologne,
        city: form.city,
        zipcode: form.cp,
        state: form.state,
        municipality: form.municipality,
      },
      data: route.params.adoption,
    };
    useAddQuery.mutate(request);
  };
  navigation.setOptions({
    headerLeft: () => <CloseButton navigation={navigation} />,
  });
  return (
    <DefaultLayout>
      <CustomModal
        labelAccept="Entendido"
        title="Solicitud Enviada"
        text="La solicitud la analizará la asociación y se pondrá en
        contacto contigo en caso de ser aprobada para continuar con el proceso y de ser necesario
        solicitarte más información."
        onAccept={onAdoption}
        onCancel={() => {}}
        showCancel={false}
        visible={isModalVisible}
      />
      <ScrollView>
        <TitleHeader>Solicitud de adopción</TitleHeader>
        <DefaultText style={{marginBottom: 48}}>
          Por favor llena los siguientes datos para ponernos en contacto
          contigo.
        </DefaultText>
        <UserInput
          placeholder="Edad"
          value={form.age}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, age: value.replace(/[^0-9]/g, '')});
          }}
        />
        <TitleHeader>Género</TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.sex}
            setCurrentValue={(sex: string) => {
              setForm({...form, sex});
            }}
            horizontal={true}
            data={sexOptions}
          />
        </View>
        <UserInput
          placeholder="Ocupación"
          value={form.occupation}
          onChangeText={(value: string) => {
            setForm({...form, occupation: value});
          }}
        />
        <TitleHeader>Dirección*</TitleHeader>
        <UserInput
          placeholder="Calle"
          value={form.street}
          onChangeText={(value: string) => {
            setForm({...form, street: value});
          }}
        />
        <UserInput
          placeholder="Número"
          value={form.number}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, number: value.replace(/[^0-9]/g, '')});
          }}
        />
        <UserInput
          placeholder="CP"
          isNumeric={true}
          value={form.cp}
          onChangeText={(value: string) => {
            setForm({...form, cp: value.replace(/[^0-9]/g, '')});
          }}
        />
        <UserInput
          placeholder="Colonia"
          value={form.cologne}
          onChangeText={(value: string) => {
            setForm({...form, cologne: value});
          }}
        />
        <DropdownPicker
          data={stateList}
          currentValue={form.state}
          placeholder="Estado"
          setCurrentValue={(stateId) => {
            setForm({...form, state: stateId});
          }}
        />
        <MunicipalityDrop
          status={false}
          id={form.state}
          change={(valor, name) => {
            valor === ''
              ? setForm({...form, municipality: '', city: ''})
              : setForm({...form, municipality: valor, city: name});
          }}
        />
        <UserInput
          placeholder="Celular"
          value={form.cel}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, cel: value.replace(/[^0-9]/g, '')});
          }}
        />
        <UserInput
          placeholder="Teléfono fijo"
          value={form.tel}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, tel: value.replace(/[^0-9]/g, '')});
          }}
        />
        <TitleHeader>¿Has tenido alguna mascota?</TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.qpet}
            setCurrentValue={(qpet: string) => {
              setForm({...form, qpet});
            }}
            horizontal={true}
            data={optionsRes}
          />
        </View>
        <TitleHeader>¿Actualmente tienes alguna mascota?</TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.qact}
            setCurrentValue={(qact: string) => {
              setForm({...form, qact});
            }}
            horizontal={true}
            data={optionsRes}
          />
        </View>
        <TitleHeader>¿Qué te motivó a adoptar?</TitleHeader>
        <View style={{marginBottom: 15}}>
          <UserTextArea
            placeholder="Motivos"
            value={form.reason}
            onChangeText={(value: string) => {
              setForm({...form, reason: value});
            }}
          />
        </View>
        <TitleHeader>
          ¿Las personas que viven en tu casa están de acuerdo en adoptar?
        </TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.qcount}
            setCurrentValue={(qcount: string) => {
              setForm({...form, qcount});
            }}
            horizontal={true}
            data={optionsRes}
          />
        </View>
        <TitleHeader>
          ¿Tú o alguien en el hogar son alérgicos a los perros?
        </TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.qallirgic}
            setCurrentValue={(qallirgic: string) => {
              setForm({...form, qallirgic});
            }}
            horizontal={true}
            data={optionsRes}
          />
        </View>
        <TitleHeader>
          ¿Consideras que tienes los recursos suficientes para cubrir los gastos
          necesarios de tu mascota?
        </TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.qresource}
            setCurrentValue={(qresource: string) => {
              setForm({...form, qresource});
            }}
            horizontal={true}
            data={optionsRes}
          />
        </View>
        <DefaultText>
          *La dirección registrada en la solicitud, podrá utilizada por las
          asociaciones para una visita presencial
        </DefaultText>
        <CustomButton
          style={
            !isDisable
              ? {
                  marginTop: 50,
                  marginBottom: 20,
                }
              : {marginTop: 50, marginBottom: 20}
          }
          isDisabled={!isDisable}
          onPress={() => {
            setIsModalVisible(true);
          }}>
          Solicitar Adopción
        </CustomButton>
      </ScrollView>
    </DefaultLayout>
  );
};
