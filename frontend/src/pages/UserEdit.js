import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/UserAction'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Button } from 'react-bootstrap'
import { user_update_reset } from '../reducers/UserUpdateReducer'

const UserEdit = () => {

    const { id } = useParams()


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch(user_update_reset())
            navigate('/admin/users')
        } else {
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user?.name)
                setEmail(user?.email)
                setIsAdmin(user?.isAdmin)
            }
        }

    }, [user, id, dispatch, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }


    return (

        <>


            <div className='container my-5'>

                <Link to='/admin/users'>
                    <Button className='btn btn-primary1'>Go Back</Button>
                </Link>

                <div className="row align-items-center py-md-4 justify-content-center">

                    <div className="col-md-6 mb-5 mb-md-0">
                        <h2 className='mb-3'>Edit User</h2>

                        {loadingUpdate && <Loading />}
                        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                        {loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> : (
                            <form onSubmit={submitHandler}>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Full Name</label>
                                    <input type="text" class="form-control border" id="name" placeholder="Enter Full Name" onChange={(e) => setName(e.target.value)} value={name} />
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control border" id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </div>

                                <div class="mb-3 form-check">
                                    <input class="form-check-input border" type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                                    <label class="form-check-label" for="isAdmin">
                                        Is Admin
                                    </label>
                                </div>

                                <button type='submit' className='btn bg-primary1 btn-lg'>
                                    Update User
                                </button>
                            </form>
                        )}

                    </div>

                </div>

            </div>
        </>

    );
};

export default UserEdit;