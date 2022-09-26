import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Image, Modal } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import DashboardLayout from "../../../layouts/dashboard-layout";
import './index.scss'

const initialState = EditorState.createEmpty();

const PostCreateScreen = () => {
  const [editorState, setEditorState] = useState(initialState);
  const [coverImage, setCoverImage] = useState(null)
  const [displayImage, setDisplayImage] = useState(null)
  const [viewImageModel, setViewImageModel] = useState(false)
  const imageUploadHandler = ({
    target
  }) => {
    const { files } = target
    if (!files) {
      setCoverImage(null)
      setDisplayImage(null)
      return true
    }
    setCoverImage(files[0])
  }
  const imageBufferReader = (imageBuffer) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('loadend', (e) => {
      setDisplayImage(e.target.result)
    })
    fileReader.readAsDataURL(imageBuffer)
  }
  useEffect(() => {
    if (coverImage) {
      imageBufferReader(coverImage)
    }
  }, [coverImage])
  const handleCloseModal = () => {
    setViewImageModel(false)
  }
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
            <Row>
              <Col>
                <div className="photo-frame" style={{ height: displayImage ? 'auto' : '200px' }}>
                  {displayImage && <div role="presentation" onClick={() => setViewImageModel(true)}><Image src={displayImage} fluid/></div>}
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
                <Form.Group>
                    <Form.Control type="file" size="sm" onChange={imageUploadHandler}/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                    <Button className="w-100 mb-3">Save and Publish</Button>
                    <Button className="w-100">Save As Drafts</Button>
                </Form.Group>
            </Row>
        </Col>
      </Row>
      <Modal show={viewImageModel} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cover Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '350px', overflow: 'hidden'}}>
            <Image src={displayImage} fluid/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
};

export default PostCreateScreen;
