import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
function TodoApp(){
        const [todoList, setTodoList] = useState([]);
        // console.log(todoList.length );
        

        let saveTodoList=(event)=>{
                // event.preventDefault();
                event.preventDefault();
                let todoName = event.target.todoName.value;
                
                console.log( todoName.length );
                if(todoName.length === 0 || todoName ===" "){
                        event.target.todoName.value=""; 
                        NotificationManager.error(`Please Enter Todo...`); 

                }
                else if(!todoList.includes(todoName) ){
                        let finalTodoList = [...todoList,todoName]
                        setTodoList(finalTodoList)
                        event.target.todoName.value=""; 
                        NotificationManager.success("Successfully Added");
                }
                
                else{
                        NotificationManager.error(`${todoName} Alredy Exists...`); 
                        event.target.todoName.value=""; 
                }
        }
        let list = todoList.map((value,index)=>{
                return(
                        <TodoListItems value={value} key={index} indexNumber={index} todoList={todoList} setTodoList={setTodoList}></TodoListItems>
                )
        })
       
        return (
                <div className="App">
                        <NotificationContainer></NotificationContainer>
                        <h1>Todo List</h1>
                        <form onSubmit={saveTodoList} >

                                <input type="text"   name='todoName'/> 
                                <button className='btn btn-success'>Save</button>
                        </form>
                        {todoList.length === 0 ? 
                        (<h1 className='emtMsg'>No Todo Added</h1>) :
                        ( <CountTodo todoList={todoList} setTodoList={setTodoList} ></CountTodo>)}
                       
                        <div className="outerBox">
                                <ul>
                                        {list}
                                </ul>
                        </div>
                       
                </div>
        )
}
export default TodoApp;


function CountTodo({todoList,setTodoList}){
        let handleClear=()=>{
                let finalList = []
                setTodoList(finalList)
        }
        return(
                <Container>
                <Row>
                        <Col><h1>Total Todo : {todoList.length} </h1></Col>
                        <Col>
                                <button className='btn btn-danger' onClick={handleClear}>Clear All</button>
                        </Col>

                </Row>
                </Container>
        )
}

function TodoListItems({value,indexNumber,todoList,setTodoList}){
        let deleteRow=()=>{
                let finalList=todoList.filter((v,i)=>i!==indexNumber);
                // console.log(finalList);
                setTodoList(finalList); 
                NotificationManager.error(`Deleted`)
        }
        const [isLineThrough, setLineThrough] = useState();
        let handleClick=()=>{
                setLineThrough(!isLineThrough);
        }
        return(
                 <li onClick={handleClick} style={{ backgroundColor:isLineThrough? '#a9b7c7':'#d2e5fa', textDecoration:isLineThrough ? 'line-through' : 'none'} }>{value} <span onClick={deleteRow}>&times;</span></li>
        )
}