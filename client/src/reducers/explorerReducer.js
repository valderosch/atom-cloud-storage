const SET_CREATE_POPUP = "SET_CREATE_POPUP";


const defaultState = {
    createPopupVisible: true
}

export default function explorerReducer(state = defaultState,  action){
    switch (action.type){
        case SET_CREATE_POPUP:
            return {...state, files: action.payload}
        default:
            return state;
    }
}

export const setCreatePopupVisible = (state) => ({
    type: SET_CREATE_POPUP,
    payload: state
})