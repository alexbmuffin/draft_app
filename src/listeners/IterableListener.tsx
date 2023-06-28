import {useEffect} from 'react';
import {Iterable, IterableConfig} from '@iterable/react-native-sdk';

export function IterableListener() {
  useEffect(() => {
    const config = new IterableConfig();

    // config.urlHandler = uri => {
    //   console.log('urlHandler', uri);
    // };

    Iterable.initialize('token', config);
    Iterable.setUserId('user_id');
  }, []);

  return null;
}
