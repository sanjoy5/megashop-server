import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser, listUsers } from '../actions/UserAction'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Table } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa';

const Users = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const usersList = useSelector(state => state.usersList)
    const { loading, error, users } = usersList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {
                loading ?
                    <Loading /> :
                    error ?
                        <Message variant='danger'>{error}</Message>
                        : <>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead className='text-center'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Admin</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users?.map(user => (
                                        <tr key={user._id} className='text-center'>
                                            <td>  {user._id}</td>
                                            <td>  {user.name}</td>
                                            <td>  {user.email}</td>
                                            <td>  {user.isAdmin ? (
                                                <FaCheck className='text-success' />
                                            ) : (
                                                <FaCheck className='text-danger' />
                                            )}</td>
                                            <td>
                                                <Link to={`/admin/user/${user._id}/edit`}>
                                                    <button className="btn bg-primary1 btn-sm me-2">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button onClick={() => deleteHandler(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>



                        </>
            }
        </div>
    );
};

export default Users;