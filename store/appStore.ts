import create from "zustand";


// APP STORE INTERFACE
interface IAppStore {
    appLoading: boolean;
    setAppLoading: any;
}

// APP STORE
const appStore = (set: any):IAppStore => ({
    appLoading: false,
    // SET LOADING
    setAppLoading: (newValue:boolean) => set({appLoading: newValue}),
});

const useAppStore = create(appStore);

export default useAppStore;