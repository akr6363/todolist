import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {AddItemComponent, AddItemComponentPropsType} from "./AddItemComponent";
import {IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {FC} from "react";

const meta: Meta<typeof AddItemComponent> = {
    title: 'TODOLISTS/AddItemComponent',
    component: AddItemComponent,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button click inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemComponent>;


export const AddItemComponentStory: Story = {
    args: {
        addItem: action('Button click inside form'),
        title: 'Add Item'
    },
};

export const AddItemComponentErrorStory: FC<AddItemComponentPropsType> = () => {

    return (
        <TextField
            sx={{
                "& div": {
                    backgroundColor: '#fff',
                    paddingRight: 0,
                },
            }}
            className={'add-item-input'}
            autoFocus
            onBlur={()=> {}}
            placeholder={'Enter task title, please'}
            value={''}
            onChange={()=> {}}
            onKeyUp={()=> {}}
            error={true}
            size={'small'}
            helperText={'Title can not be empty'}
            InputProps={{
                endAdornment: (
                    <IconButton
                        disableRipple
                        className={'delete-todo-button'}
                        disabled={true}
                        onClick={()=>{}}>
                        <AddIcon/>
                    </IconButton>
                ),
            }}/>
    )
};

