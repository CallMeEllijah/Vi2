const initialState = {
    currentUser: {},
    messages: []
}

function reducer(state=initialState, action){
    switch(action.type){
        case "SET_USER":
        return {
            ...state,
            currentUser: action.payload
        }
        case "ADD_MESSAGE":
        return {
            ...state,
            messages: [...state.messages, action.payload]
        }
        default: return state
    }
}

export default reducer