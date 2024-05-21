import React, {useEffect, useState} from 'react';
import MainNavigation from './src/Router/Stack/MainNavigation';
import SplashScreen from './src/screens/SplashScreen';

function App(): React.JSX.Element {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const Timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(Timeout);
  }, []);
  return isVisible ? <SplashScreen /> : <MainNavigation />;
}

export default App;
