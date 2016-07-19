import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import Swagger from 'swagger-client';

class App extends React.Component {

    constructor() {
        super();
        this.onSave = this.onSave.bind(this);
        this.state = {book : null};
        this.state = {id : ''};
        this.state = {title : ''};
        this.state = {author : ''};
    	var self = this;
	    var client = new Swagger({
		  url: 'https://api.swaggerhub.com/apis/krixerx/JavaAPI/1.0',
		  success: function() {
		    client.apis.default.get_book({responseContentType: 'application/json'},function(book){
		      console.log('book', book);
		      self.setState({book: book.data});
		      var json = JSON.parse(book.data);
		      self.setState({id: json.id});
		      self.setState({title: json.title});
		      self.setState({author: json.author});
		    });
		  }
		});
    }
    
    componentDidMount() {
     
    }
    
      onSave() {
    	var self = this;
    	var client = new Swagger({
		  url: 'https://api.swaggerhub.com/apis/krixerx/JavaAPI/1.0',
		  success: function() {
		    client.apis.default.saveBook({book: {id: self.state.id, title: self.state.title, author: self.state.author}},function(book){
		      console.log('book', book);
		      self.setState({book: book.data});
		      var json = JSON.parse(book.data);
		      self.setState({id: json.id});
		      self.setState({title: json.title});
		      self.setState({author: json.author});
		    });
		  }
		});
  	}
  	
    render() {  
          
        return(
            <div className="panel panel-default">
            { this.state.book }   
              <div className="panel-heading clearfix">
		        <h3 className="panel-title pull-left">Book Form</h3>
		        <div className="pull-right">
		          <label className="text-inline">
		            Id: <input type="text" value={this.state.id} onChange={this.handleChangeId.bind(this)}/>
		          </label><br/>
		          <label className="text-inline">
		            Title: <input type="text" value={this.state.title} onChange={this.handleChangeTitle.bind(this)}/>
		          </label><br/>
		          <label className="text-inline">
		            Author: <input type="text" value={this.state.author} onChange={this.handleChangeAuthor.bind(this)}/>
		          </label><br/>
		        </div>
		      </div>
		      <div className="panel-body">
		        
		      </div>
		      <div className="panel-footer">
		        <button onClick={this.onSave}>Save</button>
		      </div>
		    </div>    
        );
    }
    
    handleChangeId(e) {
    	var thisvalue = e.target.value;
  		if (thisvalue == null) thisvalue = '';
    	this.setState({'id': thisvalue});
    }
    
    handleChangeTitle(e) {
    	var thisvalue = e.target.value;
  		if (thisvalue == null) thisvalue = '';
    	this.setState({'title': thisvalue});
    }
    
    handleChangeAuthor(e) {
    	var thisvalue = e.target.value;
  		if (thisvalue == null) thisvalue = '';
    	this.setState({'author': thisvalue});
    }

  

}

render(<App/>, document.getElementById('app'));