import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    return (
        <aside className="widget widget-categories">
            <h3 className="widget-title"><span>Categories</span></h3>
            <ul>
                <li><Link to="/">Computer Science</Link><span>26</span></li>
                <li><Link to="/">Electronics</Link><span>30</span></li>
                <li><Link to="/">Mechanical</Link><span>71</span></li>
            </ul>
        </aside>
    );
};

export default Category;