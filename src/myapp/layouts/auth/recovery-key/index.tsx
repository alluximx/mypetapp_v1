import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Spinner} from '@ui-kitten/components';
// My Components
import AnchorText from '../../../components/texts/anchor-text';
import CustomModal from '../../../components/modals/custom-modal';
import DefaultLayout from '../../../components/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import RecoveryCodeInput from '../../../components/inputs/recovery-code-input';
// Global Styles
import globalColors from '../../../styles/colors';
import globalStyles from '../../../styles/style';
// Services
import auth_service from '../../../services/auth-service';

export default ({navigation}): React.ReactElement => {
  const route = useRoute<
    RouteProp<{params: {email: string; userId: number}}, 'params'>
  >();

  const NUMBER_OF_DIGITS = 5;

  const [code, setCode] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const onResendCodeTextPress = async (): Promise<void> => {
    // Show spinner.
    setLoading(true);

    const response = await auth_service.PostGenerateRecoveryKey({
      email: route.params.email,
      resend: true,
    });

    if (response.data.status) {
      // Show modal.
      setIsModalVisible(true);
    } else {
      // Show Error.
      console.log('error');
    }

    // Hide spinner
    setLoading(false);
  };

  const onSubmitCode = async (): Promise<void> => {
    setLoading(true);

    // Check is filled.
    if (code.length === NUMBER_OF_DIGITS) {
      const response = await auth_service.PostValidateRecoveryKey({
        id: route.params.userId,
        code,
      });

      if (response.data.status) {
        setMessage('Código correcto');
        setTimeout(() => {
          navigation.navigate('ForgotPassword', {
            isSettingPassword: true,
            userId: route.params.userId,
          });
        }, 1500);
      } else {
        setError(response.data.message);
        setCode('');
      }
    }

    setLoading(false);
  };

  const codeDigitsArray = new Array<number>(NUMBER_OF_DIGITS).fill(0);
  const toDigitInput = (_value: number, idx: number): React.ReactElement => {
    const emptyInputChar: string = ' ';
    const digit: string = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === NUMBER_OF_DIGITS - 1;
    const isCodeFull = code.length === NUMBER_OF_DIGITS;

    const inputIsFocused =
      (isCurrentDigit || (isLastDigit && isCodeFull)) && isFocused;

    return (
      <RecoveryCodeInput value={digit} key={idx} isFocused={inputIsFocused} />
    );
  };

  const ref = useRef<TextInput>(null);
  const handleOnPress = (): void => {
    ref?.current?.focus();
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <CustomModal
          visible={isModalVisible}
          title="Código reenviado"
          text="Te hemos enviado a tu correo un código de 5 dígitos."
          onAccept={() => setIsModalVisible(false)}
          onCancel={null}
          showCancel={false}
          labelAccept="Entendido"
        />
        <View>
          <TitleHeader style={styles.title}>
            Se ha enviado un correo a:
          </TitleHeader>
          <TitleHeader style={styles.email}>{route.params.email}</TitleHeader>
          <DefaultText style={styles.subtitle}>
            Ingresa el código de 5 dígitos que enviamos a tu correo.
          </DefaultText>
        </View>
        {
          // If loading show spinner.
          loading ? (
            <View style={styles.spinner}>
              <Spinner status="success" />
            </View>
          ) : (
            // Show inputs otherwise.
            <>
              <TouchableWithoutFeedback onPress={handleOnPress}>
                <View style={styles.inputContainer}>
                  {codeDigitsArray.map<React.ReactElement>(toDigitInput)}
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.feedbackContainer}>
                {error !== '' && (
                  <DefaultText style={styles.errorMessage}>{error}</DefaultText>
                )}
                {message !== '' && (
                  <DefaultText style={styles.successMessage}>
                    {message}
                  </DefaultText>
                )}
              </View>
              <View style={globalStyles.mixedTextContainer}>
                <DefaultText>¿No recibiste el código?</DefaultText>
                <AnchorText
                  style={globalStyles.mixedTextContainerLink}
                  onPress={onResendCodeTextPress}>
                  Reenviar
                </AnchorText>
              </View>
            </>
          )
        }
        <TextInput
          ref={ref}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={NUMBER_OF_DIGITS}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.hiddenCodeInput}
          onSubmitEditing={onSubmitCode}
        />
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  email: {
    marginTop: 0,
    color: globalColors.greenPrimary,
    marginBottom: 24,
  },
  subtitle: {
    marginBottom: 41,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  feedbackContainer: {
    marginTop: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successMessage: {
    color: globalColors.greenPrimary,
    textAlign: 'center',
    fontSize: 14,
  },
  spinner: {
    alignItems: 'center',
  },
});
