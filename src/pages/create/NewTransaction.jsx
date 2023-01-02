

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FiXCircle } from "react-icons/fi";

import { useFormik, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"
import Account from '../../components/Account';
import { currencyCodes } from '../../constants/currencyCodes';
import { accountTypes } from '../../constants/accountTypes';

import Select from 'react-select';
import { useMutation, useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { useEffect, useState } from 'react';

const NewTransaction = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({
        account_id_from: '',
        account_id_to: '',
        datetime: Date.now(),
        type: 'expense',
        amount: 0,
        category_id: '',
    })


    const { error, data } = useQuery(['accounts'], async () => (
        axios.get("http://127.0.0.1:8000/api/accounts", {
            headers: { Authorization: 'Bearer ' + '1|II0bruH55BdZpFQErqzZ1pumgaoRrdkcrHoN850V' }
        }).then(res => res.data.data)
    ))
    const mutation = useMutation({
        mutationFn: (data) => {
            return axios.put('http://127.0.0.1:8000/api/accounts/' + id, data,
                {
                    headers: { Authorization: 'Bearer ' + '1|II0bruH55BdZpFQErqzZ1pumgaoRrdkcrHoN850V' }
                })
        },
    })
    useEffect(() => {
        if (data) {
            setInitialValues({ ...data.find(account => account.id === +id) })
        }
    }, [data])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ...initialValues
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            initial_balance: Yup.number().required("Balance is required"),
            currency: Yup.string().required("Code is required"),
            color: Yup.string().required("Color is required"),
            type: Yup.string().required("Type is required"),
            description: Yup.string(),
        }),
        onSubmit: async values => {
            try {
                mutation.mutate(values)
            } catch (error) {
                console.log(error);
            }
        }
    })
    const ErrorMessage = ({ message }) => (
        <div className='my-2 alert bg-danger bg-opacity-75'>
            <div className='d-flex align-items-center ' >
                <FiXCircle />
                <p className='fw-bold p-0 m-0 ms-2 '> {message}</p>
            </div>
        </div>
    )
    if (mutation.isSuccess) {
        navigate('/accounts')
    }
    return (
        <>
            {data ? (
                <form onSubmit={formik.handleSubmit} className="col-md-6 mx-auto">
                    <div className="mb-3">
                        <label className="form-label" htmlFor={'name'}>Account name</label>
                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder='Account name...'
                        />
                        {formik.errors.name && formik.touched.name ? (
                            <ErrorMessage message={formik.errors.name} />
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor={'name'}>Description</label>
                        <input
                            className="form-control"
                            id="description"
                            name="description"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            placeholder='Description...'
                        />
                        {formik.errors.description && formik.touched.description ? (
                            <ErrorMessage message={formik.errors.description} />
                        ) : null}
                    </div>
                    <div className="mb-3">


                        <label
                            className="block mb-2" htmlFor={'name'}
                        >Initial Balance</label>
                        <input
                            className="form-control mb-3"
                            id="initial_balance"
                            name="initial_balance"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.initial_balance}
                            placeholder='Balance'
                        />
                        {formik.errors.initial_balance && formik.touched.initial_balance ? (
                            <ErrorMessage message={formik.errors.initial_balance} />
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 " htmlFor={'currency'}>Currency Code</label>
                        <Select options={currencyCodes}
                            className="text-dark"
                            aria-label="select for currency code"
                            onChange={select => formik.setFieldValue('currency', select.valueOf)}
                            value={currencyCodes ? currencyCodes.find(e => e.value === formik.values.currency) : ''}
                            name="currency"
                            id="currency"
                        >
                        </Select>
                        {formik.errors.currency && formik.touched.currency ? (
                            <ErrorMessage message={formik.errors.currency} />
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 " htmlFor={'type'}>Account type</label>
                        <select className="form-select"
                            aria-label="select for account type"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.type}
                            name="type"
                            id="type">
                            {accountTypes.map((a, i) => (<option key={i} value={a.type}>  {a.name} </option>))}
                        </select>
                        {formik.errors.type ? (
                            <ErrorMessage message={formik.errors.type} />
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor={'color'} >Color Code</label>

                        <input className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.color}
                            type="color" name="color" id="color" />
                        {formik.errors.color && formik.touched.color ? (
                            <ErrorMessage message={formik.errors.color} />
                        ) : null}
                    </div>


                    <div className='d-grid '>
                        <button className='btn btn-secondary' type='submit'>Submit</button>
                    </div>
                </form>
            ) : (<>Loading</>)}

        </>
    )
}

export default NewTransaction