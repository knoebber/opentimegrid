import React from 'react';
import PropTypes from 'prop-types';

export default function QuarterView(props) {
  const {
    month,
  } = props;

  return (
    <>
      Quarter view
      &nbsp;
      {month}
    </>
  );
}

QuarterView.propTypes = {
  month: PropTypes.number.isRequired,
};
