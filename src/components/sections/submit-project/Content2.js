import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';


function Content(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

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

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    
    return (
        <div className="section">
            <div className="container">
                <div className="row ">
                    <div className="col-md-12 form-group">
                        <label>Property Title</label>
                        <input type="text" className="form-control" placeholder="Property Title" name="name" />
                    </div> 
                    <div className="col-md-12 form-group">
                        <label>Property Description</label>
                        <textarea name="content" rows={5} className="form-control" placeholder="Property Description" />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Plot Area</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="Plot_Area" placeholder="Plot Area" />
                            <div class="input-group-append">
                                <select className="input-group-text" name="type" >
                                    <option value="Acres">Acres</option>
                                    <option value="Sq.Ft">Sq.Ft</option>
                                    <option value="Sq.Mt">Sq.Mt</option>
                                    <option value="Sq.Yds">Sq.Yds</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Property Type</label>
                        <select className="form-control" name="type">
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Condo">Condo</option>
                            <option value="Townhome">Townhome</option>
                            <option value="Villa">Villa</option>
                            <option value="Duplex">Duplex</option>
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Length</label>
                        <input type="text" className="form-control" placeholder="Length" name="length" />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Breadth</label>
                        <input type="text" className="form-control" placeholder="Breadth" name="breadth" />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Select State</label>
                        <select className="form-control" name="state">
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Telangana">Telangana</option>
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Select City</label>
                        <select className="form-control" name="city">
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Warangal">Warangal</option>
                        </select>
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Property Gallery</label>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <h5 className="dropzone-msg-title">Drop files here or click to upload.</h5>
                                {/* <span className="dropzone-msg-desc">This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.</span> */}
                            </div>
                        </div>
                        <aside className="thumbsContainer">
                            {thumbs}
                        </aside>
                        <span className="acr-form-notice">*You can upload up to 5 images for your listing</span>
                        <span className="acr-form-notice">*Listing images should be atleast 620x480 in dimensions</span>
                    </div>
                    <div className="mx-3">
                        <button type="submit" className="btn-custom" name="submit">Submit Listing</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;