import {Home} from "./components/Home";
import {NoteAppProvider}from "./context/NoteAppContext";
import {NewNote} from "./components/NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom";


export default function App() {

  return (
    <Container className="my-4">
      <NoteAppProvider>
    	<Routes> 
      	<Route path="/" element={<Home />} />
      	<Route path="/new" element={<NewNote />} />
      	<Route path= "/:id" >
        	<Route index element={<h1>Show</h1>} />
        	<Route path="edit" element={ <h1>Edit</h1> } />
      	</Route>
      	<Route path="*" element={<Navigate to="/" />} />
    	</Routes>
      </NoteAppProvider>
    </Container>
  )
}