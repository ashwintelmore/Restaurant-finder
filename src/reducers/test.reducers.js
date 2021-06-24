const Constant_test_ = "Constant_test_";
const initialState = {
        name: 'talayawa',
        adress: 'ytl',
        dish:'cakes'
}

export default (state = initialState, action) => {

    console.log(action);

    switch (action.type) {

        case Constant_test_:
            state = {
                ...state,
                name: action.payload.name
            }
            break;

        default:
            break;
    }
    return state;
}