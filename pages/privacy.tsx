'use client'

import React from 'react'
import { NextPage } from 'next'
import { Typography, Container, Paper, Box, List, ListItem, ListItemText } from '@mui/material'
import { styled } from '@mui/system'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
}))

const PrivacyPage: NextPage = () => {
  return (
    <Container maxWidth="md">
      <StyledPaper elevation={0}>
        <Typography variant="h2" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Box mb={2}>
          <Typography variant="body1" paragraph>
            At Eco-Track, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h4" component="h2" gutterBottom>
            Information We Collect
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Personal information such as name, email address, and location" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Usage data related to your eco-friendly activities" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Information about your device and how you interact with our platform" />
            </ListItem>
          </List>
        </Box>
        <Box mb={2}>
          <Typography variant="h4" component="h2" gutterBottom>
            How We Use Your Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="To provide and improve our services" />
            </ListItem>
            <ListItem>
              <ListItemText primary="To calculate and award Eco-Tokens" />
            </ListItem>
            <ListItem>
              <ListItemText primary="To communicate with you about your account and our platform" />
            </ListItem>
            <ListItem>
              <ListItemText primary="To analyze usage patterns and optimize user experience" />
            </ListItem>
          </List>
        </Box>
        <Typography variant="body1">
          For more detailed information about our privacy practices, please contact us.
        </Typography>
      </StyledPaper>
    </Container>
  )
}

export default PrivacyPage
