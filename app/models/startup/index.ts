import { types } from 'mobx-state-tree';

export const StartUpModel = types
  .model({
    theme: types.optional(types.string, 'light'),
    chosenLanguage: types.optional(types.string, 'en'),
  })
  .actions(self => ({
    addTheme(name: string) {
      self.theme = name;
    },
    addLanguage(name: string) {
      self.chosenLanguage = name;
    },
  }));
// export const Store = StartUp.create({
//   theme: '',
//   chosenLanguage: '',
// });
// export const PersistStore = () => {
//   return persist('some', Store, {
//     storage: AsyncStorage, // default: localStorage
//     jsonify: true, // if you use AsyncStorage, this should be true // default: true
//     whitelist: ['theme', 'chosenLanguage'], // only these keys will be persisted
//   });
// };
