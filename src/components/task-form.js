import React from 'react';
import { connect } from 'react-redux';
class TaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            parent: props.projectId,
            description: '',
            budget: 0,
            remaining: 0,
            error: ''
        };
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onBudgetChange = (e) => {
        const budget = e.target.value;
        if(!budget || budget.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ budget }));
        }
    };
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.name || !this.state.description || !this.state.budget){
            this.setState(() => ({ error: 'Please add task name, description and budget(hours).'}))
        }else{
            this.setState(() => ({ error: ''}));
            this.props.onSubmit({
                name: this.state.name,
                parent: this.state.parent,
                description: this.state.description,
                budget: this.state.budget * 3600000,
                remaining: this.state.budget * 3600000
            });
        }
        this.setState(() =>({name: '', description: '', budget:0, remaining:0}));
    };

    render(){
      console.log(this.state.name);
        return (
            <div>
              <h3>Creating Task for {this.state.parent}</h3>
                {this.state.error && <p>{this.state.error}</p>} 
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        placeholder="task name" 
                        autoFocus
                        value={this.state.name} 
                        onChange={this.onNameChange}
                    />
                    
                    
                    <input 
                        type="text"
                        placeholder="budget(hours)"
                        value={this.state.budget}
                        onChange={this.onBudgetChange}   
                    />
                   
                    <textarea
                        placeholder="task description" 
                        value={this.state.description}
                        onChange={this.onDescriptionChange} >
                    </textarea>
                    <button>Create Task</button>           
                </form>
            </div>
        )
    };
} 

const mapStateToProps = state => {
  console.log(state.tasks);
   return {
    tasks: state.tasks,
    user: state.auth.currentUser.id
};

}

export default connect(mapStateToProps)(TaskForm);