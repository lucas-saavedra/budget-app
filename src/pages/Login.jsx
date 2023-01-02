import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"
import FormInput from "../components/Input/FormInput";
import { Link, useNavigate } from 'react-router-dom';
import { FiXCircle } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ msg: null, error: false });


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email is not valid').required("Email is missing"),
            password: Yup.string().min(6, 'Password has to be at least 6 characters').required("Password is missing"),
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

        < >
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className="">
                <div className='d-flex justify-content-center vh-100'>
                    <div className='row align-items-center w-100'>
                        <div className="col-md-6 mx-auto">
                            <div>
                                <h1 className="text-center">
                                    Login</h1>

                                {message.msg && showMessage()}

                                <form className='form' onSubmit={formik.handleSubmit} >

                                    <FormInput
                                        
                                        htmlForm="email"
                                        placeholder="email@email.com"
                                        type="email"
                                        label="Email"
                                        id="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.email && formik.touched.email ? (
                                        <ErrorMessage message={formik.errors.email} />
                                    ) : null}
                                    <FormInput
                                        
                                        htmlForm="password"
                                        placeholder="Enter your password"
                                        type="password"
                                        label="Password"
                                        id="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.password && formik.touched.password ? (
                                        <ErrorMessage message={formik.errors.password} />
                                    ) : null}

                                    <div className="d-grid py-3  my-2">
                                        <button type="submit"
                                            className="btn btn-outline-primary">
                                            Login
                                        </button>
                                    </div>


                                </form>
                                <div className='flex flex-col justify-center'>
                                    <p className='text-center' >Does not have an account? </p>
                                    <div className='text-center mt-6'>
                                        <span className='p-2 text-white bg-blue-800 rounded'> <Link to={'/register'}>Register here</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>



                </div>
            </div>




        </>







    );
};

export default Login;
