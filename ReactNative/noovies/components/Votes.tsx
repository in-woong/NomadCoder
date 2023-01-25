import React from 'react';
import styled from 'styled-components/native';

interface VotesProps {
  votes: number;
}

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  font-size: 10px;
`;

const Votes: React.FC<VotesProps> = ({ votes }) => (
  <Text>{votes > 0 ? `⭐️ ${votes.toFixed(2)}/10` : `Coming Soon`}</Text>
);

export default Votes;
