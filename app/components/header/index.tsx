import { LoginLink, LogoutLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';

export default function Header() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <header className="p-6">
      <nav className="bg-white text-black p-6 rounded-full">
        <ul className="flex w-full justify-between">
          <li>
            <Image
              src="https://res.cloudinary.com/dyhxl3hoj/image/upload/v1697477380/tplaufopvzy7lw0u9jkn.png"
              width={100}
              height={100}
              alt="Incidentify logo"
            />
          </li>
          {
            isAuthenticated() ? <li><LogoutLink> Log out </LogoutLink></li> : (
              <ul className="grid grid-cols-2 gap-x-4">
                <li><LoginLink>Sign in</LoginLink></li>
              </ul>
            )
          }
        </ul>
      </nav>
    </header>
  );
}
