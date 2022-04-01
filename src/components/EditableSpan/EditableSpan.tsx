import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from "@material-ui/core";


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

    const onKeyPressActivateViewMode = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.onChange(title)}
    }

    const activateViewMode = () => {
    setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>)  =>setTitle(e.currentTarget.value )
    return editMode
        ? <TextField value={title}
                     onChange={onChangeTitleHandler}
                     autoFocus
                     onBlur={activateViewMode}
                     onKeyPress={onKeyPressActivateViewMode}
                     />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})