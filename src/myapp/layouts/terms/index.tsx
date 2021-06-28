import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
// My components
import DefaultLayout from '../../components/default-layout';
import TitleHeader from '../../components/texts/title-header';
import DefaultText from '../../components/texts/default-text';

export default (): React.ReactElement => {
  return (
    <DefaultLayout>
      <ScrollView>
        <TitleHeader style={styles.textSpace}>
          Términos y Condiciones
        </TitleHeader>
        <DefaultText style={styles.textSpace}>
          At vero eos censes tantas res gessisse sine dubio praeclara sunt,
          explicabo nemo. Filium morte multavit si sine metu degendae praesidia
          firmissima filium morte multavit si.
        </DefaultText>
        <DefaultText style={styles.textSpace}>
          Certe, inquam, pertinax non quo aut rerum necessitatibus saepe
          eveniet, ut alterum aspernandum. At magnum periculum adiit in oculis
          quidem se ipsam per se ipsam per. Epicurus in bonis sit aut in liberos
          atque admonitionem altera occulta quaedam et. Tum dicere exorsus est
          eligendi optio, cumque nihil est, necesse est, necesse est. In quo
          ignorare vos arbitrer, sed ut aliquid ex ea voluptate velit esse.
          Torquem detraxit hosti et quidem exercitus quid ex eo delectu rerum,
          quem modo. Ut placet, inquam tum dicere exorsus est consecutus? laudem
          et rationibus confirmare, tantum. Certe, inquam, pertinax non possim
          accommodare torquatos nostros? quos dolores eos, qui haec.
        </DefaultText>
        <DefaultText style={styles.textSpace}>
          Certe, inquam, pertinax non quo aut rerum necessitatibus saepe
          eveniet, ut alterum aspernandum. At magnum periculum adiit in oculis
          quidem se ipsam per se ipsam per. Epicurus in bonis sit aut in liberos
          atque admonitionem altera occulta quaedam et. Tum dicere exorsus est
          eligendi optio, cumque nihil est, necesse est, necesse est. In quo
          ignorare vos arbitrer, sed ut aliquid ex ea voluptate velit esse.
          Torquem detraxit hosti et quidem exercitus quid ex eo delectu rerum,
          quem modo. Ut placet, inquam tum dicere exorsus est consecutus? laudem
          et rationibus confirmare, tantum. Certe, inquam, pertinax non possim
          accommodare torquatos nostros? quos dolores eos, qui haec.
        </DefaultText>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  textSpace: {
    marginBottom: 24,
  },
});
