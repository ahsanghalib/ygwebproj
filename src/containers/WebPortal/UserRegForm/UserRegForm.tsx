import React from 'react'

interface UserRegistration {
    fullName: string
    email: string
    password: string
    confirmPassword: string
    doj: string | Date | null
    designation: string;
    
}


function UserRegForm() {
    return (
        <div>
            <div>New Employee Registration Form</div>
        </div>
    )
}

export default UserRegForm