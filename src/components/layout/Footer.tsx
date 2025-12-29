import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>SquadProps</h3>
            <p>
              Social recognition on the Stacks blockchain. Give props, build
              reputation, and celebrate your squad.
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                ⚡
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Discord"
              >
                💬
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Quick Links</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/" className={styles.link}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className={styles.link}>
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/history" className={styles.link}>
                  History
                </Link>
              </li>
              <li>
                <Link href="/give" className={styles.link}>
                  Give Props
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>Resources</h3>
            <ul className={styles.links}>
              <li>
                <a
                  href="https://docs.stacks.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Stacks Docs
                </a>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className={styles.link}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} SquadProps. All rights reserved.
          </p>
          <p className={styles.builtWith}>
            Built on{" "}
            <span className={styles.stacksLogo}>Stacks</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
