import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
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

  const onResendCodeTextPress = (): void => {
    console.log('code resent');
  };

  const codeDigitsArray = new Array<number>(NUMBER_OF_DIGITS).fill(0);
  const toDigitInput = (_value: number, idx: number): React.ReactElement => {
    const emptyInputChar: string = ' ';
    const digit: string = code[idx] || emptyInputChar;

    return (
      <View key={idx}>
        <Text>{digit}</Text>
      </View>
    );
  };

  const ref = useRef<TextInput>(null);
  const handleOnPress = (): void => {
    ref?.current?.focus();
  };

  // const jumpToNextInput = (input) => {
  //   console.log();
  //   if (input.current.dataKey < NUMBER_OF_DIGITS) {
  //     console.log('menor');
  //   } else {
  //     console.log('mayor');
  //   }
  // };
  // const keyRecoveryInputs = [];

  // for (let i = 0; i < NUMBER_OF_DIGITS; i++) {
  //   keyRecoveryInputs.push(
  //     <RecoveryCodeInput key={i} dataKey={i} nextInput={jumpToNextInput} />,
  //   );
  // }

  return (
    <DefaultLayout>
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={NUMBER_OF_DIGITS}
        style={styles.hiddenCodeInput}
      />
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
          {/* <View style={styles.inputContainer}>{keyRecoveryInputs}</View> */}
          {/* <Pressable style={styles.inputContainer} onPress={handleOnPress}>
            {codeDigitsArray.map(toDigitInput)}
          </Pressable> */}
        </View>
        <View style={globalStyles.mixedTextContainer}>
          <DefaultText>¿No recibiste el código?</DefaultText>
          <AnchorText
            style={globalStyles.mixedTextContainerLink}
            onPress={onResendCodeTextPress}>
            Reenviar
          </AnchorText>
        </View>
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
