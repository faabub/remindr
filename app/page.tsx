import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Remindr - Rappels de groupe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenue sur <a href="https://remindr.com">Remindr</a>
        </h1>

        <p className={styles.description}>
          Une application de rappel de groupe pour les projets, les devoirs, les événements et plus encore !
        </p>

        <div className={styles.grid}>
          <Link href="/" className={styles.card}>
            <h3>Rappels &rarr;</h3>
            <p>Gérer les rappels pour les différents projets, devoirs et événements.</p>
          </Link>

          <Link href="/" className={styles.card}>
            <h3>Groupes &rarr;</h3>
            <p>Créer et gérer des groupes pour inviter d'autres utilisateurs.</p>
          </Link>

          <Link href="/" className={styles.card}>
            <h3>Calendrier &rarr;</h3>
            <p>Afficher les rappels à venir dans un calendrier facile à utiliser.</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Moi
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}