import React from "react";
// @ts-ignore
import {Meta, Story} from "@storybook/react/types-6-0";
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
// @ts-ignore
import {action} from '@storybook/addon-actions';


export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {description: 'Button inside form clicked'},
        disabled: {description: 'Button disabled'}
    },
} as Meta;


const Template: Story<AddItemFormPropsType> = (args: AddItemFormPropsType) =>
    <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button inside form clicked')
}


export const AddItemFormDisabledExample = Template.bind({});
AddItemFormDisabledExample.args = {
    addItem: action('Button disabled')
}
