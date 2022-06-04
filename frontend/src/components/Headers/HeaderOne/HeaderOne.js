import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import MainMenu from '../../MainMenus/MainMenu';
import Search from '../../Search/Search';
import AuthModal from '../../Modal/AuthModal';
import './HeaderOne.css';

const HeaderOne = () => {

    const [name, setname] = useState(null);
    const [role, setrole] = useState(null);

    useEffect(()=>{
        const storedData = window.localStorage.getItem('userData');
        if(!!storedData)
        {   

            const data = JSON.parse(storedData)
            if(new Date(data.expiration) > new Date())
            {
            setname(data.userName);
            setrole(data.userRole);
            }

        }
        else 
        {
            setname(null);
            setrole(null);}
    },[])

    const [showAuth, setShowAuth] = useState(false);

    const openAuthHandler = () => setShowAuth(true);
  
    const closeAuthHandler = () => setShowAuth(false);

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleShowHideMobileMenu = () => {
        setShowMobileMenu(props => !props);
    }

    return (
        <React.Fragment>
        <AuthModal
          show={showAuth}
          onCancel={closeAuthHandler}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          
        >
        </AuthModal>
        <header className="header-01">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg">
                            {/* <!-- logo Start--> */}
                            <Link className="navbar-brand" to="/">
                                <img src={logo} alt="" />
                            </Link>
                            {/* <!-- logo End--> */}

                            {/* <!-- Moblie Btn Start --> */}
                            <button onClick={handleShowHideMobileMenu} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {/* <!-- Moblie Btn End --> */}

                            {/* <!-- Nav Menu Start --> */}
                            <div className={`collapse navbar-collapse ${showMobileMenu ? 'show' : ''}`} id="navbarNavDropdown">
                                <MainMenu Name={name} Role={role}/>
                            </div>
                            {/* <!-- Nav Menu End --> */}

                            {/* <!-- Search Btn --> */}
                            <Search />
                            {/* Contact Btn End  */}

                            {/* <!-- Appointment Btn --> */}
                            {/* <Link to="/auth" className="appoint-btn">Inscrire<i className="fa fa-long-arrow-right"></i></Link> */}
                            <div style={{ display: !name ? "inline-block" : "none" }} className="appoint-btn" onClick={openAuthHandler}>
                             Log in
                             <i className="fa fa-long-arrow-right"></i>
                            </div>
                            {/* <!-- Contact Btn End --> */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        </React.Fragment>
    );
};

export default HeaderOne;