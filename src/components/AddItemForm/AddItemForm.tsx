import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import { AppRootStateType } from '../../app/store';
import { useSelector } from 'react-redux';
import { RequestStatusType } from '../../app/app-reducer';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean

}

export const AddItemForm = React.memo (function ({addItem, disabled=false}: AddItemFormPropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItem(title);
            setTitle('');
        }
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim());
            setTitle('');
        } else {
            setError('Field title is required')
        }
    }
    return <div>

        <TextField
            disabled={status === 'loading'}
            value={title}
                   variant={"outlined"}
                   label={'Type value'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
        />
        <IconButton onClick={addItemHandler} disabled = {disabled} color={'primary'}> <ControlPoint/></IconButton>
    </div>
})