import React from 'React';
import Header from './Header.js';
const AppContainer = (props) => {
  return(
    <div>
      <Header/>
      {props.children}
    </div>
  );
};

export default AppContainer;
