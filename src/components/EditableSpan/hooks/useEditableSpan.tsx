import React, {ChangeEvent, FocusEvent, useState} from "react";

export const useEditableSpan =
    (title: string, onEditedTitleTask:(newTitle: string) => void, disabled?: boolean ) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const setEditMode = () => {
        if (disabled) {
            return
        }
        setIsEdit(true)
        setInputValue(title)
    }

    const editTitleTasks = () => {
        setIsEdit(false)
        onEditedTitleTask(inputValue)
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

    return {
        isEdit,
        inputValue,
        setEditMode,
        editTitleTasks,
        changeValueHandler,
        onKeyUpEditTitleTasksHandler,
        onFocusHandler
    }
}