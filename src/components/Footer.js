import React, { Component } from 'react';

import Racecar from '../Racecar.jpg'

class Footer extends Component {
    render() {
        return (
        <>
        <footer >
            
                <ul>
                    <li>
                    <div>
                        
                        <h3>Want to contact us?</h3>
                        <p>Let us know at</p> 
                        
                        
                    <h5>
                    <a href="https://linkedin.com/">Linkedin</a>
                    <br/>
                    <a href="https://twitter.com/">Twitter</a>
                    </h5>
                        
                    
                        
                        
                    </div>
                    </li>
                </ul>
                <ul>
                    <li>
                    <img src={Racecar} alt="a scene from formula one" />
                    </li>
                </ul>
                
        </footer>
            <div className="copyright">
                    <small>
                        copyright © 2021 all rights reserved 
                    </small>
                </div>
        </>
    )}
}

export default Footer
