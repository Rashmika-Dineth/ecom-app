import Item from "./Component/Card";
import { useState,useEffect } from "react";
import ImageList from '@mui/material/ImageList';


function Product() {
    const[data,setData]=useState()
    useEffect(() => {
        fetch("/api/getproducts")
          .then((res) => res.json())
          .then((data) => {
            setData(data);
        
          });
      }, []);   
    console.log(data)
    if(!data)
        return(
    <div>
        Loading
    </div>
        )
    else{

    return ( 
        <div>
            
            <ImageList cols={3} rowHeight={200} style={{margin:"20px"}}>
                {data.map((x) => (
                    
                       <Item Item={x} />
                   
                ))}
            </ImageList>
        
        </div>
     );
}
}

export default Product;