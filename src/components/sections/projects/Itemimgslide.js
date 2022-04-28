import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItemImagesListData, itemImagesSelectors } from "./../../../slices/items/itemImagesSlice";

const Itemimgslide = (props) => {
  const images = useSelector(itemImagesSelectors.selectAll);
  const dispatch = useDispatch()
  const [itemid, setItemid] = useState(props.itemId);

  useEffect(() => {
    dispatch(fetchItemImagesListData(itemid));
  }, []);

  return (
      <div>
        <Carousel>
          { images != '' ?  (images.map((img, i) => (
            <Carousel.Item>
                <img
                  className="d-block w-100 "
                  src={process.env.REACT_APP_BASE_URL+"/uploads/"+img.img_path+""}
                  alt="First slide"
                  style={{maxHeight:'450px'}}
                />
            </Carousel.Item>
          )) ): ( 
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"}
              alt="Second slide"
              style={{maxHeight:'450px'}}
            />            
          </Carousel.Item>
          )}
        </Carousel>
      </div>
  )
}
export default Itemimgslide;