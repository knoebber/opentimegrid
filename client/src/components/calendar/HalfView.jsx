import React from 'react';
import PropTypes from 'prop-types';

export default function HalfView(props) {
  const {
    month,
  } = props;

  return (
    <>
      Half view
      &nbsp;
      {month}
    </>
  );
}

HalfView.propTypes = {
  month: PropTypes.number.isRequired,
};
