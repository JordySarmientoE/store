import React from 'react';

export const Controller = React.createContext(null);
Controller.displayName = 'SidenavContext';

export function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_SIDENAV': {
      return { ...state, openSidenav: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function ControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return <Controller.Provider value={value}>{children}</Controller.Provider>;
}

export function useControllerProvider() {
  const context = React.useContext(Controller);

  if (!context) {
    throw new Error(
      'useControllerProvider should be used inside the ControllerProvider.'
    );
  }

  return context;
}

ControllerProvider.displayName = '/src/context/index.jsx';

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: 'OPEN_SIDENAV', value });
