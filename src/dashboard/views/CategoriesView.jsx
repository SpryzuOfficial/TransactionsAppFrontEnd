import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useCategoriesStore } from '../../hooks/useCategoriesStore';
import { CategoryItem } from '../components/CategoryItem';
import { useForm } from '../../helpers/useForm';
import './css/View.css';
import './css/List.css';
import { swalExecute } from '../../helpers/swalExecute';

const formFields = {
    name: '',
}

const initialUpdateState = { 
    id: undefined, 
    isUpdate: false 
}

export const CategoriesView = () => 
{
    const { categories, startAddNewCategory, startUpdateCategory, startLoadCategories } = useCategoriesStore();
    const { name, onInputChange, setState, onResetForm } = useForm(formFields);
 
    const [update, setUpdate] = useState(initialUpdateState);

    const addCategory = () =>
    {
        if(!swalExecute((!name), 'Category name is required', false)) return;

        if(update.isUpdate)
        {
            startUpdateCategory({ id: update.id, name });
            setUpdate(initialUpdateState);
        }
        else
        {
            startAddNewCategory({ name });
            onResetForm();
        }
    }

    useEffect(() =>
    {
        startLoadCategories();
    }, []);

    return (
        <div className="view view-mxw900 animate__animated animate__fadeIn">
            <div className="view-panel">
                <input 
                    autoComplete="off" 
                    type="text" 
                    className="view-panel-element" 
                    placeholder="Category Name"
                    name="name"
                    value={ name }
                    onChange={ onInputChange }
                />
                <button className="view-panel-element" onClick={addCategory}><AddIcon /></button>
            </div>
            
            {
                categories.length > 0
                ?
                <ol className="list">
                    {
                        categories.map(({ id, name }) =>
                        {
                            return <CategoryItem key={ id } category={ { id, name } } setStates={ {setState, setUpdate} } />
                        })
                    }
                </ol>
                :
                <ol className="list">
                    <p className="view-panel-element">Hit the + Button to add a category</p>
                </ol>
            }
        </div>
    )
}