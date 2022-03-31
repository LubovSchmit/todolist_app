import React from 'react';
import { App } from '../app/App';
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator';


export const AppBaseExample = (props: any) =>{
    return(<App demo={true}/>)
}
export default {
    title: 'App Stories',
    component: AppBaseExample,
    decorators: [ReduxStoreProviderDecorator]
}

