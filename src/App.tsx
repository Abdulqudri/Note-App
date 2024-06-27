import {Home} from "./components/Home";
import {NewNote} from "./components/NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom";
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

  return (
    <Container className="my-4">
    	<Routes> 
      	<Route path="/" element={<Home />} />
      	<Route path="/new" element={<NewNote />} />
      	<Route path= "/:id" >
        	<Route index element={<h1>Show</h1>} />
        	<Route path="edit" element={ <h1>Edit</h1> } />
      	</Route>
      	<Route path="*" element={<Navigate to="/" />} />
    	</Routes>
    </Container>
  )
}