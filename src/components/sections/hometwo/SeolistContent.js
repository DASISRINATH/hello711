import React, { Component, useContext } from 'react';
import { useHistory } from "react-router-dom";
import "./SeolistContent.css";
import { useTranslation } from 'react-i18next';
import { ItemsContext } from '../../../context/ItemsContext';

// const seolist = [
//     {
//         id: 1,
//         text: "Real estate in Hyderabad"
//     },
//     {
//         id: 2,
//         text:"Flats in Hyderabad"

//     },
//     {
//         id: 3,
//         text: "Flats for Rent in Hyderabad"

//     },
//     {
//         id: 4,
//         text: "New Projects in Hyderabad"
//     },
//     {
//         id: 5,
//         text: "Agricultural Land in Hyderabad"
//     },
//     {
//         id: 6,
//         text: "Farm Land in Hyderabad"
//     },
//     {
//         id: 7,
//         text: "Eco Farm in Hyderabad"
//     },
//     {
//         id: 8,
//         text: "Estate Land in Hyderabad"
//     },
//     {
//         id: 9,
//         text: "Small Farm Land in Hyderabad"
//     },
//     {
//         id: 10,
//         text: "Real estate in Warangal"
//     },
//     {
//         id: 11,
//         text: "Flats in Warangal"
//     },
//     {
//         id: 12,
//         text: "Flats for Rent in Warangal"
//     },
//     {
//         id: 14,
//         text: "New Projects in Warangal"
//     },
//     {
//         id: 15,
//         text: "Agricultural Land in Warangal"
//     },
//     {
//         id: 16,
//         text: "Farm Land in Warangal"
//     },
//     {
//         id: 17,
//         text: "Estate Land in Warangal"
//     },
//     {
//         id: 18,
//         text: "Eco Farm in Warangal"
//     },
//     {
//         id: 19,
//         text: "Small Farm Land in Warangal"
//     },
//     {
//         id: 20,
//         text: "Real estate in Karimnagar"
//     },
//     {
//         id: 21,
//         text: "Flats in Karimnagar"
//     },
//     {
//         id: 22,
//         text: "Flats for Rent in Karimnagar"
//     },
//     {
//         id: 23,
//         text: "New Projects in Karimnagar"
//     },
//     {
//         id: 24,
//         text: "Agricultural Land in Karimnagar"
//     },
//     {
//         id: 25,
//         text: "Farm Land in Karimnagar"
//     }
// ]

