import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../themes/MyTheme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color="#8b470f"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h4" color="#070604">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;