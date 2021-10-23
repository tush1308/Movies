import * as React from 'react';
import Toast from 'react-native-toast-message';
import Providers from './src/navigation';

import RootNavigator from './src/navigation/rootNavigation';

export default function App() {
  return (
    <>
      {/* <RootNavigator/> */}
      <Providers/>
      <Toast ref={(ref)=>Toast.setRef(ref)}/>
    </>
  );
}