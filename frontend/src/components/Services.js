import React from 'react';

const Services = () => {
  return (
    <section id="services" className="services mt-5">
      <div className="container">
        <div className="section-title">
          <h2>Vantagens de usar Stolen Bikes</h2>
          <p></p>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bxs-message-square-add"></i>
              </div>
              <h4 className="title">
                <a href="">Vantagem 1</a>
              </h4>
              <p className="description">Vantagem 1</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-search-alt-2"></i>
              </div>
              <h4 className="title">
                <a href="">Vantagem 2</a>
              </h4>
              <p className="description">Vantagem 2</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bxs-group"></i>
              </div>
              <h4 className="title">
                <a href="">Vantagem 3</a>
              </h4>
              <p className="description">Vantagem</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-user"></i>
              </div>
              <h4 className="title">
                <a href="">Vantagem 4</a>
              </h4>
              <p className="description">Vantagem 4</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
