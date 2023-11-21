import { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    return savedNotes ? savedNotes : [];
  });

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState("false");

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    console.log("Saved notes to local storage");
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
