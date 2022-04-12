import React from "react";

const FiguresOutsideComponent = ({ data, link }) => {
  return (
    <div className="figures-component">
      <a href={link}>
        <figure className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <img src={data.image_url} alt={data.title} />
          </div>
          <figcaption className="col-xs-12 col-sm-6 col-md-6 col-lg-7">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
          </figcaption>
        </figure>
      </a>
    </div>
  );
};

export default FiguresOutsideComponent;
