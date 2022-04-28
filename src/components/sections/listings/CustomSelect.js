import React, {useState,useEffect,useContext} from 'react'
import styled from 'styled-components';
import "./selectStyles.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { UserContext } from "./../../../context/LoginContext";




const CustomSelect = ({flag,options, setChange, val}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0].label);
    const toggling = () => setIsOpen(!isOpen);
    const {lang} = useContext(UserContext);


      const handleClick = (option) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        setChange(option.value);
      }

      useEffect(() => {
        setSelectedOption(options[0].label);
      },[flag])

      useEffect(() => {
        options.forEach(item => {
          if(item.value === val) setSelectedOption(item.label);
          // console.log(item);
        });
      },[options])
    // if(isOpen===true) document.addEventListener("click",() => {
    //     toggling();
    // 
    return (
        <div className="DropDownContainer" onBlur={() => setIsOpen(false)} tabIndex="0">
            
            <div className="DropDownHeader" onClick={toggling}>
            {selectedOption.length > 13 ? <span>{selectedOption.slice(0,10)+".."}</span>  : <span>{selectedOption}</span> }
            {isOpen ? <ExpandLessIcon className="dropArrow" /> : <ExpandMoreIcon className="dropArrow" />}
            </div>
            {isOpen && (
            <div className="DropDownListContainer">
                <div className="DropDownList">
                {options.map(option => (
                    <div className={`ListItem ${option.label === selectedOption && "dropBg"}`} onClick={() => handleClick(option)} key={Math.random()}>
                    {option.label}
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>
            
    )
}

export default CustomSelect;
