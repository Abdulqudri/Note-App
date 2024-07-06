import {NewNote} from "./components/NewNote";
import {NoteList} from "./components/NoteList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom";
import {NoteAppProvider} from "./context/NoteAppContext";
import {NoteLayout} from "./components/NoteLayout";
import {Note} from "./components/Note";



export default function App() {

  return (
    <NoteAppProvider>
    <Container className="my-4">
    	<Routes> 
      	<Route path="/" element={<NoteList/>} />
      	<Route path="/new" element={<NewNote />} />
      	<Route path= "/:id" element={<NoteLayout />} >
        	<Route index element={<Note />} />
        	<Route path="edit" element={ <h1>Edit</h1> } />
      	</Route>
      	<Route path="*" element={<Navigate to="/" />} />
    	</Routes>
    </Container>
    </NoteAppProvider>
  )
}