import {Button, Form, Stack, Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useRef, useState} from "react";
import CreatableReactSelect from "react-select/creatable";
import {useNoteContext} from "../context/NoteAppContext";



export const NoteForm = ( ) => {
	const { selectedTags } = useNoteContext();
	const titleRef =  useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const handleSubmit = (e: React.FormEvent  ) => {
		e.preventDefault();
		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: []
		})
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
							<CreatableReactSelect value={selectedTags.map(tag => {
							return {
							label: tag.label,
							value: tag.id
							}
							}) } onChange={tags => {
		setSelectedTags(tags.map(tag => {
			return {
			label: tag.label,
			id: tag.value
			}
		}))
							}} isMulti required  />
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control as="textarea" required rows="15" ref={markdownRef}/>
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