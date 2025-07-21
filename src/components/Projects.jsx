import React, { useRef, forwardRef, useState } from "react";
import { jsPDF } from "jspdf";
import "../mainAppStyle.css"
function Project({ index, data, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(index, { ...data, [name]: value });
    };
    return (
        <>
            <div>
                <label htmlFor="projectName">Project Name</label>
                <input type="text" id="projectName" name="projectName" placeholder="Enter your name..." value={data.projectName} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="features">Features</label>
                <textarea name="features" id="features" value={data.features} onChange={handleChange}></textarea>
            </div>
        </>
    );
}
export default Project;