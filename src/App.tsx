import {Home} from "./components/Home";
import {NewNote} from "./components/NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import {useLocalStorage}from "./hooks/useLocalStorage";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom";
import {useMemo} from "react";
import {v4 as uuidv4} from "uuid";


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

export default function App() {

  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [notes, setNotes] = useLocalStorage<RawNoteData[]>("NOTES", []);
  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  },[notes,tags])
  const onCreateNote = ({tags, ...data}: NoteData) => {
    setNotes(prevNote => {
      return [...prevNote, {
        id: uuidv4(),
        ...data,
        tagIds: tags.map(tag => tag.id)
      }]
    })
  }
  const addTag = (tag: Tag) => {
  	setTags(prev => [...prev, tag])
  }
  return (
    <Container className="my-4">
    	<Routes> 
      	<Route path="/" element={<Home />} />
      	<Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
      	<Route path= "/:id" >
        	<Route index element={<h1>Show</h1>} />
        	<Route path="edit" element={ <h1>Edit</h1> } />
      	</Route>
      	<Route path="*" element={<Navigate to="/" />} />
    	</Routes>
    </Container>
  )
}