import { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import classNames from "classnames";
import { Link } from 'react-router-dom';

function Pagination({data, pageLimit, dataLimit}){
  const [pages] = useState(Math.round(data.length/dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    window.scrollTo({behavior:'auto', top:'0px'});
  },[currentPage]);

  const goToNextPage = ()=>{
    setCurrentPage((page)=>page+1);
  }

  const goToPrevPage = ()=>{
    setCurrentPage((page)=>page-1);
  }

  const changePage = (event)=>{
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = ()=>{
    const startIndex = currentPage*dataLimit - dataLimit;
    const endIndex = currentPage*dataLimit;
    return data.slice(startIndex, endIndex);
  }
  
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    const pageNumbers = [];
    for(let i=1;i<=pages;i++){
      pageNumbers.push(i);
    }
    return pageNumbers.slice(start, start+pageLimit);
  };

  return (
    <div className="section posts pagination-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {getPaginatedData().map((item,i)=>(
              <article key={i} className="post">
                <div className="post-thumbnail">
                  <Link to={"/blog/"+item.name.replace(" ", "_")} target="_blank">
                    <img
                      src={
                        item.default_photo.img_path === ""
                          ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                          //: API_URL.IMG_URL+item.default_photo.img_path
                          : process.env.REACT_APP_BASE_URL+'/uploads/'+item.default_photo.img_path
                      }
                      alt="blog post"
                    />
                  </Link>
                </div>
                <div className="post-body">
                  <h5 className="post-title"><Link to={"/blog/"+item.name.replace(/ /g, "_")} target="_blank">{item.name}</Link></h5>
                  {renderHTML(item.description.split("</p>")[0]+"</p>")}
                </div>
                <div className="post-controls">
                  <Link to={"/blog/"+item.name.replace(/ /g, "_")} className="btn-custom secondary btn-sm" target="_blank">Read More</Link>
                </div>
              </article>
            ))}
            <ul className="pagination">
              {currentPage!==1 && 
                <li className="page-item">
                  <button className="page-link" onClick={goToPrevPage}>
                    <i className="fas fa-chevron-left"/>
                  </button>
                </li>
              }
              {getPaginationGroup().map((item)=>(
                <li className={currentPage===item ? "page-item active" : "page-item"}>
                  <button className="page-link" onClick={changePage} value={item}>{item}</button>
                </li>
              ))}
              {currentPage!==pages && 
                <li className="page-item">
                <button className="page-link" onClick={goToNextPage}>
                  <i className="fas fa-chevron-right"/>
                </button>
              </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination;