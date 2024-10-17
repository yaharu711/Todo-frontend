/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  let name: string|number = 'nagai'
  name = 1;
  console.log(name);

  // 型を変数として定義しておける。
  type response = object|null;
  const getListResponse: response = {};
  console.log(getListResponse);

  const intArray: number[] = [1, 2, 3];
  const stringArray: string[] = ['2,' , 'a'];
  const intStringArray: (number|string)[] = [1, 'e'];

  // 型で定義されているプロパティは必須になる
  const object: {name: string, age: number} = {name: 'nagai', age: 24};
  const object2: {name: string, age?: number} = {name: 'nagai'};
  // 以下はよく使いそうなオブジェクト型をtypeで定義して、そのオブジェクトの配列をもつ変数を定義する方法
  type profile = {name: string, age?: number};
  const objectList: profile[] = [
    {name: 'nagai'},
    // {age: 24}　→これはエラーになる（profile型なのでnameプロパティは必須）
    {name: 'haruya', age: 24}
  ];

  // デフォルト値の指定の仕方
  const sum = (x: number, y: number = 1) => {
    return x + y
  }
  console.log(sum(1, 2));
  // 任意の引数を取ることもできる
  const sum2 = (x: number, y?: number): number => {
    if (y === undefined) return x;
    return x + y
  }
  console.log(typeof sum2(1) === 'number')
  return (
    <>
      <h2>hello</h2>
    </>
  )
}

export default App
