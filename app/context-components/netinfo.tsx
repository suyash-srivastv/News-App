import React, { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { Snackbar } from "react-native-paper";
import { useStores } from "../models";
import { useTheme } from 'react-native-paper';
export interface NetworkContextProps {
  isNetworkAvailable: boolean
}
interface NetworkProviderProps {
  showSnackBarWhenDisconnected: boolean
}

export const NetworkContext = React.createContext<NetworkContextProps>({ isNetworkAvailable: false });

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children, showSnackBarWhenDisconnected }) => {
  const [isAlertVisible, toggleAlertVisible] = useState<boolean>(false);
  const { dark, colors } = useTheme();
  const {
    networkStore: { setNetworkStatus, isNetworkAvailable },
  } = useStores();
  
  useEffect(() => {
    NetInfo.addEventListener(handleConnectivityChange);    
  },[]);

  const handleConnectivityChange = (state: NetInfoState) => {
    // Checking whether device is connected to a network and has internet access
    
    if(state.isInternetReachable === false && showSnackBarWhenDisconnected) {
      // Global snackbar when connection is lost

      toggleAlertVisible(true)
    }    

    setNetworkStatus(!!state.isInternetReachable); 
  };

  return (
    <NetworkContext.Provider
      value={{ isNetworkAvailable }}
    >
      {children}
      <Snackbar
        visible={isAlertVisible}
        duration={5000}
        theme={{
          colors: {
            onSurface: dark ? colors.primary : '#000000cc',
          },
        }}
        onDismiss={() => toggleAlertVisible(false)}
      >
        Something is not right. Please check your WiFi/Internet
      </Snackbar>
    </NetworkContext.Provider>
  );
}
