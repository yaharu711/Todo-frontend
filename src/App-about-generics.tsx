import React, { useState } from "react";
import Hello from "./components/Hello";
import Button from "./components/Button";

// FunctionComponentsの略でFCという型となっている
const App: React.FC = () => {
    // T,と書かないと、ジェネリクスがHTMLタグと誤認されて赤線が出るので注意
    const outputValue = <T,>(value: T): T => value;
    {/* 以下の<boolean>は明示的に指定しなくてよい */}
    console.log(outputValue<number>(1));

    type User = {
        name: string,
        age: number
    };
    const [user, setUser] = useState<User>({name: "yaharu", age:24});
    const modifyUser = () => setUser(prev => ({...prev, age: prev.age + 1}));

  return (
    <div>
        <Hello value="hello" />
        <h1>{user.name} : {user.age}</h1>
        <Button onClick={modifyUser} />
    </div>
  )
}

export default App
