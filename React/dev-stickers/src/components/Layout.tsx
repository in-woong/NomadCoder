import { Link } from "gatsby";
import React from "react";

interface ILayoutProps {
  children: any;
  title: string;
}

export default function Layout({ children, title }: ILayoutProps) {
  return (
    <div className='container'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
            <Link to='/about-us'>About Us</Link>
            <Link to='/blog'>Blog</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
