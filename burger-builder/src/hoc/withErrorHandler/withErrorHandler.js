import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
        state = {
            error: null
        }

        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null});
                return request;
            },
            error =>{
                return Promise.reject(error);
            });

            this.responseInterceptor = axios.interceptors.response.use(response => response,
                error =>{
                    this.setState({ error: error});
                });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({ error: null});
        }

        render(){
            return(
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        modalClosed = {this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    } 
}

export default withErrorHandler;