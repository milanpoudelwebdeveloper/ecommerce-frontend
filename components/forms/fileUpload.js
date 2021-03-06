import React from 'react'
import Resizer from 'react-image-file-resizer'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { uploadImage } from '../../apiFunctions/uploadImage'

const FileUpload = ({ values, setValues, setImageLoading }) => {
  const user = useSelector((state) => state.user)
  const uploadFile = (e) => {
    setImageLoading(true)
    let files = e.target.files
    //we push the images whether it is empty or whether it is filled and push other images to this array allUploadFiles
    let allUploadedFiles = values.images
    if (files) {
      //resizing all images individually
      for (let i = 0; i < files.length; i++) {
        //here 720 is width, height
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          //callback each resize gives uri
          (uri) => {
            uploadImage(uri, user.token)
              .then((result) => {
                allUploadedFiles.push(result.data)
                setValues({ ...values, images: allUploadedFiles })
                setImageLoading(false)
              })
              .catch((e) => {
                console.log(e)
                toast.error('File Upload Error')
                setImageLoading(false)
              })
          },
          'base64'
        )
      }
    }
  }
  return (
    <div className="row">
      <label className="btn btn-primary">
        Choose File
        <input
          type="file"
          accept="images/*"
          onChange={uploadFile}
          multiple
          hidden
        ></input>
      </label>
    </div>
  )
}

export default FileUpload
