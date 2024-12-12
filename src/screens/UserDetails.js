import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserDetails = ({ route, navigation }) => {
  const { user, imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>User Details</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', gap: 14, padding: 20, width: "90%", alignSelf: 'center', elevation: 1, borderRadius: 8, flexDirection: 'row' }}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={{ flex: 4, gap: 30 }}>
          <View>
            <Text style={styles.placeholder}>Username  </Text>
            <Text style={styles.name}>{user.username}</Text>
          </View>
          <View>
            <Text style={styles.placeholder}>Name  </Text>
            <Text style={styles.name}>{user.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.placeholder}>Email</Text>
        <Text style={styles.name}>{user.email}</Text>

      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.placeholder}>Address</Text>
        <Text style={styles.name}>{`${user.address.suite} ${user.address.street}, ${user.address.city} - ${user.address.zipcode}`}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.placeholder}>Company</Text>
        <Text style={styles.name}>{user.company.name}</Text>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FD'
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
    paddingRight: 20
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    flex: 3
  },
  detailsContainer: {
    padding: 20,
    margin: 20,
    marginBottom: 0,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232B2B',
  },
  placeholder: {
    fontSize: 12,
    color: 'grey',
  },
});
