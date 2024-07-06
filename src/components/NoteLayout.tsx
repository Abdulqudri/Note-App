
import {useNoteApp} from "../context/NoteAppContext";
import {useParams, Navigate,Outlet } from "react-router-dom";

export const NoteLayout = ( ) => {
	const {noteWithTags} = useNoteApp();
	const {id} = useParams();
	const note = noteWithTags.find(note => note.id === id);
	if (note == null) return <Navigate to="/" replace />
	
	return <Outlet context={note} />
}