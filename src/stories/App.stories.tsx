import React from 'react';
import { App } from '../app/App';
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator';

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample = (props: any) =>{
    return(<App demo={true}/>)
}