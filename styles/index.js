import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#42455a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#c3c3c3',
    marginBottom: 20,
  },
  inputText: {
    backgroundColor: '#dae5ef',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    width: 300,
    borderRadius: 10,
  },
  translations: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 20,
    height: '50%',
    borderRadius: 10,
  },
  translation: {
    backgroundColor: '#dae5ef',
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    fontSize: 20,
    height: '60%',
    borderRadius: 10,
    flexGrow: 1,
    flexBasis: 0,
    width: '100%',
  },
});

export default styles;
