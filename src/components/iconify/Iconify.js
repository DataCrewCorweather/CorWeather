import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// icons
// import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={FontAwesomeIcon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
));

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Iconify;
