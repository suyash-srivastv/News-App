import auth from '@react-native-firebase/auth';

export const firebaseLogin = (email: string, password: string) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Login Success');
      //   loginStore.login({ email: email, password: password });
      //   navigateToHome();
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
