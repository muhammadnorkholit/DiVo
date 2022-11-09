import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../COLORS/colors';
import Container from '../../components/container';
import Footer from '../../components/footer';
import Loading from '../../components/Loading';
import {showKandidat} from '../../Controllers/KandidatController';
import {getStatus, voteStore} from '../../Controllers/Vote';
import {API_APP} from '../../environment';
import {getData} from '../../helpers/Storage';
export default function Kandidat({navigation}) {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const [Visible, setVisible] = useState(true);
  const [kandidat, setKandidat] = useState([]);
  const [Status, setStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState({status: false, id: 0});
  const [user, setUser] = useState({});
  useEffect(() => {
    async function tests() {
      const data2 = await getData('kandidat');
      setKandidat(data2.data);
      const data = await showKandidat(navigation);
      if (data || data2) {
        setVisible(false);
        if (data) {
          setKandidat(data.data);
        }
      }

      const user = await getData('user');
      setUser(user[0]);
      if (modalVisible.status) {
        const statusUser = await getStatus(
          user[0].id_peserta,
          setModalVisible.id,
        );
        setStatus(statusUser.status);
      }
      setTimeout(() => {
        setVisible(false);
      }, 10000);
    }
    tests();
  }, [modalVisible]);

  const confirm = () => {
    Alert.alert(' Info Pemilihan', 'Apakah anda yakin memilih poster ini ?', [
      {
        text: 'Cancel',
        onPress: () => {
          return false;
        },
      },
      {
        text: 'Ok',
        onPress: () => {
          setStatus(1);
          const statuss = voteStore(navigation, modalVisible.id, user);
          setModalVisible(statuss);

          return false;
        },
      },
    ]);
  };

  return (
    <Container padding={false}>
      <LinearGradient
        locations={[0.5, 1]}
        colors={[color.primary, color.second]}
        style={{
          display: Visible ? 'flex' : 'none',
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          position: 'absolute',
          zIndex: 9,
        }}>
        <Loading visible={Visible} text={'Memuat...'} />
      </LinearGradient>
      <View>
        <FlatList
          onRequestClose={() => setVisible(!Visible)}
          numColumns={2}
          data={kandidat}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setModalVisible({status: true, id: index})}
              activeOpacity={0.8}
              style={{
                backgroundColor: 'white',
                minHeight: 120,
                borderRadius: 10,
                // marginBottom: 20,
                marginTop: 10,
                alignItems: 'center',
                padding: 10,
                flex:
                  (kandidat.length - 1) % 2 == 0 && kandidat.length - 1 != index
                    ? 1
                    : 0,
                marginLeft: index % 2 == 0 ? 10 : 5,
                marginRight: index % 2 == 1 ? 10 : 5,
                marginBottom:
                  kandidat.length - 1 == index
                    ? 10
                    : kandidat.length % 2 == 0 && kandidat.length - 2 == index
                    ? 10
                    : 0,
                // width: SCREEN_WIDTH / 2 - 10,
              }}>
              <View>
                <FastImage
                  resizeMode="cover"
                  style={{
                    width: SCREEN_WIDTH / 2 - 30,
                    height: 100,
                    borderRadius: 5,
                  }}
                  source={{
                    uri: API_APP + '/images/' + item.foto,
                    priority: FastImage.priority.high,
                  }}
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#303030',
                    paddingTop: 10,
                    paddingBottom: 5,
                  }}>
                  {item.nama}
                </Text>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={
                    modalVisible.id == index && modalVisible.status
                      ? modalVisible.status
                      : false
                  }
                  onRequestClose={() => {
                    setModalVisible({status: false, id: null});
                  }}>
                  <View style={styles.centeredView}>
                    <TouchableOpacity
                      onPress={() => setModalVisible({status: false, id: null})}
                      style={styles.closeBtn}>
                      {/* <Text style={styles.closeBtnText}>X</Text> */}
                    </TouchableOpacity>
                    <View style={styles.modalView}>
                      <View style={{position: 'relative'}}>
                        <Text
                          style={{
                            fontSize: 25,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#303030',
                            paddingTop: 10,
                            paddingBottom: 5,
                            color: 'white',
                            marginVertical: 15,
                          }}>
                          {item.nama}
                        </Text>
                      </View>
                      <View>
                        <FastImage
                          resizeMode="contain"
                          style={{
                            width: SCREEN_WIDTH,
                            minHeight: SCREEN_HEIGHT / 1.7,
                            borderRadius: 5,
                          }}
                          source={{
                            uri: API_APP + '/images/' + item.foto,
                            priority: FastImage.priority.high,
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        disabled={Status == 0 ? false : true}
                        onPress={confirm}
                        style={{
                          backgroundColor: 'white',
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          marginTop: 8,
                          borderRadius: 5,
                          bottom: 30,
                          // width: SCREEN_WIDTH,
                          opacity: Status == 0 ? 1 : 0.8,
                          marginTop: 50,
                          marginLeft: 10,
                          marginRight: 5,
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            color: '#5F6FF6',
                            fontSize: 15,
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}>
                          {Status == 1
                            ? ' Terima kasih :)'
                            : Status == 2
                            ? 'Terima Kasih :('
                            : Status == 0
                            ? 'Pilih Kami'
                            : 'Terima kasih'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setModalVisible({status: false, id: null})
                        }
                        style={{
                          backgroundColor: 'white',
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          borderRadius: 5,
                          bottom: 30,
                          // width: SCREEN_WIDTH / 2,
                          marginTop: 50,
                          marginLeft: 5,
                          marginRight: 10,
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            color: '#5F6FF6',
                            fontSize: 15,
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}>
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Footer />
    </Container>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#20212499',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white',
    zIndex: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeBtnText: {
    fontSize: 30,
    color: 'white',
  },
  modalView: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
