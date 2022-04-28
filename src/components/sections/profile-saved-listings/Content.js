import React,{useEffect,useCallback,useState, useContext} from 'react';
import { UserContext } from "./../../../context/LoginContext";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../baseAxios";
import { Link } from 'react-router-dom';
import { fetchUserItemListData,userItemsSelectors,deleteItemData,patchItem } from "./../../../slices/useritems/userItemSlice";
import { fetchloginuserListData } from "./../../../slices/userprofile/loginuserdataSlice";
import ItemView from './ItemView'
import ProfileSidebar from '../profile/ProfileSideBar';

function Content() {
    const {isLoggedIn,setIsLoggedIn,loginuserId} = useContext(UserContext);
    const [userItems, setUserItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);  
    // const userItems = useSelector(userItemsSelectors.selectAll);
    // console.log({UserItems:userItems});
    const dispatch = useDispatch();
    useEffect(() => {
        checkLogin()
        dispatch(fetchUserItemListData());
        dispatch(fetchloginuserListData());
        fetchData()
      }, [])

      const checkLogin = () =>{
        const loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
        if(loginuserinfo !== null){
           setIsLoggedIn(loginuserinfo.loginstatus)
        }else{
           setIsLoggedIn(false)
        }
        console.log(loginuserinfo)
      }

      const fetchData = async() =>{
        setLoading(true);
        const loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
        await axios.get(`${process.env.REACT_APP_API_URL}items/get_favourite/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/login_user_id/${loginuserId}/limit/10/offset/0/`)
            .then(response => {
                setLoading(false);
                setUserItems(response.data)
            })
            .catch(error => {
                setLoading(false);
                setError(true);
            });
      }

    const onDelete =useCallback((id) =>{
        dispatch(deleteItemData(id)).then(()=>(alert('Delete Success')))
    },[dispatch])

    const onPatch = useCallback((id,newTitle)=>
       
    dispatch(patchItem({id,newTitle}
    )),[]);
    return (
     <div className="section-full browse-job" style={{paddingTop:'50px',paddingBottom:'60px',backgroundColor:'#F9F8F9'}}>            <div className="container">
                <div className="row">
                    <ProfileSidebar path={"saved-listings"} />
                    <div className="col-lg-9"> 
                        <div class="job-bx-title clearfix"><h5 style={{margin: "0"}} class="font-weight-700 pull-left text-uppercase">Favorite Listings</h5></div>
                        <ItemView
                        userItems ={userItems}
                        onDelete={onDelete}
                        onPatch={onPatch}
                        loading={loading}
                        error={error}
                        /> 
                        {/* Listing Start */}
                        {/* { userItems.map((i, item) => (
                             <ItemView
                             key={i}
                             id={item.id}
                             onDelete={onDelete}
                             />
                        )
                    )}                  */}
                    </div>   
                </div>
            </div>
        </div>
    );
}



export default Content;