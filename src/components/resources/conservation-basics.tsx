import React from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Container } from '@mui/material';

const ConservationBasics: React.FC = () => {
  const conservationTips = [
    'Reduce, reuse, and recycle to minimize waste',
    'Conserve water by fixing leaks and using water-efficient appliances',
    'Use energy-efficient lighting and appliances',
    'Support sustainable and local food production',
    'Plant trees and maintain green spaces in your community',
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Environmental Conservation Basics
        </Typography>
        <Typography variant="body1" paragraph>
          Environmental conservation is the practice of protecting the natural world and its resources. 
          It involves sustainable use of resources, preservation of biodiversity, and mitigation of human impact on ecosystems.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Key Conservation Tips:
        </Typography>
        <List>
          {conservationTips.map((tip, index) => (
            <ListItem key={index}>
              <ListItemText primary={tip} />
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" style={{ marginTop: '1rem' }}>
          By implementing these practices in our daily lives, we can contribute to a more sustainable future.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ConservationBasics;