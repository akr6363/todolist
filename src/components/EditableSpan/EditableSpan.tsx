import React from "react";
import {TextField} from "@mui/material";
import {useEditableSpan} from "./hooks/useEditableSpan";
import {TasksStatuses} from "../../api/todolists-api";

type EditableSpanPropsType = {
    title: string
    isDone?: TasksStatuses
    changeTitle: (newTitle: string) => void
    styles?: React.CSSProperties
}


export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((
    {
        title,
        isDone,
        changeTitle,
        styles
    }) => {

    console.log('EditableSpan IS CALLED' + title)
    const {
        isEdit,
        inputValue,
        setEditMode,
        editTitleTasks,
        changeValueHandler,
        onKeyUpEditTitleTasksHandler,
        onFocusHandler
    } = useEditableSpan(title, changeTitle)

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
                    className={isDone === TasksStatuses.Completed ? 'is-done' : 'task-title'}>
                    {title}
            </span>
    )
})