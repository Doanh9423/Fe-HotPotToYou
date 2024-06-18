// /* eslint-disable no-unused-vars */
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

// export default function RegisterView() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [address, setAddress] = useState('');
//   const [gender, setGender] = useState('');

//   const [loading, setLoading] = useState(false);

//   const [users, setUsers] = useState([]);

//   const fetchUsers = useCallback(async () => {
//     try {
//       const response = await axiosClient.post('/api/v1/user');
//       console.log('response', response);
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       await registerUser({
//         name,
//         phone,
//         email,
//         password,
//         address,
//         gender,
//       });

//       navigate('/login');
//     } catch (error) {
//       console.error('Đăng ký thất bại:', error);
//       // Xử lý lỗi nếu cần
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderForm = (
//     <>
//       <Stack spacing={3}>
//         <TextField name="username" label="Name" value={name} onChange={handleChange} />

//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             flexDirection: { xs: 'column', sm: 'row' },
//             gap: 2,
//           }}
//         >
//           <TextField name="phone" label="Phone Number" value={phone} onChange={handleChange} />
//           <Select value={gender} id="gender-select" name="gender" onChange={handleChange}>
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//           </Select>
//         </Box>

//         <TextField name="email" label="Email address" value={email} onChange={handleChange} />

//         <TextField
//           name="password"
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={handleChange}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <TextField name="Address" label="address" value={address} onChange={handleChange} />
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
//         <Link variant="subtitle2" underline="hover">
//           Forgot password?
//         </Link>
//       </Stack>

//       <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" color="inherit" onClick={handleClick}>
//         Register
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
//           <Typography variant="h4">Sign up to Minimal</Typography>

//           <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
//             Already have account?
//             <Link variant="subtitle2" sx={{ ml: 0.5 }}>
//               Sign in
//             </Link>
//           </Typography>
//           {renderForm}
//         </Card>
//       </Stack>
//     </Box>
//   );
// }
