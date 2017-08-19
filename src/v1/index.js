import React, { Component } from 'react';
import R from 'ramda'

import './style.css'

// 定义标题信息
const Headding = () => (
  <h2>What is you need to do?</h2>
)

// todo输入框
const TodoInput = (props) => (
  <input
    type="text"
    value={props.currValue}
    onChange={props.syncValue}
    onKeyPress={props.funcAddTodo}
  />
)


// todo项目
const TodoItem = (props) => (
  <li className="todo-item"
    data-uid={props.data.uid}
    data-status={props.data.status}>
    <input
      type="checkbox"
      checked={props.data.status === 'done' ? true : false }
      onChange={() => props.changeStatus(props.data.uid)}
    />
    {props.data.text}
  </li>
)

// todo列表
const TodoList = (props) => (
  <ul>
    {
      props.list.map(item => (
        <TodoItem
          key={item.uid}
          changeStatus={props.changeStatus}
          data={item} />
      ))
    }
  </ul>
)

// 筛选过滤
const Filter = (props) => (
  <div>
    <button onClick={() => props.doFilter('')}>全部</button>
    <button onClick={() => props.doFilter('todo')}>待办</button>
    <button onClick={() => props.doFilter('done')}>已完成</button>
  </div>
)

class Todo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      /*
         {
         text: String,
         status: [todo, done],
         uid: String
         }
       */
      todos: {},
      // enum [todo, done]
      filter: '',
      // 当前输入的值
      word: '',
    };
  }
  // 同步输入框的值和state
  syncInputValue = (e) => this.setState({word: e.target.value});
  // 把当前输入框的值放到todos中
  addTodo = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      const uid = String(Date.now());
      this.setState({
        todos: {
          ...this.state.todos,
          [uid]: {
            text: this.state.word,
            status: 'todo',
            uid: uid,
          }
        }
      })
      // 清空输入框的state
      this.setState({word:''})
    }
  }

  // 获取筛选后的todos
  getTodos = () => {
    if (this.state.status) {
      return R.values(R.filter(t => t.status === this.state.status)(this.state.todos))
    } else {
      return R.values(this.state.todos)
    }
  }

  // 更新状态值
  changeStatus = (uid) => {
    this.setState({
      todos: {
        ...this.state.todos,
        [uid]: {
          ...this.state.todos[uid],
          status: 'todo' === this.state.todos[uid].status ?
                  'done' : 'todo'
        }
      }
    })
  }

  // 触发过滤
  doFilter = (status) => {
    this.setState({
      status: status
    })
  }
  render() {
    return (
      <div>
        <Headding />
        <TodoInput
          syncValue={this.syncInputValue}
          currValue={this.state.word}
          funcAddTodo={this.addTodo}
        />
        <TodoList
          changeStatus={this.changeStatus}
          list={this.getTodos()} />
        <Filter doFilter={this.doFilter} />
      </div>
    )
  }
  sd() { }
}

export default Todo
