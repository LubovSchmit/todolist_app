import {AppWithRedux} from "./AppWithRedux";
import React from "react";

import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
// @ts-ignore
import {Meta, Story} from "@storybook/react/types-6-0";


export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWithRedux/>


export const AppWithReduxExample = Template.bind({});
