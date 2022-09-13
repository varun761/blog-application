import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap"
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import DashboardLayout from "../../layouts/dashboard-layout"

const initialState = EditorState.createEmpty()

const PostCreateScreen = () => {
    const [editorState, setEditorState] = useState(initialState)
    return (
        <DashboardLayout>
            <Row>
                <Col>
                    <h3>Create New Post</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Editor editorState={editorState} onEditorStateChange={(value) => setEditorState(value)}/>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </DashboardLayout>
    )
}

export default PostCreateScreen