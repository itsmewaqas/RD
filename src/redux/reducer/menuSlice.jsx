import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import menuData from './menuData';

const menuSlice = createSlice({
    name: 'menuSlice',
    initialState: {
        menuList: [menuData[0]],
        loading: false,
        error: null,
    },

    reducers: {

        selectPermission: (state, action) => {
            const filterObject = menuData.filter(x => x.menuID == action.payload);
            state.menuList = filterObject;  
        },
        
    },
});

export default menuSlice.reducer;
export const { selectPermission } = menuSlice.actions;












