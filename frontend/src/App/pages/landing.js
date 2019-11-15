import React from 'react'
import styled from 'styled-components';

const Styles = styled.div`
body {
    background-color: #FECB4E;
}

div .access-box {
    font-family: Arial, Helvetica, sans-serif;
    font-size: xx-large;
    color: white;
}

div.detail-circle {
    font-family: Arial, Helvetica, sans-serif;
    font-size: large;
    color: seashell;
}

.shell {
    display: flex;
    height: 98vh;
    flex-direction: column;
    
}

.content-upper {
    display: flex;
    height: 70vh;
    border-style: solid;
    flex-direction: row;
    background-color: #0982AF;
    border-radius: 25px;
    border-color: #707070;
    justify-content: space-around;
    align-items: center;
    background-image: url(\"./../Images/img1.png");
    background-size: contain;
    background-repeat: no-repeat;
    max-width: 100%;
}

.content-lower {
    display: flex;
    height: 30vh;
    border-style: solid;
    flex-direction: row;
    background-color: #0982AF;
    border-radius: 25px;
    border-color: #707070;
    justify-content: space-around;
    align-items: center;
}

.content-splitter {
    display: flex;
    height: 5vh;
}

.detail-circle {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 67%;
    width: 10%;
    border-style: solid;
    border-radius: 50%;
    border-color: #707070;
    background-color: #93C8DC;
}

.access-container {
    display: flex;
    height: 80%;
    width: 20vw;
    border-style: solid;
    border-radius: 25px;
    border-color: #707070;
    background-color: #93C8DC;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.access-box{
    display: flex;
    height: 40%;
    width: 70%;
    justify-content: space-around;
    align-items: center;
    border-style: solid;
    border-radius: 25px;
    border-color: #707070;
    background-color: #2699FB;
}
`;

export const Landing = () => (
<Styles>
    <body>
        <div class="shell">
            <div class="content-upper"></div>
            <div class="content-splitter"></div>
            <div class="content-lower">
                <div class="detail-circle">detail1</div>
                <div class="detail-circle">detail2</div>
                <div class="access-container">
                    <div class="access-box">Login</div>
                    <div class="access-box">Register</div>
                </div>
                <div class="detail-circle">detail3</div>
                <div class="detail-circle">detail4</div>
            </div>
        </div>
    </body>
</Styles>
)

