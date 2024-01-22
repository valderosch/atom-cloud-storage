const SHOW_APP_LOADER = "SHOW_APP_LOADER";
const HIDE_APP_LOADER = "HIDE_APP_LOADER";


const defaultState = {
    loader: false
}

export default function explorerReducer(state = defaultState,  action){
    switch (action.type){
        case SHOW_APP_LOADER:
            return {...state, loader: true}
        case HIDE_APP_LOADER:
            return {...state, loader: false}
        default:
            return state;
    }
}

export const showAppLoader = () => ({
    type: SHOW_APP_LOADER,
})
export const hideAppLoader = () => ({
    type: HIDE_APP_LOADER,
})