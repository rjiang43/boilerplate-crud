import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  //handleSubmit is a function provided by redux-form
  //calls event.preventDefault automatically
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
    //css hides error messages, need to give form error property
  }

  //{...input} gives input tag all props from the input object of formProps
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error':''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  }
//<input>
//  onChange={formProps.input.onChange}
//  value={formProps.input.value}
///>

  //props such as label are foreign to redux-form, so is passed to renderInput as a prop
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title"/>
        <Field name="description" component={this.renderInput} label="Enter Description"/>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//validate is a function automatically passed to redux-form
//will return an error message if an object is returned w key-value pair
//if an empty object returns, redux-form assumes nothing went wrong
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Invalid title"
  }
  if (!formValues.description) {
    errors.description = "Invalid description"
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);
//reduxForm has same syntax as connect, but only takes one object; not fns
