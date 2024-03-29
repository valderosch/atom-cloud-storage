const SET_FILES = "SET_FILES";
const SET_CURR_DIR = "SET_CURR_DIR";
const ADD_FILE = "ADD_FILE";
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY";
const PUSH_TO_DIRSTACK = 'PUSH_TO_DIRSTACK';
const POP_FROM_DIRSTACK = 'POP_FROM_DIRSTACK';
const PUSH_TO_BREADCRUMBS = 'PUSH_TO_BREADCRUMBS';
const POP_FROM_BREADCRUMBS = 'POP_FROM_BREADCRUMBS';
const DELETE_FILE = "DELETE_FILE";
const SET_VIEW_TYPE = "SET_VIEW_TYPE";

const defaultState = {
    files: [],
    currentDirectory: null,
    popupDisplay: 'none',
    directoryStack: [],
    breadcrumbsStack: [],
    viewType: 'list',
}
export default function fileReducer(state = defaultState,  action){
    switch (action.type){
        case SET_FILES:
            return {...state, files: action.payload}
        case SET_CURR_DIR:
            return {...state, currentDirectory: action.payload}
        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case SET_POPUP_DISPLAY:
            return {...state, popupDisplay: action.payload}
        case PUSH_TO_DIRSTACK:
            return {...state, directoryStack: [...state.directoryStack, action.payload]}
        case POP_FROM_DIRSTACK:
            return {...state, directoryStack: action.payload}
        case DELETE_FILE:
            return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
        case SET_VIEW_TYPE:
            return {...state, viewType: action.payload}
        case PUSH_TO_BREADCRUMBS:
            return {...state, breadcrumbsStack: [...state.breadcrumbsStack, action.payload]};
        case POP_FROM_BREADCRUMBS:
            return {...state, breadcrumbsStack: action.payload};
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

export const addFile = (file) => ({
    type: ADD_FILE,
    payload: file
})

export const setPopupDisplay = (display) => ({
    type: SET_POPUP_DISPLAY,
    payload: display
})

export const pushToStack = (directory) => ({
    type: PUSH_TO_DIRSTACK,
    payload: directory
})

export const popFromStack = (directory) => ({
    type: POP_FROM_DIRSTACK,
    payload: directory
})

export const deleteFileAction = (directoryID) => ({
    type: DELETE_FILE,
    payload: directoryID
})

export const setViewType = (type) => ({
    type: SET_VIEW_TYPE,
    payload: type
})

export const pushToBreadcrumbsStack = (directory) => ({
    type: PUSH_TO_BREADCRUMBS,
    payload: directory,
});

export const popFromBreadcrumbsStack = (directory) => ({
    type: POP_FROM_BREADCRUMBS,
    payload: directory,
});