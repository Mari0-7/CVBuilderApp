import React, { useRef, forwardRef, useState } from "react";
import { jsPDF } from "jspdf";
import "../mainAppStyle.css"
function Work({ index, data, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(index, { ...data, [name]: value });
    };
    const handleCheckBox = (e) => {
        const { name, type, checked, value } = e.target;
        onChange(index, {
            ...data,
            [name]: type === "checkbox" ? checked : value
        }
        );
    }

    return (
        <>
            <div>
                <label htmlFor="companyName">Company name</label>
                <input type="text" id="companyName" name="companyName" placeholder="Enter your Company's name" value={data.companyName} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="workTitle">Job title</label>
                <input type="text" id="workTitle" name="workTitle" placeholder="Enter your role" value={data.workTitle} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="responsibilities">Responsiblities</label>
                <textarea name="responsibilities" id="responsibilities" value={data.responsibilities} onChange={handleChange}></textarea>
            </div>
            <div>
                <label htmlFor="dateStart">Start date</label>
                <input type="date" id="dateStart" name="dateStart"  value={data.dateStart} onChange={handleChange} />
                <label htmlFor="dateEnd">End date</label>
                <input type="date" id="dateEnd" name="dateEnd" value={data.dateEnd} onChange={handleChange} disabled={data.currentlyEmployed} />
                <div id="currentlyWork">
                    <input type="checkbox" id="currentlyEmployed" name="currentlyEmployed" checked={data.currentlyEmployed} onChange={handleCheckBox} />
                    <label htmlFor="currentlyEmployed">I currently work there</label>
                </div>
            </div>
        </>
    );
}
export default Work;