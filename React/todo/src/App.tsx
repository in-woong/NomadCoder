import React, { MouseEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import { groupsState, usersSelector } from './atoms';
import ToDolist from './componenets/todo/ToDoList';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
*{
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color:inherit
}
body {
  line-height: 1;
  font-family:"Source Sans Pro",sans-serif;

}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`;

function App() {
  const groups = useRecoilValue(groupsState);
  const [users, setUsers] = useRecoilState(usersSelector);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.innerText;
    const selectedUsers = getUsers(value);
    setUsers(event as any);
  };


  return (
    <>
      <GlobalStyle />
      {groups.map((group) => (
        <button onClick={onClick}>{group}</button>
      ))}
      <ul>
        {users.map((user) => (
          <li>{user}</li>
        ))}
      </ul>
      <ToDolist />
    </>
  );
}

export default App;
