import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { loginAPI, registerAPI } from 'src/api/apis';

const storeApi = (set) => ({
  status: 'unauthorized',
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
  loginUser: async (payload) => {
    try {
      const { data } = await loginAPI(payload);
      const { accessToken, refreshToken, userInfo } = data;
      set({ status: 'authorized', accessToken, refreshToken, user: userInfo });
      console.log(data);
    } catch (error) {
      set({
        status: 'unauthorized',
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined,
      });
      console.log('Credenciales incorrectas');
    }
  },
  logoutUser: () => {
    set({
      status: 'unauthorized',
      accessToken: undefined,
      refreshToken: undefined,
      user: undefined,
    });
  },
  registerUser: async (payload) => {
    try {
      await registerAPI(payload);
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
});

export const useAuthStore = create()(devtools(persist(storeApi, { name: 'auth-storage' })));
