import React from 'react';
import ReactDOM from 'react-dom';

class EmailTag extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var props = this.props;
    return (
      <div className={(props.index == (props.list.length - 1) && props.index == props.activeIndex) ? 'tags highlight' : 'tags'}>
        <span className='tag-label'>{props.val}</span>
        <img src='images/field_clear.svg' className='field-clear' onClick={props.removeTag}/>
      </div>
    );
  }
}

class EmailList extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      list : ['john@abc.com'], // Sample Data
      current_input: '',
      activeIndex: -1
    }
    this.re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  //Check if a given email is a valid email
  validateEmail(email) {
    return this.re.test(email);
  }

  handleDelete(e){
    var state = {};
    //Catch backspace with keyup event and highlight the last element
    if(e.keyCode === 8 && e.target.value === ''){
      state['activeIndex'] = this.state.list.length - 1;
    }
    //Once activeIndex is set, remove the highlighted tag on clicking backspace or delete
    if(e.keyCode === 8 || e.keyCode === 46){
      //Prevent popping before highlighting
      //Pop only in the alternate(even number) time when activeIndex is set to the last element of array
      if(this.state.activeIndex > -1){
        var list = this.state.list;
        list.pop();
        state['list'] = list;
        state['activeIndex'] = -1;
      }
    }
    this.setState(state);
  }

  handleInput(e){
    var val = e.target.value,
      list = this.state.list,
      state = {};

    //Set activeIndex to default value to remove highlighting
    //when user starts typing after highlighting a tag
    if(val){
      state['activeIndex'] = -1;
    }

    //If the input has separator(in our case spaceand comma), push the value to list
    if(val.indexOf(' ') > -1 || val.indexOf(',') > -1){

      var arr = (val.indexOf(',') > -1) ? val.split(',') : val.split(' ');

      arr.forEach(function(value){
        value = value.trim();
        //Validate Email before pushing it to list
        if(value){
          if(this.validateEmail(value)){
            state['current_input'] = '';
            //Push only if the email does not exist in the list
            list.indexOf(value) == -1 ? list.push(value) : null;
          }
          else{
            alert('Invalid email address');
          }

        }
      }.bind(this));
      state['list'] = list;
    }
    else{
      state['current_input'] = val;
    }
    this.setState(state);
  }

  //Remove tag on clicking delete icon
  removeTag(index){
    var list = this.state.list;
    list.splice(index,1);
    this.setState({
      list : list
    })
  }

  render(){
    return(
      <div className='container'>
        {
          this.state.list.map(function(val,i){
            return (
                <EmailTag list = {this.state.list} activeIndex = {this.state.activeIndex} key = {i} index={i} val = {val} removeTag={this.removeTag.bind(this,i)}/>
            )
          },this)
        }
        <input type='text' className='email-input' value={this.state.current_input} onChange= {this.handleInput.bind(this)} onKeyUp = {this.handleDelete.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<EmailList />, document.getElementById('reactRoot'));
