import React, {ChangeEvent, FocusEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    isDone?: boolean
    changeTitle: (newTitle: string) => void
    styles?: React.CSSProperties
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (
    {
        title,
        isDone,
        changeTitle,
        styles
    }) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const setEditMode = () => {
        setIsEdit(true)
        setInputValue(title)
    }

    const editTitleTasks = () => {
        setIsEdit(false)
        changeTitle(inputValue)
    }

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyUpEditTitleTasksHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editTitleTasks()
        }
    }

    const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
        e.currentTarget.select()
    }

    return (
        isEdit
            ? <TextField sx={{
                width: '100%',
                marginRight: '5px',
                marginTop: '5px',
                '& input': styles
            }}
                         InputProps={{
                             disableUnderline: !styles,
                         }}
                         variant={'standard'}
                         size={'small'}
                         onBlur={editTitleTasks}
                         onKeyUp={onKeyUpEditTitleTasksHandler}
                         value={inputValue}
                         type="text"
                         autoFocus
                         onFocus={onFocusHandler}
                         onChange={changeValueHandler}/>
            : <span onDoubleClick={setEditMode}
                    className={isDone ? 'is-done' : 'task-title'}>
                    {title}
            </span>
    )
}