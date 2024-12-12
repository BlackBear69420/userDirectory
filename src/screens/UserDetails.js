import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserDetails = ({ route, navigation }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>User Details</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.info}>{user.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.heading}>Email</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.heading}>Address</Text>
          <Text style={styles.info}>{`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.heading}>Company</Text>
          <Text style={styles.info}>{user.company.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFBFC'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  detailItem: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#333',
  },
});
