import {NoteCard} from "../components/NoteCard";
import {EditTagModal} from "../components/EditTagModal";
import {Row,Col,Button,Stack,Form} from "react-bootstrap";
import {useNoteApp} from "../context/NoteAppContext";
import ReactSelect from "react-select";
import {Link} from "react-router-dom";
import {useState, useMemo} from "react";

export const NoteList = () => {
	const {noteWithTags,selectedTags, setSelectedTags,tags} = useNoteApp();
	const [title,setTitle] = useState("");
	const [show, setShow] = useState(false);
	const filteredNotes = useMemo(() => {
		return noteWithTags.filter(note => {
			return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
		})
	}, [noteWithTags,title,selectedTags])
	return <>

		<Row className="align-items-center mb-4">
			<Col><h1>Note</h1></Col>
			<Col xs="auto">
				<Stack direction="horizontal" gap={2}>
					<Button variant="primary" as={Link} to="/new">Create</Button>
					<Button variant="outline-secondary" onClick={()=>{setShow(true)}}>Edit Tags</Button>
</Stack>
			</Col>
		</Row>
		<Form>
			<Row className="mb-4">
				<Col>
					<Form.Group controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control required type="text" value={title}
						onChange={e => {
						setTitle(e.target.value)
						}}/>
						</Form.Group>
						</Col>
						<Col>
						<Form.Group controlId="tag">
						<Form.Label>Tag</Form.Label>
						<ReactSelect 
							options={tags.map(tag => {
								return {
								value: tag.id,
								label: tag.label
							}})
							}
							value={selectedTags.map(tag => {
						return({
						label: tag.label,
						value: tag.id
						})
						})} onChange={tags => {
						setSelectedTags(tags.map(tag => {
							return({
								label: tag.label,
								id: tag.value
							})
							}))
							}
							}
							isMulti 
							required  
							/>
							</Form.Group>
							</Col>
							</Row>
							</Form>
							<Row xs={1} sm={2} lg={3} xl={4}  className="gap-4">
							{filteredNotes.map(note => (
							<Col key={note.id}>
							<NoteCard id={note.id} title={note.title} tags={note.tags}/>
							</Col>
							))}
							</Row>
		<EditTagModal show={show} handleClose={() => {setShow(false)}}/>
							</>
}