import React, { useRef, forwardRef, useState } from "react";
import { jsPDF } from "jspdf";
import Basic from "./components/Basic";
import Education from "./components/Education";
import Work from "./components/Work";
import "./mainAppStyle.css"

const CVPopup = forwardRef(({ basic, educationList, workList, onClose, generatePDF }, ref) => (
    <div className="cv-popup-overlay">
        <div className="cv-popup" ref={ref}>
            <button className="close-btn noPrint" onClick={onClose}>X</button>

            <h1 style={{ textAlign: "center", marginBottom: "10px" }}>{basic.name}</h1>
            <h3 style={{ textAlign: "center" }}>{basic.jobTitle}</h3>
            <p><strong>Email:</strong> {basic.email}</p>
            <p><strong>Phone:</strong> {basic.phoneNumber}</p>


            <div className="cv-section">
                <strong >Summary:</strong>
                <p>{basic.summary}</p>
            </div>


            <div className="cv-section">
                <h2 style={{ textAlign: "center" }}>Education</h2>
                {educationList.map((edu, idx) => (
                    <div key={idx}>
                        <p><strong>{edu.titleStudy}</strong>{" "} at {" "}{edu.schoolName}</p>
                        <p>{edu.startDateStudy} - {edu.endDateStudy}</p>
                    </div>
                ))}
            </div>


            <div className="cv-section">
                <h2 style={{ textAlign: "center" }}>Work Experience</h2>
                {workList.map((work, idx) => (
                    <div key={idx}>
                        <p><strong>{work.workTitle}</strong>{" "} at {" "} {work.companyName}</p>
                        <p>{work.dateStart} - {work.currentlyEmployed ? "Present" : work.dateEnd}</p>
                        {work.responsibilities && (
                            <ul>
                                {work.responsibilities
                                    .split('.')
                                    .map((sentence, i) => {
                                        const trimmed = sentence.trim();
                                        if (!trimmed) return null;
                                        return <li key={i} style={{color:"black", marginLeft:"10px"}}>{trimmed}.</li>;
                                    })}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            <button className="noPrint btns" onClick={generatePDF}>Download as a PDF</button>
        </div>
        
        <div className="cv-popup-close noPrint" onClick={onClose}></div>
    </div>
));

function MainApp() {
    const [basic, setBasic] = useState({
        name: "",
        email: "",
        jobTitle: "",
        phoneNumber: "",
        summary: "",
    });
    const [educationList, setEducationList] = useState([
        {
            schoolName: "",
            titleStudy: "",
            startDateStudy: "",
            endDateStudy: ""
        }
    ]
    )
    const [workList, setWorkList] = useState([{
        companyName: "",
        workTitle: "",
        dateStart: "",
        dateEnd: "",
        responsibilities: "",
        currentlyEmployed: false
    }])
    const popupRef = useRef();
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const popupElement = popupRef.current;

        const buttonsToHide = popupElement.querySelectorAll('.noPrint');
        buttonsToHide.forEach(btn => btn.style.display = 'none');

        doc.html(popupElement, {
            callback: function (doc) {
                doc.save(`${basic.name || 'cv'}.pdf`);

                buttonsToHide.forEach(btn => btn.style.display = '');
            },
            margin: [20, 20, 20, 20],
            autoPaging: 'text',
            html2canvas: {
                scale: 0.7,
                useCORS: true,
                windowWidth: 1000,
            }
        });
    };

    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => setShowPopup(!showPopup);
    const handleEducationChange = (index, newData) => {
        const updatedList = [...educationList];
        updatedList[index] = newData;
        setEducationList(updatedList);
    };

    const addEducation = () => {
        setEducationList([
            ...educationList,
            { schoolName: "", title: "", startDateStudy: "", endDateStudy: "" },
        ]);
    };

    const removeEducation = () => {
        if (educationList.length > 1) {
            setEducationList(educationList.slice(0, -1));
        }
    };
    const handleWorkChange = (index, newData) => {
        const updatedList = [...workList];
        updatedList[index] = newData;
        setWorkList(updatedList);
    };
    const addWork = () => {
        setWorkList([
            ...workList,
            {
                companyName: "",
                workTitle: "",
                dateStart: "",
                dateEnd: "",
                reponsiblitites: "",
                currentlyEmployed: false
            },
        ]);
    };

    const removeWork = () => {
        if (workList.length > 1) {
            setWorkList(workList.slice(0, -1));
        }
    };
    return (
        <div id="heroSignup">
            <nav> CV builder</nav>
            <div id="rightSide">
                <div id="rightText">
                    <h2>Enter your info</h2>
                </div>
                <div id="form">
                    <div id="actualContent">
                        <Basic basic={basic} setBasic={setBasic} />
                        <h4>Education</h4>
                        {educationList.map((edu, index) => (
                            <Education
                                key={index}
                                index={index}
                                data={edu}
                                onChange={handleEducationChange}
                            />
                        ))}

                        <button className="btns" id="addEduBtn" onClick={addEducation}>Add Education</button>
                        <button className="btns" onClick={removeEducation}>Remove Education</button>
                        <h4>Work Experience</h4>
                        {workList.map((work, index) => (
                            <Work
                                key={index}
                                index={index}
                                data={work}
                                onChange={handleWorkChange}
                            />
                        ))}

                        <button className="btns" id="addWorkBtn" onClick={addWork}>Add Work Experience</button>
                        <button className="btns" onClick={removeWork}>Remove Work Experience</button>
                    </div>
                    <div id="finishForm">
                        <button onClick={() => { togglePopup(); }}>Create CV</button>
                    </div>
                </div>
                {showPopup && (
                    <CVPopup
                        ref={popupRef}
                        basic={basic}
                        educationList={educationList}
                        workList={workList}
                        onClose={togglePopup}
                        generatePDF={generatePDF}
                    />
                )}

            </div>
        </div>
    );
}
export default MainApp;