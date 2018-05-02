import React from 'react'
import ReactDOM from 'react-dom'
// let a1 = new Test()
require('test.css')
require('test1.scss')
// a1.getName()
 var func = str => {
     document.getElementById('root').innerHTML = str;
 };
 func('我现在在使用Babel!');
 console.log('aa')

 let sleep = () => {
     return new Promise(resolve => {
         setTimeout(() => {
             resolve(11111)
         }, 3000)
     })
 }

 async function todo () {
     let ret = await sleep()

     console.log('新的promise', ret)
 }
todo()

let One = props => {
  return <div>{props.test}</div>;

  function doA() {
  }
};

ReactDOM.render(<div>
        <One test="aaa"></One>
    </div>,document.getElementById('root'))