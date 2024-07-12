import {Modal, Form, Button, Stack, Row, Col} from "react-bootstrap";
import {useNoteApp} from "../context/NoteAppContext";

type EditTagModalProps = {
	show: boolean;
	handleClose: ()=>void;
}

export const EditTagModal = ({show, handleClose}:EditTagModalProps) => {
	const {tags, deleteTags, updateTags} = useNoteApp();
	return <Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>Edit Tags</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Form>
				<Stack gap={2}>
					{tags.map(tag => {
					return (<Row key={tag.id}>
						<Col>
							<Form.Control type="input" value={tag.label} onChange={e => updateTags(tag.id, e.target.value)} />
						</Col>
						<Col xs="auto">
							<Button variant="outline-danger" onClick={() => deleteTags(tag.id)} >&times;</Button>
						</Col>
					</Row>)
					})}
				</Stack>
			</Form>
		</Modal.Body>
	</Modal>
}