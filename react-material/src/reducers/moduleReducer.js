import moduleActions from '../actions/modules/ModuleActionsTypes';

const initialState = {
    modules : [],
    fetchingModules : false,
    fetchedModules : false
};

const moduleReducer = (state=initialState,action) => {
    switch(action.type){
        case moduleActions.FETCH_MODULES:
        return {...state, fetchingModules : true, fetchedModules : false};
        case moduleActions.RECEIVE_MODULES:
        return {...state, fetchingModules : false, fetchedModules : true};
        default :
        return state;
    }
};

export default moduleReducer;