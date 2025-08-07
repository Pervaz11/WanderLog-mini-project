import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
    fullName: Yup.string()
        .min(3, 'Full name must be at least 3 characters')
        .required('Full name is required'),

    username: Yup.string()
        .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores are allowed')
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'At least one uppercase letter')
        .matches(/[a-z]/, 'At least one lowercase letter')
        .matches(/[0-9]/, 'At least one number')
        .matches(/[@$!%*?&]/, 'At least one special character')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

