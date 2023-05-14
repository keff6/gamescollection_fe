import { createContext, useState } from 'react';
import proptypes from 'prop-types';

const Provider = ({ children }) =>{
  const [state,setState] = useState({
    genre: {
      list: [],
      selected: null
    }
  });
    return (            
      <AppContext.Provider value={[state,setState]}>
        {children}
      </AppContext.Provider>  
    );
}

Provider.propTypes = {
  children: proptypes.node,
}

export default Provider;
export const AppContext = createContext();