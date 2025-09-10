"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State for a single note
  const [note, setNote] = useState<string>("");

  // State for all notes
  const [notes, setNotes] = useState<string[]>([]);

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

  // Add a new note
  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  // Delete a note
  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
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
          onClick={addNote}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {notes.map((n, i) => (
          <li
            key={i}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{n}</span>
            <button
              onClick={() => deleteNote(i)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
