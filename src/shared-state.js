/**
 * shared-state.js
 * module for declaring our shared redux store
 * and various action creation functions
 */
import {createStore} from 'redux';

const SEND_MESSAGE = 'sendMessage';

const DEFAULT_STATE = {sentMessages : []};


function reducer(state, action) {
    //must return a brand new object each time the reducer is scored
    // it is easier to rerender because of this, react compared against the slot in memory
    
    //we get the current state of the store and our job is to apply the action and return the new state    
    switch(action.type) {
        case SEND_MESSAGE:
            //cloning the state into a new javascript Object
            return Object.assign({}, {
                sentMessages: state.sentMessages.concat(action.item)
            });
        default:
            return state;            
    }
}

export function sendMessage(item) {
    return {
            // action creator
        type: SEND_MESSAGE,
        item: item
    }
}   

//only want to create one of these per application
export var store = createStore(reducer, DEFAULT_STATE);
