import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLocationsData } from "./../../../slices/items/locationsSlice";
import { fetchUserItemUploadData, itemUploadSelectors } from "./../../../slices/useritems/itemAddSlice";
import { uploaditemImagesData, itemImagesuploadSelectors } from "./../../../slices/useritems/imagesUploadSlice";


function Imagesupload(props) {
    //const locationslist = useSelector((state) => state.fetchLocationsData);

    const uploadeditemdata = useSelector(itemUploadSelectors.selectAll);

    const [isLoggedin, setIsLoggedin] = useState(true);
    const [loggedinuser, setLoggedinuser] = useState('');
    const [files, setFiles] = useState([]);

    const [uploadmsg, setUploadmsg] = useState();
    const [successmsg, setSuccessmsg] = useState(false);
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch()

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const onsubmit = (e) =>{
        e.preventDefault();
        if(isLoggedin){
            setLoading(true)
            if(files.length > 0){
                for (let i = 0; i < files.length; i++) {   
                 const formData = new FormData();  
                  formData.append("file", files[i]);
                  formData.append("item_id", uploadeditemdata.map((item, i) => (item.id)));
                //   console.log(formData);
                  dispatch(uploaditemImagesData(formData));
                }
            }
            setTimeout(() => {
                setLoading(false)
                setSuccessmsg(true)
            }, 2000);
            setTimeout(() => {
                props.formChange()
            }, 3000); 
        }else{
            alert('Please Login first.')
        }
    }

//    const uploadimages = (itemid) =>{ 
//        console.log(itemid);
//        console.log(files);
//
//        for (let i = 0; i < files.length; i++) {   
//         const formData = new FormData();  
//          formData.append("file", files[i]);
//          formData.append("item_id", itemid);
//          axios.post('https://api.test.takengo.risee.in/index.php/rest/images/upload_item/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/', formData
//          ).then(res=>
//            {
//              //console.log(res.data);
//              if (res.status === 200) {
//                  setUploadingmsg(false) 
//                  setUploadingmsgstatus(true) 
//                  //setUploadmsg('Upload Success')
//                  //alert('Upload Success')
//              }else{
//                setUploadmsg('Some Images are not uploaded check from mylistings')  
//                //alert('Something Went wrong. try again.');
//              }
//            }
//          );
//        }
//
//    }


    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    src={file.preview}
                    alt="img"
                />
            </div>
        </div>
    ));

//    React.useEffect(() => {
//        setUploadeditemid(uploadeditemdata.map((item, i) => (item.id)))
//      }, []);
    
   

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    
    return (

            <form onSubmit={onsubmit}> 
                {//console.log(uploadeditemId.map((item, i) => (item.id) ) )
                }  
                <div className="row ">
                    <div className="col-md-12 form-group">
                        <label>Property Gallery</label>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <h5 className="dropzone-msg-title">Drop files here or click to upload.</h5>
                                <span className="dropzone-msg-desc">This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.</span>
                            </div>
                        </div>
                        <aside className="thumbsContainer">
                            {thumbs}
                        </aside>
                        <span className="acr-form-notice">*You can upload up to 5 images for your listing</span>
                        <span className="acr-form-notice">*Listing images should be atleast 620x480 in dimensions</span>
                    </div>
                    <div className="mx-3">
                        {loading ? null : ( !successmsg && <button type="submit"  className="btn-custom" name="submit">Submit Listing </button>)}
                        {loading ? (<h5 className="text-center text-info">Uploading...</h5>) : null}
                        {successmsg ? (<h5 className="text-center text-success">Uploading Success.</h5>) : null}
                    </div>
                </div>
            </form>
    );
}

export default Imagesupload;