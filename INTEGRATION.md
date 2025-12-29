# SquadProps Frontend - Stacks Integration Guide

## 🎉 Integration Complete!

The SquadProps frontend is now fully integrated with the Stacks blockchain and your deployed smart contract.

## ✅ What's Been Integrated

### 1. Stacks Context Provider

Created [`src/contexts/StacksContext.tsx`](file:///home/mrwicks/Desktop/MyDesktop/squadprops/squadprops-frontend/src/contexts/StacksContext.tsx) with:

**Wallet Functions:**
- `connectWallet()` - Opens Hiro/Leather wallet connection dialog
- `disconnectWallet()` - Signs user out
- `isConnected` - Boolean wallet connection status
- `address` - User's Stacks mainnet address

**Contract Write Functions:**
- `giveProps(recipient, message)` - Give 1 prop
- `giveMultipleProps(recipient, amount, message)` - Give multiple props

**Contract Read Functions:**
- `getPropsReceived(address)` - Get props received count
- `getPropsGiven(address)` - Get props given count
- `getTotalProps()` - Get total system props
- `getUserStats(address)` - Get comprehensive user stats
- `getUserHistory(address)` - Get user's props history (array of IDs)
- `getPropsById(id)` - Get specific props details

### 2. Updated Components

#### Navbar ([`Navbar.tsx`](file:///home/mrwicks/Desktop/MyDesktop/squadprops/squadprops-frontend/src/components/layout/Navbar.tsx))
- ✅ Connect/Disconnect wallet button
- ✅ Shows truncated address when connected
- ✅ Mobile-responsive wallet controls

#### Homepage ([`page.tsx`](file:///home/mrwicks/Desktop/MyDesktop/squadprops/squadprops-frontend/src/app/page.tsx))
- ✅ Fetches real total props from contract
- ✅ Calculates estimated active users
- ✅ Loading states for stats

#### Give Props Page ([`give/page.tsx`](file:///home/mrwicks/Desktop/MyDesktop/squadprops/squadprops-frontend/src/app/give/page.tsx))
- ✅ Wallet connection check
- ✅ Real contract calls for giving props
- ✅ Fetches user's received props history
- ✅ Loading and submitting states
- ✅ Transaction ID display
- ✅ Form validation

## 🔧 Contract Configuration

The integration connects to your deployed mainnet contract:

```typescript
const CONTRACT_ADDRESS = "SP1WEKNK5SGNTYM0J8M34FMBM7PTRJSYRWY9C1CGR";
const CONTRACT_NAME = "squadprops";
```

## 🚀 How to Use

### 1. Start the Dev Server

```bash
cd squadprops-frontend
npm run dev
```

Visit: **http://localhost:3001**

### 2. Connect Your Wallet

1. Click "Connect Wallet" in the navbar
2. Choose Hiro Wallet or Leather
3. Approve the connection
4. Your address will appear in the navbar

### 3. Give Props

1. Navigate to "Give Props" page
2. Enter recipient's Stacks address
3. Select amount (1-10 props)
4. Write a message (max 500 chars)
5. Click "Give Props"
6. Approve transaction in wallet
7. Wait for confirmation

### 4. View Stats

- Homepage shows total props from the contract
- Leaderboard (currently mock data - ready for integration)
- History (currently mock data - ready for integration)

## 📝 Wallet Integration Details

### Supported Wallets

- **Hiro Wallet** (Browser extension)
- **Leather** (Browser extension)
- Any Stacks-compatible wallet

### Authentication Flow

```typescript
// User clicks "Connect Wallet"
showConnect({
  appDetails: {
    name: "SquadProps",
    icon: "/icon.png",
  },
  onFinish: () => {
    // User authenticated
    // Address available in context
  },
  userSession,
});
```

### Transaction Flow

```typescript
// 1. User submits form
const txId = await giveProps(recipient, message);

// 2. Wallet popup appears
// 3. User approves transaction
// 4. Transaction broadcasts to network
// 5. TxID returned

// 6. Track on explorer:
// https://explorer.hiro.so/txid/<txId>?chain=mainnet
```

## 🎨 User Experience Features

### Loading States
- "..." while fetching stats
- "Sending..." during transaction
- "Loading..." for history

### Error Handling
- Wallet not connected alerts
- Transaction failure messages
- Network error handling

### Success Feedback
- Transaction ID display
- Auto-refresh history after 3 seconds
- Form reset on success

## 🔄 Next Steps for Full Integration

### 1. Leaderboard Page
Update [`leaderboard/page.tsx`](file:///home/mrwicks/Desktop/MyDesktop/squadprops/squadprops-frontend/src/app/leaderboard/page.tsx):

```typescript
// Fetch all users and sort by props received
const users = await fetchAllUsers(); // Implement this
const sorted = users.sort((a, b) => b.propsReceived - a.propsReceived);
```

### 2. History Page
Update [`history/page.tsx`](file:///home/mrwicks/Desktop/MyDesktop/squadprops/squadprops-frontend/src/app/history/page.tsx):

```typescript
const { getUserHistory, getPropsById } = useStacks();

// Fetch user's history
const historyIds = await getUserHistory(address);
const propsDetails = await Promise.all(
  historyIds.map(id => getPropsById(id))
);
```

### 3. User Profile Pages
Create `/profile/[address]/page.tsx`:
- Show user's stats
- Display props given/received
- Show history timeline

### 4. Real-time Updates
Add polling or websockets:
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    loadStats();
  }, 30000); // Refresh every 30s
  
  return () => clearInterval(interval);
}, []);
```

### 5. Transaction Status Tracking
Integrate with Stacks API:
```typescript
const checkTxStatus = async (txId: string) => {
  const response = await fetch(
    `https://api.mainnet.hiro.so/extended/v1/tx/${txId}`
  );
  const data = await response.json();
  return data.tx_status; // 'pending' | 'success' | 'failed'
};
```

## 🐛 Troubleshooting

### Wallet Won't Connect
- Ensure Hiro Wallet or Leather is installed
- Check browser console for errors
- Try refreshing the page

### Transaction Fails
- Check STX balance for fees (~0.01 STX)
- Verify recipient address is valid
- Ensure message is under 500 characters

### Stats Not Loading
- Check network connection
- Verify contract is deployed on mainnet
- Check browser console for API errors

## 📊 Contract Functions Reference

### Write Functions (Require Wallet)

```typescript
// Give single prop
await giveProps(
  "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
  "Great work!"
);

