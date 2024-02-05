import React from 'react';
import { Card, Row, Col } from 'antd';
import LikePoke from './LikePoke';

function FavePoke({ fav }) {
  return (
    <Row gutter={[16, 16]}>
      {fav.map((data, idx) => (
        <Col xs={24} sm={12} md={8} lg={8} xl={8} key={idx}>
          <Card>
            <div>
              <h3>{data.name}</h3>
              <img style={{ width: '100%' }} src={data?.sprites?.other?.home?.front_default} alt={data.name} />
              <LikePoke />
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default FavePoke;
