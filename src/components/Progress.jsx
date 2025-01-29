import {
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";

import PropTypes from "prop-types";

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{ height: "1.5vh", borderRadius: 1 }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;