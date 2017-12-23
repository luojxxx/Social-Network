import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const routing = routerReducer;

const pokemonState = (state = {
  fieldText:'', 
  pokemon: []
  }, action) => {
  switch (action.type) {
    case 'HYDRATE_STATE':
    var pokemonList = action.payload.map((ele)=>{
      return ele.name;
    })
    return {
      ...state,
      pokemon: pokemonList
    }

    case 'ADD_POKEMON':
    return {
      ...state,
      pokemon: state.pokemon.concat(state.fieldText)
    }

    // case 'REMOVE_TODO':
    // return {
    //   ...state,
    //   todos: [
    //   ...state.todos.slice(0,action.idx),
    //   ...state.todos.slice(action.idx+1)
    //   ]
    // }

    case 'REMOVE_POKEMON':
    return {
      ...state,
      pokemon: state.pokemon.filter( (item,idx) => idx !== action.idx )
    }

    case 'UPDATE_FIELD':
    return {
      ...state,
      fieldText: action.text
    }
    
    default:
    return state;
}
}

const login = (state = {
  specialme:'Ha', 
  generalme: []
  }, action) => {
  switch (action.type) {
      default:
      return state;
  }
}

const reducers = combineReducers({
  routing,
  pokemonState,
  login
})

export default reducers