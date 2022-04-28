import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import Imgslider from './Imgslider';

const bannerpost = [
    {
        img: 'assets/img/listing-single/1.jpg',
    },
    {
        img: 'assets/img/listing-single/1-2.jpg',
    }
]


class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {images:[], loading:false, error:false}
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    componentDidMount() { 
      this.fetchimages();
    }

    fetchimages(){
        this.setState({loading:true,error:false})
        var id =  window.location.pathname.split('/')[2];
        axios.get(`${process.env.REACT_APP_API_URL}images/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/img_parent_id/${id}/`)
        .then(response => this.setState({images:response.data, loading:false}))
        .catch(error => this.setState({error:true}));
    }


    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
        } 

        const item = this.props.item;
        const itemImages = this.state; 
        return (
            <div className="banner banner-2 slider-no-padding" style={{paddingTop:'0px'}}>
                <div className="banner-item" >
                    <div className='row'>
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                    <Slider className="banner-slider" ref={c => (this.slider = c)} {...settings}>
                        {!this.state.error && itemImages.images.map((img, i) => (
                                <div key={i}>
                                    <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url("+process.env.REACT_APP_BASE_URL+"/uploads/"+img.img_path+")" }} />
                                </div>
                        ))}
                        {this.state.loading  && (
                            bannerpost.map((item, i) => (
                                <div key={i}>
                                    <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + item.img + ")" }} />
                                </div>
                        )))}
                        {this.state.error && (
                            bannerpost.map((item, i) => (
                                <div key={i}>
                                    <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + item.img + ")" }} />
                                </div>
                        )))}
                    </Slider>
                    </div>
                    <div className="col-md-2"></div>
                    </div>
                    <div className="acr-listing-details">
                        <div className="acr-listing-section">
                            <div className="acr-listing-nav">
                                <Link to="#" className="btn-custom secondary">Print Listing</Link>
                            </div>
                            <div className="acr-listing-section-body">
                                <div className="acr-listing-section-price">
                                    <span>For Sale</span>
                                    {item.price !== '' && (<h3>Rs.{item.price}</h3>)}
                                    {/* <span>Est. Mortgage</span>
                                    <p>$1,300/mo</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="acr-listing-section">
                            <div className="acr-listing-section-body">
                                <h4>{item.title}</h4>
                                <div className="acr-listing-icons">
                                    {item.numberofbedrooms !== '' && (
                                       <div className="acr-listing-icon">
                                           <i className="flaticon-bedroom" />
                                           <span>Beds</span>
                                           <span className="acr-listing-icon-value">{item.numberofbedrooms}</span>
                                       </div>
                                    )}
                                    {item.numberofbathrooms !== '' && (
                                        <div className="acr-listing-icon">
                                            <i className="flaticon-bathroom" />
                                            <span>Baths</span>
                                            <span className="acr-listing-icon-value">{item.numberofbathrooms}</span>
                                        </div>
                                    )}
                                    {item.area !== '' && (
                                        <div className="acr-listing-icon">
                                            <i className="flaticon-ruler" />
                                            <span>{item.area_type}</span>
                                            <span className="acr-listing-icon-value">{item.area}</span>
                                        </div>
                                    )}
                                </div>
                                {item.description !== '' && <p>{item.description}</p> }
                            </div>
                        </div>
                        <div className="acr-listing-section">
                            <div className="acr-listing-controls">
                                <Link to="#" className="acr-listing-control">
                                    <i className="flaticon-share" />
                                </Link>
                                <Link to="#" className="acr-listing-control">
                                    {/* <i className="flaticon-star" /> */}
                                    <i class="far fa-thumbs-up"></i>
                                </Link>
                                <Link to="#" className="acr-schedule-tour acr-listing-control">
                                    <i className="flaticon-event" />
                                    <span>Schedule Link tour</span>
                                </Link>
                            </div>
                            <div className="acr-listing-section-body">
                                <div className="acr-listing-meta">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Type</span>
                                                <p>House</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>View</span>
                                                <p>City View</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Lot Size</span>
                                                <p>89 Acres</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Condition</span>
                                                <p>Brand New</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="acr-arrows">
                    <i className="slider-prev fas fa-arrow-left slick-arrow" onClick={this.previous} />
                    <i className="slider-next fas fa-arrow-right slick-arrow" onClick={this.next} />
                </div>
            </div>
        );
    }
}

export default Banner;