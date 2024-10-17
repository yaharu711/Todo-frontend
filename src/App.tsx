import React, { useState } from 'react'
import TodoInputForm from './components/TodoInputForm';
import styles from './App.module.css';
import Todos from './components/Todos';

export type ButtonProps = {
    onClick: (todo: string) => void,
    children: string
}

const App: React.FC = () => {
    const [imcompletedTodos, setImcompletedTodos] = useState<string[]>([]);
    const [completedTodos, setCompletedTodos] = useState<string[]>([]);
    const completeTodo = (todo: string) => {
        setCompletedTodos([...completedTodos, todo]);
        setImcompletedTodos(imcompletedTodos.filter((imcompletedTodo) => imcompletedTodo !== todo));
    }
    const deleteTodo = (todo: string) => {
        setImcompletedTodos(imcompletedTodos.filter((imcompletedTodo) => imcompletedTodo !== todo));
    }
    const imcompleteTodo = (todo: string) => {
        setImcompletedTodos([...imcompletedTodos, todo]);
        setCompletedTodos(completedTodos.filter((completedTodo) => completedTodo !== todo))
    }
    
    // 未完了TODOについての処理
    const imcompletedTodosButtonPropsList: ButtonProps[] = [
        {
            onClick: completeTodo,
            children: '完了'
        },
        {
            onClick: deleteTodo,
            children: '削除'
        }
    ];
    // 完了TODOについての処理
    // →未完了と完了それぞれの処理が同じところで管理するのはちょっと微妙
    // 未完了のTODOと完了のTODOのHTMLやCSSを共通化できたが、その分責務の分離や親で多くのことを管理するはめになった。。
    const completedTodosButtonPropsList: ButtonProps[] = [
        {
            onClick: imcompleteTodo,
            children: '未完了'
        }
    ]

    //TODO: ButtonPropsは子から親に型という情報を渡しちゃっているのがあまりよくないかな。
    // 基本は親から子にデータを渡す一方向にしたい。型定義だけ別の場所に定義して、ButtonやAppからその型を参照するならまだ健全かな

    return (
        <div className={styles.container}>
            <TodoInputForm 
                imcompletedTodo={imcompletedTodos} 
                setImcompletedTodo={setImcompletedTodos} 
            />
            <Todos 
                section='未完了のTOOD一覧'
                todos={imcompletedTodos} 
                setTodos={setImcompletedTodos}
                buttonPropsList={imcompletedTodosButtonPropsList}
            />
            <Todos 
                section='完了のTOOD一覧'
                todos={completedTodos}
                setTodos={setCompletedTodos}
                buttonPropsList={completedTodosButtonPropsList}
            />
        </div>
    )
}

export default App;
