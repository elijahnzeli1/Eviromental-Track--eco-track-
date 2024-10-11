'use client'

import React from 'react'
import { NextPage } from 'next'
import { Typography, Container, Paper, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/system'
import { Create, TrackChanges, EmojiEvents, Redeem, Group } from '@mui/icons-material'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
}))

const HowItWorksPage: NextPage = () => {
  return (
    <Container maxWidth="md">
      <StyledPaper elevation={0}>
        <Typography variant="h2" component="h1" gutterBottom>
          How Eco-Track Works
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText 
              primary="Sign Up" 
              secondary="Create your Eco-Track account and join our community of eco-warriors."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TrackChanges />
            </ListItemIcon>
            <ListItemText 
              primary="Track Your Actions" 
              secondary="Log your environmental activities, such as recycling, using public transport, or participating in clean-up events."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmojiEvents />
            </ListItemIcon>
            <ListItemText 
              primary="Earn Eco-Tokens" 
              secondary="Receive Eco-Tokens for your eco-friendly actions. The more you contribute, the more you earn!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Redeem />
            </ListItemIcon>
            <ListItemText 
              primary="Redeem Rewards" 
              secondary="Use your Eco-Tokens to claim exciting rewards from our partnered eco-friendly businesses."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText 
              primary="Compete and Collaborate" 
              secondary="Join challenges, compete with friends, and collaborate on community projects to make a bigger impact."
            />
          </ListItem>
        </List>
      </StyledPaper>
    </Container>
  )
}

export default HowItWorksPage
