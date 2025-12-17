// API Base URL - now loaded from config.js
const API_BASE_URL = window.API_CONFIG.baseURL;

// Global variables
let currentTransactionType = '';
let currentAccountId = null;
let allAccounts = [];

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    loadAllAccounts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Create account form
    document.getElementById('createAccountForm').addEventListener('submit', handleCreateAccount);
    
    // Transaction form
    document.getElementById('transactionForm').addEventListener('submit', handleTransaction);
    
    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };
}

// Load all accounts
async function loadAllAccounts() {
    try {
        showLoading();
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch accounts');
        }
        
        allAccounts = await response.json();
        displayAccounts(allAccounts);
        updateDashboardStats(allAccounts);
    } catch (error) {
        console.error('Error loading accounts:', error);
        showToast('Failed to load accounts: ' + error.message, 'error');
        displayEmptyState();
    }
}

// Display accounts in table
function displayAccounts(accounts) {
    const tableBody = document.getElementById('accountsTableBody');
    
    if (accounts.length === 0) {
        displayEmptyState();
        return;
    }
    
    tableBody.innerHTML = accounts.map(account => `
        <tr>
            <td class="account-id">#${account.id}</td>
            <td class="account-name">${escapeHtml(account.accountHolderName)}</td>
            <td class="balance-amount">₹${formatCurrency(account.balance)}</td>
            <td>
                <div class="action-buttons-cell">
                    <button class="btn btn-info" onclick="viewAccount(${account.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-success" onclick="openDepositModal(${account.id}, '${escapeHtml(account.accountHolderName)}', ${account.balance})" title="Deposit">
                        <i class="fas fa-plus"></i> Deposit
                    </button>
                    <button class="btn btn-warning" onclick="openWithdrawModal(${account.id}, '${escapeHtml(account.accountHolderName)}', ${account.balance})" title="Withdraw">
                        <i class="fas fa-minus"></i> Withdraw
                    </button>
                    <button class="btn btn-danger" onclick="deleteAccount(${account.id})" title="Delete Account">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Display empty state
function displayEmptyState() {
    const tableBody = document.getElementById('accountsTableBody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="4">
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>No Accounts Found</h3>
                    <p>Create your first account to get started!</p>
                </div>
            </td>
        </tr>
    `;
}

// Show loading state
function showLoading() {
    const tableBody = document.getElementById('accountsTableBody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="loading">
                <i class="fas fa-spinner fa-spin"></i> Loading accounts...
            </td>
        </tr>
    `;
}

// Update dashboard statistics
function updateDashboardStats(accounts) {
    const totalAccounts = accounts.length;
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    const avgBalance = totalAccounts > 0 ? totalBalance / totalAccounts : 0;
    
    document.getElementById('totalAccounts').textContent = totalAccounts;
    document.getElementById('totalBalance').textContent = '₹' + formatCurrency(totalBalance);
    document.getElementById('avgBalance').textContent = '₹' + formatCurrency(avgBalance);
}

// Handle create account
async function handleCreateAccount(e) {
    e.preventDefault();
    
    const accountHolderName = document.getElementById('accountHolderName').value.trim();
    const balance = parseFloat(document.getElementById('initialBalance').value);
    
    if (!accountHolderName || balance < 0) {
        showToast('Please enter valid account details', 'warning');
        return;
    }
    
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountHolderName: accountHolderName,
                balance: balance
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to create account');
        }
        
        const newAccount = await response.json();
        showToast(`Account created successfully for ${newAccount.accountHolderName}!`, 'success');
        closeModal('createModal');
        document.getElementById('createAccountForm').reset();
        loadAllAccounts();
    } catch (error) {
        console.error('Error creating account:', error);
        showToast('Failed to create account: ' + error.message, 'error');
    }
}

// View account details
async function viewAccount(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Account not found');
        }
        
        const account = await response.json();
        
        // Populate modal with account details
        document.getElementById('viewAccountId').textContent = account.id;
        document.getElementById('viewAccountHolder').textContent = account.accountHolderName;
        document.getElementById('viewAccountBalance').textContent = formatCurrency(account.balance);
        
        openModal('viewModal');
    } catch (error) {
        console.error('Error viewing account:', error);
        showToast('Failed to load account details: ' + error.message, 'error');
    }
}

// Open deposit modal
function openDepositModal(id, name, balance) {
    currentTransactionType = 'deposit';
    currentAccountId = id;
    
    document.getElementById('transactionTitle').innerHTML = '<i class="fas fa-arrow-down"></i> Deposit Money';
    document.getElementById('txAccountId').textContent = id;
    document.getElementById('txAccountHolder').textContent = name;
    document.getElementById('txCurrentBalance').textContent = formatCurrency(balance);
    document.getElementById('transactionAmount').value = '';
    
    openModal('transactionModal');
}

// Open withdraw modal
function openWithdrawModal(id, name, balance) {
    currentTransactionType = 'withdraw';
    currentAccountId = id;
    
    document.getElementById('transactionTitle').innerHTML = '<i class="fas fa-arrow-up"></i> Withdraw Money';
    document.getElementById('txAccountId').textContent = id;
    document.getElementById('txAccountHolder').textContent = name;
    document.getElementById('txCurrentBalance').textContent = formatCurrency(balance);
    document.getElementById('transactionAmount').value = '';
    
    openModal('transactionModal');
}

// Handle transaction (deposit/withdraw)
async function handleTransaction(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    
    if (amount <= 0) {
        showToast('Please enter a valid amount', 'warning');
        return;
    }
    
    try {
        const endpoint = `${API_BASE_URL}/${currentAccountId}/${currentTransactionType}`;
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount })
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || `Failed to ${currentTransactionType}`);
        }
        
        const updatedAccount = await response.json();
        showToast(`${currentTransactionType === 'deposit' ? 'Deposited' : 'Withdrawn'} ₹${formatCurrency(amount)} successfully!`, 'success');
        closeModal('transactionModal');
        document.getElementById('transactionForm').reset();
        loadAllAccounts();
    } catch (error) {
        console.error(`Error in ${currentTransactionType}:`, error);
        showToast(`Failed to ${currentTransactionType}: ` + error.message, 'error');
    }
}

// Delete account - open confirmation modal
let accountToDelete = null;

async function deleteAccount(id) {
    try {
        // Fetch account details first
        const response = await fetch(`${API_BASE_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Account not found');
        }
        
        const account = await response.json();
        accountToDelete = id;
        
        // Populate delete confirmation modal
        document.getElementById('deleteAccountId').textContent = account.id;
        document.getElementById('deleteAccountHolder').textContent = account.accountHolderName;
        document.getElementById('deleteAccountBalance').textContent = formatCurrency(account.balance);
        
        openModal('deleteModal');
    } catch (error) {
        console.error('Error loading account for deletion:', error);
        showToast('Failed to load account details: ' + error.message, 'error');
    }
}

// Confirm delete action
async function confirmDelete() {
    if (!accountToDelete) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/${accountToDelete}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete account');
        }
        
        showToast('Account deleted successfully!', 'success');
        closeModal('deleteModal');
        accountToDelete = null;
        loadAllAccounts();
    } catch (error) {
        console.error('Error deleting account:', error);
        showToast('Failed to delete account: ' + error.message, 'error');
    }
}

// Filter accounts based on search
function filterAccounts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayAccounts(allAccounts);
        return;
    }
    
    const filteredAccounts = allAccounts.filter(account => 
        account.id.toString().includes(searchTerm) ||
        account.accountHolderName.toLowerCase().includes(searchTerm)
    );
    
    displayAccounts(filteredAccounts);
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    
    // Set icon based on type
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle" style="color: var(--success-color);"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle" style="color: var(--danger-color);"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle" style="color: var(--warning-color);"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle" style="color: var(--info-color);"></i>';
            break;
    }
    
    toast.innerHTML = icon + '<span>' + message + '</span>';
    toast.className = `toast ${type}`;
    toast.style.display = 'flex';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 4000);
}

// Utility functions
function formatCurrency(amount) {
    return parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
