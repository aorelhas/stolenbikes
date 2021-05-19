import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import SearchBox from '../components/SearchBox';
import Bike from '../components/Bike';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { listBikes } from '../actions/bikeActions';

const AllBikeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const listBike = useSelector((state) => state.listBike);
  const { loading, error, bikes, page, pages } = listBike;

  useEffect(() => {
    dispatch(listBikes(keyword));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Insere o Número de Série</h1>
      <Route render={({ history }) => <SearchBox history={history} />} />
      <h1>Bicicletas Furtadas</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {bikes.map((bike) => (
              <Col key={bike._id} sm={12} md={6} lg={4} xl={3}>
                <Bike bike={bike} />
              </Col>
            ))}
          </Row>
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default AllBikeScreen;
