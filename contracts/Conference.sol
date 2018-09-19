pragma solidity ^0.4.24;

contract Conference {// can be killed, so the owner gets sent the money in the end

    address public organizer;
    mapping(address => uint) public registrantsPaid;
    uint public numRegistrants;
    uint public quota;

    event Deposit(address _from, uint _amount); // so you can log the event
    event Refund(address _to, uint _amount); // so you can log the event

    constructor() public{
        organizer = msg.sender;
        quota = 100;
        numRegistrants = 0;
    }

    function buyTicket() public payable {
        require(numRegistrants < quota);
        registrantsPaid[msg.sender] = msg.value;
        numRegistrants++;
        emit Deposit(msg.sender, msg.value);
    }

    function changeQuota(uint newquota) public {
        if (msg.sender != organizer) {return;}
        quota = newquota;
    }

    function refundTicket(address recipient, uint amount) public {
        if (msg.sender != organizer) {return;}
        if (registrantsPaid[recipient] == amount) {
            address myAddress = this;
            if (myAddress.balance >= amount) {
                recipient.transfer(amount);
                emit Refund(recipient, amount);
                registrantsPaid[recipient] = 0;
                numRegistrants--;
            }
        }
        return;
    }

    function destroy() public {
        if (msg.sender == organizer) {// without this funds could be locked in the contract forever!
            selfdestruct(organizer);
        }
    }
}
