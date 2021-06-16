import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAvoidingView} from './extra/3rd-party';
// My Components
import AnchorText from '../../../components/texts/anchor-text';
import BackButton from '../../../components/buttons/back-button';
import DefaultLayout from '../../../components/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import RecoveryCodeInput from '../../../components/inputs/recovery-code-input';
// Global Styles
import globalColors from '../../../styles/colors';
import globalStyles from '../../../styles/style';
import style from '../../../styles/style';

export default ({navigation}): React.ReactElement => {
  const NUMBER_OF_DIGITS = 5;

  const [code, setCode] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onResendCodeTextPress = (): void => {
    console.log('code resent');
  };

  const codeDigitsArray = new Array<number>(NUMBER_OF_DIGITS).fill(0);
  const toDigitInput = (_value: number, idx: number): React.ReactElement => {
    const emptyInputChar: string = ' ';
    const digit: string = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === NUMBER_OF_DIGITS - 1;
    const isCodeFull = code.length === NUMBER_OF_DIGITS;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    return <RecoveryCodeInput value={digit} key={idx} isFocused={isFocused} />;
  };

  const ref = useRef<TextInput>(null);
  const handleOnPress = (): void => {
    ref?.current?.focus();
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView>
        <BackButton navigation={navigation} />
        <View>
          <TitleHeader style={styles.title}>
            Se ha enviado un correo a:
          </TitleHeader>
          <TitleHeader style={styles.email}>****n.bel@gmail.com</TitleHeader>
          <DefaultText style={styles.subtitle}>
            Ingresa el código de 5 dígitos que enviamos a tu correo.
          </DefaultText>
          <TouchableWithoutFeedback onPress={handleOnPress}>
            <View style={styles.inputContainer}>
              {codeDigitsArray.map<React.ReactElement>(toDigitInput)}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={globalStyles.mixedTextContainer}>
          <DefaultText>¿No recibiste el código?</DefaultText>
          <AnchorText
            style={globalStyles.mixedTextContainerLink}
            onPress={onResendCodeTextPress}>
            Reenviar
          </AnchorText>
        </View>
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
});
