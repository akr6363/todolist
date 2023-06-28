import React, {useCallback} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TodoList from "../../components/Todolist/TodoList";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {AddItemComponent} from "../../components/AddItemComponent/AddItemComponent";
import {Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {addTodoListsTC} from "../../state/todolist-reducer";


const TodoListPage: React.FC<{}> = ({}) => {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title))
    }, [dispatch])

    return (
        <>
            <Grid container sx={{p: '15px 0'}} justifyContent={"center"}>
                <AddItemComponent addItem={addTodoList} title={'Add new list'}/>
            </Grid>
            <Grid container spacing={4}>
                {todoLists.map(tl => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={tl.id}>
                            <Paper elevation={4} sx={{p: '15px 15px'}}>
                                <TodoList
                                    todoList={tl}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>

        </>
    );
};

export default TodoListPage;