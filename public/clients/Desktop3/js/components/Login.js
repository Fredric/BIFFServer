import React        from 'react';
import Input        from 'react-bootstrap/lib/Input';
import ButtonInput  from 'react-bootstrap/lib/ButtonInput';
import ButtonGroup  from 'react-bootstrap/lib/ButtonGroup';
import Button       from 'react-bootstrap/lib/Button';
import Panel        from 'react-bootstrap/lib/Panel';
import Modal        from 'react-bootstrap/lib/ModalDialog.js';
import ModalBody    from 'react-bootstrap/lib/ModalBody.js';
import ModalHeader  from 'react-bootstrap/lib/ModalHeader.js';



let Login = React.createClass({
  getInitialState() {
    return {
      loggedIn: true
    }
  },

  handleClick(event) {
    this.setState({loggedIn: !this.state.loggedIn});
  },

  render() {
    if(this.state.loggedIn){
      return (
        <Modal>
          <ModalHeader>Logged in</ModalHeader>
          <ModalBody>
            <ButtonGroup>
              <Button bsStyle="primary" onClick={this.handleClick}>Logout</Button>
            </ButtonGroup>
          </ModalBody>
        </Modal>
      )
    }else{
      return (
        <Modal>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Input type="text" label="Text" placeholder="User name"/>,
            <Input type="password" label="Password" placeholder="Specify password"/>
            <ButtonGroup>
              <Button bsStyle="primary" onClick={this.handleClick}>Login</Button>
              <Button>Reset</Button>
            </ButtonGroup>
          </ModalBody>
        </Modal>
      )
    }
  }
});

export default Login; 