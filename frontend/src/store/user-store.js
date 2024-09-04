import { create } from 'zustand';
import { userDetails } from '../actions/UserActions';

const userStore = create((set) => ({
  id: '',
  name: '',
  email: '',
  initiallizer: async () => {
    try {
      const res = await userDetails();
      if (res.success === true) {
        set({ id: res.data._id, name: res.data.name, email: res.data.email });
      } else {
        set({ id: '', name: '', email: '' });
      }
    } catch (err) {
      console.error(err);
      set({ id: '', name: '', email: '' });
    }
  },
  login: (id, name, email) => set({ id, name, email }),
  logout: () => set({ id: '', name: '', email: '' }),
}));

export default userStore;
