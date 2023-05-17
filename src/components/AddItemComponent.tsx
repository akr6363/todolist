import React, {ChangeEvent, memo, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export type AddItemComponentPropsType = {
    addItem: (title: string) => void
    title: string
}
export const AddItemComponent: React.FC<AddItemComponentPropsType> =
    memo( ({addItem, title}) => {
        console.log('AddItemComponent IS CALLED' )
        const maxTitleLength = 20

        let [inputValue, setInputValue] = useState('')
        let [error, setError] = useState<string | null>(null)
        let [editMode, setEditMode] = useState<boolean>(false)

        const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.currentTarget.value)
            if(error) {
                setError(null)
            }
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
            setEditMode(false)
        }


        const onKeyUpAddTaskHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.ctrlKey && event.key === 'Enter') {
                onAddTaskClickHandler()
            }
        }


        const onBlurHandler = () => {
            if (!!error || !inputValue.length) {
                setEditMode(false)
            } else {
                onAddTaskClickHandler()
            }
        }

        return (
            <div className={'add-from'}>
                {!editMode
                    ? <Button
                        sx={{
                            marginBottom: '9px'
                        }}
                        onClick={() => setEditMode(true)}
                        variant={"text"}
                        size={'small'}
                        startIcon={<AddIcon sx={{mr: '-4px'}}/>}
                    >
                        {title}
                    </Button>
                    : <TextField
                        sx={{
                            "& div": {
                                backgroundColor: '#fff',
                                paddingRight: 0,
                            },
                        }}
                        className={'add-item-input'}
                        autoFocus
                        onBlur={onBlurHandler}
                        placeholder={'Enter task title, please'}
                        value={inputValue}
                        onChange={onChangeInputValueHandler}
                        onKeyUp={onKeyUpAddTaskHandler}
                        error={!!error}
                        size={'small'}
                        helperText={error}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    disableRipple
                                    className={'delete-todo-button'}
                                    disabled={!!error || !inputValue.length} onClick={onAddTaskClickHandler}>
                                    <AddIcon/>
                                </IconButton>
                            ),
                        }}/>
                }
            </div>
        )
    })

{/*<IconButton disabled={inputValue.length === 0}*/
}
{/*            onClick={onAddTaskClickHandler}>*/
}
{/*    <AddIcon/>*/
}
{/*</IconButton>*/
}
{/*{error && <div className={'error'}>{error}</div>}*/
}