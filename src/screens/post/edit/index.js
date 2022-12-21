import { useEffect, useState, useContext, useMemo } from "react";
import { Row, Col, Form, Button, Image, Modal, CloseButton } from "react-bootstrap";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import DashboardLayout from "../../../layouts/dashboard-layout";
import './index.scss'
import ErrorMessage from "../../../components/error-message";
import AppContext from "../../../context/app-context";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../../services/api-service";

const initialState = EditorState.createEmpty();

const schema = yup.object({
  title: yup.string().nullable().required('Title is required.'),
  description: yup.string().nullable().required('Description is required'),
  visibility: yup.string().nullable().required('Please select an option'),
  cover_image: yup.string().nullable()
});

// hanlders
const SavingIndividualPost = (navigate) => {
  const appContext = useContext(AppContext);
  const params = useParams();
  const { id } = params;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const refreshToken = (refresh_token) => {
    return ApiService.postRequest("v1/auth/refresh-token", null, {
      Authorization: `Bearer ${refresh_token}`,
    })
      .then((res) => res.data)
      .catch((e) => {
        console.log(e.message);
        return null;
      });
  };
  const handleRefreshToken = async (refreshTokenValue, cb) => {
    try {
      const refreshTokenResponse = await refreshToken(refreshTokenValue);
      const { token } = refreshTokenResponse ? refreshTokenResponse : {};
      if (token) {
        localStorage.setItem("user", JSON.stringify(refreshTokenResponse));
        cb();
      } else {
        appContext.setCurrentUser(null);
        navigate("/login");
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const handleSavePosts = (postData) => {
    setError(null);
    setLoading(true);
    const userInfo = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    const headersInfo = userInfo
      ? {
          Authorization: `Bearer ${userInfo?.token}`,
        }
      : null;
    ApiService.postRequest(
      "/v1/post/",
      postData,
      headersInfo
    )
      .then(() => {
        navigate('/posts')
      })
      .catch(async (err) => {
        const errMessage = err?.response?.data?.message
          ? err.response.data.message
          : err.message;
        if (errMessage === "jwt expired") {
          handleRefreshToken(
            userInfo?.refreshToken,
            () => handleSavePosts(postData)
          );
        } else {
          setError(errMessage);
        }
      })
      .finally(() => setLoading(false));
  };

  return {
    error,
    loading,
    handleSavePosts,
  };
};

const PostEditScreen = () => {
  const navigate = useNavigate()
  const { loading, handleSavePosts } = SavingIndividualPost(navigate)
  const [editorState, setEditorState] = useState(initialState);
  const [coverImage, setCoverImage] = useState(null)
  const [displayImage, setDisplayImage] = useState(null)
  const [viewImageModel, setViewImageModel] = useState(false)
  const { register, handleSubmit, getValues, setValue, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        title: null,
        description: null,
        visibility: 'private',
        cover_image: null
    }
  });

  const coverImageValueHandler = (value) => {
    setValue('cover_image', value)
    setCoverImage(value)
  }
  const imageUploadHandler = ({
    target
  }) => {
    const { files } = target
    if (!files) {
      coverImageValueHandler(null)
      return true
    }
    coverImageValueHandler(files[0])
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
    } else {
      setDisplayImage(null)
    }
  }, [coverImage])
  const handleCloseModal = () => {
    setViewImageModel(false)
  }
  const handlePostCreate = (values) => {
    handleSavePosts(values)
  }
  useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent())
    if (html) setValue('description', html)
  }, [editorState])
  return (
    <DashboardLayout>
      <Row className="mb-3">
        <Col>
          <h3>Create New Post</h3>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(handlePostCreate)}>
        <Row>
          <Col>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" {...register('title')} disabled={loading}/>
                {errors?.title?.message && <ErrorMessage text={errors.title.message}/>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Editor
                  editorClassName="post-content-editor"
                  editorState={editorState}
                  onEditorStateChange={(value) => setEditorState(value)}
                  disabled={loading}
                />
                {errors?.description?.message && <ErrorMessage text={errors.description.message}/>}
              </Form.Group>
          </Col>
          <Col md={3} className="py-2">
              <Row className="mb-3">
                  <h5>Privacy Settings</h5>
              </Row>
              <Row className="mb-3">
                  <Form.Group>
                      <Form.Check type="radio" value="public" label="Public" checked={getValues('visibility') === 'public'} id="public_visible" onChange={(e) => setValue('visibility', e.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })} disabled={loading}/>
                      <Form.Check type="radio" value="private" label="Private" checked={getValues('visibility') === 'private'} id="private_visible" onChange={(e) => setValue('visibility', e.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })} disabled={loading}/>
                  </Form.Group>
                  {errors?.visibility?.message && <ErrorMessage text={errors.visibility.message}/>}
              </Row>
              <Row className="mb-3">
                  <h5>Cover Image</h5>
              </Row>
              {displayImage && (
                <Row>
                  <Col className="position-relative">
                    <CloseButton className="delete-image" onClick={() => coverImageValueHandler(null)} disabled={loading}/>
                    <div className="photo-frame" style={{ height: displayImage ? 'auto' : '200px', maxHeight: '350px', maxWidth: '350px' }}>
                      {displayImage && <div role="presentation" onClick={() => setViewImageModel(true)}><Image src={displayImage} fluid/></div>}
                    </div>
                  </Col>
                </Row>
              )}
              {!displayImage && (
                <Row className="mb-4">
                  <Form.Group>
                      <Form.Control type="file" size="sm" onChange={imageUploadHandler} disabled={loading}/>
                  </Form.Group>
                </Row>
              )}
              {errors?.cover_image?.message && <ErrorMessage text={errors.cover_image.message}/>}
              <Row>
                  <Form.Group>
                      <Button className="w-100 mb-3" type="submit" disabled={loading}>Save</Button>
                  </Form.Group>
              </Row>
          </Col>
        </Row>
      </Form>
      <Modal show={viewImageModel} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cover Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '450px', overflow: 'hidden', maxWidth: '450px', margin: '0 auto'}}>
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

export default PostEditScreen;
