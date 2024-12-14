import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postPledge } from "../api/post-pledge";
import "./CreatePledge.css";

function CreatePledge() {
    const navigate = useNavigate();  
    const { projectId } = useParams();
    const [formData, setFormData] = useState({
        amount: "",
        comment: "",
        isAnonymous: false,
        reward: false,
        projectId: "",
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await postPledge(formData.amount,formData.comment, formData.isAnonymous, formData.reward, projectId)
            .then(res => {console.log({res})})
            .catch(e => {console.log({e})})

        navigate (`/project/${projectId}`);
    };

return (
    <form className="create-pledge-form" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="amount">Amount:</label>
            <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="comment">Comment:</label>
            <textarea
                id="comment"
                placeholder="Add a comment (optional)"
                value={formData.comment}
                onChange={handleChange}
            ></textarea>
        </div>
        <div>
            <label>
                <input
                    type="checkbox"
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleChange}
                />
                Make this pledge anonymous
            </label>
        </div>
        <div>
            <label>
                <input
                    type="checkbox"
                    id="reward"
                    checked={formData.reward}
                    onChange={handleChange}
                />
                Accept reward
            </label>
        </div>

        <button type="submit">Submit Pledge</button>
    </form>
);
}

export default CreatePledge;