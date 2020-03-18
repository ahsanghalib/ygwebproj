import axios, {AxiosRequestConfig} from 'axios'


const BASE_URL = process.env.REACT_APP_API_URL

export function axiosClient() {
    let defaultOptions: AxiosRequestConfig = {
        baseURL: BASE_URL
    }

    return axios.create(defaultOptions)
}

export function axiosEmail() {
    let defaultOptions: AxiosRequestConfig = {
        baseURL: process.env.REACT_APP_EMAIL_URL,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.REACT_APP_KEY
        }
    }

    return axios.create(defaultOptions)
}

export const body = (sendName: string, sendEmail: string, subject: string, bodyHtml: string, bodyText: string) => {
    return {
        sender: {
            name: sendName,
            email: sendEmail
        },
        to: [
            {
                name: process.env.REACT_APP_TO_EMAIL_1_NAME,
                email: process.env.REACT_APP_TO_EMAIL_1_EMAIL
            }
        ],
        replyTo: {
            name: sendName,
            email: sendEmail
        },
        subject: subject,
        htmlContent: bodyHtml,
        textContent: bodyText
    }
}

export const contactFormHtmlEmail = (fullName: string, message: string, phone?: string) => {
    return `
<div>
    <div>
        <div><b>Name:</b></div>
        <div>${fullName}</div>
        <br />
    </div>
    <div>
        <div><b>Phone:</b></div>
        <div>${phone ? phone : 'No Number Given'}</div>
        <br />
    </div>
    <div>
        <div><b>Message:</b></div>
        <div>${message}</div>
        <br />
    </div>
</div>        
     `
}

export const contactFormTextEmail = (fullName: string, message: string, phone?: string) => {
    return `
        Full Name: ${fullName}, 
        Phone No.: ${phone ? phone : 'No Number Given.'},
        Message: ${message} 
     `
}

export const careerFormHtmlEmail = (
    fullName: string,
    dob: string | null | Date,
    gender: string,
    maritalStatus: string,
    address: string,
    city: string,
    country: string,
    phone: string,
    email: string,
    highestQualification: string,
    education: string,
    institution: string,
    status: string,
    workHistory: string,
    experience: string,
    disability: string,
    strengths: string
) => {
    return `
<div>
    <div>
        <div><b>Name:</b></div>
        <div>${fullName}</div>
        <br />
    </div>
    <div>
        <div><b>Date of Birth:</b></div>
        <div>${dob}</div>
        <br />
    </div>
    <div>
        <div><b>Gender:</b></div>
        <div>${gender}</div>
        <br />
    </div>
    <div>
        <div><b>Marital Status:</b></div>
        <div>${maritalStatus}</div>
        <br />
    </div>
    <div>
        <div><b>Address:</b></div>
        <div>${address}</div>
        <br />
    </div>
    <div>
        <div><b>City:</b></div>
        <div>${city}</div>
        <br />
    </div>
    <div>
        <div><b>Country:</b></div>
        <div>${country}</div>
        <br />
    </div>
    <div>
        <div><b>Phone No.:</b></div>
        <div>${phone}</div>
        <br />
    </div>
    <div>
        <div><b>Email:</b></div>
        <div>${email}</div>
        <br />
    </div>
    <div>
        <div><b>Highest Level of Qualification:</b></div>
        <div>${highestQualification}</div>
        <br />
    </div>
    <div>
        <div><b>HighestQualification:</b></div>
        <div>${education}</div>
        <br />
    </div>
    <div>
        <div><b>Institution / University:</b></div>
        <div>${institution}</div>
        <br />
    </div>
    <div>
        <div><b>Current Status:</b></div>
        <div>${status}</div>
        <br />
    </div>
    <div>
        <div><b>Employment Record:</b></div>
        <div>${workHistory}</div>
        <br />
    </div>
    <div>
        <div><b>Experience in Years:</b></div>
        <div>${experience}</div>
        <br />
    </div>
    <div>
        <div><b>Disability:</b></div>
        <div>${disability}</div>
        <br />
    </div>
    <div>
        <div><b>Strengths:</b></div>
        <div>${strengths}</div>
        <br />
    </div>
</div>        
     `
}

export const careerFormTextEmail = (
    fullName: string,
    dob: string | null | Date,
    gender: string,
    maritalStatus: string,
    address: string,
    city: string,
    country: string,
    phone: string,
    email: string,
    highestQualification: string,
    education: string,
    institution: string,
    status: string,
    workHistory: string,
    experience: string,
    disability: string,
    strengths: string
) => {
    return `
Name: ${fullName},
Date of Birth: ${dob}, 
Gender: ${gender},
Marital Status: ${maritalStatus},
Address: ${address}, 
City: ${city}, 
Country: ${country}, 
Phone No.: ${phone}, 
Email: ${email}, 
Highest Level of Qualification: ${highestQualification}, 
HighestQualification: ${education}, 
Institution / University: ${institution}, 
Current Status: ${status}, 
Employment Record: ${workHistory}, 
Experience in Years: ${experience}, 
Disability: ${disability}, 
Strengths: ${strengths}
     `
}




