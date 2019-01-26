import React from 'react';
import { connect } from 'react-redux';
class ProjectForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
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
            this.setState(() => ({ error: 'Please add project name, description and budget(hours).'}))
        }else{
            this.setState(() => ({ error: ''}));
            this.props.onSubmit({
                name: this.state.name,
                owner: this.props.user,
                description: this.state.description,
                budget: this.state.budget * 3600000,
                remaining: this.state.budget * 3600000,
                tasks:[],
                isActive: true
            });
            console.log(this.props.user);
        }
    };

    render(){
      // console.log(this.props.projects);
        return (
            <div>
              <h3>Creating Project for </h3>
                {this.state.error && <p>{this.state.error}</p>} 
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        placeholder="project name" 
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
                        placeholder="project description" 
                        value={this.state.description}
                        onChange={this.onDescriptionChange} >
                    </textarea>
                    <button>Create Project</button>           
                </form>
            </div>
        )
    };
} 

const mapStateToProps = state => {
  // console.log(state.auth.currentUser);
   return {
    projects: state.projects,
    user: state.auth.currentUser.id
};

}

export default connect(mapStateToProps)(ProjectForm);