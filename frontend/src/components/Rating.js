import React from 'react'
// import { FaBeer,FaBezierCurve,FaStar } from 'react-icons/fa';
// import { HiFilm } from "react-icons/hi2";

// const Rating = ({value , text , color}) => {
//   return (
//     <div className='rating'>
//         {FaBeer}       
//     </div>
//   );
// }

import styled from 'styled-components';
import { FaStar,FaStarHalfAlt } from 'react-icons/fa';
import {AiOutlineStar} from 'react-icons/ai'

const Rating =({stars,reviews})=>{
    
    const ratingStar = Array.from({length:5},(elem,index)=>{
        let number = index + 0.5;
        // numofreviews = review;

        return(
            <span key={index}>

                {stars >= index+1 
                ? (<FaStar className='icon'/>)
                : stars >= number
                ? (<FaStarHalfAlt className='icon'/>)
                :(<AiOutlineStar className='icon'/>)  }

                
            </span>
            
        )
        })

    return (
        <Wrapper>
            <div className='icon-style'>
               {ratingStar}
               <p>out of {reviews} reviews</p>
            </div>
            
        </Wrapper>
    );
}

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.1rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 1rem;
      color: green;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: -10px;
      padding-left: 1.2rem;
    }
  }
`;

  

export default Rating
