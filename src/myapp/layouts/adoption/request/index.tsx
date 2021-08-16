import React from 'react';
import {StyleService} from '@ui-kitten/components';
import globalColors from '../../../styles/colors';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DefaultText from '../../../components/texts/default-text';
import UserInput from '../../../components/inputs/user-input';
import {useState} from 'react';
import CustomButton from '../../../components/buttons/custom-button';
import {Dimensions, View, ScrollView} from 'react-native';
import OptionSelect from '../../../components/inputs/option-select';
import CustomModal from '../../../components/modals/custom-modal';
import UserTextArea from '../../../components/inputs/user-textAtea';
export default ({navigation, route}): React.ReactElement => {
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
    municipality: '',
    qpet: '',
    qact: '',
    reason: '',
    qcount: '',
    qallirgic: '',
    qresource: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusBtn, setStatusBtn] = useState(true);
  const [statusName, setStatusName] = useState(false);
  const [statusEmail, setStatusEmail] = useState(false);
  const [statusCel, setStatusCel] = useState(false);
  const sexOptions = [
    {key: 'M', value: 'Hombre'},
    {key: 'H', value: 'Mujer'},
    {key: 'O', value: 'Otro'},
  ];
  const optionsRes = [
    {key: 'S', value: 'Si'},
    {key: 'N', value: 'No'},
  ];
  const onChange = (name, email, cel) => {
    if (name && email && cel) {
      setStatusBtn(false);
    } else {
      setStatusBtn(true);
    }
  };
  const onAdoption = () => {
    navigation.goBack();
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
            if (value.length > 0) {
              setStatusName(true);
              onChange(true, statusEmail, statusCel);
            } else {
              setStatusName(false);
              onChange(false, statusEmail, statusCel);
            }
          }}
        />
        <UserInput
          placeholder="Edad"
          value={form.age}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, age: value});
          }}
        />
        <TitleHeader>Género</TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.sex}
            setCurrentValue={(sex) => setForm({...form, sex})}
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
        <UserInput
          placeholder="Correo"
          value={form.email}
          onChangeText={(value: string) => {
            setForm({...form, email: value});
            if (value.length > 0) {
              const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
              if (emailRegex.test(value)) {
                setStatusEmail(true);
                onChange(statusName, true, statusCel);
              } else {
                setStatusEmail(false);
                onChange(statusName, false, statusCel);
              }
            } else {
              setStatusEmail(false);
              onChange(statusName, false, statusCel);
            }
          }}
        />
        <TitleHeader>Dirección</TitleHeader>
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
            setForm({...form, number: value});
          }}
        />
        <UserInput
          placeholder="CP"
          isNumeric={true}
          value={form.cp}
          onChangeText={(value: string) => {
            setForm({...form, cp: value});
          }}
        />
        <UserInput
          placeholder="Colonia"
          value={form.cologne}
          onChangeText={(value: string) => {
            setForm({...form, cologne: value});
          }}
        />
        <UserInput
          placeholder="Alcaldía/Municipio"
          value={form.municipality}
          onChangeText={(value: string) => {
            setForm({...form, municipality: value});
          }}
        />
        <UserInput
          placeholder="Celular"
          value={form.cel}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, cel: value});
          }}
        />
        <UserInput
          placeholder="Teléfono fijo"
          value={form.tel}
          isNumeric={true}
          onChangeText={(value: string) => {
            setForm({...form, tel: value});
            if (value.length > 0) {
              if (value.length == 10) {
                setStatusCel(true);
                onChange(statusName, statusEmail, true);
              } else {
                setStatusCel(false);
                onChange(statusName, statusEmail, false);
              }
            } else {
              setStatusCel(false);
              onChange(statusName, statusEmail, false);
            }
          }}
        />
        <TitleHeader>¿Has tenido alguna mascota?</TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.qpet}
            setCurrentValue={(qpet) => setForm({...form, qpet})}
            horizontal={true}
            data={optionsRes}
          />
        </View>
        <TitleHeader>¿Actualmente tienes alguna mascota?</TitleHeader>
        <View style={{height: 90}}>
          <OptionSelect
            currentValue={form.qact}
            setCurrentValue={(qact) => setForm({...form, qact})}
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
            setCurrentValue={(qcount) => setForm({...form, qcount})}
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
            setCurrentValue={(qallirgic) => setForm({...form, qallirgic})}
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
            setCurrentValue={(qresource) => setForm({...form, qresource})}
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
          isDisabled={false}
          onPress={() => setIsModalVisible(true)}>
          Solicitar Adopción
        </CustomButton>
      </ScrollView>
    </DefaultLayout>
  );
};
const {width, height} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
});
