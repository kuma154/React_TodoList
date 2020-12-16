import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './ToDoList.css'
//受控组件 受控制状态的组件 需要与状态进行相应的绑定

class UlList extends Component {

    constructor(props) {
        super(props)
        this.isTrue = true
        this.deleteItem=this.deleteItem.bind(this);
        this.addLine=this.addLine.bind(this)
    }

    deleteItem (e) {
        // parentElement.children[0]
        var res =e.target.parentElement.children[0].innerText;//获取第一个span内的值
        console.log(res)
        var index=this.props.state.data.indexOf(res);//查找返回索引
        this.props.state.data.splice(index, 1);//
        let newArr = this.props.state.data
        this.setState({
            data: newArr
        })
    }

    addLine(e){
        if ( e.target.parentElement.children[0].classList.value==='') {
            e.target.parentElement.children[0].classList.add('active');
        }else {
            e.target.parentElement.children[0].classList.remove('active'); 
        }
    }

    render() {
        return (
            <ul className='ulList'>
                {this.props.state.data && this.props.state.data.map((item, index) => {
                    return <li  key={index}><span onClick={this.addLine}>{item}</span><span onClick={this.deleteItem}>X</span></li>
                })}
            </ul>
        );
    }
}


class DoneList extends Component {
    render() {
        return (
           <ul className='ulList1'>
               {this.props.lists&&this.props.lists.map((item,index)=>{
                   return <li key={index}>{item}</li>
               })}
           </ul>
        );
    }
}
class UnDoneList extends Component {
    render() {
        return (
            <ul className='ulList2'>
               {this.props.undoneList&&this.props.undoneList.map((item,index)=>{
                   return <li key={index}>{item}</li>
               })}
           </ul>
        );
    }
}




export default class App extends Component {
    constructor(props) {
        super(props);
        this.lists=[];
        this.undoneLists=[];
        this.state = {
            val: '',
            data: [],
            doneList:[],
            undoneList:[]
        }
    }
    handleChange = (e) => {
        let val = e.target.value;
       
        this.setState({
            val
        })
    }
    addData = () => {
        let newArr = [...this.state.data]
        newArr.push(this.state.val);
      
        this.setState({
            data: newArr,
            val: ''
        })
    }
    done=()=>{
        const ul1 = document.querySelector('.ulList');
const ul2 = document.querySelector('.ulList1');
const ul3 = document.querySelector('.ulList2');
        ReactDOM.findDOMNode(ul1).style.display='none'
        ReactDOM.findDOMNode(ul2).style.display='block'
        ReactDOM.findDOMNode(ul3).style.display='none'

        this.lists=[];

        const ulList = document.querySelector('.ulList').children;
        
        for(let i=0;i<ulList.length;i++){
            if(ulList[i].children[0].classList.value==='active'){
                this.lists.push(ulList[i].children[0].innerText);  
            }
        }
        this.setState({
            doneList:this.lists
        })
        
    }
    undone=()=>{
        const ul1 = document.querySelector('.ulList');
const ul2 = document.querySelector('.ulList1');
const ul3 = document.querySelector('.ulList2');
        ReactDOM.findDOMNode(ul1).style.display='none'
        ReactDOM.findDOMNode(ul2).style.display='none'
        ReactDOM.findDOMNode(ul3).style.display='block'

        this.undoneLists=[];

        const ulList = document.querySelector('.ulList').children;
        
        for(let i=0;i<ulList.length;i++){
            if(ulList[i].children[0].classList.value===''){
                this.undoneLists.push(ulList[i].children[0].innerText);  
            }
        }
        this.setState({
            undoneList:this.undoneLists
        })

    }
    showList=()=>{
    //    e.target.ref.ul1.style.display='none'
    const ul1 = document.querySelector('.ulList');
    const ul2 = document.querySelector('.ulList1');
    const ul3 = document.querySelector('.ulList2');
    ReactDOM.findDOMNode(ul1).style.display='block'
    ReactDOM.findDOMNode(ul2).style.display='none'
    ReactDOM.findDOMNode(ul3).style.display='none'
    }
    render() {
        return (
            <div>
                <div className='header'><h2>待办事项</h2></div>
                <div className='container'>
                    <div className='inputBox'>
                        <input type='text' onChange={this.handleChange} value={this.state.val} />
                        <button onClick={this.addData}>添加数据</button>
                    </div>

                    <UlList  state={this.state}></UlList>
                    <DoneList  lists={this.state.doneList}></DoneList>
                    <UnDoneList  undoneList={this.state.undoneList}></UnDoneList>

                    <div className='btnBox'>
                            <button ref='as' onClick={this.showList}>全部</button>
                            <button onClick={this.done}>已完成</button>
                            <button onClick={this.undone}>未完成</button>
                    </div>
                </div>
               
           
               

            </div>
        )
    }
}
