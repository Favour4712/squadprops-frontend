import styles from "./page.module.css";

// Mock data for demonstration
const topUsers = [
  {
    rank: 1,
    address: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
    propsReceived: 342,
    propsGiven: 156,
  },
  {
    rank: 2,
    address: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
    propsReceived: 287,
    propsGiven: 203,
  },
  {
    rank: 3,
    address: "SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF",
    propsReceived: 245,
    propsGiven: 178,
  },
];

const otherUsers = [
  {
    rank: 4,
    address: "SP1WEKNK5SGNTYM0J8M34FMBM7PTRJSYRWY9C1CGR",
    propsReceived: 198,
    propsGiven: 142,
  },
  {
    rank: 5,
    address: "SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C",
    propsReceived: 176,
    propsGiven: 134,
  },
  {
    rank: 6,
    address: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335",
    propsReceived: 154,
    propsGiven: 98,
  },
  {
    rank: 7,
    address: "SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS",
    propsReceived: 132,
    propsGiven: 87,
  },
  {
    rank: 8,
    address: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS",
    propsReceived: 118,
    propsGiven: 76,
  },
];

export default function LeaderboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🏆 Leaderboard</h1>
          <p className={styles.subtitle}>
            Top contributors ranked by props received. Keep giving props to climb the ranks!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className={styles.podium}>
          {topUsers.map((user) => (
            <div key={user.rank} className={styles.podiumCard}>
              <div className={styles.rank}>
                {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
              </div>
              <div className={styles.address}>
                {user.address.slice(0, 8)}...{user.address.slice(-6)}
              </div>
              <div className={styles.propsCount}>{user.propsReceived}</div>
              <div className={styles.propsLabel}>Props Received</div>
              <div className={styles.listStats}>
                <span>Given: {user.propsGiven}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining Users */}
        <div className={styles.list}>
          {otherUsers.map((user) => (
            <div key={user.rank} className={styles.listItem}>
              <div className={styles.listRank}>#{user.rank}</div>
              <div className={styles.listInfo}>
                <div className={styles.listAddress}>
                  {user.address.slice(0, 12)}...{user.address.slice(-8)}
                </div>
                <div className={styles.listStats}>
                  <span>Received: {user.propsReceived}</span>
                  <span>•</span>
                  <span>Given: {user.propsGiven}</span>
                </div>
              </div>
              <div className={styles.listPropsCount}>{user.propsReceived}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
