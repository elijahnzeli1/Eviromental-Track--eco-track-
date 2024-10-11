'use client'

import React from 'react'
import { NextPage } from 'next'
import { Typography, Container, Paper, Box } from '@mui/material'
import { styled } from '@mui/system'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
}))

const AboutPage: NextPage = () => {
  return (
    <Container maxWidth="md">
      <StyledPaper elevation={0}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Eco-Track
        </Typography>
        <Box mb={2}>
          <Typography variant="body1" paragraph>
            Eco-Track is a revolutionary platform dedicated to promoting environmental conservation through community engagement and rewards. Our mission is to empower individuals to make a positive impact on the environment while earning incentives for their efforts.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" paragraph>
            Founded in 2024, Eco-Track brings together technology and environmental consciousness to create a sustainable future. We believe that small actions, when multiplied by millions, can lead to significant change.
          </Typography>
        </Box>
        <Typography variant="body1">
          Join us in our journey to create a cleaner, greener planet for future generations.
        </Typography>
      </StyledPaper>
    </Container>
  )
}

export default AboutPage
