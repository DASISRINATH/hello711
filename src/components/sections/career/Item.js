import React from 'react'

const Item = ({title,op1,op2,career,detail,setCareer}) => {
    const handleClick = () => {
        setCareer(detail);
    }
    return (
        <div onClick={handleClick} className={`${career === detail ? "bg-grey" : null } career_option`}>
            <div className="option_title">
                {title}
            </div>
            <div className="option_details">
                <span>
                    {op1} 
                </span>
                <span>
                    {op2}
                </span>
            </div>
        </div>
    )
}

export default Item
