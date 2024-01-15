const SET_FILES = "SET_FILES";
const SET_CURR_DIR = "SET_CURR_DIR";

const defaultState = {
    files: [],
    currentDirectory: null
}
export default function fileReducer(state = defaultState,  action){
    switch (action.type){
        case SET_FILES:
            return {...state, files: action.payload}
        case SET_CURR_DIR:
            return {...state, currentDirectory: action.payload}
        default:
            return state;
    }
}

export const setFiles = (files) => ({
    type: SET_FILES,
    payload: files
})

export const setDirectory = (dir) => ({
    type: SET_CURR_DIR,
    payload: dir
})