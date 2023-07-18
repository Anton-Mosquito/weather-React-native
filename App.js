import {useEffect, useState} from 'react'
import { Alert}       from 'react-native';
import { Loading }    from './Loading';
import { Weather }        from './Weather';
import * as Location  from 'expo-location';

const API_key = '44b788430b6eae4f49d10064566fc911';
const URL = 'https://api.openweathermap.org/data/2.5/find?';

export default function App() {
  const [temp, setTemp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync({});
      const response = await fetch(`${URL}lat=${latitude}&lon=${longitude}&cnt=${9}&units=metric&appid=${API_key}`);
      const data = await response.json();

      setTemp(data.list[0].main.temp)
      setCondition(data.list[0].weather[0].main)
      setLoading(false);
    })();
  }, []);

  
  return (
    loading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}/>
  );
}
