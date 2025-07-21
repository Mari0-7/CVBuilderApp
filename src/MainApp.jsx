import React, { useRef, forwardRef, useState } from "react";
import { jsPDF } from "jspdf";
import Basic from "./components/Basic";
import Education from "./components/Education";
import Work from "./components/Work";
import Project from "./components/Projects";
import "./mainAppStyle.css"

const CVPopup = forwardRef(({ basic, educationList, workList, projectList, onClose, generatePDF }, ref) => (
    <div className="cv-popup-overlay" >
        <div className="cv-popup" ref={ref} style={{
            color: '#000000 !important',
            backgroundColor: '#ffffff !important',
            fontFamily: 'Helvetica, Arial, sans-serif !important'
        }}>
            <button className="close-btn noPrint" onClick={onClose}>X</button>

            <h1 style={{ textAlign: "center", marginBottom: "10px" }}>{basic.name}</h1>
            <h3 style={{ textAlign: "center" }}>{basic.jobTitle}</h3>
            <p><strong>Email:</strong> {basic.email}</p>
            <p><strong>Phone:</strong> {basic.phoneNumber}</p>


            <div className="cv-section" style={{ overflowWrap: 'break-word' }}>
                <strong >Summary:</strong>
                <p style={{ whiteSpace: 'pre-wrap' }}>{basic.summary}</p>
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
                                        return <li key={i} style={{ color: "black", marginLeft: "10px" }}>{trimmed}.</li>;
                                    })}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
            <div className="cv-section">
                <h2 style={{ textAlign: "center" }}>Projects</h2>
                {projectList.map((proj, idx) => (
                    <div key={idx}>
                        <p><strong>{proj.projectName}</strong></p>
                        {proj.features && (
                            <ul>
                                {proj.features
                                    .split('.')
                                    .map((sentence, i) => {
                                        const trimmed = sentence.trim();
                                        if (!trimmed) return null;
                                        return <li key={i} style={{ color: "black", marginLeft: "10px" }}>{trimmed}.</li>;
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
    const [projectList, setProjectList] = useState([{
        projectName: "",
        features: ""
    }])
    const popupRef = useRef();
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        doc.setFont("arial");
        doc.setTextColor(0, 0, 0);

        const margin = 40;
        let yPos = margin;
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - 2 * margin;

        const addText = (text, size = 12, isBold = false, x = margin) => {
            doc.setFontSize(size);
            doc.setFont(isBold ? "arial" : "arial", isBold ? "bold" : "normal");

            const lines = doc.splitTextToSize(text, maxWidth - x + margin);
            lines.forEach(line => {
                if (yPos > doc.internal.pageSize.getHeight() - 40) {
                    doc.addPage();
                    yPos = margin;
                }
                doc.text(line, x, yPos);
                yPos += size * 1.5;
            });
        };
        const addHorizontalLine = () => {
            if (yPos > doc.internal.pageSize.getHeight() - 40) {
                doc.addPage();
                yPos = margin;
            }

            doc.setLineWidth(0.5);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 15;
        };

        if (basic.name) {
            addText(basic.name, 24, true);
        }

        if (basic.jobTitle) {
            addText(basic.jobTitle, 18);
            yPos += 20;
        }

        if (basic.email) {
            addText(`Email: ${basic.email}`, 12);
        }

        if (basic.phoneNumber) {
            addText(`Phone: ${basic.phoneNumber}`, 12);
        }

        yPos += 20;
        if (basic.summary) {
            addText("Summary:", 14, true);
            addText(basic.summary, 12);
            yPos += 20;
            addHorizontalLine();
        }

        if (educationList.length > 0 && educationList[0].schoolName) {
            addText("Education", 16, true);
            yPos += 15;

            educationList.forEach(edu => {
                const studyText = `${edu.titleStudy} at ${edu.schoolName}`;
                const dateText = `${edu.startDateStudy} - ${edu.endDateStudy}`;

                if (studyText.trim() !== "at") addText(studyText, 14, true);
                if (dateText.trim() !== "-") addText(dateText, 12);
                yPos += 15;
            });
            addHorizontalLine();
        }

        if (workList.length > 0 && workList[0].companyName) {
            addText("Work Experience", 16, true);
            yPos += 15;

            workList.forEach(work => {
                const positionText = `${work.workTitle} at ${work.companyName}`;
                const dateText = `${work.dateStart} - ${work.currentlyEmployed ? "Present" : work.dateEnd}`;

                if (positionText.trim() !== "at") addText(positionText, 14, true);
                if (dateText.trim() !== "-") addText(dateText, 12);

                if (work.responsibilities) {
                    const responsibilities = work.responsibilities
                        .split('.')
                        .filter(sentence => sentence.trim());

                    responsibilities.forEach((resp, i) => {
                        addText(`• ${resp.trim()}`, 12, false, margin + 15);
                    });
                }

                yPos += 15;
            });
            addHorizontalLine();
        }
        if (projectList.length > 0 && projectList[0].projectName) {
            addText("Projects", 16, true);
            yPos += 15;

            projectList.forEach(proj => {
                const positionText = `${proj.projectName}`;
                if(positionText) addText(positionText, 14, true);

                if (proj.features) {
                    const features = proj.features
                        .split('.')
                        .filter(sentence => sentence.trim());

                    features.forEach((ft, i) => {
                        addText(`• ${ft.trim()}`, 12, false, margin + 15);
                    });
                }

                yPos += 15;
            });
        }

        doc.save(`${basic.name || 'cv'}.pdf`);
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
    const handleProjectChange = (index, newData) => {
        const updatedList = [...projectList];
        updatedList[index] = newData;
        setProjectList(updatedList);
    };
    const addProject = () => {
        setProjectList([
            ...projectList,
            {
                projectName: "",
                features: "",
            },
        ]);
    };

    const removeProject = () => {
        if (projectList.length > 1) {
            setWorkList(projectList.slice(0, -1));
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
                        <h4>Projects</h4>
                        {projectList.map((proj, index) => (
                            <Project
                                key={index}
                                index={index}
                                data={proj}
                                onChange={handleProjectChange}
                            />
                        ))}

                        <button className="btns" id="addWorkBtn" onClick={addWork}>Add project</button>
                        <button className="btns" onClick={removeWork}>Remove project</button>
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
                        projectList = {projectList}
                        onClose={togglePopup}
                        generatePDF={generatePDF}
                    />
                )}

            </div>
        </div>
    );
}
export default MainApp;