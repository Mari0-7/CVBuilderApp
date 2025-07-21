import React, { useRef, forwardRef, useState } from "react";
import { jsPDF } from "jspdf";
import "../mainAppStyle.css"
function Basic({ basic, setBasic }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBasic((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    //const[basic, setBasic] = useState({ name: "", email: "", number: "", summary: ""})

    return (
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name..." value={basic.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="jobTitle">Title</label>
                <input type="text" id="jobTitle" name="jobTitle" placeholder="Enter your name..." value={basic.jobTitle} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id="email" placeholder="yourEmail@company.com" value={basic.email} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" name="phoneNumber" id="phoneNumber" placeholder="0123456789" value={basic.phoneNumber} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="summary">Summary</label>
                <textarea name="summary" id="summary" value={basic.summary} onChange={handleChange}></textarea>
            </div>
        </>
    );
}
export default Basic;