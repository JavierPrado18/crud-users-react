import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UsersForm from './components/UsersForm'
import axios from 'axios'
import UsersList from './components/UsersList'

function App() {
  const [users,setUsers]=useState([]);
  const [userSelected,setUserSelected]=useState(null);
  //Titulo del formulario
  const [titleForm,setTitleForm]=useState(true);

  useEffect(()=>{
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res=>setUsers(res.data))
  },[])
  console.log(users);
  
  const getUsers=()=>{
    axios.get("https://users-crud1.herokuapp.com/users/")
    .then(res=>setUsers(res.data))
  }
  
  const selectUser=(user)=>{
    setUserSelected(user)
    setTitleForm(false)
  }
  
  const deleteUser=(id)=>{
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
        .then(()=>getUsers())
  }
  const deselectedUser=()=>setUserSelected(null) 
  
  return (
    <div className="App">
      <header id='header' className="App-header">
        <h1>Users</h1>
        <a href='#modal' ><i className="fa-solid fa-plus"></i> Create new user</a>
      </header>
      
      <section id='modal' className='modal'>
        <div className="container-modal">
          
          <UsersForm 
            getUsers={getUsers}
            userSelected={userSelected}
            deselectedUser={deselectedUser}
            titleForm={titleForm}
            setTitleForm={setTitleForm}
            />
          </div>
      </section>
      
      <main className='container-list'>
        <UsersList users={users}
          selectUser={selectUser}
          
         
        />
      </main>
      <section id='modal-delete' className='modal'>
        <div className="container-modal">
            <h3>delete user <i className="fa-regular fa-circle-question"></i></h3>
            <p> Are you sure you want to remove <b>{userSelected?.first_name}  {userSelected?.last_name} </b>?</p>
            <div className='btn-container'>
              <button className='btn-yes' onClick={()=>{
                deleteUser(userSelected.id)
                window.location.href="#"
                deselectedUser()
                setTitleForm(true)
              }}
              ><i className="fa-solid fa-check"></i></button>
              <button className='btn-no' onClick={()=>{
                window.location.href="#"
                deselectedUser()
                setTitleForm(true)}}
              ><i className="fa-solid fa-xmark"></i></button>
            </div>
        </div>
      </section>

    </div>
  )
}

export default App
