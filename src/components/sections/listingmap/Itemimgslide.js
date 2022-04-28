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
          { images != '' ?  (images.filter(images => images.img_type === 'item' ).map((img, i) => (
            <Carousel.Item interval={2500}>
              {/* <div className="slide-img-div"> */}
                <img
                  className="rounded mx-auto d-block slide-img"
                  src={process.env.REACT_APP_BASE_URL+"/uploads/"+img.img_path+""}
                  alt="First slide"
                />
              {/* </div>   */}
            </Carousel.Item>
          )) ): ( 
          <Carousel.Item>
            <div className="slide-img-div">
              <img
                className="rounded mx-auto d-block slide-img"
                src={process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"}
                alt="Second slide"
              />
            </div>            
          </Carousel.Item>
          )}
        </Carousel>
      </div>
  )
}
export default Itemimgslide;