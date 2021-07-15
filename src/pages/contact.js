import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Kontak from '../components/Kontak';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontaks: {},
      kontaksKey: [],
    };
  }

  componentDidMount() {
    this.ambilData();
  }

  ambilData = () => {
    FIREBASE.database()
      .ref('Kontak')
      .once('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let kontakItem = {...data};

        this.setState({
          kontaks: kontakItem,
          kontaksKey: Object.keys(kontakItem),
        });
      });
  };

  render() {
    const {kontaks, kontaksKey} = this.state;
    return (
      <View style={styles.page}>
        <TouchableOpacity
          style={styles.tombol}
          onPress={() => this.props.navigation.navigate('TambahKontak')}>
          <Text style={styles.textTombol}>Add Data</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>Contacts List</Text>
          <View style={styles.garis} />
        </View>

        <View style={styles.listKontak}>
          {kontaksKey.length > 0 ? (
            kontaksKey.map(key => (
              <CardKontak
                key={key}
                kontakItem={kontaks[key]}
                id={key}
                {...this.props}
                removeData={this.removeData}
              />
            ))
          ) : (
            <Text>Contacts List</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  garis: {
    borderWidth: 1,
    marginTop: 10,
  },
  listKontak: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  tombol: {
    backgroundColor: '#000080',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
