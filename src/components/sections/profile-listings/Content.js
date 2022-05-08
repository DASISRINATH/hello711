import React,{useEffect,useCallback,useState, useContext} from 'react';
import { UserContext } from "./../../../context/LoginContext";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { fetchUserItemListData,userItemsSelectors,deleteItemData,patchItem } from "./../../../slices/useritems/userItemSlice";
import { fetchloginuserListData } from "./../../../slices/userprofile/loginuserdataSlice";
import ItemView from './ItemView'
import axios from 'axios';
import ProfileSidebar from '../profile/ProfileSideBar';


function Content() {
    const {isLoggedIn,setIsLoggedIn,loginuserId,} = useContext(UserContext);
    const [userItems, setUserItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    //const [errormsg, setErrormsg] = useState('');  
    //const userItems = useSelector(userItemsSelectors.selectAll);
    //const loading = useSelector((state) => state.items.loading);
    //const error = useSelector((state) => state.items.error);
    //console.log({UserItems:userItems});
    const dispatch = useDispatch();
    useEffect(() => {
      fetchItem()
      //alert(loginuserId)
        //dispatch(fetchUserItemListData(loginuserId));
        //dispatch(fetchloginuserListData());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    //const onDelete =useCallback((id) =>{
    //  dispatch(deleteItemData(id)).then(()=>(alert('Delete Success')))
    //  setUserItems([])
    //  fetchItem()
    //},[dispatch])

    const onDelete = async(id) =>{
      setUserItems([])
      setLoading(true);
      var deleteData = {item_id: id,};
      await axios.post(`${process.env.REACT_APP_API_URL}items/item_delete/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, deleteData)
      .then(response => {
        fetchItem()
        alert('Deleted success')
      })
      .catch(error => {
          setLoading(false)
          fetchItem()
          alert('Operation Failed Plz Try Again.')
      });
    }

    const updateItem = () =>{
      setUserItems([])
      fetchItem()
    }

    //const onPatch = useCallback((id,newTitle)=>

    const fetchItem = async() => {
      setLoading(true);
      var postData = {
        added_user_id:loginuserId,
        status:'all',
      };
      await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/rappikey/app_list_id/2`, postData)
      .then(response => {
        setLoading(false)
        setUserItems(response.data);
      })
      .catch(error => {
          setUserItems([])
          setLoading(false)
          setError(true)
      });
    }


       
    //dispatch(patchItem({id,newTitle}
    //)),[]);

    return (
      <div className="section-full browse-job" style={{paddingTop:'50px',paddingBottom:'60px',backgroundColor:'#F9F8F9'}}>            <div className="container">
                <div className="row">
                    <ProfileSidebar path={"listings"}/>
                    <div className="col-lg-9">
                        <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                          <Tab eventKey="all" title="All">
                            <ItemView
                              userItems ={userItems}
                              loading={loading}
                              error={error}
                              updateItem={updateItem}
                              onDelete={onDelete}
                              filter={false}
                            />
                          </Tab>
                          <Tab eventKey="approved" title="Approved">
                            <ItemView
                              userItems ={userItems}
                              loading={loading}
                              error={error}
                              updateItem={updateItem}
                              onDelete={onDelete}
                              filter={true}
                              status={'1'}
                            />
                          </Tab>
                          <Tab eventKey="pending" title="Pending" >
                            <ItemView
                              userItems ={userItems}
                              loading={loading}
                              error={error}
                              updateItem={updateItem}
                              onDelete={onDelete}
                              filter={true}
                              status={'0'}
                            />
                          </Tab>
                          <Tab eventKey="rejected" title="Rejected" >
                            <ItemView
                              userItems ={userItems}
                              loading={loading}
                              error={error}
                              updateItem={updateItem}
                              onDelete={onDelete}
                              // onPatch={onPatch}
                              filter={true}
                              status={'3'}
                            />
                          </Tab>
                          <Tab eventKey="expired" title="Expired">
                            <ItemView
                              userItems ={userItems}
                              loading={loading}
                              error={error}
                              updateItem={updateItem}
                              onDelete={onDelete}
                              filter={true}
                              status={'5'}
                            />
                          </Tab>
                          <Tab eventKey="reported" title="Reported">
                            <ItemView
                              userItems ={userItems}
                              loading={loading}
                              error={error}
                              updateItem={updateItem}
                              onDelete={onDelete}
                              filter={true}
                              status={'6'}
                            />
                          </Tab>
                        </Tabs>

                        {/* Listing Start */}
                        {/* { userItems.map((i, item) => (
                             <ItemView
                             key={i}
                             id={item.id}
                             onDelete={onDelete}
                             />
                        ))} */}
                    </div>   
                </div>
            </div>
        </div>

    );
}



export default Content;