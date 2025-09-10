"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [note, setNote] = useState<string>(""); // input text
  const [notes, setNotes] = useState<string[]>([]); // all notes
  const [editIndex, setEditIndex] = useState<number | null>(null); // track which note to update

  // Load saved notes from localStorage
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

  // Add or Update note
  const saveNote = () => {
    if (note.trim() === "") return;

    if (editIndex !== null) {
      // update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      // add new note
      setNotes([...notes, note]);
    }

    setNote("");
  };

  // Delete note
  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Start editing a note
  const editNote = (index: number) => {
    setNote(notes[index]);
    setEditIndex(index);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Notes App</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={saveNote}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {notes.map((n, i) => (
          <li
            key={i}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{n}</span>
            <div className="flex gap-2">
              <button
                onClick={() => editNote(i)}
                className="text-green-600 hover:text-green-800"
              >
                ✏️
              </button>
              <button
                onClick={() => deleteNote(i)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