// Give multiple props
await giveMultipleProps(
  "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
  5,
  "Amazing contribution!"
);
```

### Read Functions (No Wallet Required)

```typescript
// Get total props in system
const total = await getTotalProps();

// Get user stats
const stats = await getUserStats(address);
// Returns: { props-received, props-given, first-props-block }

// Get user history
const history = await getUserHistory(address);
// Returns: [0, 1, 2, 3] (props IDs)

// Get props details
const props = await getPropsById(0);
// Returns: { giver, receiver, message, timestamp, amount }
```

## 🎯 Current Status

✅ **Fully Functional:**
- Wallet connection/disconnection
- Give props (single and multiple)
- Fetch total props
- Fetch user history
- Display received props

⏳ **Ready for Integration:**
- Leaderboard with real data
- History page with real data
- User profiles
- Search functionality

🔮 **Future Enhancements:**
- Notifications for received props
- Social sharing
- Props analytics dashboard
- Reputation badges

## 🔐 Security Notes

- Never commit private keys
- Always validate user input
- Use post-conditions for STX transfers
- Test on testnet before mainnet

## 📱 Mobile Support

The app is fully responsive and works on:
- Desktop browsers
- Mobile browsers
- Tablet devices

Wallet connection works via:
- Browser extensions (desktop)
- Mobile wallet apps (via WalletConnect - future)

---

**Integration Complete!** 🎉

The SquadProps frontend is now connected to your deployed smart contract on Stacks mainnet. Users can connect their wallets and start giving props!

**Test it now:** http://localhost:3001
