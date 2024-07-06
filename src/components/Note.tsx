import {useNote} from "../context/NoteAppContext";
import {Col , Row, Stack, Button, Badge} from "react-bootstrap";
import {Link} from "react-router-dom";


export const Note = () => {
	const note = useNote();
	return <>
		<Row>
			<Col>
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
					<Button variant="outline-danger">Delete</Button>
					<Button  as={Link} to={"/"} variant="outline-secondary">Back</Button>
				</Stack>
			</Col>
		</Row>
	</>
}