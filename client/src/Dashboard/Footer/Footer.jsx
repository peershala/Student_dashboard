import "./Footer.css"

export default function Footer() {
  return (
    <div className='footer'>
        <div className="footer-left">
            <h3>Peershala</h3>
            <p className="footer-links">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <a href="#">Help</a>
            </p>
            <p className="footer-company-name">
                Copyright &copy; 2023 <strong>Peershala </strong>
                All right reserved
            </p>
        </div>
        <div className="footer-center">
            <div className="center-icons">
            <i class="icon fa-solid fa-location-dot"></i>
            <p><span>Delhi,</span>India</p>
            </div>
            <div className="center-icons">
            <i class="icon fa-solid fa-phone"></i>
            <p>+91XXXX645XX5</p>
            </div>
            <div className="center-icons">
            <i class="icon fa-solid fa-envelope"></i>
            <p>xyz@gmail.com</p>
            </div>
        </div>
        <div className="footer-right">
            
                <h2>About the company</h2>
                <p><strong>Peershala</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Voluptas iure nisi cupiditate quae consequatur, quos sequi commodi 
                fuga nostrum magni vitae! Iusto pariatur 
                repellendus accusamus quas deleniti. 
                Eaque, vitae odit!</p>
            
            <div className="footer-icons">
                <a href=""><i class="fa-brands fa-twitter"></i></a>
                <a href=""><i class="fa-brands fa-facebook"></i></a>
                <a href=""><i class="fa-brands fa-youtube"></i></a>    
            </div>    
        </div>   
    </div>
  )
}
