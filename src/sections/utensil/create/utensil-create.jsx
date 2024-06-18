import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

import utensilApi from '../../../api/utensilAPI';

export default function CreateView() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [material, setMaterial] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await utensilApi.createUtensil({
        name,
        material,
        size,
        quantity,
        price,
        type,
      });
      navigate('/utensils');
    } catch (error) {
      console.error('Error creating utensil:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <Stack spacing={3}>
      <TextField name="Name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField name="Material" label="Material" value={material} onChange={(e) => setMaterial(e.target.value)} />
      <TextField name="Size" label="Size" value={size} onChange={(e) => setSize(e.target.value)} />
      <TextField name="Quantity" label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <TextField name="Price" label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <TextField name="Type" label="Type" value={type} onChange={(e) => setType(e.target.value)} />
      <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" color="inherit" onClick={handleClick}>
        Add utensils
      </LoadingButton>
    </Stack>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo sx={{ position: 'fixed', top: { xs: 16, md: 24 }, left: { xs: 16, md: 24 } }} />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>{renderForm}</Card>
      </Stack>
    </Box>
  );
}
