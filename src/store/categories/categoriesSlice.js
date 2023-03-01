import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: []
    },
    reducers: {
        onAddNewCategory: (state, { payload }) =>
        {
            state.categories.push(payload);
        },
        onUpdateCategory: (state, { payload }) =>
        {
            state.categories = state.categories.map(category => 
            {
                if(category.id === payload.id) return payload;

                return category;
            });
        },
        onDeleteCategory: (state, { payload }) =>
        {
            state.categories = state.categories.filter(category => category.id !== payload);
        },
        onLoadCategories: (state, { payload }) =>
        {
            payload.forEach(category =>
            {
                const exists = state.categories.some(dbCategory => dbCategory.id === category.id);

                if(!exists)
                {
                    state.categories.push(category);
                }
            });
        }
    }
});

export const { onAddNewCategory, onUpdateCategory, onDeleteCategory, onLoadCategories } = categoriesSlice.actions;