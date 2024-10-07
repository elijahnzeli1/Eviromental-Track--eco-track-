import { ethers, BrowserProvider } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

const provider = new BrowserProvider(window.ethereum);

export const connectWallet = async () => {
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return signer
}

export const getBalance = async (address: string) => {
  const balance = await provider.getBalance(address)
  return ethers.formatEther(balance)
}

// Function to transfer ERC20 tokens
export const transferTokens = async (tokenAddress: string, recipientAddress: string, amount: string) => {
  const signer = await provider.getSigner()
  const tokenContract = new ethers.Contract(tokenAddress, ['function transfer(address to, uint256 amount)'], signer)
  const transaction = await tokenContract.transfer(recipientAddress, ethers.parseUnits(amount, 18))
  return transaction.wait()
}

// Function to interact with a smart contract
export const interactWithContract = async (contractAddress: string, abi: any[], methodName: string, ...args: any[]) => {
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)
  const transaction = await contract[methodName](...args)
  return transaction.wait()
}

// Function to get ERC20 token balance
export const getTokenBalance = async (tokenAddress: string, accountAddress: string) => {
  const tokenContract = new ethers.Contract(tokenAddress, ['function balanceOf(address) view returns (uint256)'], provider)
  const balance = await tokenContract.balanceOf(accountAddress)
  return ethers.formatUnits(balance, 18)
}

// Function to sign a message
export const signMessage = async (message: string) => {
  const signer = await provider.getSigner()
  return signer.signMessage(message)
}
