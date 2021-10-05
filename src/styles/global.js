import {StyleSheet} from 'react-native';

export const global = StyleSheet.create({
  button: {
    marginVertical: 20,
    padding: 6,
    width: 180,
    backgroundColor: '#00aaff',
  },
  input: {
    marginVertical: 8,
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 20,
  },
});
