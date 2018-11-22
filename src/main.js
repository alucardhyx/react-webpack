import React from 'react'
import ReactDOM from 'react-dom'
// let a1 = new Test()
// import './test.css'

// sayHello()
import Hello from './Hello'
// import './test1.scss'
// a1.getName()

//  let sleep = () => {
//      return new Promise(resolve => {
//          setTimeout(() => {
//              resolve(11111)
//          }, 3000)
//      })
//  }

//  async function todo () {
//      let ret = await sleep()

//      console.log('新的promise', ret)
//  }
// todo()

let Test = props => (<div>{props.content}</div>)

ReactDOM.render(<div>
            <Test content="这是一个组件"></Test>
            <Hello />
        </div>,document.getElementById('root'))