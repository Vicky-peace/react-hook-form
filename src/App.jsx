import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './App.css';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  phoneNumber: yup.string().required('Phone Number is required'),
  age: yup.number().required('Age is required').min(18, 'You must be at least 18 years old'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
  confirmPassword: yup.string().required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
});

function App() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='container'>
      <h2>Fill In The Form</h2>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
         
          <input
            type="text"
            placeholder='Full Name'
            className={errors.fullName ? 'input-error' : ''}
            {...register("fullName")}
          />
          {errors.fullName && <span className='error'>{errors.fullName.message}</span>}
        </div>

        <div className='form-group'>
          
          <input
            type="text"
            placeholder='Email'
            className={errors.email ? 'input-error' : ''}
            {...register("email")}
          />
          {errors.email && <span className='error'>{errors.email.message}</span>}
        </div>

        <div className='form-group'>
    
          <input
            type="text"
            placeholder='Phone Number'
            className={errors.phoneNumber ? 'input-error' : ''}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && <span className='error'>{errors.phoneNumber.message}</span>}
        </div>

        <div className='form-group'>
          <input
            type="number"
            placeholder='Age'
            className={errors.age ? 'input-error' : ''}
            {...register("age")}
          />
          {errors.age && <span className='error'>{errors.age.message}</span>}
        </div>

        <div className='form-group'>
          <input
            type="password"
            placeholder='Password'
            className={errors.password ? 'input-error' : ''}
            {...register("password")}
          />
          {errors.password && <span className='error'>{errors.password.message}</span>}
        </div>

        <div className='form-group'>
          <input
            type="password"
            placeholder='Confirm Password'
            className={errors.confirmPassword ? 'input-error' : ''}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <span className='error'>{errors.confirmPassword.message}</span>}
        </div>

        <input type="submit" value="Submit" className='submit-btn' />
      </form>
    </div>
  );
}

export default App;
