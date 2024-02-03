const SET_CREATE_POPUP = "SET_CREATE_POPUP";
const SET_EXPLORER_THREE = "SET_EXPLORER_THREE";

const defaultState = {
    createPopupVisible: false,
    explorerThree: [],
}

export default function explorerReducer(state = defaultState,  action){
    switch (action.type){
        case SET_CREATE_POPUP:
            return {...state, files: action.payload}
        case SET_EXPLORER_THREE:
            return {...state, explorerThree: [action.payload]}
        default:
            return state;
    }
}

export const setCreatePopupVisible = (state) => ({
    type: SET_CREATE_POPUP,
    payload: state
})

export const setExplorerThree = (files) => ({
    type: SET_CREATE_POPUP,
    payload: files
})