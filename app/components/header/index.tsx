import { RegisterLink, LoginLink, LogoutLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default function Header() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <header className="p-6">
      <nav className="bg-white text-black p-6 rounded-full">
        <ul className="flex w-full justify-between">
          <li>LOGO</li>
          {
            isAuthenticated() ? <li><LogoutLink> Log out </LogoutLink></li> : (
              <ul className="grid grid-cols-2 gap-x-4">
                <li><LoginLink>Sign in</LoginLink></li>
                <li><RegisterLink>Sign up</RegisterLink></li>
              </ul>
            )
          }
        </ul>
      </nav>
    </header>
  );
}
