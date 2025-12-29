"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchCallReadOnlyFunction, cvToJSON } from "@stacks/transactions";
import { STACKS_MAINNET } from "@stacks/network";
import { CONTRACT_ADDRESS, CONTRACT_NAME } from "@/config";

export default function Home() {
  const [totalProps, setTotalProps] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const network = { ...STACKS_MAINNET, fetchFn: fetch };
      
      const result = await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "get-total-props",
        functionArgs: [],
        network,
        senderAddress: CONTRACT_ADDRESS,
      });

      const jsonResult = cvToJSON(result);
      const total = jsonResult.value ? parseInt(jsonResult.value.value) : 0;
      setTotalProps(total);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.hero}>
      {/* Floating decorative icons */}
      <div className={styles.floatingIcon}>🏆</div>
      <div className={styles.floatingIcon}>⭐</div>
      <div className={styles.floatingIcon}>🎯</div>

      <div className={styles.container}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>🚀</span>
          <span>Built on Stacks Blockchain</span>
        </div>

        <h1 className={styles.title}>
          Give <span className={styles.gradientText}>Props</span> to Your Squad
        </h1>

        <p className={styles.subtitle}>
          Recognize contributions, build reputation, and celebrate your team on
          the blockchain. SquadProps makes social recognition transparent,
          permanent, and rewarding.
        </p>

        <div className={styles.ctaButtons}>
          <Link href="/give" className={styles.primaryButton}>
            Give Props Now
          </Link>
          <Link href="/leaderboard" className={styles.secondaryButton}>
            View Leaderboard
          </Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {isLoading ? "..." : totalProps.toLocaleString()}
            </div>
            <div className={styles.statLabel}>Props Given</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {isLoading ? "..." : Math.floor(totalProps / 2)}
            </div>
            <div className={styles.statLabel}>Active Users</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {isLoading ? "..." : Math.floor(totalProps / 10)}
            </div>
            <div className={styles.statLabel}>Top Contributors</div>
          </div>
        </div>
      </div>
    </div>
  );
}
