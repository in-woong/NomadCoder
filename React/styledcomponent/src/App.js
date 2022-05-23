import styled, { keyframes } from 'styled-components';

const rotationAnimation = keyframes`
0%{
  transform:rotate(0deg);
  border-radius:0px;
}
50%{
  transform:rotate(360deg);
  border-radius:100px;
}
100%{
  transform:rotate(360deg);
  border-radius:0px;
}
`;

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 200px;
  height: 200px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

const Emoji = styled.span`
  font-size: 36px;
  transition: all 0.3s ease-in-out;
  &:hover {
    font-size: 100px;
  }
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const WrappedBox = styled.div`
  margin-left: 50px;
  background-color: tomato;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 2s linear infinite;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <>
      <Father as='header'>
        <Btn>Log in</Btn>
        <Btn as='a' href='/'>
          Log out
        </Btn>
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
      </Father>
      <Wrapper>
        <Title>Title</Title>
        <WrappedBox>
          <Emoji>🥰</Emoji>
        </WrappedBox>
      </Wrapper>
    </>
  );
}

export default App;
