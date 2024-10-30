// src/components/Footer.js
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container>
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} My company
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="#" color="inherit" underline="hover">
            Terms of Use
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
