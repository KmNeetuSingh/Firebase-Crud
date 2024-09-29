import { useEffect, useRef, useState } from "react"; 
import axios from "axios";
import "../styles/useref.css";

export const UseReference = () => {
    let URL = "https://ferc-mock-b70f4-default-rtdb.asia-southeast1.firebasedatabase.app/";

    let todo = useRef("");
    let creator = useRef(""); 
    let completion = useRef(""); 

    let [data, setData] = useState({}); 
    let [flag, setFlag] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        let obj = {
            todo: todo.current.value,
            creator: creator.current.value, 
            completion: completion.current.checked, 
        };

        axios.post(`${URL}.json`, obj).then(() => {
            todo.current.value = "";
            creator.current.value = ""; 
            completion.current.checked = false; 
            alert("✅ Bet! Data saved in the cloud. Remember: 'I'm just vibing, not thriving!' 😂");
            creator.current.focus(); 
            setFlag(!flag);
        });
    }

    function handleDelete(id) {
        axios.delete(`${URL}/${id}.json`).then(() => {
            alert("❌ Deleted! 'It’s giving ‘no more drama in my life’' 😂");
            setFlag(!flag);
        });
    }

    function handleUpdate(id) {
        let todoUpdate = prompt("✏️ What's the new vibe for this todo?");
        let creatorUpdate = prompt("👤 New creator's username:"); 

        let obj = {
            todo: todoUpdate,
            creator: creatorUpdate,
        };

        axios.patch(`${URL}/${id}.json`, obj).then(() => {
            alert("✅ Updated! 'Just like your  mood—constantly changing!' 😂");
            setFlag(!flag);
        });
    }

    useEffect(() => {
        creator.current.focus(); 

        axios.get(`${URL}.json`).then((res) => {
            setData(res.data);
        });
    }, [flag]);

    return (
        <>
            <h1>Using useRef... 📋</h1>

            <form onSubmit={handleSubmit}>
                <input ref={todo} placeholder="📝 What's the todo?" />
                <input ref={creator} placeholder="👤 Who's vibing with this?" /> 
                <label>Edit Access</label>
                <input ref={completion} type="checkbox" /> 
                <input type="submit" value="✅ Submit" />
            </form>

            <div>
                {Object.entries(data).map(([id, value], i) => {
                    return (
                        <div key={i} className="todo-container">
                            <p>
                                <b>Todo: </b>{value.todo}
                            </p>
                            <p>
                                <b>Creator: </b> {value.creator}
                            </p>
                            {value.completion ? ( 
                                <div>
                                    <button onClick={() => handleUpdate(id)}>✏️ Update</button>
                                    <button onClick={() => handleDelete(id)}>❌ Delete</button>
                                </div>
                            ) : (
                                <h3>📖 Read only</h3>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
