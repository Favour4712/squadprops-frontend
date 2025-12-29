"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { useConnect } from "@stacks/connect-react";
import { userSession } from "@/config";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authenticate } = useConnect();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    setIsMounted(true);
    if (userSession && userSession.isUserSignedIn()) {
      setIsSignedIn(true);
      const userData = userSession.loadUserData();
      const address = userData.profile?.stxAddress?.mainnet || '';
      setUserAddress(address);
    }
  }, []);

  const handleConnect = () => {
    authenticate({
      appDetails: {
        name: 'SquadProps',
        icon: typeof window !== 'undefined' ? window.location.origin + '/icon.png' : '/icon.png',
      },
      redirectTo: '/',
      onFinish: () => {
        const userData = userSession.loadUserData();
        setIsSignedIn(true);
        const address = userData.profile?.stxAddress?.mainnet || '';
        setUserAddress(address);
      },
      userSession,
    });
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    userSession.signUserOut();
    setIsSignedIn(false);
    setUserAddress('');
  };

  // Prevent hydration mismatch
  if (!isMounted) return null;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🏆</span>
            <span>SquadProps</span>
          </Link>

          <div className={styles.nav}>
            <ul className={styles.navLinks}>
              <li>
                <Link href="/" className={styles.navLink}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className={styles.navLink}>
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/history" className={styles.navLink}>
                  History
                </Link>
              </li>
              <li>
                <Link href="/give" className={styles.navLink}>
                  Give Props
                </Link>
              </li>
            </ul>

            {isSignedIn && userAddress ? (
              <button 
                className={styles.connectButton}
                onClick={handleDisconnect}
              >
                {formatAddress(userAddress)}
              </button>
            ) : (
              <button 
                className={styles.connectButton}
                onClick={handleConnect}
              >
                Connect Wallet
              </button>
            )}

            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={styles.navMobile}>
          <ul className={styles.navLinksMobile}>
            <li>
              <Link
                href="/"
                className={styles.navLinkMobile}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className={styles.navLinkMobile}
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className={styles.navLinkMobile}
                onClick={() => setMobileMenuOpen(false)}
              >
                History
              </Link>
            </li>
            <li>
              <Link
                href="/give"
                className={styles.navLinkMobile}
                onClick={() => setMobileMenuOpen(false)}
              >
                Give Props
              </Link>
            </li>
          </ul>
          {isSignedIn && userAddress ? (
            <button 
              className={styles.connectButtonMobile}
              onClick={handleDisconnect}
            >
              Disconnect ({formatAddress(userAddress)})
            </button>
          ) : (
            <button 
              className={styles.connectButtonMobile}
              onClick={handleConnect}
            >
              Connect Wallet
            </button>
          )}
        </div>
      )}
    </>
  );
}