const Whyus = () => {
    const {t} = useTranslation(['footer']);
    const history = useHistory();
    const {
        changeCat,
        selectLocation,
        selectsubCat,} = useContext(ItemsContext);

    const handleClick = (fun,val1,val2) => {
        selectLocation(val1);
        fun(val2);
    }

    const historyPush = (val) => {
        history.push(val);
    }

    const changeBuy = (val1,val2) => {
        selectLocation(val1);
        changeCat(val2);
        history.push("/properties");
    }

    const changeRent = (val1,val2) => {
        selectLocation(val1);
        selectsubCat(val2);
        history.push("/rent");
    }       
    return (
        <div className="row" style={{marginLeft:'0px'}}>
            {/* {seolist.map((item, i) => (
                <div key={i} className="col-sm-2" style={{padding:'0px',margin:'0px 0px 0px 0px'}}>
                    <p style={{fontSize:'12px',marginBottom:'0px'}}>{t(`footer:middle.seolist.${item.id}`)}</p>
                </div>
            ))} */}

            {/* <div className="midFooter-op col-sm-2 row">
                <div className="seolist  col-sm-12">{t('footer:middle.seolist.buy&sell.buy&sell')}</div>
                <div onClick={() => {
                    changeBuy("itm_loca7b66748e03d457e976ca63a50e1bde0","catfa070dd5cc2a2c9c6196159f85480ff7");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.1')}</div>
                <div onClick={() => {
                    changeBuy("itm_loc32db8931aaf39e3dfb5c388799109d5b","catfa070dd5cc2a2c9c6196159f85480ff7");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.2')}</div>
                <div onClick={() => {
                    changeBuy("itm_loc247387cc3640d1a88f3d9342d216dc13","catfa070dd5cc2a2c9c6196159f85480ff7");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.3')}</div>
                <div onClick={() => {
                    changeBuy("itm_loca7b66748e03d457e976ca63a50e1bde0","cat445639833db3eff8b6cdb5510aa39faa");
                }} className=" col-sm-12">{t('footer:middle.seolist.buy&sell.4')}</div>
                <div onClick={() => {
                    changeBuy("itm_loc32db8931aaf39e3dfb5c388799109d5b","cat445639833db3eff8b6cdb5510aa39faa");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.5')}</div>
                <div onClick={() => {
                    changeBuy("itm_loc247387cc3640d1a88f3d9342d216dc13","cat445639833db3eff8b6cdb5510aa39faa");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.6')}</div>
            </div> */}
            <div className="col-sm-4 row">
                <div style={{marginLeft: "15px"}} className="seolist  col-sm-12">{t('footer:middle.seolist.buy&sell.buy&sell')}</div>
                <div style={{margin: "0"}} className="midFooter-op col-sm-6 row">
                <div onClick={() => {
                    changeBuy("itm_loca7b66748e03d457e976ca63a50e1bde0","catfa070dd5cc2a2c9c6196159f85480ff7");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.1')}</div>
                <div onClick={() => {
                    changeBuy("itm_loc32db8931aaf39e3dfb5c388799109d5b","catfa070dd5cc2a2c9c6196159f85480ff7");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.2')}</div>
                <div onClick={() => {
                    changeBuy("itm_loc247387cc3640d1a88f3d9342d216dc13","catfa070dd5cc2a2c9c6196159f85480ff7");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.3')}</div>
                
                </div>

                <div style={{margin: "0"}} className="midFooter-op col-sm-6 row">
                <div onClick={() => {
                    changeBuy("itm_loca7b66748e03d457e976ca63a50e1bde0","cat445639833db3eff8b6cdb5510aa39faa");
                }} className=" col-sm-12">{t('footer:middle.seolist.buy&sell.4')}</div>
                <div onClick={() => {
                    changeBuy("itm_loc32db8931aaf39e3dfb5c388799109d5b","cat445639833db3eff8b6cdb5510aa39faa");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.5')}</div>
                <div onClick={() => {
                    changeBuy("itm_loc247387cc3640d1a88f3d9342d216dc13","cat445639833db3eff8b6cdb5510aa39faa");
                }}  className=" col-sm-12">{t('footer:middle.seolist.buy&sell.6')}</div>
                </div>
            </div>
            <div className="col-sm-8 row">
                <div style={{marginLeft: "15px"}} className="seolist  col-sm-12">{t('footer:middle.rent')}</div>
                <div style={{margin: "0"}} className="midFooter-op col-sm-3 row">
                    <div onClick={() => {
                        changeRent("itm_loca7b66748e03d457e976ca63a50e1bde0","subcat89d510a83500e9ac2ecec99cd6b26c94");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.1')}</div>
                    <div onClick={() => {
                        changeRent("itm_loc32db8931aaf39e3dfb5c388799109d5b","subcat89d510a83500e9ac2ecec99cd6b26c94");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.2')}</div>
                    <div onClick={() => {
                        changeRent("itm_loc247387cc3640d1a88f3d9342d216dc13","subcat89d510a83500e9ac2ecec99cd6b26c94");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.3')}</div>
                    
                </div>

                <div style={{margin: "0"}} className="midFooter-op col-sm-3 row">
                <div onClick={() => {
                        changeRent("itm_loca7b66748e03d457e976ca63a50e1bde0","subcatca64dc358e7737518a68ec88f7e3f99a");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.4')}</div>
                    <div onClick={() => {
                        changeRent("itm_loc32db8931aaf39e3dfb5c388799109d5b","subcatca64dc358e7737518a68ec88f7e3f99a");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.5')}</div>
                    <div onClick={() => {
                        changeRent("itm_loc247387cc3640d1a88f3d9342d216dc13","subcatca64dc358e7737518a68ec88f7e3f99a");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.6')}</div>
                    
                </div>
                <div style={{margin: "0"}} className="midFooter-op col-sm-3 row">
                <div onClick={() => {
                        changeRent("itm_loca7b66748e03d457e976ca63a50e1bde0","subcat83e59467ed17dd3c8ce2b22fc1876e2c");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.7')}</div>
                    <div onClick={() => {
                        changeRent("itm_loc32db8931aaf39e3dfb5c388799109d5b","subcat83e59467ed17dd3c8ce2b22fc1876e2c");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.8')}</div>
                    <div onClick={() => {
                        changeRent("itm_loc247387cc3640d1a88f3d9342d216dc13","subcat83e59467ed17dd3c8ce2b22fc1876e2c");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.9')}</div>
                </div>
                <div style={{margin: "0"}} className="midFooter-op col-sm-3 row">
                <div onClick={() => {
                        changeRent("itm_loca7b66748e03d457e976ca63a50e1bde0","subcatc4b6928dd0ba7f1f4ffc5a4588cea59e");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.10')}</div>
                    <div onClick={() => {
                        changeRent("itm_loc32db8931aaf39e3dfb5c388799109d5b","subcatc4b6928dd0ba7f1f4ffc5a4588cea59e");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.11')}</div>
                    <div onClick={() => {
                        changeRent("itm_loc247387cc3640d1a88f3d9342d216dc13","subcatc4b6928dd0ba7f1f4ffc5a4588cea59e");
                    }} className=" col-sm-12">{t('footer:middle.seolist.rent.12')}</div>
                </div>
            </div>
            {/* <div className="col-sm-2 row">
                <div className="seolist pd-none col-sm-12">Rent</div>
                <div className="pd-none col-sm-12">Aparments in Hyderabad</div>
                <div className="pd-none col-sm-12">Aparments in Bangalore</div>
                <div className="pd-none col-sm-12">Aparments in Chennai</div>
                <div className="pd-none col-sm-12">House in Hyderabad</div>
                <div className="pd-none col-sm-12">House in Bangalore</div>
                <div className="pd-none col-sm-12">House in Chennai</div>
            </div>
            <div className="col-sm-2 row">
                <div className="midFooter-op seolist pd-none col-sm-12">Rent</div>
                <div className="pd-none col-sm-12">Building in Hyderabad</div>
                <div className="pd-none col-sm-12">Building in Bangalore</div>
                <div className="pd-none col-sm-12">Building in Chennai</div>
                <div className="pd-none col-sm-12">others in Hyderabad</div>
                <div className="pd-none col-sm-12">others in Bangalore</div>
                <div className="pd-none col-sm-12">others in Chennai</div>
            </div> */}
            {/* <div className="col-sm-4 row">
                <div className="seolist col-sm-12">Rent</div>
                <div className="col-sm-6 display-flex">
                    <div className="pd-none col-sm-12">Plots in Hyderabad</div>
                    <div className="pd-none col-sm-12">Plots in Bangalore</div>
                    <div className="pd-none col-sm-12">Plots in Chennai</div>
                    <div className="pd-none col-sm-12">Residential in Hyderabad</div>
                    <div className="pd-none col-sm-12">Residential in Bangalore</div>
                    <div className="pd-none col-sm-12">Residential in Chennai</div>
                </div>
                
            </div> */}
        </div>
    );
    
}

export default Whyus;