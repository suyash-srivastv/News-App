import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const firebaseSignUp = (
  email,
  password,
  firstName,
  lastName,
  gender,
  age,
) => {
  const ref = firestore().collection('profile');
  auth()
    .createUserWithEmailAndPassword(
      email,
      password,
      //
    )
    .then(async () => {
      console.log('User account created & signed in!');
      await ref.add({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
      });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};
