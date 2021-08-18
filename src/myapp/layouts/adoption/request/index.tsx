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

export default ({route}): React.ReactElement => {
  const [form, setForm] = useState({
    name: '',
    email: '',
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
  const [statusBtn, setStatusBtn] = useState(true);
  const [stateList, setStateList] = useState([]);
  const useAddQuery = useAdoption();
  const dataStates = useStates();

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
    };
    useAddQuery.mutate(request);
  };

  const validation = (
    name,
    email,
    cel,
    sex,
    age,
    tel,
    occupation,
    street,
    number,
    cp,
    cologne,
    city,
    qpet,
    qact,
    reason,
    qcount,
    qallirgic,
    qresource,
    state,
    municipality,
  ) => {
    if (name.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (email.length > 0) {
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (!emailRegex.test(email)) {
        setStatusBtn(true);
        return;
      }
    } else {
      setStatusBtn(true);
      return;
    }
    if (age.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (sex.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (occupation.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (street.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (number.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (cp.length <= 4) {
      setStatusBtn(true);
      return;
    }
    if (cologne.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (city.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (state.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (municipality.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (cel.length !== 10) {
      setStatusBtn(true);
      return;
    }
    if (tel.length <= 6 || tel.length > 10) {
      setStatusBtn(true);
      return;
    }
    if (qpet.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (qact.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (reason.length <= 20 || reason > 100) {
      setStatusBtn(true);
      return;
    }
    if (qcount.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (qallirgic.length <= 0) {
      setStatusBtn(true);
      return;
    }
    if (qresource.length <= 0) {
      setStatusBtn(true);
      return;
    }
    setStatusBtn(false);
  };

  return (
    <DefaultLayout>
      <CustomModal
        labelAccept="Entendido"
        title="Solicitud Enviada"
        text="La solicitud la analizará la asociación y se pondrá en
        contacto contigo en caso de ser aprobada para continuar con el proceso y de ser necesario
        solicitarte más información."
        onAccept={onAdoption}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
      <ScrollView>
        <TitleHeader>Solicitud de adopción</TitleHeader>
        <DefaultText style={{marginBottom: 48}}>
          Por favor llena los siguientes datos para ponernos en contacto
          contigo.
        </DefaultText>
        <UserInput
          placeholder="Nombre"
          value={form.name}
          onChangeText={(value: string) => {
            setForm({...form, name: value});
            validation(
              value,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <UserInput
          placeholder="Edad"
          value={form.age}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, age: value});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              value,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <TitleHeader>Género</TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.sex}
            setCurrentValue={(sex: string) => {
              setForm({...form, sex});
              validation(
                form.name,
                form.email,
                form.cel,
                sex,
                form.age,
                form.tel,
                form.occupation,
                form.street,
                form.number,
                form.cp,
                form.cologne,
                form.city,
                form.qpet,
                form.qact,
                form.reason,
                form.qcount,
                form.qallirgic,
                form.qresource,
                form.state,
                form.municipality,
              );
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
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              value,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <UserInput
          placeholder="Correo"
          value={form.email}
          onChangeText={(value: string) => {
            setForm({...form, email: value});
            validation(
              form.name,
              value,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <TitleHeader>Dirección</TitleHeader>
        <UserInput
          placeholder="Calle"
          value={form.street}
          onChangeText={(value: string) => {
            setForm({...form, street: value});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              value,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <UserInput
          placeholder="Número"
          value={form.number}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, number: value});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              value,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <UserInput
          placeholder="CP"
          isNumeric={true}
          value={form.cp}
          onChangeText={(value: string) => {
            setForm({...form, cp: value});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              value,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <UserInput
          placeholder="Colonia"
          value={form.cologne}
          onChangeText={(value: string) => {
            setForm({...form, cologne: value});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              value,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <UserInput
          placeholder="ciudad"
          value={form.city}
          onChangeText={(value: string) => {
            setForm({...form, city: value});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              value,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <DropdownPicker
          data={stateList}
          currentValue={form.state}
          placeholder="Estado"
          setCurrentValue={(stateId) => {
            setForm({...form, state: stateId});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              stateId,
              form.municipality,
            );
          }}
        />
        <MunicipalityDrop
          status={false}
          id={form.state}
          change={(valor, name) => {
            setForm({...form, municipality: valor});
            valor === ''
              ? setForm({...form, municipality: ''})
              : setForm({...form, municipality: valor});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              valor,
            );
          }}
        />
        <UserInput
          placeholder="Celular"
          value={form.cel}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, cel: value});
            validation(
              form.name,
              form.email,
              value,
              form.sex,
              form.age,
              form.tel,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <UserInput
          placeholder="Teléfono fijo"
          value={form.tel}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, tel: value});
            validation(
              form.name,
              form.email,
              form.cel,
              form.sex,
              form.age,
              value,
              form.occupation,
              form.street,
              form.number,
              form.cp,
              form.cologne,
              form.city,
              form.qpet,
              form.qact,
              form.reason,
              form.qcount,
              form.qallirgic,
              form.qresource,
              form.state,
              form.municipality,
            );
          }}
        />
        <TitleHeader>¿Has tenido alguna mascota?</TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.qpet}
            setCurrentValue={(qpet: string) => {
              setForm({...form, qpet});
              validation(
                form.name,
                form.email,
                form.cel,
                form.sex,
                form.age,
                form.tel,
                form.occupation,
                form.street,
                form.number,
                form.cp,
                form.cologne,
                form.city,
                qpet,
                form.qact,
                form.reason,
                form.qcount,
                form.qallirgic,
                form.qresource,
                form.state,
                form.municipality,
              );
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
              validation(
                form.name,
                form.email,
                form.cel,
                form.sex,
                form.age,
                form.tel,
                form.occupation,
                form.street,
                form.number,
                form.cp,
                form.cologne,
                form.city,
                form.qpet,
                qact,
                form.reason,
                form.qcount,
                form.qallirgic,
                form.qresource,
                form.state,
                form.municipality,
              );
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
              validation(
                form.name,
                form.email,
                form.cel,
                form.sex,
                form.age,
                form.tel,
                form.occupation,
                form.street,
                form.number,
                form.cp,
                form.cologne,
                form.city,
                form.qpet,
                form.qact,
                value,
                form.qcount,
                form.qallirgic,
                form.qresource,
                form.state,
                form.municipality,
              );
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
              validation(
                form.name,
                form.email,
                form.cel,
                form.sex,
                form.age,
                form.tel,
                form.occupation,
                form.street,
                form.number,
                form.cp,
                form.cologne,
                form.city,
                form.qpet,
                form.qact,
                form.reason,
                qcount,
                form.qallirgic,
                form.qresource,
                form.state,
                form.municipality,
              );
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
              validation(
                form.name,
                form.email,
                form.cel,
                form.sex,
                form.age,
                form.tel,
                form.occupation,
                form.street,
                form.number,
                form.cp,
                form.cologne,
                form.city,
                form.qpet,
                form.qact,
                form.reason,
                form.qcount,
                qallirgic,
                form.qresource,
                form.state,
                form.municipality,
              );
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
              validation(
                form.name,
                form.email,
                form.cel,
                form.sex,
                form.age,
                form.tel,
                form.occupation,
                form.street,
                form.number,
                form.cp,
                form.cologne,
                form.city,
                form.qpet,
                form.qact,
                form.reason,
                form.qcount,
                form.qallirgic,
                qresource,
                form.state,
                form.municipality,
              );
            }}
            horizontal={true}
            data={optionsRes}
          />
        </View>
        <CustomButton
          style={
            statusBtn
              ? {
                  marginTop: 50,
                  marginBottom: 20,
                }
              : {marginTop: 50, marginBottom: 20}
          }
          isDisabled={statusBtn}
          onPress={() => {
            setIsModalVisible(true);
          }}>
          Solicitar Adopción
        </CustomButton>
      </ScrollView>
    </DefaultLayout>
  );
};
