import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

const Loader = styled.span`
  text-align: center;
  font-size: 50px;
  display: block;
`;

interface RouteState {
  state: {
    name: string;
  };
}

function Coin() {
  const [loading, setLoading] = useState(false);
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation() as RouteState;

  return (
    <Container>
      <Header>
        <Title>코인 {state?.name || 'Loading'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
