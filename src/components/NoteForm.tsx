import {Button, Form, Stack, Row,Col } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import {useRef} from "react";
import CreatableReactSelect from "react-select/creatable";
import {v4 as uuidv4} from "uuid";
import {useNoteApp} from "../context/NoteAppContext";

 

export const NoteForm = () => {
	const {selectedTags, setSelectedTags,onSubmit,onAddTag,tags} = useNoteApp();
	const navigate = useNavigate();
	const titleRef =  useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const handleSubmit = (e: React.FormEvent  ) => {
		e.preventDefault();
		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags
		})
		navigate("..")
	}
	
	return <>
		<Form onSubmit={handleSubmit} >
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control ref={titleRef} required />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tag">
							<Form.Label>Tag</Form.Label>
							<CreatableReactSelect 
								onCreateOption={
									label => {
										const newTag ={id: uuidv4(), label}
										onAddTag(newTag)
										setSelectedTags(prev => [...prev, newTag])
									}
								}
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
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control as="textarea" required rows={15} ref={markdownRef}/>
				</Form.Group>
				<Stack gap={2} direction="horizontal" className="justify-content-end"  >
					<Button variant="primary" type="submit">Save</Button>
				<Link to="..">

        	<Button variant="outline-secondary" type="button">Cancel</Button>
				</Link>
				</Stack>
			</Stack>
		</Form>
	</>
}