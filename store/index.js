import { create } from 'zustand';

const useStore = create((set) => ({
  users: {},
  setUsers: (users) => set((state) => ({ users: users })),

  user: {},
  setUser: (user) => set((state) => ({ user: user })),

  vehicles: {},
  setVehicles: (vehicles) => set((state) => ({ ...state.vehicles, vehicles })),

  vehicle: {},
  setVehicle: (vehicle) => set((state) => ({ vehicle: vehicle })),

  refuelling: {},
  setRefuelling: (refuelling) => set((state) => ({ refuelling: refuelling })),

  refuellings: [],
  setRefuellings: (refuellings) => set((state) => ({ refuellings: refuellings })),

}));

export default useStore;
