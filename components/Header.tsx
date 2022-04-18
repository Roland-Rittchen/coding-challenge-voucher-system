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
  // console.log('props ' + props);
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/">
          <a data-test-id="home-link">Home</a>
        </Link>
        <Link href="/users/protected-user">
          <a data-test-id="header-management-link">Protected-User</a>
        </Link>
      </div>
      {props.userObject && <div>{props.userObject.username}</div>}

      {props.userObject ? (
        <>
          <Link href="/vouchers">
            <a data-test-id="vouchers-link">Vouchers</a>
          </Link>
          <Anchor href="/logout" data-test-id="logout-link">
            Logout
          </Anchor>
        </>
      ) : (
        <>
          <Link href="/login">
            <a data-test-id="login-link">Login</a>
          </Link>
          <Link href="/register">
            <a data-test-id="register-link">Register</a>
          </Link>
        </>
      )}
    </header>
  );
}
