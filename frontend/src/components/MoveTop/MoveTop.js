import { Link } from 'react-router-dom';

const MoveTop = props => {

    const handleButtonClicked = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <Link onClick={handleButtonClicked} id="back-to-top" style={{ opacity: '1', visibility: 'visible' }}>
            <i className="fa fa-angle-up"></i>
        </Link>
    );
};

export default MoveTop;