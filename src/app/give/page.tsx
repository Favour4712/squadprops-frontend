"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useConnect } from "@stacks/connect-react";
import { userSession, CONTRACT_ADDRESS, CONTRACT_NAME } from "@/config";
import { stringUtf8CV, uintCV, principalCV, fetchCallReadOnlyFunction, cvToJSON } from "@stacks/transactions";
import { STACKS_MAINNET } from "@stacks/network";

export default function GivePropsPage() {
  const { doContractCall } = useConnect();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentProps, setRecentProps] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    if (userSession && userSession.isUserSignedIn()) {
      setIsSignedIn(true);
      const userData = userSession.loadUserData();
      const address = userData.profile?.stxAddress?.mainnet || '';
      setUserAddress(address);
      if (address) {
        loadRecentProps(address);
      }
    }
  }, []);

  const loadRecentProps = async (address: string) => {
    setIsLoadingHistory(true);
    try {
      const network = { ...STACKS_MAINNET, fetchFn: fetch };
      
      // Get user history
      const historyResult = await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "get-user-history",
        functionArgs: [principalCV(address)],
        network,
        senderAddress: address,
      });

      const historyJSON = cvToJSON(historyResult);
      const historyIds = historyJSON.value?.value || [];
      
      // Fetch details for the last 3 props
      const propsPromises = historyIds.slice(-3).reverse().map(async (id: any) => {
        const propsResult = await fetchCallReadOnlyFunction({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: "get-props-by-id",
          functionArgs: [uintCV(parseInt(id.value))],
          network,
          senderAddress: CONTRACT_ADDRESS,
        });
        return cvToJSON(propsResult);
      });
      
      const propsDetails = await Promise.all(propsPromises);
      setRecentProps(propsDetails.filter(p => p.value?.value));
    } catch (error) {
      console.error("Error loading props history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!recipient || !message) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    const functionName = amount === 1 ? "give-props" : "give-multiple-props";
    const functionArgs = amount === 1 
      ? [principalCV(recipient), stringUtf8CV(message)]
      : [principalCV(recipient), uintCV(amount), stringUtf8CV(message)];

    doContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName,
      functionArgs,
      onFinish: (data) => {
        console.log('Transaction finished:', data);
        alert(`Props sent successfully! Transaction ID: ${data.txId}`);
        
        // Reset form
        setRecipient("");
        setMessage("");
        setAmount(1);
        setIsSubmitting(false);
        
        // Reload history after a delay
        if (userAddress) {
          setTimeout(() => loadRecentProps(userAddress), 3000);
        }
      },
      onCancel: () => {
        console.log('Transaction canceled');
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🎯 Give Props</h1>
          <p className={styles.subtitle}>
            Recognize someone's contribution and build their reputation on-chain
          </p>
        </div>

        {!isSignedIn && (
          <div className={styles.formCard}>
            <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
              Please connect your wallet to give props
            </p>
          </div>
        )}

        {isSignedIn && (
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Recipient Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <p className={styles.helpText}>
                  Enter the Stacks address of the person you want to give props to
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Number of Props <span className={styles.required}>*</span>
                </label>
                <div className={styles.amountSelector}>
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`${styles.amountButton} ${
                        amount === num ? styles.active : ""
                      }`}
                      onClick={() => setAmount(num)}
                      disabled={isSubmitting}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className={styles.helpText}>
                  Select how many props you want to give (1-10)
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Write a message to explain why you're giving props..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  required
                  disabled={isSubmitting}
                />
                <p className={styles.helpText}>
                  {message.length}/500 characters
                </p>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? "Sending..." 
                  : `Give ${amount} Prop${amount > 1 ? "s" : ""} 🎉`
                }
              </button>
            </form>
          </div>
        )}

        {isSignedIn && (
          <div className={styles.recentProps}>
            <h2 className={styles.recentTitle}>Recent Props You Received</h2>
            {isLoadingHistory ? (
              <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
                Loading...
              </p>
            ) : recentProps.length > 0 ? (
              <div className={styles.propsList}>
                {recentProps.map((props, index) => (
                  <div key={index} className={styles.propsItem}>
                    <div className={styles.propsHeader}>
                      <span className={styles.propsFrom}>
                        From: {props.value.value.giver.value.slice(0, 10)}...{props.value.value.giver.value.slice(-8)}
                      </span>
                      <span className={styles.propsAmount}>
                        +{props.value.value.amount.value} prop{props.value.value.amount.value > 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className={styles.propsMessage}>{props.value.value.message.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
                No props received yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
