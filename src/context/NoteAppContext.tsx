import {createContext, useContext, useState,useMemo} from "react";
import {v4 as uuidv4} from "uuid";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useOutletContext} from "react-router-dom";

type NoteAppProviderProps = {
	children: React.ReactNode;
}
type NoteAppContext = {
	onSubmit: (note: NoteData) => void;
	onUpdateNote: (id: string, note: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	tags: Tag[];
	selectedTags: Tag[];
	setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
	notes: RawNote[];
	noteWithTags: Note[];
}
export type RawNote = {
	id: string;
} & RawNoteData;
export type RawNoteData = {
	title: string,
	markdown: string,
	tagIds: string[]
}
export type Note = {
	id: string;
} & NoteData
export type NoteData = {
	title: string,
	markdown: string,
	tags: Tag[]
}
export type Tag = {
	id: string,
	label: string
}


const noteAppContext = createContext({} as NoteAppContext)
export const useNoteApp = () => {
	
	return useContext(noteAppContext)
}
export const useNote = () => {
	return useOutletContext<Note>()
}

export const NoteAppProvider = ({children}:NoteAppProviderProps) =>{

	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const noteWithTags = useMemo(() => {
		return notes.map(note => {
			return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
		})
	},[notes,tags])
	const onSubmit = ({tags, ...data}: NoteData) => {
		setNotes(prevNote => {
			return [...prevNote, {
				id: uuidv4(),
				...data,
				tagIds: tags.map(tag => tag.id)
			}]
		})
	}
	const onUpdateNote= (id: string,{tags, ...data}: NoteData) => {
		setNotes(prevNote => {
			return prevNote.map(note => {
				if (note.id === id) {
					return {
						...note,
						...data,
						tagIds: tags.map(tag => tag.id)
					}
				}else{
					return note
				}
			})
		})
	}
	const onAddTag = (tag: Tag) => {
		setTags(prev => [...prev, tag])
	}
	
	return(
		<noteAppContext.Provider value={{noteWithTags,notes,selectedTags, setSelectedTags, onSubmit, onUpdateNote,onAddTag, tags}}>
			{children}
		</noteAppContext.Provider>
	)
}