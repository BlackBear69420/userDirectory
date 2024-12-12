import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import { fetchUsers } from '../data/users';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SortModal from '../components/SortModal';
import LottieView from 'lottie-react-native';
import Loader from '../components/Loader';

const Home = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (inputFocused) {
        setInputFocused(false);
        searchInputRef.current?.blur();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [inputFocused]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchText, users]);

  const loadUsers = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newUsers = await fetchUsers(page);
      if (newUsers.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setFilteredUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleSort = (type) => {
    let sortedUsers;
    if (type === 'name-asc') {
      sortedUsers = [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'name-desc') {
      sortedUsers = [...filteredUsers].sort((a, b) => b.name.localeCompare(a.name));
    } else if (type === 'email-asc') {
      sortedUsers = [...filteredUsers].sort((a, b) => a.email.localeCompare(b.email));
    } else if (type === 'email-desc') {
      sortedUsers = [...filteredUsers].sort((a, b) => b.email.localeCompare(a.email));
    }
    setFilteredUsers(sortedUsers);
    setModalVisible(false);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() =>
        navigation.navigate('UserDetails', {
          user: item,
          imageUrl: `https://picsum.photos/id/${item.id + 50}/200/300`,
        })
      }
    >
      <Image
        style={styles.image}
        source={{
          uri: `https://picsum.photos/id/${item.id + 50}/200/300`,
        }}
      />
      <View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading || isInitialLoading) return null;
    return <ActivityIndicator style={styles.loader} />;
  };

  const closeKeyboard = () => {
    if (searchInputRef.current) searchInputRef.current.blur();
  };

  return isInitialLoading ? (
    <Loader />
  ) : (
    <TouchableOpacity
      activeOpacity={1}
      onPress={closeKeyboard}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.searchBarContainer}>
          <TextInput
            ref={searchInputRef}
            style={[
              styles.searchBar,
              inputFocused && styles.searchBarExpanded,
            ]}
            placeholder="Search by name"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholderTextColor="grey"
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          {!inputFocused && (
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesomeIcon name="sliders" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>

        {filteredUsers.length === 0 && !loading ? (
          <View style={styles.noUsersContainer}>
            <LottieView
              width={200}
              height={200}
              source={require('../assets/lotties/ghost.json')}
              autoPlay
              loop
            />
            <Text style={styles.noUsersText}>No users found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            renderItem={renderUser}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadUsers}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.flatListContent}
          />
        )}

        <SortModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSort={handleSort}
        />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FCFBFC',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
    marginRight: 10,
  },
  searchBarExpanded: {
    marginRight: 0,
    flex: 1,
    borderColor: '#000',
    borderWidth: 2,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEAE0',
    flexDirection: 'row',
    gap: 30,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232B2B',
  },
  userEmail: {
    fontSize: 14,
    color: '#2C3539',
  },
  loader: {
    marginVertical: 10,
  },
  noUsersContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
