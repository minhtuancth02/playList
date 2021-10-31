import React, { useState } from 'react'
import {useForm , useStep , useNot} from 'react-hooks-helper'
import '../../App.css'
import { Names } from './stepForm/Names'
import { Address } from './stepForm/Address';
import { Contact } from './stepForm/Contact';
import { Review } from './stepForm/Review';
import Submit from './stepForm/Submit';
import { Redirect } from 'react-router-dom'
import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'

import Form from './form/Form';

const defaultData = {
    firstName: "", lastName: "", nickName: "",
    address:'', city:'', state:'', zip:'',
    phone:'', email:'', fax:'',
};


const Register = () => {
    const { currentUser } = useAuth();
    return (
      <>
        <h1 className="register">REGISTER</h1>
        <div style={{ marginBottom: "6rem" }}>
          {currentUser 
            ? <Form />
            : <Redirect to="login/login-form" />
          }
        </div>
      </>
    );
};

export default Register
