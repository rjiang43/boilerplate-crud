import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  //handleSubmit is a function provided by redux-form
  //calls event.preventDefault automatically
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

  //props such as label are foreign to redux-form, so is passed to renderInput as a prop
  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
