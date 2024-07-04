import {	Tag} from "../context/NoteAppContext";
import {Link} from "react-router-dom";

import styles from "../style/NoteApp.module.css";
import {Badge, Card, Stack} from "react-bootstrap";
type NoteCardProps = {
	id: string;
	title: string;
	tags: Tag[];
}
export const NoteCard = ({id ,title,tags}:NoteCardProps) => {
	return <>
		<Card as={Link} to={`/${id}`} className={` h-100 text-reset text-decoration-none ${styles.card}`}>
			<Card.Body>
				<Stack gap={2} className="justify-content-center align-items-center h-100">
					<span className="fs-5">{title}</span>
					{tags.length > 0 && (<Stack gap={1}  direction="horizontal"className="justify-content-center text-wrap">{tags.map(tag => (
						<Badge key={tag.id} className="text-trucate">{tag.label}</Badge>
					))}</Stack>)}
				</Stack>
			</Card.Body>
		</Card>
	</>
}