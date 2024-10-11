import React from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Container } from '@mui/material';

const WasteReduction: React.FC = () => {
  const wasteReductionTips = [
    'Use reusable bags, containers, and water bottles',
    'Compost organic waste',
    'Buy products with minimal packaging',
    'Repair items instead of replacing them',
    'Donate or sell items you no longer need',
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Waste Reduction Guide
        </Typography>
        <Typography variant="body1" paragraph>
          Reducing waste is an essential step towards a more sustainable lifestyle. By making small changes in our daily habits, we can significantly decrease the amount of waste we produce.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Key Waste Reduction Tips:
        </Typography>
        <List>
          {wasteReductionTips.map((tip, index) => (
            <ListItem key={index}>
              <ListItemText primary={tip} />
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" style={{ marginTop: '1rem' }}>
          Implementing these practices can help reduce your environmental impact and contribute to a cleaner planet.
        </Typography>
      </Paper>
    </Container>
  );
};

export default WasteReduction;
