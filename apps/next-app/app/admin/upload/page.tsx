"use client";
import { BASE_URL } from '@/app/lib/utils';
import axios from 'axios';
import Dropzone from 'react-dropzone'

export default function Page() {
  return <>
    <Dropzone onDrop={async (acceptedFiles) => {
      const uploadFile = await axios.postForm(`${BASE_URL}/admin/upload`, {
        name: "nagmani",
        video: acceptedFiles
      });
      console.log(acceptedFiles)
    }}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  </>

}
