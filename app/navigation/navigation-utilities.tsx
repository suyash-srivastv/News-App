import {
  PartialState,
  NavigationState,
  NavigationContainerRef,
} from '@react-navigation/native';
import { useState, useRef, useCallback, useEffect } from 'react';

export const RootNavigation = {
  navigate(name: string) {
    name;
  },
  goBack() { },
  resetRoot(state?: PartialState<NavigationState> | NavigationState) { }, // eslint-disable-line @typescript-eslint/no-unused-vars
  getRootState(): NavigationState {
    return {} as any;
  },
};

export const setRootNavigation = (
  ref: React.RefObject<NavigationContainerRef>
) => {
  for (const method in RootNavigation) {
    RootNavigation[method] = (...args: any) => {
      if (ref.current) {
        return ref.current[method](...args);
      }
    };
  }
};

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
) {
  const route = state.routes[state.index];

  // Found the active route -- return the name
  if (!route.state) {
    return route.name;
  }

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state);
}

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState();
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(
    true
  );

  const routeNameRef = useRef();
  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console.log(`currentRouteName ${currentRouteName}`);
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;

    // Persist state to storage
    storage.save(persistenceKey, state);
  };

  const restoreState = useCallback(async () => {
    try {
      // In development mode get navigation state
      if (__DEV__) {
        const state = await storage.load(persistenceKey);
        if (state) {
          setInitialNavigationState(state);
        }
      }
    } finally {
      setIsRestoringNavigationState(false);
    }
  }, [persistenceKey, storage]);

  useEffect(() => {
    if (isRestoringNavigationState) {
      restoreState();
    }
  }, [isRestoringNavigationState, restoreState]);

  return { onNavigationStateChange, restoreState, initialNavigationState };
}
