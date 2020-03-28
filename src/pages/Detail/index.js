import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';

import * as MailComposer from 'expo-mail-composer';

import logoImage from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();

  const route = useRoute();

  const incident = route.params.incident;

  const message = `Olá ${incident.name}, tenho interesse em ajudar no caso \"${incident.title}\" de valor ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value).replace(/^(\D+)/, '$1 ')}.`;

  function navigateToIncidents() {
    navigation.navigate('Incidents');
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImage} />

        <TouchableOpacity onPress={navigateToIncidents}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.state}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value).replace(/^(\D+)/, '$1 ')}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.contactBoxTitle}>Salve o dia!</Text>

        <Text style={styles.contactBoxDescription}>Seja o herói desse caso.</Text>

        <Text style={styles.contactBoxDescription}>Entre em contato:</Text>

        <View style={styles.actionsBox}>
          <TouchableOpacity style={styles.actionsBoxButton} onPress={sendWhatsapp}>
            <Text style={styles.actionsBoxText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionsBoxButton} onPress={sendMail}>
            <Text style={styles.actionsBoxText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
