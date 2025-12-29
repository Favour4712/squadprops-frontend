"use client";

import { useState } from "react";
import styles from "./page.module.css";

type TabType = "all" | "received" | "given";

const historyData = [
  {
    type: "received",
    from: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
    to: "SP1WEKNK5SGNTYM0J8M34FMBM7PTRJSYRWY9C1CGR",
    amount: 5,
    message: "Excellent work on the smart contract deployment! 🚀",
    date: "2 hours ago",
    blockHeight: 123456,
  },
  {
    type: "given",
    from: "SP1WEKNK5SGNTYM0J8M34FMBM7PTRJSYRWY9C1CGR",
    to: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
    amount: 3,
    message: "Thanks for the code review and helpful feedback!",
    date: "5 hours ago",
    blockHeight: 123450,
  },
  {
    type: "received",
    from: "SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF",
    to: "SP1WEKNK5SGNTYM0J8M34FMBM7PTRJSYRWY9C1CGR",
    amount: 2,
    message: "Great documentation updates! 📚",
    date: "1 day ago",
    blockHeight: 123400,
  },
  {
    type: "given",
    from: "SP1WEKNK5SGNTYM0J8M34FMBM7PTRJSYRWY9C1CGR",
    to: "SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C",
    amount: 1,
    message: "Appreciate the help with debugging!",
    date: "2 days ago",
    blockHeight: 123350,
  },
  {
    type: "received",
    from: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335",
    to: "SP1WEKNK5SGNTYM0J8M34FMBM7PTRJSYRWY9C1CGR",
    amount: 4,
    message: "Amazing presentation at the meetup! 🎤",
    date: "3 days ago",
    blockHeight: 123300,
  },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredHistory = historyData.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>📜 Props History</h1>
          <p className={styles.subtitle}>
            View all your props transactions on the blockchain
          </p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Activity
          </button>
          <button
            className={`${styles.tab} ${activeTab === "received" ? styles.active : ""}`}
            onClick={() => setActiveTab("received")}
          >
            Received
          </button>
          <button
            className={`${styles.tab} ${activeTab === "given" ? styles.active : ""}`}
            onClick={() => setActiveTab("given")}
          >
            Given
          </button>
        </div>

        {filteredHistory.length > 0 ? (
          <div className={styles.timeline}>
            {filteredHistory.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemType}>
                    {item.type === "received" ? "📥 Received" : "📤 Given"}
                  </span>
                  <span className={styles.itemDate}>{item.date}</span>
                </div>

                <div className={styles.itemContent}>
                  <div className={styles.itemAddresses}>
                    <span className={styles.address}>
                      {item.from.slice(0, 10)}...{item.from.slice(-8)}
                    </span>
                    <span className={styles.arrow}>→</span>
                    <span className={styles.address}>
                      {item.to.slice(0, 10)}...{item.to.slice(-8)}
                    </span>
                  </div>

                  <div className={styles.itemMessage}>{item.message}</div>
                </div>

                <div className={styles.itemFooter}>
                  <span className={styles.propsAmount}>
                    {item.amount} prop{item.amount > 1 ? "s" : ""}
                  </span>
                  <span>•</span>
                  <span>Block #{item.blockHeight}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <p>No {activeTab !== "all" ? activeTab : ""} props history yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
