import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  incident: {
    marginTop: 32,
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16
  },
  incidentProperty: {
    fontSize: 14,
    color: '#41414D',
    fontWeight: 'bold',
    marginTop: 24
  },
  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    color: '#737380'
  },
  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16
  },
  contactBoxTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#13131A',
    lineHeight: 30
  },
  contactBoxDescription: {
    fontSize: 15,
    color: '#737380',
    marginTop: 16
  },
  actionsBox: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionsBoxButton: {
    backgroundColor: '#E02041',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionsBoxText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
