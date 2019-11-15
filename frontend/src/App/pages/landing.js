import React, {Component} from 'react'
import mainImage from './../Images/img1.png'

const converted = {
    body: { backgroundColor: "#FECB4E" },
    ".shell": { display: "flex", height: "98vh", flexDirection: "column" },
    ".content-upper": {
      display: "flex",
      height: "70vh",
      borderStyle: "solid",
      flexDirection: "row",
      backgroundColor: "#0982AF",
      borderRadius: "25px",
      borderColor: "#707070",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundImage: 'url("./../Images/img1.png")',
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      maxWidth: "100%"
    },
    ".content-lower": {
      display: "flex",
      height: "30vh",
      borderStyle: "solid",
      flexDirection: "row",
      backgroundColor: "#0982AF",
      borderRadius: "25px",
      borderColor: "#707070",
      justifyContent: "space-around",
      alignItems: "center"
    },
    ".content-splitter": { display: "flex", height: "5vh" },
    ".detail-circle": {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "67%",
      width: "10%",
      borderStyle: "solid",
      borderRadius: "50%",
      borderColor: "#707070",
      backgroundColor: "#93C8DC",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "large",
      color: "seashell"
    },
    ".access-container": {
      display: "flex",
      height: "80%",
      width: "20vw",
      borderStyle: "solid",
      borderRadius: "25px",
      borderColor: "#707070",
      backgroundColor: "#93C8DC",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center"
    },
    ".access-box": {
      display: "flex",
      height: "40%",
      width: "70%",
      justifyContent: "space-around",
      alignItems: "center",
      borderStyle: "solid",
      borderRadius: "25px",
      borderColor: "#707070",
      backgroundColor: "#2699FB",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "xx-large",
      color: "white"
    }
  };

export const Landing = () => (

<div className="body" style={converted.body}>
<div className="shell" style={converted[".shell"]}>
  <div className="content-upper" style={converted[".content-upper"]} />
  <div className="content-splitter" style={converted[".content-splitter"]}/>
  <div className="content-lower" style={converted[".content-lower"]}>
    <div className="detail-circle" style={converted[".detail-circle"]}>detail1</div>
    <div className="detail-circle" style={converted[".detail-circle"]}>detail2</div>
    <div className="access-container" style={converted[".access-container"]}>
      <div style={converted["div .access-box"]} className="access-box" style={converted[".access-box"]}>Login</div>
      <div className="access-box" style={converted[".access-box"]}>Register</div>
    </div>
    <div className="detail-circle" style={converted[".detail-circle"]}>detail3</div>
    <div className="detail-circle" style={converted[".detail-circle"]}>detail4</div>
  </div>
</div>
</div>


)

