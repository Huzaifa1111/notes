"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Notes App</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write a note..."
            className="flex-1 border p-2 rounded-lg"
          />
          <button
            onClick={addNote}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {notes.map((n, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
            >
              <span>{n}</span>
              <button
                onClick={() => deleteNote(i)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
