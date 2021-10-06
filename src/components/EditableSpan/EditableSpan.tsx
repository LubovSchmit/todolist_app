import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
import { useSelector } from 'react-redux';
import { RequestStatusType } from '../../app/app-reducer';
import { AppRootStateType } from '../../app/store';

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void

}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

let [editMode, setEditMode] = useState(false)

let [title, setTitle] = useState('')
    const activateEditMode = () => {
    setEditMode(true)
        setTitle(props.title)
    }


    const activateViewMode = () => {
    setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>)  =>setTitle(e.currentTarget.value )
    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})