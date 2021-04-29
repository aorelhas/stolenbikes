import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Regista a tua bicicleta furtada',
  description:
    'Expõe a tua bicicleta furtada para que tenhas maior facilidade em que seja encontrada',
  keywords:
    'Stolen bikes, bicicletas furtadas, bicicletas roubadas, missing bikes, ',
};

export default Meta;
