import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// My Components
import BackButton from '../../../components/buttons/back-button';
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import UserInput from '../../../components/inputs/user-input';
import CustomModal from '../../../components/modals/custom-modal';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Services
import auth_service from '../../../services/auth-service';

interface ForgotPasswordFormFields {
  email: string;
  password: string;
}

export default ({navigation}): React.ReactElement => {
  const defaultValues = {
    email: '',
    password: '',
  };
  // Form fields...
  const [form, setForm] = useState<ForgotPasswordFormFields>(defaultValues);
  const [errors, setErrors] = useState({
    ...defaultValues,
    detail: '',
  });
  const [userId, setUserId] = useState(null);
  // Modal and spinner.
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute<
    RouteProp<
      {
        params: {
          isSettingPassword: boolean;
          userId: number;
        };
      },
      'params'
    >
  >();
  const isSettingPassword: boolean = route.params.isSettingPassword;

  // Has filled every field...
  const formCompleted =
    (form.email !== '' && !isSettingPassword) ||
    (form.password !== '' && isSettingPassword);

  // Are there any errors...
  const hasErrors =
    errors.email !== '' || errors.password !== '' || errors.detail !== '';

  const onResetPasswordButtonPress = async (): Promise<void> => {
    setLoading(true);
    // Clear errors
    setErrors({...defaultValues, detail: ''});

    if (isSettingPassword) {
      // navigation && navigation.navigate('SignIn');
      const response = await auth_service.PutUpdatePassword({
        userId: route.params.userId,
        password: form.password,
      });

      console.log(response.data);

      if (response.data.status) {
        setIsModalVisible(true);
      } else {
        setErrors({
          ...defaultValues,
          ...response.data,
        });
      }
    } else {
      const response = await auth_service.PostGenerateRecoveryKey({
        email: form.email,
        resend: false,
      });

      console.log(response.data);

      if (response.data.status) {
        setIsModalVisible(true);
        setUserId(response.data.user.id);
      } else {
        setErrors({
          ...defaultValues,
          ...response.data,
        });
      }
    }

    setLoading(false);
  };

  const onModalAccept = (): void => {
    setIsModalVisible(false);
    if (isSettingPassword) {
      navigation && navigation.navigate('SignIn');
    } else {
      navigation &&
        navigation.navigate('RecoveryKey', {email: form.email, userId: userId});
    }
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <CustomModal
          visible={isModalVisible}
          title={
            isSettingPassword ? 'Contraseña reestablecida' : 'Código reenviado'
          }
          text={
            isSettingPassword
              ? 'Se cambió con éxito la contraseña'
              : 'Te hemos enviado a tu correo un código de 5 dígitos.'
          }
          onAccept={onModalAccept}
          onCancel={null}
          showCancel={false}
          labelAccept="Entendido"
        />
        <BackButton navigation={navigation} />
        <View>
          <TitleHeader style={isSettingPassword && styles.setPasswordSpace}>
            Restablecer Contraseña
          </TitleHeader>
          {isSettingPassword ? (
            <UserInput
              placeholder="Contraseña"
              isPassword={true}
              value={form.password}
              onChangeText={(value: string) => {
                setForm({...form, password: value});
              }}
              error={errors.password}
            />
          ) : (
            <>
              <DefaultText style={styles.subtitle}>
                Ingresa el correo registrado en Dogit y te enviaremos
                instrucciones para recuperar tu contraseña.
              </DefaultText>
              <UserInput
                placeholder="Correo"
                value={form.email}
                onChangeText={(value: string) => {
                  setForm({...form, email: value});
                }}
                error={errors.email}
              />
            </>
          )}
        </View>
        {hasErrors &&
          // Map errors...
          Object.entries(errors).map(([_, value]) => {
            return (
              value !== '' && <Text style={styles.errorMessage}>{value}</Text>
            );
          })}
        <CustomButton
          style={styles.button}
          onPress={onResetPasswordButtonPress}
          isDisabled={formCompleted}
          isLoading={loading}>
          {isSettingPassword ? 'Restablecer Contraseña' : 'Enviar'}
        </CustomButton>
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: 24,
  },
  button: {
    marginTop: 40,
  },
  setPasswordSpace: {
    marginBottom: 24,
  },
  errorMessage: {
    color: globalColors.red,
    fontFamily: globalVars.fontRegular,
  },
});
