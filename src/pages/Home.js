import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import InputData from '../components/inputdata';
import firestore from '@react-native-firebase/firestore';
import {FlatGrid} from 'react-native-super-grid';
import Contacts from 'react-native-contacts';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Nama: '',
      Alamat: '',
      data: [],
      contacts: [],
    };
  }
  componentDidMount() {
    // this.getDataDoc();
    this.getDataCollection();
  }

  getDataDoc = async () => {
    const user = await firestore()
      .collection('Users')
      .doc('maGLQ7MCnF1IoQbokB1T')
      .get();

    const data = user.data();

    console.log(data);
  };

  getDataCollection = async () => {
    const users = await firestore().collection('Users').get();
    const allData = users.docs.map(doc => doc.data());
    this.setState({data: allData});
    console.log(allData);
  };

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  AddData = () => {
    firestore()
      .collection('Users')
      .add({
        Nama: this.state.Nama,
        Alamat: this.state.Alamat,
      })
      .then(() => {
        Alert.alert('Sukses, Data Sudah Tersimpan');
        this.props.navigation.replace('contact');
        console.log('Kirim Data');
      });
  };
  render() {
    return (
      <View style={styles.Header}>
        <Text style={styles.textHeader}> Halaman Input Data </Text>
        <View style={{flexDirection: 'column'}}>
          <InputData
            label="Nama"
            placeholder="Masukkan Nama Anda"
            onChangeText={this.onChangeText}
            value={this.state.Nama}
            namaState="Nama"
          />

          <InputData
            label="Alamat"
            placeholder="Masukkan Alamat Anda"
            isTextArea={true}
            onChangeText={this.onChangeText}
            value={this.state.Alamat}
            namaState="Alamat"
          />
          <TouchableOpacity
            style={styles.tombol}
            onPress={() => this.AddData()}>
            <Text style={styles.texttombol}>KIRIM DATA</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.CardList}>Contact List</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <Text>
            {item.givenName} {item.middleName} {item.familyName}
          </Text>
          <Text>{number}</Text>
        </View>
        <FlatGrid
          style={{flex: 1}}
          itemDimension={300}
          data={this.state.data}
          renderItem={({item}) => (
            <View style={styles.text}>
              <Text style={styles.textNama}>{item.Nama}</Text>
              <Text style={styles.textAlamat}>{item.Alamat}</Text>
            </View>
          )}
        />
        <View style={styles.container}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    flex: 1,
  },
  textHeader: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#001219',
  },
  tombol: {
    backgroundColor: '#1d3557',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  texttombol: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'normal',
    color: '#f1faee',
  },
  container: {
    paddingTop: 20,
  },
  text: {
    marginHorizontal: 20,
    backgroundColor: '#e9ecef',
    marginVertical: 10,
    borderRadius: 8,
  },
  textNama: {
    fontSize: 25,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  textAlamat: {
    fontSize: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  CardList: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 5,
  },
});
