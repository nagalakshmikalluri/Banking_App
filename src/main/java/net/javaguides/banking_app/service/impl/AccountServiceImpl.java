package net.javaguides.banking_app.service.impl;

import net.javaguides.banking_app.dto.AccountDto;
import net.javaguides.banking_app.entity.Account;
import net.javaguides.banking_app.exception.AccountException;
import net.javaguides.banking_app.mapper.AccountMapper;
import net.javaguides.banking_app.repository.AccountRepository;
import net.javaguides.banking_app.service.AccountService;
import org.springframework.stereotype.Service;

import java.nio.channels.AcceptPendingException;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.mapToAccount(accountDto);
        
        // Find the lowest available ID
        Long nextId = findLowestAvailableId();
        account.setId(nextId);
        
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }
    
    private Long findLowestAvailableId() {
        List<Account> allAccounts = accountRepository.findAll();
        
        // If no accounts exist, start with ID 1
        if (allAccounts.isEmpty()) {
            return 1L;
        }
        
        // Sort accounts by ID
        List<Long> existingIds = allAccounts.stream()
                .map(Account::getId)
                .sorted()
                .collect(Collectors.toList());
        
        // Find the first gap in the sequence
        Long expectedId = 1L;
        for (Long existingId : existingIds) {
            if (!existingId.equals(expectedId)) {
                return expectedId;
            }
            expectedId++;
        }
        
        // No gaps found, return next sequential ID
        return expectedId;
    }

    @Override
    public AccountDto getAccountById(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountException("Account not found"));
        return AccountMapper.mapToAccountDto(account);
    }

    @Override
    public AccountDto deposit(Long id, Double amount) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountException("Account not found"));

        account.setBalance(account.getBalance() + amount);
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto withdraw(Long id, Double amount) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountException("Account not found"));

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient amount");
        }

        account.setBalance(account.getBalance() - amount);
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public List<AccountDto> getAllAccounts() {

        List<Account> accounts = accountRepository.findAll();
        return accounts.stream().map((account) -> AccountMapper.mapToAccountDto(account))
                .collect(Collectors.toList());

    }

    @Override
    public void deleteAccount(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountException("Account not found"));

        accountRepository.deleteById(id);
    }
}
