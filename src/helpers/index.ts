import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store/ConfigStore";

const FIREBASE_LOCAL_API = "http://localhost:5001/ygwebproj/us-central1/api";
const FIREBASE_API = "https://us-central1-ygwebproj.cloudfunctions.net/api";
const NOW_LOCAL_API = "http://localhost:5000/api";
const NOW_API = "https://ygweb-zeitnow.now.sh/api";

const BASE_URL = (): string => {
  if (store.getState().mainStore.backend === "now") {
    return window.location.hostname === "localhost" ? NOW_LOCAL_API : NOW_API;
  } else {
    return window.location.hostname === "localhost"
      ? FIREBASE_LOCAL_API
      : FIREBASE_API;
  }
};

export const ASSETS_URL = process.env.REACT_APP_GITHUB_ASSETS_URL;

export function axiosWithAuth() {
  let defaultOptions: AxiosRequestConfig = {
    baseURL: BASE_URL(),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token"); // store.getState().authStore.accessToken // localStorage.getItem('token');
    // eslint-disable-next-line no-useless-concat
    config.headers.Authorization =
      token + " $2a$12$2nEhn.w/tpRO8LzX1D7bueNu05.WxZlS6hpBR8AkofGton7R1KWiO";
    return config;
  });

  return instance;
}

export function axiosClient() {
  let defaultOptions: AxiosRequestConfig = {
    baseURL: BASE_URL(),
    headers: {
      "Content-Type": "application/json",
      // eslint-disable-next-line no-useless-concat
      // Authorization:
      //   "Barear " +
      //   "b " +
      //   "$2a$12$2nEhn.w/tpRO8LzX1D7bueNu05.WxZlS6hpBR8AkofGton7R1KWiO",
    },
  };
  // Create instance
  return axios.create(defaultOptions);
}

export function axiosEmail() {
  let defaultOptions: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_EMAIL_URL,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.REACT_APP_KEY,
    },
  };

  return axios.create(defaultOptions);
}

export const body = (
  sendName: string,
  sendEmail: string,
  subject: string,
  bodyHtml: string,
  bodyText: string
) => {
  return {
    sender: {
      name: sendName,
      email: sendEmail,
    },
    to: store.getState().mainStore.formEmailTo,
    replyTo: {
      name: sendName,
      email: sendEmail,
    },
    subject: subject,
    htmlContent: bodyHtml,
    textContent: bodyText,
  };
};

export const contactFormHtmlEmail = (
  fullName: string,
  message: string,
  phone?: string
) => {
  return `
<div>
    <div>
        <div><b>Name:</b></div>
        <div>${fullName}</div>
        <br />
    </div>
    <div>
        <div><b>Phone:</b></div>
        <div>${phone ? phone : "No Number Given"}</div>
        <br />
    </div>
    <div>
        <div><b>Message:</b></div>
        <div>${message}</div>
        <br />
    </div>
</div>        
     `;
};

export const contactFormTextEmail = (
  fullName: string,
  message: string,
  phone?: string
) => {
  return `
        Full Name: ${fullName}, 
        Phone No.: ${phone ? phone : "No Number Given."},
        Message: ${message} 
     `;
};

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
     `;
};

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
     `;
};

export const leaveApplicationHtmlEmail = (
  fullName: string,
  department: string,
  designation: string,
  startDate: string,
  endDate: string,
  days: number,
  reason: string
) => {
  return `
<div>
    <div>
        <div><b>Name:</b></div>
        <div>${fullName}  [${designation} - ${department}]</div>
        <br />
    </div>
    <div>
        <div><b>Dates:</b></div>
        <div>${startDate} to ${endDate} [${days} ${
    days <= 1 ? "Day" : "Days"
  }]</div>
        <br />
    </div>
    <div>
        <div><b>Reason:</b></div>
        <div>${reason}</div>
        <br />
    </div>
</div>        
     `;
};

export const leaveApplicationTextEmail = (
  fullName: string,
  department: string,
  designation: string,
  startDate: string,
  endDate: string,
  days: number,
  reason: string
) => {
  return `
        Full Name: ${fullName}  [${designation} - ${department}], 
        Dates:${startDate} to ${endDate} [${days} ${days <= 1 ? "Day" : "Days"}]
        Reason: ${reason},
     `;
};

export const applicationBody = (
  sendName: string,
  sendEmail: string,
  toList: { email: string }[],
  subject: string,
  bodyHtml: string,
  bodyText: string
) => {
  return {
    sender: {
      name: sendName,
      email: sendEmail,
    },
    to: [...toList, { email: sendEmail }],
    replyTo: {
      name: sendName,
      email: sendEmail,
    },
    subject: subject,
    htmlContent: bodyHtml,
    textContent: bodyText,
  };
};

export const adminLeaveAppBody = (
  sendName: string,
  sendEmail: string,
  to: { email: string; name: string },
  subject: string,
  bodyHtml: string,
  bodyText: string
) => {
  return {
    sender: {
      name: sendName,
      email: sendEmail,
    },
    to: [
      {
        name: to.name,
        email: to.email,
      },
    ],
    replyTo: {
      name: sendName,
      email: sendEmail,
    },
    subject: subject,
    htmlContent: bodyHtml,
    textContent: bodyText,
  };
};

export const adminLeaveAppHTML = (
  fullName: string,
  department: string,
  designation: string,
  startDate: string,
  endDate: string,
  days: number,
  reason: string,
  status: string,
  remarks: string
) => {
  return `
<div>
    <div>
      <h2>Your Leave Application for ${days} ${
    days <= 1 ? "Day" : "Days"
  } has been ${status}.</h2>
      <h3>Remarks: ${remarks}</div>
    </div>
    <hr />
    <div>
        <div><b>Name:</b></div>
        <div>${fullName}  [${designation} - ${department}]</div>
        <br />
    </div>
    <div>
        <div><b>Dates:</b></div>
        <div>${startDate} to ${endDate} [${days} ${
    days <= 1 ? "Day" : "Days"
  }]</div>
        <br />
    </div>
    <div>
        <div><b>Reason:</b></div>
        <div>${reason}</div>
        <br />
    </div>
</div>        
     `;
};

export const adminLeaveAppText = (
  fullName: string,
  department: string,
  designation: string,
  startDate: string,
  endDate: string,
  days: number,
  reason: string,
  status: string,
  remarks: string
) => {
  return `
        Your Leave Application for ${days} ${
    days <= 1 ? "Day" : "Days"
  } has been ${status}
        Remarks: ${remarks}
        Full Name: ${fullName}  [${designation} - ${department}], 
        Dates:${startDate} to ${endDate} [${days} ${days <= 1 ? "Day" : "Days"}]
        Reason: ${reason},
     `;
};
