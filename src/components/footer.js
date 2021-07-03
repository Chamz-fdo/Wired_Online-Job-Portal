import React from 'react';
import {Card} from 'react-bootstrap';
import footerlogo from '../footer.png';

function Footer(){
    return(
             <div class="container">
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
                       <div className='d-flex footer-btn-grp justify-content-between'>
                        <a href="/aboutus" class="btn-footer"> About Us </a>
                        <a href="#" class="btn-footer"> Contact Us</a>
                       </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div class="col-md-6">
                 <div class="row">
                    <div class="col-md-6 px-4">
                       <h6 className="hsix hsix2"> Help us</h6>
                       <div class="row">
                          <div className='links-us'>
                             <div className="col-md-6" id="flist">
                                <div> <a href="#"> Home</a> </div>
                                <div> <a href="#"> About</a> </div>
                                <div> <a href="#"> Sign Up</a> </div>
                                <div> <a href="#"> Team</a> </div>
                                <div> <a href="#"> Services</a> </div>
                                <div> <a href="#"> Contact</a> </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="col-md-6 nws">
                       <h6 className="hsix hsix3"> Newsletter</h6>
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