import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Label } from 'semantic-ui-react';

class StreamForm extends Component {
  renderInput = (formProps) => {
    // console.log(formProps);
    const { input, label } = formProps;
    const { touched, invalid, error } = formProps.meta;
    const isError = invalid && touched;
    return (
      <div className={`field ${isError ? 'error' : ''}`}>
        <label>{label}</label>
        {isError ? (
          <Label basic color="red" pointing="below">
            {error}
          </Label>
        ) : null}
        <input {...input} autoComplete="off" />
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" label="Enter Title" component={this.renderInput} />
        <Field name="description" label="Enter Description" component={this.renderInput} />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'Title is required';
  }

  if (!formValues.description) {
    errors.description = 'Description is required';
  }

  return errors;
};

const formWrapped = reduxForm({
  form: 'streamForm',
  validate: validate,
})(StreamForm);

export default formWrapped;
