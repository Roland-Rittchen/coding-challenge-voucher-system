import { css, Interpolation, Theme } from '@emotion/react';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { User } from '../util/database';

const headerStyles = css`
  background-color: #eee;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 8px 8px 20px;
  display: flex;

  a + a {
    margin-left: 10px;
  }

  > div:first-child {
    margin-right: auto;
  }
`;

type Props = {
  userObject?: User;
};

function Anchor({
  children,
  ...restProps
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  css?: Interpolation<Theme>;
}) {
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  console.log(props);
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/users/protected-user">
          <a data-test-id="header-management-link">Protected-User</a>
        </Link>
      </div>
      {props.userObject && <div>{props.userObject.username}</div>}

      {props.userObject ? (
        <Anchor href="/logout">Logout</Anchor>
      ) : (
        <>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </>
      )}
    </header>
  );
}
