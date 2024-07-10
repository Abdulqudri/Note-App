import {NewNote} from "./pages/NewNote";
import {EditNote} from "./pages/EditNote";
import {NoteList} from "./pages/NoteList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom";
import {NoteAppProvider} from "./context/NoteAppContext";
import {NoteLayout} from"./pages/NoteLayout";
import {Note} from "./pages/Note";



export default function App() {

  return (
    <NoteAppProvider>
    <Container className="my-4">
    	<Routes> 
      	<Route path="/" element={<NoteList/>} />
      	<Route path="/new" element={<NewNote />} />
      	<Route path= "/:id" element={<NoteLayout />} >
        	<Route index element={<Note />} />
        	<Route path="edit" element={ <EditNote /> } />
      	</Route>
      	<Route path="*" element={<Navigate to="/" />} />
    	</Routes>
    </Container>
    </NoteAppProvider>
  )
}