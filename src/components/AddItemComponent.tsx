import React, {ChangeEvent, useState} from "react";

type AddItemComponentPropsType = {
    addItem: (title: string) => void
}
export const AddItemComponent: React.FC<AddItemComponentPropsType> = ({addItem}) => {

    const maxTitleLength = 20

    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError(null)
        if (event.currentTarget.value.trim().length > maxTitleLength) {
            setError('Title is too long!!!')
        }
        if (event.currentTarget.value.trim().length === 0) {
            setError('Title can not be empty')
        }
    }

    const onAddTaskClickHandler = () => {
        if (!error) {
            addItem(inputValue.trim())
        }
        setInputValue('')
    }

    const onKeyUpAddTaskHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            onAddTaskClickHandler()
        }
    }

    return (
        <div>
            <input className={`input ${error && 'error-input'}`}
                   placeholder={'Enter task title, please'}
                   value={inputValue}
                   onChange={onChangeInputValueHandler}
                   onKeyUp={onKeyUpAddTaskHandler}/>

            <button disabled={inputValue.length === 0}
                    onClick={onAddTaskClickHandler}>
                +
            </button>
            {error && <div className={'error'}>{error}</div>}
        </div>
    )
}