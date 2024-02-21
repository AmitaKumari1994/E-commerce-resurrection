import React from 'react'
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetUsersQuery,useDeleteUserMutation, useUpdateUserMutation } from '../slices/usersApiSlice'

const UserListScreen = () => {

    const {data:UserList, isLoading:userLoading, error, refetch} = useGetUsersQuery();

    const [deleteUser, {isLoading:userDeleting}] = useDeleteUserMutation();

    const [updateUser, {isLoading:userUpdating}] = useUpdateUserMutation();
    
    const deleteHandler = async (userid)=>{
      if(window.confirm('Are you sure ? you want to delete the user')){
        try {
          await deleteUser(userid);
          toast.success('User deleted')
          console.warn(deleteUser)
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }

      }
    }

    const updateHandler = async(userid)=>{
      try {
        await updateUser(userid);
        console.log(userid)
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error );
      }
    }
  return (
    <>
      <h1>User list</h1>
      {userDeleting}
      {userLoading?(<Loader/>):error?(<Message variant='danger'>{error}</Message>):(<>
      
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
        </tr>
      </thead>
      <tbody>
        {UserList.map((user)=>(
        <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>

            <td>{user.isAdmin ? (
              <FaCheck style = {{color:'green'}}/>
            ):(<FaTimes style = {{color:'red'}}/>)}</td>

            <td>
              <LinkContainer to = {`/admin/user/${user._id}/edit`}>

                <Button variant='light' className='btn-sm'
                onClick={()=>updateHandler(user._id)}
                >
                  <FaEdit/>
                </Button>
              </LinkContainer>
              <Button 
                variant='danger'
                className='btn-sm'
                onClick={()=>deleteHandler(user._id)}
              >
                <FaTrash style = {{color: 'white'}}/>
              </Button>
            </td>
        </tr>))}


      </tbody>

      </Table>
      
      </>)}
    </>
  )
}

export default UserListScreen;
