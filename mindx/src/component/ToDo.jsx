import React, { useState } from 'react'
import "./Style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ToDo() {
    const [dataInput, setDataInput] = useState()
    const [data, setData] = useState([
        {
            id: "1",
            taskName: "Do coding challenges",
            status: false
        },
        {
            id: "2",
            taskName: "Do coding challenges",
            status: true
        },
        {
            id: "3",
            taskName: "Do coding challenges",
            status: false
        }
    ])

    // change task status
    const changeCheck = (event,id) =>{
        console.log(event.target.checked,id)
        let newData = [...data]
        let findIndex = newData.findIndex((item) => {
            return id == item.id
        })
        newData[findIndex].status=event.target.checked
        setData(newData)
    }

    // ham render
    const renderTask = () => {
        return data.map((item) => {
            let stylecss = "activeTask"
            if (item.status){
                stylecss = "completeTask"
            }
            return <div className={stylecss} key={item.id}>
                <div>
                    <input checked={item.status} type="checkbox" onChange={()=>{changeCheck(event,item.id)}} />
                    <span>{item.taskName}</span>
                </div>
                <button onClick={() => {deleteTask(item.id)}}><FontAwesomeIcon icon={faTrash} className='icon'  /></button>
            </div>
        })
    }
    // render task active
   
    // ham lay data input
    const handleChange = (e) => {
        setDataInput(e.target.value)
    }

    // ham add
    const add = () => {
        let newData = [...data]
        let findIndex = newData.findIndex((item) => {
            return dataInput == item.taskName
        })
        if (findIndex == -1) {
            newData.push({

                id: Math.floor(Math.random()*100),
                taskName: dataInput,
                status: false

            }) 
            setData(newData)
            setDataInput("")
        }
        else if (dataInput.trim() === " ") {
            alert("Không được điền nội dung trống");
        } 
        else{
            alert("Đã tồn tại")
        }
    }

    // ham delete
    const deleteTask = (id) => {
        let newData = [...data]
        let findIndex = newData.findIndex((item) => {
            return id == item.id
        })
        newData.splice(findIndex, 1)
        setData(newData)

    }

    // ham delete all
    const deleteAll = () => {
        setData([]);
    };

    return (
        <div className='todo'>
            <h1 className='title'>#todo</h1>

            <ul class="nav nav-underline">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">All</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Complete</a>
                </li>
            </ul>

            <hr />
            <div className="add">
                <input value={dataInput} onChange={handleChange} type="text" placeholder='add details' />
                <button onClick={() => { add() }}>Add</button>
            </div>
            <div>{renderTask()}</div>
            <div className='delete'><button onClick={deleteAll} >Delete</button></div>
        </div>
    )
}


