import {Task, TaskPropsType} from "./Task";
import React from "react";
// @ts-ignore
import {Meta, Story} from "@storybook/react/types-6-0";
// @ts-ignore
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses } from "../../../../api/tasks-api";


export default {
    title: 'Todolist/Task',
    component: Task
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove Button inside Task clicked')

const Template: Story<TaskPropsType> = (args: TaskPropsType) =>
    <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}


export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', status: TaskStatuses.Completed, title: 'JS',todoListId: 'todolistId1', order: 0, addedDate: '', deadline: '', priority: TaskPriorities.Low, startDate: '', description: ''},
    todolistId: 'todolistId1'
}


export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', status: TaskStatuses.New, title: 'JS', todoListId: 'todolistId1', order: 0, addedDate: '', deadline: '', priority: TaskPriorities.Low, startDate: '', description: ''},
    todolistId: 'todolistId1'
}