import React, { Fragment } from 'react';

import Form from './Form';
import "../../../assets/css/plugins/bulma.min.css"


const App = () => {
  return (
    <Fragment>
      <div className="container pt-5">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <Form />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
