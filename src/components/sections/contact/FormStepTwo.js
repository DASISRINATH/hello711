import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './FormSteps.css'

import photo from '../../../assets/img/demo/test_1.jpg'

const FormStepTwo = ({role,setRole,setSteps}) => {

    const addRole = (e) => {
        e.preventDefault();
        setRole(e.target.name);
        console.log(e)
        console.log(e.target.classList);

        if (e.target.classList.contains("student")) {
            setRole("student")
        } else {
            setRole("tutor")
        }

        console.log(role)
    }

    useEffect(() => {
        console.log(role)

    }, [role])


    return (
        <div className="container phoneformdiv">
            <div className="comment-form form">
                <h4>Please select your Role</h4>
                <form onSubmit={() => { }} action="#" className='formSteps'>
                    <div className='form__wrapper'>
                        <button type='checkbox' name='Tutor' id='Tutor' className={`form__button tutor ${role === "tutor" ? "form__selected" : ""}`} onClick={(e) => { addRole(e) }}>
                            <img src={photo} alt="tutor" className='form__photo tutor' />
                        </button>
                        <label htmlFor='Tutor'>Tutor</label>
                    </div>
                    <div className='form__wrapper'>
                        <button type='checkbox' name='Student' id='Student' className={`form__button student ${role === "student" ? "form__selected" : ""}`} onClick={(e) => { addRole(e) }}>
                            <img src={photo} alt="Student" className='form__photo student' />
                        </button>
                        <label htmlFor='Student'>Student</label>
                    </div>
                </form>
                <button className='form__btn' onClick={() =>setSteps(prev=>prev+1)}>Next</button>
            </div>
        </div>
    )
}

export default FormStepTwo