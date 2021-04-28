import React from 'react'
import Modal from '../../components/UI/Model/Modal'
import Aux from '../../hoc/Aux'
import useErrorHandler from '../../hooks/http-error-handler'


const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
      
  const [error,clearError]=useErrorHandler(axios)

      return (
        <Aux>
          <Modal show={error} modalClosed={clearError}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      );
    };
  };
  
  export default withErrorHandler;
  