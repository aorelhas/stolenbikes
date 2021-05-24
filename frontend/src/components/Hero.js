import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1>Divulga gratuitamente</h1>
            <h2>
              Furtaram a tua bicicleta e tens o desejo que seja encontrada? -
              Visibilidade; - Possibilidade de procurar por NSerie; Regista já a
              tua bicicleta.
            </h2>
            <div>
              <Link className="btn-get-started scrollto" to="/register">
                Registar
              </Link>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <h2>img</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
