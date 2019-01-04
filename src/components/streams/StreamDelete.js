import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onClickDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
  }

  //React.Fragment acts as a div, but does not create 2 divs in final html for styling issues
  //as 2 divs is required in this actions variable and in coding of Modal
  renderActions = () => {
    return (
      <React.Fragment>
        <button className="ui primary button negative" onClick={this.onClickDelete}>Delete</button>
        <Link to='/' className="ui cancel button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete';
    }

    return `Are you sure you want to delete: ${this.props.stream.title}`
  }

  render() {
    return (
        <Modal
          title="Delete stream?"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
