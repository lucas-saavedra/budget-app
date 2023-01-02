


import toast, { Toaster } from 'react-hot-toast';
import * as Yup from "yup"
import { useFormik } from 'formik';
import FormInput from "../components/Input/FormInput"
import { FiXCircle } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    //message state

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is mandatory"),
            lastname: Yup.string().required("Lastname is mandatory"),
            email: Yup.string().email('Email is not valid').required("Email is mandatory"),
            password: Yup.string().min(8, 'Password has to be at least 8 characters').required("Password is mandatory"),
        }),
        onSubmit: async values => {
            try {
                console.log(values);

            } catch (error) {
                toast.error(error.message, {
                    style: {
                        border: '1px solid #2c5282',
                        padding: '16px',
                        color: '#2c5282',
                        backgroundColor: "white"
                    },
                });
            }
        }

    })
    const showMessage = () => {
        return (

            <div className={`alert ${message.error ? "alert-danger " : "bg-white"}  py-2 px-3 mx-auto rounded`} >
                <p >
                    {message.msg}
                </p>
            </div >
        )
    }
    const ErrorMessage = ({ message }) => (
        <div className='my-2 alert bg-danger bg-opacity-75'>
            <div className='d-flex align-items-center ' >
                <FiXCircle />
                <p className='fw-bold p-0 m-0 ms-2 '> {message}</p>
            </div>


        </div>
    )
    return (

        <>


            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className='d-flex justify-content-center vh-100 '>
                <div className='row align-items-center w-100'>
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center">
                            Register</h1>

                        <form onSubmit={formik.handleSubmit}>
                            <FormInput
                                htmlForm="fname"
                                placeholder="John"
                                type="text"
                                label="Name"
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.name && formik.touched.name ? (
                                <ErrorMessage message={formik.errors.name} />
                            ) : null}
                            <FormInput
                                onBlur={formik.handleBlur}
                                value={formik.values.lastname}
                                onChange={formik.handleChange}

                                htmlForm="lname"
                                placeholder="Doe"
                                type="text"
                                label="Lastname"
                                id="lastname"
                            />
                            {formik.errors.lastname && formik.touched.lastname ? (

                                <ErrorMessage message={formik.errors.lastname} />

                            ) : null}
                            <FormInput
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                onChange={formik.handleChange}

                                htmlForm="email"
                                placeholder="email@email.com"
                                type="email"
                                label="Email"
                                id="email"
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <ErrorMessage message={formik.errors.email} />
                            ) : null}
                            <FormInput
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                htmlForm="password"
                                placeholder="Enter your password"
                                type="password"
                                label="Password"
                                id="password"
                            />
                            {formik.errors.password && formik.touched.password ? (
                                <ErrorMessage message={formik.errors.password} />
                            ) : null}

                            <div className="d-grid py-3 my-2">
                                <button type="submit"
                                    className="btn btn-outline-primary">
                                    Sign in
                                </button>
                            </div>


                        </form>
                        <div className='flex flex-col justify-center'>
                            <p className='text-white text-center' >Already registered?</p>
                            <div className='text-center mt-6'>
                                <span className='p-2 text-white bg-blue-800 rounded'> <Link to={'/login'}>Login here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Register