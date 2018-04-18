import React from 'react'
import ReactDOM from 'react-dom'
class Test extends React.Component{
    render () {
        return (<div>test</div>)
    }
}

ReactDOM.render(
    <Test/>, document.getElementById('root'))