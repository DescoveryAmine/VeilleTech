import React from 'react';

const ImageGridTwoColumn = props => {

    const {image , description} = props;
    return (
        <div className="row">
            <div className="col-md-6">
                <div className="folio-s-img">
                    <img src={image} alt="" />
                </div>
            </div>
            <div className="col-md-6">
                <div className="folio-s-img">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ImageGridTwoColumn;