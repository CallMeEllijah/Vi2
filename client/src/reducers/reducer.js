const initialState = {
    currentUser: {},
    questiontype: {},
    value1: {},
    value2: {},
    person1: {},
    person2: {},
    mistakesU: {},
    mistakesF: {},
    mistakesC: {},
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
        case "SET_VALUE1":
        return {
            ...state,
            value1: action.payload
        }
        case "SET_VALUE2":
        return {
            ...state,
            value2: action.payload
        }
        case "SET_PERSON1":
        return {
            ...state,
            person1: action.payload
        }
        case "SET_PERSON2":
        return {
            ...state,
            person2: action.payload
        }
        case "ADD_MESSAGE":
        return {
            ...state,
            messages: [...state.messages, action.payload]
        }
        case "SET_MISTAKEU":
        return {
            ...state,
            mistakesU: action.payload
        }
        case "SET_MISTAKEF":
        return {
            ...state,
            mistakesF: action.payload
        }
        case "SET_MISTAKEC":
        return {
            ...state,
            mistakesC: action.payload
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