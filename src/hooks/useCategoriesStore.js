import { useDispatch, useSelector } from 'react-redux';
import financeApi from '../api/financeApi';
import { onAddNewCategory, onDeleteCategory, onLoadCategories, onUpdateCategory } from '../store';

export const useCategoriesStore = () =>
{
    const { categories } = useSelector(store => store.categories);
    const dispatch = useDispatch();

    const startAddNewCategory = async({ name }) =>
    {
        try 
        {
            const { data } = await financeApi.post('categories/add', { name });
            const { category } = data;

            dispatch(onAddNewCategory(category));
        } 
        catch (error)
        {
            console.log(error);
        }
    }

    const startDeleteCategory = async({ id }) =>
    {
        try 
        {
            await financeApi.delete('categories', { data: { id } });

            dispatch(onDeleteCategory(id));
        } 
        catch (error)
        {
            console.log(error);
        }
    }

    const startUpdateCategory = async({ id, name }) =>
    {
        try 
        {
            await financeApi.post('categories/edit', { id, name });

            dispatch(onUpdateCategory({ id, name }));
        } 
        catch (error)
        {
            console.log(error);
        }
    }

    const startLoadCategories = async() =>
    {
        try 
        {
            const { data } = await financeApi.get('categories');
            const { categories } = data;

            dispatch(onLoadCategories(categories));
        } 
        catch (error)
        {
            console.log(error);
        }
    }

    return {
        categories,
        startAddNewCategory,
        startDeleteCategory,
        startUpdateCategory,
        startLoadCategories
    }
}