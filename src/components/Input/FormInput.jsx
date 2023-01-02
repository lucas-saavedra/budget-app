import React from 'react'
import PropTypes from 'prop-types'

const FormInput = (props) => {
    const { className, value, onBlur, onChange, label, htmlForm, id, type, placeholder } = props;
    return (

        <div className={className} >
            <label
                className="block mb-2  text-uppercase" htmlFor={htmlForm}
            >{label}</label>
            <input
                className="form-control mb-3"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>

    )
}
FormInput.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    htmlForm: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
}

export default FormInput