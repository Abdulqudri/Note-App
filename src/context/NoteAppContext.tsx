import {createContext,ReactNode,useState,useContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";


type NoteAppContext = {
	notes: RawNote[],
	tags: Tag[],
	selectedTags: Tag[]
}
type NoteAppProviderProps ={
	children: ReactNode
}
type NoteFormProps = {
	onSubmit: (note: NoteData) => void;
}

export type Note = {
	id: string;
} & NoteData
export type RawNote = {
	id: string;
}
export type RawNoteData = {
	title: string;
	markdown: string;
	tagIds: string[];
}
export type NoteData = {
	title: string;
	markdown: string;
	tags: Tag[];
}
export type Tag = {
	id: string;
	label: string;
}
const NoteAppContext = createContext({} as NoteAppContext);
export const useNoteContext = () => {
	return useContext(NoteAppContext)
}

export const NoteAppProvider = ({children}: NoteAppProviderProps) => {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTE", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAG", []);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	return (
		<NoteAppContext.Provider value={{notes,tags,selectedTags}} >
			{children}
		</NoteAppContext.Provider>
	)
}