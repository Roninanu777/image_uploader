import React, { useState } from "react";
import axios from "axios";

function InputForm() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState(null);
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("image", file);
        formData.append("name", name);
        formData.append("desc", desc);
        axios
            .post("http://localhost:5000/single", formData)
            .then((res) => console.log(res));
    };

    const fileChange = (e) => {
        setUrl(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    return (
        <form type="submit" onSubmit={handleSubmit}>
            <label>
                Image name:
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="image-name"
                    placeholder="Enter image name..."
                />
            </label>
            <br></br>
            <label>
                Image description:
                <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    name="image-description"
                    placeholder="Description"
                />
            </label>
            <br></br>
            <label>
                Image: <input type="file" onChange={fileChange} name="image" />
            </label>
            <br></br>
            <p>Preview Image:</p>
            <img height="200" width="300" src={url} alt="preview" />
            <br></br>
            <button type="submit">Upload</button>
        </form>
    );
}

export default InputForm;
