import React from 'react';
import {Card} from 'react-bootstrap';
import footerlogo from '../footer.png';

function Footer(){
    return(
             <div class="container" style={{position:"absolute", bottom:"-500px"}}>
           <div class="row">
              <div class="col-md-6">
                 <div class="row">
                    <div class="col-md-6 ">
                       <div class="logo-part">
                          <img src={footerlogo} id="fl"/>
                       </div>
                    </div>
                    <div class="col-md-6 px-4">
                       <h6 className="hsix"> About Platform</h6>
                       <div className="abt">
                       <p>Don't hestitate to grab your opportunity!. One single touch make your life better.</p>
                       <a href="#" class="btn-footer"> More Info </a><br/>
                       <a href="#" class="btn-footer"> Contact Us</a>
                       </div>
                    </div>
                 </div>
              </div>
              <div class="col-md-6">
                 <div class="row">
                    <div class="col-md-6 px-4">
                       <h6 className="hsix"> Help us</h6>
                       <div class="row">
                          <div>
                             <ul className="col-md-6" id="flist">
                                <li> <a href="#"> Home</a> </li>
                                <li> <a href="#"> About</a> </li>
                                <li> <a href="#"> Sign Up</a> </li>
                                <li> <a href="#"> Team</a> </li>
                                <li> <a href="#"> Services</a> </li>
                                <li> <a href="#"> Contact</a> </li>
                             </ul>
                          </div>
                       </div>
                    </div>
                    <div class="col-md-6 nws">
                       <h6 className="hsix"> Newsletter</h6>
                       {/* <form class="form-footer my-3">
                          <input type="text"  placeholder="search here...." name="search">
                          <input type="button" value="Go" >
                       </form> */}
                       <p>Are you seeking a platform which shows where you go!</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
    );
}

export default Footer;