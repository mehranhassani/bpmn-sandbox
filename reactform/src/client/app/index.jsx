import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
	getInitialState: function () {
        return ({employees: null});
    },
    componentDidMount: function () {
        client({method: 'GET', path: 'http://unctad.redfunction.ee/java/v2016/06/hello/John'}).done(response => {
            this.setState({employees: '{' + response + '}'});
        });
    },
    
  render () {
    return (
      <div>
        <p> Hello React!</p>
        <EmployeeList employees={this.state.employees}/>   
        <AwesomeComponent />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));