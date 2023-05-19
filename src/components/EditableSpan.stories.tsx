import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from "react";
import {EditableSpan} from "./EditableSpan";
import {ReduxStoreProviderDecorator} from "../state/reduxStoreProviderDecorator";


const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;

export const EditableSpanStory = () => {
    type Story = StoryObj<typeof EditableSpan>;
    const [title, setTitle] = useState('Milk')
    return <EditableSpan title={title} changeTitle={setTitle} />
}

