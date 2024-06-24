import {Button, Form, Stack, Row,Col } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
export const NoteForm = () => {
	return <>
		<Form>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control required placeholder="Enter title" />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tag">
							<Form.Label>Tag</Form.Label>
							<CreatableReactSelect isMulti required  />
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control as="textarea" required rows="15"/>
				</Form.Group>
				<Stack gap={2} direction="horizontal" className="justify-content-end"  >
					<Button variant="primary" type="submit">Save</Button>
					<Button variant="outline-secondary" type="button">Cancel</Button>
				</Stack>
			</Stack>
		</Form>
	</>
}