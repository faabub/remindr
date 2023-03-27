import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <Link className={styles.navLink} href="/">
            Accueil
          </Link>
        </li>
        {session && (
          <>
            <li className={styles.navListItem}>
              <Link href="/groups">
                Groupes
              </Link>
            </li>
          </>
        )}
      </ul>
      {session ? (
        <button className={styles.logoutButton} onClick={() => signOut()}>
          Déconnexion
        </button>
      ) : (
        <button className={styles.loginButton} onClick={() => signIn('github')}>
          Connexion
        </button>
      )}
    </nav>
  );
}