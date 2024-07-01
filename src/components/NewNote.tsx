import {NoteForm} from "./NoteForm";
import {NoteData, Tag} from "../App";
type NewNoteProps = {
	onSubmit: (note: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
}
export const NewNote = ({onSubmit, onAddTag, availableTags}:NewNoteProps) => {
	return (<>
		<h1 className="mb-4"> New Note</h1>
		<NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}  />
	</>)
}