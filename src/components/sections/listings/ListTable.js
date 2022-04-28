import React from 'react';
import { Link } from 'react-router-dom';

function ListTable(props) {

  const pathName = window.location.pathname.split('/')[1];

  return (
        <table class="table table-bordered">
          <thead>
          {console.log("items tabless")}
            {console.log(props)}
            {console.log("items tables")}
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Title</th>
              <th scope="col">Location</th>
              <th scope="col">Area</th>
              <th scope="col">Posted</th>
              <th scope="col">Posted By</th>
              <th scope="col">Price/Sq.Yd</th>
              <th scope="col">Total Price</th>

            </tr>
          </thead>
          <tbody>
            {props.items.map((item,i)=>(
              <tr>
                <th scope="row">{i+1}</th>
                <td><Link to={"/"+window.location.pathname.split('/')[1]+"/"+item.id} title={item.title} target="_blank">{item.title}</Link></td>
                <td>{item.location_short !== '' && item.location_short}</td>
                <td>
                    {item.area !== '' && item.area !== '0' &&  new Intl.NumberFormat().format(item.area)}
                    {item.area_type !== '' ? <span style={{ textTransform: 'capitalize' }}> {item.area_type.toLowerCase()}</span> :  null/*<span style={{ textTransform: 'capitalize' }}> Acres </span>*/}
                </td>
                <td>{item.posted_time_ago}</td>
                <td>
                  {item.user.role_id !== '4' ? (
                      item.listed_by_name === "" ? "NO Title" : item.listed_by_name
                      ): (
                        item.user.user_name === "" ? "NO Title" : item.user.user_name
                  )}
                </td>
                <td>
                    {item.category.cat_name==="Residential" &&  item.item_price !== "0" &&
                      <span className="listing-price">
                        {pathName === 'rent' ?  '₹'+item.price : '₹'+item.item_price}
                        <span>{pathName === 'rent' ? "/ Month" : ""}</span>
                      </span>
                     }
                     {(item.category.cat_name==="Plots" || item.category.cat_name==="Projects") &&  item.price_SqYard !== "0" &&
                      <span className="listing-price">
                        {'₹'+item.price_SqYard}
                        <span>{"/ Sq. Yd"}</span>
                      </span>
                     }
                </td>
                <td>{item.price !== '' &&  item.price !== '0' && "Rs."+item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
  );
};

export default ListTable;

