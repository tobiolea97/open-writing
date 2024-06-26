import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, { useEffect, useState } from 'react';
import { storeMessage, setStatus } from "../../data/api/OpenAiReducer";
import { saveWriting } from "../../data/api/DataReducer";
import { review } from "../../data/api/OpenAiReducer";


export const TextAreaComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [paragraphCount, setParagraphCount] = useState(0);
    const [error, setError] = useState("");

    const currentAssignment = useSelector((state) => state.data.currentAssignment);

    const goBack = () => {
        navigate("/home");
    }
    
    useEffect(() => {
        setError("");
    }, []);

    const handleClick = async (event) => {
        event.preventDefault();
        if(inputValue === "" || inputValue === undefined || wordCount < 4 || paragraphCount < 1)
        {
            setError("Write a at least 100 words and 3 paragraphs.");
            return;
        }
        dispatch(storeMessage(inputValue.split(/\n\n/)));
        await dispatch(review({
            "inputValue": inputValue,
            "assignmentId": currentAssignment.id
        }));
        
        navigate("/review?assignment=" + currentAssignment.id);
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        setWordCount(inputValue.split(/\s+/).filter((word) => word !== "").length);
    }, [inputValue]);

    useEffect(() => {
        setParagraphCount(inputValue.split(/\n\n/).filter((word) => word !== "").length);
    }, [inputValue]);

    return (
        <>
            <div className="text-area-wrapper">
                <textarea
                    className="text-area-input"
                    placeholder="Write your essay.."
                    onChange={handleChange}
                    value={inputValue}></textarea>
            </div>
            <div className="control-panel-wrapper">
                <span>{error}</span>
                <em>{wordCount} words / {paragraphCount} paragraphs</em>
                <a onClick={goBack}>Go back</a>
                <button className="bg-black-1 color-white-1" onClick={handleClick}>Submit</button>
            </div>
        </>
    )
}

export default TextAreaComponent;