import React, {Component} from 'react';

import Aux from '../Auxilliry';
import  Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props){
            super(props);
            this.state={
                    error:null
                };
            axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error:error});

            });
       }

       componentWillUnmount(){
           
       }

        // componentDidMount(){
        //     axios.interceptors.request.use(req =>{
        //         this.setState({error:null});
        //         return req;
        //     });
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({error:error});

        //     });

        // }

        errorConfirmedHandler = () =>{
            this.setState({error:null});
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        Something didn't work!
                        {this.state.erro ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;