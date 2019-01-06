/**
 * Created by BHOOPENDRA on 12/25/2016.
 */
export  const  ADD_TO_DO = 'ADD_TODO';
let nextToDoId = 0;
export function addTodo(text) {
    return{
    type : ADD_TO_DO,
     id : nextToDoId ++,
    };
}