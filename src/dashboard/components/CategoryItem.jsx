import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCategoriesStore } from '../../hooks/useCategoriesStore';
import '../views/css/List.css';

export const CategoryItem = ({ category, setStates }) => 
{
    const [isDelete, setIsDelete] = useState(false);
    const { startDeleteCategory } = useCategoriesStore();
    const { setState, setUpdate } = setStates;
    
    const { id, name } = category;
    
    const editCategory = () =>
    {
        setUpdate({id, isUpdate: true});
        setState('name', name);
    }

    const deleteCategory = () =>
    {
        setIsDelete(true);
        startDeleteCategory({ id });
    }

    return (
        <li className={`list-element animate__animated animate__fadeInUp ${isDelete ? 'animate__fadeOutLeft' : ''}`}>
            <p>{ name }</p>
            <button className="list-element-btn edit-style" onClick={ editCategory }><EditIcon /></button>
            <button className="list-element-btn delete-style" onClick={ deleteCategory }><DeleteIcon /></button>
        </li>
    )
}