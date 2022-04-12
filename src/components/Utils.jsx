import React from 'react';

export const toGmt = (num) => {
  if ( (10 > num) && (num > 0) ) {
    return "(GMT+0"+num+":00)"
  } else if ( 10 <= num ) {
    return "(GMT+"+num+":00)" 
  } else if ( (0 > num) && (num > -10) ) {
    return "(GMT-0"+Math.abs(num)+":00)"
  } else if ( num <= -10 ){
    return "(GMT"+num+":00)"
  } else if ( num === 0 ){
    return "(GMT 0"+num+":00)"
  }
}