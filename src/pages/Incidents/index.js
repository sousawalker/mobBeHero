import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { View, FlatList, Image, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import api from '../../services/api';

import logoImage from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  const [total, setTotal] = useState(0);

  const [pag, setPag] = useState(1);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length == total) {
      return;
    }

    if (pag > 1) {
      ToastAndroid.show("Carregando...", ToastAndroid.SHORT);
    }

    setLoading(true);

    const response = await api.get('/incidents', { params: { pag }});

    setIncidents([...incidents, ...response.data]);

    setTotal(response.headers['x-total-count']);

    setPag(pag + 1);

    setLoading(false);
  }

  async function reLoadIncidents() {
    const response = await api.get('/incidents');

    setIncidents(response.data);

    setPag(2);

    setTotal(response.headers['x-total-count']);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImage} />

        <TouchableOpacity onPress={reLoadIncidents}>
          <Feather name="refresh-ccw" size={28} color="#E02041" />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>

      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value).replace(/^(\D+)/, '$1 ')}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => {navigateToDetail(incident)}}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>

              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
