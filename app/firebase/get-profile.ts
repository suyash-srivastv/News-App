import firestore from '@react-native-firebase/firestore';

export const getProfile = async () => {
  return await firestore().collection('profile').get();
};
