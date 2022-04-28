import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItemImagesListData, itemImagesSelectors } from "./../../../slices/items/itemImagesSlice";
import Slider from 'react-slick';

const Imgslider = (props) => {
  const images = useSelector(itemImagesSelectors.selectAll);
  const dispatch = useDispatch()
  const [itemid, setItemid] = useState(props.itemId);

  useEffect(() => {
    dispatch(fetchItemImagesListData(itemid));
  }, []);


  const bannerpost = [
    {
        img: 'assets/img/listing-single/1.jpg',
    },
    {
        img: 'assets/img/listing-single/1-2.jpg',
    }
 ]

 const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
 }  

  return (
     <Slider className="banner-slider" ref={c => (this.slider = c)} {...settings}>
        {/* {images.img_path === '' ? (
            bannerpost.map((image, i) => (
             <div key={i}>
                    <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + image.img + ")" }} />
             </div>
         ))):(
         images.map((image, i) => (
             <div key={i}>
                <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(https://api.prod.online.risee.in/uploads/"+image.img_path+")" }} />
             </div>
         )))} */}
            {images.map((image, i) => (
             <div key={i}>
                <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url("+process.env.REACT_APP_BASE_URL+"/uploads/"+image.img_path+")" }} />
             </div>))}
     </Slider>
  )
}
export default Imgslider;

//