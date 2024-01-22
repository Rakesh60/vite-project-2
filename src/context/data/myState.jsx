import React, { useState } from "react";
import MyContext from "./myContext";
import toast from "react-hot-toast";

function myState(props) {

  
  //loading... state
  const [loading, setLoding] = useState(false);

  //get Notes
  const [allNotes, setAllNotes] = useState([]);

  //Get All Notes function
  const getAllNotes = async () => {
    setLoding(true);
    try {
      const res = await fetch("http://localhost:4000/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const notesData = await res.json();
      console.log(notesData);
      setAllNotes(notesData);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(false);
    }
  };
  //* Add Note state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  //Add notes Function
  const addNote = async () => {
    const res = await fetch("http://localhost:4000/api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //*Response
    const noteData = await res.json();
    console.log(noteData);
    getAllNotes();
    //* condition
    if (noteData.error) {
      toast.error(noteData.error);
      // console.log(noteData.error)
    } else {
      toast.success(noteData.success);
      // console.log(noteData.success)
    }
    //* after submit data all fields empty
    setTitle("");
    setDescription("");
    setTag("");
    
  };


  //*Delete Note
  const deleteNote=async (id)=>{
    const res=await fetch(`http://localhost:4000/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'content-type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    })
    //Response
    const noteData=await res.json();
    getAllNotes();
    console.log(noteData)
    toast.success(noteData.success)
  }

  //*

  return (
    <MyContext.Provider
      value={{
        allNotes,
        getAllNotes,
        loading,
        title,
        setTitle,
        description,
        setDescription,
        tag,
        setTag,
        addNote,
        deleteNote,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
