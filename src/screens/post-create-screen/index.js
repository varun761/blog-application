import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import DashboardLayout from "../../layouts/dashboard-layout";
import './index.scss'

const initialState = EditorState.createEmpty();

const PostCreateScreen = () => {
  const [editorState, setEditorState] = useState(initialState);
  return (
    <DashboardLayout>
      <Row className="mb-3">
        <Col>
          <h3>Create New Post</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Editor
                editorClassName="post-content-editor"
                editorState={editorState}
                onEditorStateChange={(value) => setEditorState(value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={3} className="py-2">
            <Row className="mb-3">
                <h5>Privacy Settings</h5>
            </Row>
            <Row className="mb-3">
                <Form.Group>
                    <Form.Check type="radio" label="Public"/>
                    <Form.Check type="radio" label="Private"/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <h5>Cover Image</h5>
            </Row>
            <Row className="mb-3">
                <Form.Group>
                    <Form.Control type="file" size="sm"/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                    <Button className="w-100">Save Changes</Button>
                </Form.Group>
            </Row>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default PostCreateScreen;
