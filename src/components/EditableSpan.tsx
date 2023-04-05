import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    isDone?: boolean
    changeTitle: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (
    {
        title,
        isDone,
        changeTitle
    }) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [inputValue, setInputValue] =useState<string>('')

    const setEditMode = () => {
        setIsEdit(true)
        setInputValue(title)
    }

    const editTitleTasks = () => {
        setIsEdit(false)
        changeTitle(inputValue)
    }

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        setInputValue(e.currentTarget.value)
    }

    const onKeyUpEditTitleTasksHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editTitleTasks()
        }
    }

    return (
        isEdit
            ? <input  onBlur={editTitleTasks}
                      onKeyUp={onKeyUpEditTitleTasksHandler}
                      value={inputValue}
                      type="text"
                      autoFocus
            onChange={changeValueHandler}/>

            : <span onDoubleClick={setEditMode}
                    className={isDone ? 'is-done' : 'task-title'}>
                    {title}
            </span>
    )
}