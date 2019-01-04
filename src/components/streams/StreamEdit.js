import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

//StreamEdit gets props from Route component
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    }

    //initialValues is a special prop of reduxForm that can be passed down to reduxForm
    //_.pick eqv to {title: this.props.stream.title, description: this.props.stream.description}
      //only passing props to initialValues that are going to change, unlike id,
      //otherwise apis could interpret as you changing the id they provide
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          initialValues={ _.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

//ownProps are props that are within the component (here, StreamEdit's props)
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
