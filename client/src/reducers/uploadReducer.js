const SHOW_UPLOAD_EXPLORER = "SHOW_UPLOAD_EXPLORER";
const HIDE_UPLOAD_EXPLORER = "HIDE_UPLOAD_EXPLORER";
const ADD_FILE_TO_UPLOADER = "ADD_FILE_TO_UPLOADER";
const REMOVE_FILE_FROM_UPLOADER = "REMOVE_FILE_FROM_UPLOADER";
const CHANGE_UPLOAD_PERCENT = "CHANGE_UPLOAD_PERCENT";

const defaultState = {
    isVisible: true,
    files: [],

}
export default function uploadReducer(state = defaultState,  action){
    switch (action.type){
        case SHOW_UPLOAD_EXPLORER:
            return {...state, isVisible: true}
        case HIDE_UPLOAD_EXPLORER:
            return {...state, isVisible: false}
        case ADD_FILE_TO_UPLOADER:
            return {...state, files: [...state.files, {...action.payload, id: state.files.length}]}
        case REMOVE_FILE_FROM_UPLOADER:
            return {...state, files: [...state.files.filter(file => file.id !== action.payload)]}
        case CHANGE_UPLOAD_PERCENT:
            return {...state, files: action.payload}
        default:
            return state;
    }
}

export const showUploadExplorer = () => ({
    type: SHOW_UPLOAD_EXPLORER,

})
export const hideUploadExplorer = () => ({
    type: HIDE_UPLOAD_EXPLORER,

})
export const addFileToUploader = (file) => ({
    type: ADD_FILE_TO_UPLOADER,
    payload: file

})
export const removeFileFromUploader = (fileId) => ({
    type: REMOVE_FILE_FROM_UPLOADER,
    payload: fileId

})