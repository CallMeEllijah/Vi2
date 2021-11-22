const initialState = {
    currentUser: {},
    userName:{},
    questiontype: {},
    value1: {},
    value2: {},
    person1: {},
    person2: {},
    mistakesU: {},
    mistakesF: {},
    mistakesC: {},
    messages: [],
    draggables: {},
    

    //definition of problem variables
    problem: "Talk to Vi2 at the chatbox below",
    inventoryOneName: "",
    inventoryTwoName: "",
    itemName: "",
    
    //tracker for progress of student in questions
    currentProgress: -1,

    //Used for unique sessions
    sessionID: {}
}

function reducer(state=initialState, action){
    switch(action.type){
        case "SET_PROGRESS":
        return {
            ...state,
            currentProgress: state.currentProgress+1
        }
        case "SET_SESSION":
        return {
            ...state,
            sessionID: action.payload
        }
        case "ADD_MESSAGE":
        return {
            ...state,
            messages: [...state.messages, action.payload]
        }


        //set inventory names for interactables
        case "SET_INVENTORY1NAME":
        return {
            ...state,
            inventoryOneName: action.payload
        }
        case "SET_INVENTORY2NAME":
        return {
            ...state,
            inventoryTwoName: action.payload
        }
        case "SET_ITEMNAME":
        return {
            ...state,
            itemName: action.payload
        }
        case "SET_QUESTION_TYPE":
        return {
            ...state,
            questiontype: action.payload
        }



        case "SET_USER":
        return {
            ...state,
            currentUser: action.payload
        }
        case "SET_NAME":
        return {
            ...state,
            userName: action.payload
        }
        case "SET_PROBLEM":
        return {
            ...state,
            problem: action.payload
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
