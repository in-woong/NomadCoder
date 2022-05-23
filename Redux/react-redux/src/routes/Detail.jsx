import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

function Detail({ toDo }) {
  return (
    <>
      <h1> {toDo?.text}</h1>
      <h5>Created at: {toDo?.id}</h5>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return { toDo: state };
}

export default connect(mapStateToProps)(Detail);

