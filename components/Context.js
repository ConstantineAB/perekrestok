import React, { createContext, useState } from 'react';

let Context = createContext();

function Provider(props) {
  const initialState = {
    userID: false,
    user: undefined,
    loading: true,
    authenticated: false,
  };

  const [state, updateState] = useState(initialState);

  return (
    <Context.Provider
      value={{
        state: state,
      }}>
      {props.children}
    </Context.Provider>
  );
}

const Consumer = Context.Consumer;
export { Provider, Consumer, Context };
