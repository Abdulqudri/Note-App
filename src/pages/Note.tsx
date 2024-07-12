import {useNote,useNoteApp} from "../context/NoteAppContext";
import {Col , Row, Stack, Button, Badge} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import ReactMarkdown from "react-markdown";


export const Note = () => {
	const note = useNote();
	const {onDelete} = useNoteApp();
	const navigate = useNavigate();
	return <>
		<Row className="align-items-center mb-4 justify-content-between" >
			<Col xs="auto">
				<h1>{note.title}</h1>
				{note.tags.length > 0 && (
				<Stack gap={1}  direction="horizontal"className="text-wrap">{note.tags.map(tag => (
					<Badge key={tag.id} className="text-trucate">{tag.label}</Badge>
				))}</Stack>
				)  }
			</Col>
			<Col xs="auto">
				<Stack direction="horizontal" gap={1}>
					<Button variant="primary" as={Link} to={`/${note.id}/edit`}>Edit</Button>
					<Button variant="outline-danger" onClick={()=>{
					onDelete(note.id)
					navigate("/")
					}} >Delete</Button>
					<Button  as={Link} to={"/"} variant="outline-secondary">Back</Button>
				</Stack>
			</Col>
		</Row>
		<ReactMarkdown>{note.markdown}</ReactMarkdown>
	</>
}