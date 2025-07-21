import React, { useRef, forwardRef, useState } from "react";
import { jsPDF } from "jspdf";
import "../mainAppStyle.css"
function Education({ index, data, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(index, { ...data, [name]: value });
    };
    return (
        <>
            <div>
                <label htmlFor="name">University name</label>
                <input type="text" id="schoolName" name="schoolName" placeholder="Enter your university's name" value={data.schoolName} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="titleStudy">Field of Study</label>
                <input type="text" id="titleStudy" name="titleStudy" placeholder="Field of study" value={data.title} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="startDateStudy">Start Date</label>
                <input type="date" id="startDateStudy" name="startDateStudy" value={data.startDateStudy} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="endDateStudy">End Date</label>
                <input type="date" id="endDateStudy" name="endDateStudy"  value={data.endDateStudy} onChange={handleChange} />
            </div>
        </>
    );
}
export default Education;