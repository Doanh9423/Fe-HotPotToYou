// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { alpha, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';
// import { bgGradient } from 'src/theme/css';
// import axiosClient from '../../../api/axiosClient';
// import Logo from 'src/components/logo';
// import Iconify from 'src/components/iconify';

// // ----------------------------------------------------------------------

// export default function CreateView() {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   const [name, setName] = useState('');
//   const [material, setMaterial] = useState('');
//   const [size, setSize] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [type, setType] = useState('');

//   const [utensils, setUtensils] = useState([]);

//   const fetchUtensils = useCallback(async () => {
//     try {
//       const response = await axiosClient.post('/api/v1/utensils');
//       console.log('response', response);
//       setUtensils(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       await registerUser({
//         name,
//         material,
//         size,
//         quantity,
//         price,
//         type,
//       });

//       navigate('/utensil');
//     } catch (error) {
//       console.error('Add failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderForm = (
//     <>
//       <Stack spacing={3}>
//         <TextField name="Name" label="Name" value={name} onChange={handleChange} />

//         <TextField name="Material" label="Material" value={material} onChange={handleChange} />

//         <TextField name="size" label="Size" value={size} onChange={handleChange} />

//         <TextField name="quantity" label="Quantity" value={quantity} onChange={handleChange} />

//         <TextField name="price" label="Price" value={quantity} onChange={handleChange} />

//         <TextField name="type" label="Type" value={type} onChange={handleChange} />
//       </Stack>

//       <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" color="inherit" onClick={handleClick}>
//         Add utensils
//       </LoadingButton>
//     </>
//   );

//   return (
//     <Box
//       sx={{
//         ...bgGradient({
//           color: alpha(theme.palette.background.default, 0.9),
//           imgUrl: '/assets/background/overlay_4.jpg',
//         }),
//         height: 1,
//       }}
//     >
//       <Logo
//         sx={{
//           position: 'fixed',
//           top: { xs: 16, md: 24 },
//           left: { xs: 16, md: 24 },
//         }}
//       />

//       <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
//         <Card
//           sx={{
//             p: 5,
//             width: 1,
//             maxWidth: 420,
//           }}
//         >
//           {renderForm}
//         </Card>
//       </Stack>
//     </Box>
//   );
// }
