import DynamicSheet from 'react-dynamic-sheet';
import React,{useState} from 'react';
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const ItemBottomSheet = (props) => {
	const [open, setOpen] = useState(false);


return (
<>
{/* <Link
//to="/listing-details-v1"
onClick={() => setOpen(true)}
className="btn-custom btn-sm secondary">
View Details
</Link> */}
   <Link onClick={() => setOpen(true)} className="btn-custom btn-sm secondary">Click me!</Link>
   <DynamicSheet open={open} onClose={() => setOpen(false)}>
				<div style={{ padding: "20px 20px 200px" }}>Hello World</div>
			</DynamicSheet>
</>
);
}

export default ItemBottomSheet;
