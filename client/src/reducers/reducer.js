const initialState = {
    currentUser: {},
    questiontype:{},
    messages: [],
    draggables: {}
}

function reducer(state=initialState, action){
    switch(action.type){
        case "SET_USER":
        return {
            ...state,
            currentUser: action.payload
        }
        case "SET_QUESTION_TYPE":
        return {
            ...state,
            questiontype: action.payload
        }
        case "ADD_MESSAGE":
        return {
            ...state,
            messages: [...state.messages, action.payload]
        }
        case "SET_DRAGS":
        return {
            ...state,
            draggables: action.payload
        }
        default: return state
    }
}

export default reducer