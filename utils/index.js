import { AsyncStorage } from 'react-native'

const getCurrentSession = async () => {
    try {
      const item = await AsyncStorage.getItem('userData');
      if (item) {
        const jsoned = JSON.parse(item);
  
        return jsoned;
      }
    } catch (e) {
      console.log('getCurrentSession e', e);
      throw e;
    }
    return null;
  };

const setCurrentSession = async (data) => {
    try {
      if (typeof data === 'string') {
        return AsyncStorage.setItem('userData', data);
      }
  
      return AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (e) {
      console.log('setCurrentSession error:', e);
    }
  };

  export {
      getCurrentSession,
      setCurrentSession
  }