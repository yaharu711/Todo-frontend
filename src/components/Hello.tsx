import React from 'react'

// コンポーネント側でpropsの型定義をしておくと、親でpropsの補完が効くようになる
type HelloProps = {
    value: string,
    children?: React.ReactNode
}

const Hellow: React.FC<HelloProps> = ({value, children}) => {
  return (
    <div>
      <h1>{value}</h1>
      <p>{children}</p>
    </div>
  )
}

export default Hellow
