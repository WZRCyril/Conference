var accounts, account;
var myConferenceInstance;
var Conference = TruffleContract({
    "contractName": "Conference",
    "abi": [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "registrantsPaid",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "organizer",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "quota",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "numRegistrants",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "Deposit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "Refund",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "buyTicket",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newquota",
                    "type": "uint256"
                }
            ],
            "name": "changeQuota",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "refundTicket",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "destroy",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506064600381905550600060028190555061064c806100706000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313381fbf1461009357806361203265146100ea578063705099b91461014157806383197ef01461018e578063a977c71e146101a5578063cebe09c9146101d2578063ec3a6f73146101fd578063edca914c14610228575b600080fd5b34801561009f57600080fd5b506100d4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610232565b6040518082815260200191505060405180910390f35b3480156100f657600080fd5b506100ff61024a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561014d57600080fd5b5061018c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061026f565b005b34801561019a57600080fd5b506101a3610448565b005b3480156101b157600080fd5b506101d0600480360381019080803590602001909291905050506104d9565b005b3480156101de57600080fd5b506101e761053f565b6040518082815260200191505060405180910390f35b34801561020957600080fd5b50610212610545565b6040518082815260200191505060405180910390f35b61023061054b565b005b60016020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102cc57610443565b81600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141561044257309050818173ffffffffffffffffffffffffffffffffffffffff1631101515610441578273ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f1935050505015801561037c573d6000803e3d6000fd5b507fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d8383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600260008154809291906001900391905055505b5b5b505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156104d7576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105345761053c565b806003819055505b50565b60035481565b60025481565b60035460025410151561055d57600080fd5b34600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506002600081548092919060010191905055507fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c3334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15600a165627a7a72305820a5baa835a06ed27e61f8a98a87cb346959e95cbb1af5cadbc22145dc6d8d747f0029",
    "deployedBytecode": "0x60806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313381fbf1461009357806361203265146100ea578063705099b91461014157806383197ef01461018e578063a977c71e146101a5578063cebe09c9146101d2578063ec3a6f73146101fd578063edca914c14610228575b600080fd5b34801561009f57600080fd5b506100d4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610232565b6040518082815260200191505060405180910390f35b3480156100f657600080fd5b506100ff61024a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561014d57600080fd5b5061018c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061026f565b005b34801561019a57600080fd5b506101a3610448565b005b3480156101b157600080fd5b506101d0600480360381019080803590602001909291905050506104d9565b005b3480156101de57600080fd5b506101e761053f565b6040518082815260200191505060405180910390f35b34801561020957600080fd5b50610212610545565b6040518082815260200191505060405180910390f35b61023061054b565b005b60016020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102cc57610443565b81600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141561044257309050818173ffffffffffffffffffffffffffffffffffffffff1631101515610441578273ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f1935050505015801561037c573d6000803e3d6000fd5b507fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d8383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600260008154809291906001900391905055505b5b5b505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156104d7576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105345761053c565b806003819055505b50565b60035481565b60025481565b60035460025410151561055d57600080fd5b34600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506002600081548092919060010191905055507fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c3334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15600a165627a7a72305820a5baa835a06ed27e61f8a98a87cb346959e95cbb1af5cadbc22145dc6d8d747f0029",
    "sourceMap": "26:1485:0:-;;;403:108;8:9:-1;5:2;;;30:1;27;20:12;5:2;403:108:0;445:10;433:9;;:22;;;;;;;;;;;;;;;;;;473:3;465:5;:11;;;;503:1;486:14;:18;;;;26:1485;;;;;;",
    "deployedSourceMap": "26:1485:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;144:47;;8:9:-1;5:2;;;30:1;27;20:12;5:2;144:47:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;114:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;114:24:0;;;;;;;;;;;;;;;;;;;;;;;;;;;856:466;;8:9:-1;5:2;;;30:1;27;20:12;5:2;856:466:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1328:181;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1328:181:0;;;;;;727:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;727:123:0;;;;;;;;;;;;;;;;;;;;;;;;;;229:17;;8:9:-1;5:2;;;30:1;27;20:12;5:2;229:17:0;;;;;;;;;;;;;;;;;;;;;;;197:26;;8:9:-1;5:2;;;30:1;27;20:12;5:2;197:26:0;;;;;;;;;;;;;;;;;;;;;;;517:204;;;;;;144:47;;;;;;;;;;;;;;;;;:::o;114:24::-;;;;;;;;;;;;;:::o;856:466::-;1030:17;945:9;;;;;;;;;;;931:23;;:10;:23;;;;927:38;;;957:7;;927:38;1008:6;978:15;:26;994:9;978:26;;;;;;;;;;;;;;;;:36;974:326;;;1050:4;1030:24;;1093:6;1072:9;:17;;;:27;;1068:222;;;1119:9;:18;;:26;1138:6;1119:26;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1119:26:0;1168:25;1175:9;1186:6;1168:25;;;;;;;;;;;;;;;;;;;;;;;;;;;;1240:1;1211:15;:26;1227:9;1211:26;;;;;;;;;;;;;;;:30;;;;1259:14;;:16;;;;;;;;;;;;;;1068:222;974:326;856:466;;;;:::o;1328:181::-;1382:9;;;;;;;;;;;1368:23;;:10;:23;;;1364:139;;;1482:9;;;;;;;;;;;1469:23;;;1364:139;1328:181::o;727:123::-;798:9;;;;;;;;;;;784:23;;:10;:23;;;;780:38;;;810:7;;780:38;835:8;827:5;:16;;;;727:123;;:::o;229:17::-;;;;:::o;197:26::-;;;;:::o;517:204::-;588:5;;571:14;;:22;563:31;;;;;;;;634:9;604:15;:27;620:10;604:27;;;;;;;;;;;;;;;:39;;;;653:14;;:16;;;;;;;;;;;;;684:30;692:10;704:9;684:30;;;;;;;;;;;;;;;;;;;;;;;;;;;;517:204::o",
    "source": "pragma solidity ^0.4.24;\n\ncontract Conference {// can be killed, so the owner gets sent the money in the end\n\n    address public organizer;\n    mapping(address => uint) public registrantsPaid;\n    uint public numRegistrants;\n    uint public quota;\n\n    event Deposit(address _from, uint _amount); // so you can log the event\n    event Refund(address _to, uint _amount); // so you can log the event\n\n    constructor() public{\n        organizer = msg.sender;\n        quota = 100;\n        numRegistrants = 0;\n    }\n\n    function buyTicket() public payable {\n        require(numRegistrants < quota);\n        registrantsPaid[msg.sender] = msg.value;\n        numRegistrants++;\n        emit Deposit(msg.sender, msg.value);\n    }\n\n    function changeQuota(uint newquota) public {\n        if (msg.sender != organizer) {return;}\n        quota = newquota;\n    }\n\n    function refundTicket(address recipient, uint amount) public {\n        if (msg.sender != organizer) {return;}\n        if (registrantsPaid[recipient] == amount) {\n            address myAddress = this;\n            if (myAddress.balance >= amount) {\n                recipient.transfer(amount);\n                emit Refund(recipient, amount);\n                registrantsPaid[recipient] = 0;\n                numRegistrants--;\n            }\n        }\n        return;\n    }\n\n    function destroy() public {\n        if (msg.sender == organizer) {// without this funds could be locked in the contract forever!\n            selfdestruct(organizer);\n        }\n    }\n}\n",
    "sourcePath": "/Users/cyril/Desktop/conference/contracts/Conference.sol",
    "ast": {
        "absolutePath": "/Users/cyril/Desktop/conference/contracts/Conference.sol",
        "exportedSymbols": {
            "Conference": [
                153
            ]
        },
        "id": 154,
        "nodeType": "SourceUnit",
        "nodes": [
            {
                "id": 1,
                "literals": [
                    "solidity",
                    "^",
                    "0.4",
                    ".24"
                ],
                "nodeType": "PragmaDirective",
                "src": "0:24:0"
            },
            {
                "baseContracts": [],
                "contractDependencies": [],
                "contractKind": "contract",
                "documentation": null,
                "fullyImplemented": true,
                "id": 153,
                "linearizedBaseContracts": [
                    153
                ],
                "name": "Conference",
                "nodeType": "ContractDefinition",
                "nodes": [
                    {
                        "constant": false,
                        "id": 3,
                        "name": "organizer",
                        "nodeType": "VariableDeclaration",
                        "scope": 153,
                        "src": "114:24:0",
                        "stateVariable": true,
                        "storageLocation": "default",
                        "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                        },
                        "typeName": {
                            "id": 2,
                            "name": "address",
                            "nodeType": "ElementaryTypeName",
                            "src": "114:7:0",
                            "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                            }
                        },
                        "value": null,
                        "visibility": "public"
                    },
                    {
                        "constant": false,
                        "id": 7,
                        "name": "registrantsPaid",
                        "nodeType": "VariableDeclaration",
                        "scope": 153,
                        "src": "144:47:0",
                        "stateVariable": true,
                        "storageLocation": "default",
                        "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                            "typeString": "mapping(address => uint256)"
                        },
                        "typeName": {
                            "id": 6,
                            "keyType": {
                                "id": 4,
                                "name": "address",
                                "nodeType": "ElementaryTypeName",
                                "src": "152:7:0",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                }
                            },
                            "nodeType": "Mapping",
                            "src": "144:24:0",
                            "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                "typeString": "mapping(address => uint256)"
                            },
                            "valueType": {
                                "id": 5,
                                "name": "uint",
                                "nodeType": "ElementaryTypeName",
                                "src": "163:4:0",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                }
                            }
                        },
                        "value": null,
                        "visibility": "public"
                    },
                    {
                        "constant": false,
                        "id": 9,
                        "name": "numRegistrants",
                        "nodeType": "VariableDeclaration",
                        "scope": 153,
                        "src": "197:26:0",
                        "stateVariable": true,
                        "storageLocation": "default",
                        "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                        },
                        "typeName": {
                            "id": 8,
                            "name": "uint",
                            "nodeType": "ElementaryTypeName",
                            "src": "197:4:0",
                            "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                            }
                        },
                        "value": null,
                        "visibility": "public"
                    },
                    {
                        "constant": false,
                        "id": 11,
                        "name": "quota",
                        "nodeType": "VariableDeclaration",
                        "scope": 153,
                        "src": "229:17:0",
                        "stateVariable": true,
                        "storageLocation": "default",
                        "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                        },
                        "typeName": {
                            "id": 10,
                            "name": "uint",
                            "nodeType": "ElementaryTypeName",
                            "src": "229:4:0",
                            "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                            }
                        },
                        "value": null,
                        "visibility": "public"
                    },
                    {
                        "anonymous": false,
                        "documentation": null,
                        "id": 17,
                        "name": "Deposit",
                        "nodeType": "EventDefinition",
                        "parameters": {
                            "id": 16,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 13,
                                    "indexed": false,
                                    "name": "_from",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 17,
                                    "src": "267:13:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 12,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "267:7:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 15,
                                    "indexed": false,
                                    "name": "_amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 17,
                                    "src": "282:12:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 14,
                                        "name": "uint",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "282:4:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "266:29:0"
                        },
                        "src": "253:43:0"
                    },
                    {
                        "anonymous": false,
                        "documentation": null,
                        "id": 23,
                        "name": "Refund",
                        "nodeType": "EventDefinition",
                        "parameters": {
                            "id": 22,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 19,
                                    "indexed": false,
                                    "name": "_to",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 23,
                                    "src": "342:11:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 18,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "342:7:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 21,
                                    "indexed": false,
                                    "name": "_amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 23,
                                    "src": "355:12:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 20,
                                        "name": "uint",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "355:4:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "341:27:0"
                        },
                        "src": "329:40:0"
                    },
                    {
                        "body": {
                            "id": 39,
                            "nodeType": "Block",
                            "src": "423:88:0",
                            "statements": [
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 29,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "id": 26,
                                            "name": "organizer",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 3,
                                            "src": "433:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 27,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "445:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 28,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "sender",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "445:10:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "src": "433:22:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "id": 30,
                                    "nodeType": "ExpressionStatement",
                                    "src": "433:22:0"
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 33,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "id": 31,
                                            "name": "quota",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 11,
                                            "src": "465:5:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "hexValue": "313030",
                                            "id": 32,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "number",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "473:3:0",
                                            "subdenomination": null,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_rational_100_by_1",
                                                "typeString": "int_const 100"
                                            },
                                            "value": "100"
                                        },
                                        "src": "465:11:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 34,
                                    "nodeType": "ExpressionStatement",
                                    "src": "465:11:0"
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 37,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "id": 35,
                                            "name": "numRegistrants",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 9,
                                            "src": "486:14:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "hexValue": "30",
                                            "id": 36,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "number",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "503:1:0",
                                            "subdenomination": null,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_rational_0_by_1",
                                                "typeString": "int_const 0"
                                            },
                                            "value": "0"
                                        },
                                        "src": "486:18:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 38,
                                    "nodeType": "ExpressionStatement",
                                    "src": "486:18:0"
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 40,
                        "implemented": true,
                        "isConstructor": true,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 24,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "414:2:0"
                        },
                        "payable": false,
                        "returnParameters": {
                            "id": 25,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "423:0:0"
                        },
                        "scope": 153,
                        "src": "403:108:0",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "public"
                    },
                    {
                        "body": {
                            "id": 67,
                            "nodeType": "Block",
                            "src": "553:168:0",
                            "statements": [
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "arguments": [
                                            {
                                                "argumentTypes": null,
                                                "commonType": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "id": 46,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "leftExpression": {
                                                    "argumentTypes": null,
                                                    "id": 44,
                                                    "name": "numRegistrants",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 9,
                                                    "src": "571:14:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "nodeType": "BinaryOperation",
                                                "operator": "<",
                                                "rightExpression": {
                                                    "argumentTypes": null,
                                                    "id": 45,
                                                    "name": "quota",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 11,
                                                    "src": "588:5:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "src": "571:22:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_bool",
                                                    "typeString": "bool"
                                                }
                                            }
                                        ],
                                        "expression": {
                                            "argumentTypes": [
                                                {
                                                    "typeIdentifier": "t_bool",
                                                    "typeString": "bool"
                                                }
                                            ],
                                            "id": 43,
                                            "name": "require",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [
                                                228,
                                                229
                                            ],
                                            "referencedDeclaration": 228,
                                            "src": "563:7:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                                                "typeString": "function (bool) pure"
                                            }
                                        },
                                        "id": 47,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "kind": "functionCall",
                                        "lValueRequested": false,
                                        "names": [],
                                        "nodeType": "FunctionCall",
                                        "src": "563:31:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_tuple$__$",
                                            "typeString": "tuple()"
                                        }
                                    },
                                    "id": 48,
                                    "nodeType": "ExpressionStatement",
                                    "src": "563:31:0"
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 55,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "baseExpression": {
                                                "argumentTypes": null,
                                                "id": 49,
                                                "name": "registrantsPaid",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 7,
                                                "src": "604:15:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                                    "typeString": "mapping(address => uint256)"
                                                }
                                            },
                                            "id": 52,
                                            "indexExpression": {
                                                "argumentTypes": null,
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "id": 50,
                                                    "name": "msg",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 225,
                                                    "src": "620:3:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_magic_message",
                                                        "typeString": "msg"
                                                    }
                                                },
                                                "id": 51,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "sender",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": null,
                                                "src": "620:10:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            "isConstant": false,
                                            "isLValue": true,
                                            "isPure": false,
                                            "lValueRequested": true,
                                            "nodeType": "IndexAccess",
                                            "src": "604:27:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 53,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "634:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 54,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "value",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "634:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "src": "604:39:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 56,
                                    "nodeType": "ExpressionStatement",
                                    "src": "604:39:0"
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 58,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "nodeType": "UnaryOperation",
                                        "operator": "++",
                                        "prefix": false,
                                        "src": "653:16:0",
                                        "subExpression": {
                                            "argumentTypes": null,
                                            "id": 57,
                                            "name": "numRegistrants",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 9,
                                            "src": "653:14:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 59,
                                    "nodeType": "ExpressionStatement",
                                    "src": "653:16:0"
                                },
                                {
                                    "eventCall": {
                                        "argumentTypes": null,
                                        "arguments": [
                                            {
                                                "argumentTypes": null,
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "id": 61,
                                                    "name": "msg",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 225,
                                                    "src": "692:3:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_magic_message",
                                                        "typeString": "msg"
                                                    }
                                                },
                                                "id": 62,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "sender",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": null,
                                                "src": "692:10:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            {
                                                "argumentTypes": null,
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "id": 63,
                                                    "name": "msg",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 225,
                                                    "src": "704:3:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_magic_message",
                                                        "typeString": "msg"
                                                    }
                                                },
                                                "id": 64,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "value",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": null,
                                                "src": "704:9:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                }
                                            }
                                        ],
                                        "expression": {
                                            "argumentTypes": [
                                                {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                },
                                                {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                }
                                            ],
                                            "id": 60,
                                            "name": "Deposit",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 17,
                                            "src": "684:7:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_uint256_$returns$__$",
                                                "typeString": "function (address,uint256)"
                                            }
                                        },
                                        "id": 65,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "kind": "functionCall",
                                        "lValueRequested": false,
                                        "names": [],
                                        "nodeType": "FunctionCall",
                                        "src": "684:30:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_tuple$__$",
                                            "typeString": "tuple()"
                                        }
                                    },
                                    "id": 66,
                                    "nodeType": "EmitStatement",
                                    "src": "679:35:0"
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 68,
                        "implemented": true,
                        "isConstructor": false,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "buyTicket",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 41,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "535:2:0"
                        },
                        "payable": true,
                        "returnParameters": {
                            "id": 42,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "553:0:0"
                        },
                        "scope": 153,
                        "src": "517:204:0",
                        "stateMutability": "payable",
                        "superFunction": null,
                        "visibility": "public"
                    },
                    {
                        "body": {
                            "id": 84,
                            "nodeType": "Block",
                            "src": "770:80:0",
                            "statements": [
                                {
                                    "condition": {
                                        "argumentTypes": null,
                                        "commonType": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        },
                                        "id": 76,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftExpression": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 73,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "784:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 74,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "sender",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "784:10:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "nodeType": "BinaryOperation",
                                        "operator": "!=",
                                        "rightExpression": {
                                            "argumentTypes": null,
                                            "id": 75,
                                            "name": "organizer",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 3,
                                            "src": "798:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "src": "784:23:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "falseBody": null,
                                    "id": 79,
                                    "nodeType": "IfStatement",
                                    "src": "780:38:0",
                                    "trueBody": {
                                        "id": 78,
                                        "nodeType": "Block",
                                        "src": "809:9:0",
                                        "statements": [
                                            {
                                                "expression": null,
                                                "functionReturnParameters": 72,
                                                "id": 77,
                                                "nodeType": "Return",
                                                "src": "810:7:0"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 82,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "id": 80,
                                            "name": "quota",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 11,
                                            "src": "827:5:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "id": 81,
                                            "name": "newquota",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 70,
                                            "src": "835:8:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "src": "827:16:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 83,
                                    "nodeType": "ExpressionStatement",
                                    "src": "827:16:0"
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 85,
                        "implemented": true,
                        "isConstructor": false,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "changeQuota",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 71,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 70,
                                    "name": "newquota",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 85,
                                    "src": "748:13:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 69,
                                        "name": "uint",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "748:4:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "747:15:0"
                        },
                        "payable": false,
                        "returnParameters": {
                            "id": 72,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "770:0:0"
                        },
                        "scope": 153,
                        "src": "727:123:0",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "public"
                    },
                    {
                        "body": {
                            "id": 137,
                            "nodeType": "Block",
                            "src": "917:405:0",
                            "statements": [
                                {
                                    "condition": {
                                        "argumentTypes": null,
                                        "commonType": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        },
                                        "id": 95,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftExpression": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 92,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "931:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 93,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "sender",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "931:10:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "nodeType": "BinaryOperation",
                                        "operator": "!=",
                                        "rightExpression": {
                                            "argumentTypes": null,
                                            "id": 94,
                                            "name": "organizer",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 3,
                                            "src": "945:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "src": "931:23:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "falseBody": null,
                                    "id": 98,
                                    "nodeType": "IfStatement",
                                    "src": "927:38:0",
                                    "trueBody": {
                                        "id": 97,
                                        "nodeType": "Block",
                                        "src": "956:9:0",
                                        "statements": [
                                            {
                                                "expression": null,
                                                "functionReturnParameters": 91,
                                                "id": 96,
                                                "nodeType": "Return",
                                                "src": "957:7:0"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "condition": {
                                        "argumentTypes": null,
                                        "commonType": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "id": 103,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftExpression": {
                                            "argumentTypes": null,
                                            "baseExpression": {
                                                "argumentTypes": null,
                                                "id": 99,
                                                "name": "registrantsPaid",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 7,
                                                "src": "978:15:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                                    "typeString": "mapping(address => uint256)"
                                                }
                                            },
                                            "id": 101,
                                            "indexExpression": {
                                                "argumentTypes": null,
                                                "id": 100,
                                                "name": "recipient",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 87,
                                                "src": "994:9:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            "isConstant": false,
                                            "isLValue": true,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "nodeType": "IndexAccess",
                                            "src": "978:26:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "BinaryOperation",
                                        "operator": "==",
                                        "rightExpression": {
                                            "argumentTypes": null,
                                            "id": 102,
                                            "name": "amount",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 89,
                                            "src": "1008:6:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "src": "978:36:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "falseBody": null,
                                    "id": 135,
                                    "nodeType": "IfStatement",
                                    "src": "974:326:0",
                                    "trueBody": {
                                        "id": 134,
                                        "nodeType": "Block",
                                        "src": "1016:284:0",
                                        "statements": [
                                            {
                                                "assignments": [
                                                    105
                                                ],
                                                "declarations": [
                                                    {
                                                        "constant": false,
                                                        "id": 105,
                                                        "name": "myAddress",
                                                        "nodeType": "VariableDeclaration",
                                                        "scope": 138,
                                                        "src": "1030:17:0",
                                                        "stateVariable": false,
                                                        "storageLocation": "default",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_address",
                                                            "typeString": "address"
                                                        },
                                                        "typeName": {
                                                            "id": 104,
                                                            "name": "address",
                                                            "nodeType": "ElementaryTypeName",
                                                            "src": "1030:7:0",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        },
                                                        "value": null,
                                                        "visibility": "internal"
                                                    }
                                                ],
                                                "id": 107,
                                                "initialValue": {
                                                    "argumentTypes": null,
                                                    "id": 106,
                                                    "name": "this",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 238,
                                                    "src": "1050:4:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_Conference_$153",
                                                        "typeString": "contract Conference"
                                                    }
                                                },
                                                "nodeType": "VariableDeclarationStatement",
                                                "src": "1030:24:0"
                                            },
                                            {
                                                "condition": {
                                                    "argumentTypes": null,
                                                    "commonType": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    "id": 111,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "lValueRequested": false,
                                                    "leftExpression": {
                                                        "argumentTypes": null,
                                                        "expression": {
                                                            "argumentTypes": null,
                                                            "id": 108,
                                                            "name": "myAddress",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 105,
                                                            "src": "1072:9:0",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        },
                                                        "id": 109,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": false,
                                                        "lValueRequested": false,
                                                        "memberName": "balance",
                                                        "nodeType": "MemberAccess",
                                                        "referencedDeclaration": null,
                                                        "src": "1072:17:0",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "nodeType": "BinaryOperation",
                                                    "operator": ">=",
                                                    "rightExpression": {
                                                        "argumentTypes": null,
                                                        "id": 110,
                                                        "name": "amount",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 89,
                                                        "src": "1093:6:0",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "src": "1072:27:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_bool",
                                                        "typeString": "bool"
                                                    }
                                                },
                                                "falseBody": null,
                                                "id": 133,
                                                "nodeType": "IfStatement",
                                                "src": "1068:222:0",
                                                "trueBody": {
                                                    "id": 132,
                                                    "nodeType": "Block",
                                                    "src": "1101:189:0",
                                                    "statements": [
                                                        {
                                                            "expression": {
                                                                "argumentTypes": null,
                                                                "arguments": [
                                                                    {
                                                                        "argumentTypes": null,
                                                                        "id": 115,
                                                                        "name": "amount",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 89,
                                                                        "src": "1138:6:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_uint256",
                                                                            "typeString": "uint256"
                                                                        }
                                                                    }
                                                                ],
                                                                "expression": {
                                                                    "argumentTypes": [
                                                                        {
                                                                            "typeIdentifier": "t_uint256",
                                                                            "typeString": "uint256"
                                                                        }
                                                                    ],
                                                                    "expression": {
                                                                        "argumentTypes": null,
                                                                        "id": 112,
                                                                        "name": "recipient",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 87,
                                                                        "src": "1119:9:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_address",
                                                                            "typeString": "address"
                                                                        }
                                                                    },
                                                                    "id": 114,
                                                                    "isConstant": false,
                                                                    "isLValue": false,
                                                                    "isPure": false,
                                                                    "lValueRequested": false,
                                                                    "memberName": "transfer",
                                                                    "nodeType": "MemberAccess",
                                                                    "referencedDeclaration": null,
                                                                    "src": "1119:18:0",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
                                                                        "typeString": "function (uint256)"
                                                                    }
                                                                },
                                                                "id": 116,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "kind": "functionCall",
                                                                "lValueRequested": false,
                                                                "names": [],
                                                                "nodeType": "FunctionCall",
                                                                "src": "1119:26:0",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_tuple$__$",
                                                                    "typeString": "tuple()"
                                                                }
                                                            },
                                                            "id": 117,
                                                            "nodeType": "ExpressionStatement",
                                                            "src": "1119:26:0"
                                                        },
                                                        {
                                                            "eventCall": {
                                                                "argumentTypes": null,
                                                                "arguments": [
                                                                    {
                                                                        "argumentTypes": null,
                                                                        "id": 119,
                                                                        "name": "recipient",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 87,
                                                                        "src": "1175:9:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_address",
                                                                            "typeString": "address"
                                                                        }
                                                                    },
                                                                    {
                                                                        "argumentTypes": null,
                                                                        "id": 120,
                                                                        "name": "amount",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 89,
                                                                        "src": "1186:6:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_uint256",
                                                                            "typeString": "uint256"
                                                                        }
                                                                    }
                                                                ],
                                                                "expression": {
                                                                    "argumentTypes": [
                                                                        {
                                                                            "typeIdentifier": "t_address",
                                                                            "typeString": "address"
                                                                        },
                                                                        {
                                                                            "typeIdentifier": "t_uint256",
                                                                            "typeString": "uint256"
                                                                        }
                                                                    ],
                                                                    "id": 118,
                                                                    "name": "Refund",
                                                                    "nodeType": "Identifier",
                                                                    "overloadedDeclarations": [],
                                                                    "referencedDeclaration": 23,
                                                                    "src": "1168:6:0",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_uint256_$returns$__$",
                                                                        "typeString": "function (address,uint256)"
                                                                    }
                                                                },
                                                                "id": 121,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "kind": "functionCall",
                                                                "lValueRequested": false,
                                                                "names": [],
                                                                "nodeType": "FunctionCall",
                                                                "src": "1168:25:0",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_tuple$__$",
                                                                    "typeString": "tuple()"
                                                                }
                                                            },
                                                            "id": 122,
                                                            "nodeType": "EmitStatement",
                                                            "src": "1163:30:0"
                                                        },
                                                        {
                                                            "expression": {
                                                                "argumentTypes": null,
                                                                "id": 127,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "lValueRequested": false,
                                                                "leftHandSide": {
                                                                    "argumentTypes": null,
                                                                    "baseExpression": {
                                                                        "argumentTypes": null,
                                                                        "id": 123,
                                                                        "name": "registrantsPaid",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 7,
                                                                        "src": "1211:15:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                                                            "typeString": "mapping(address => uint256)"
                                                                        }
                                                                    },
                                                                    "id": 125,
                                                                    "indexExpression": {
                                                                        "argumentTypes": null,
                                                                        "id": 124,
                                                                        "name": "recipient",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 87,
                                                                        "src": "1227:9:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_address",
                                                                            "typeString": "address"
                                                                        }
                                                                    },
                                                                    "isConstant": false,
                                                                    "isLValue": true,
                                                                    "isPure": false,
                                                                    "lValueRequested": true,
                                                                    "nodeType": "IndexAccess",
                                                                    "src": "1211:26:0",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_uint256",
                                                                        "typeString": "uint256"
                                                                    }
                                                                },
                                                                "nodeType": "Assignment",
                                                                "operator": "=",
                                                                "rightHandSide": {
                                                                    "argumentTypes": null,
                                                                    "hexValue": "30",
                                                                    "id": 126,
                                                                    "isConstant": false,
                                                                    "isLValue": false,
                                                                    "isPure": true,
                                                                    "kind": "number",
                                                                    "lValueRequested": false,
                                                                    "nodeType": "Literal",
                                                                    "src": "1240:1:0",
                                                                    "subdenomination": null,
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_rational_0_by_1",
                                                                        "typeString": "int_const 0"
                                                                    },
                                                                    "value": "0"
                                                                },
                                                                "src": "1211:30:0",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_uint256",
                                                                    "typeString": "uint256"
                                                                }
                                                            },
                                                            "id": 128,
                                                            "nodeType": "ExpressionStatement",
                                                            "src": "1211:30:0"
                                                        },
                                                        {
                                                            "expression": {
                                                                "argumentTypes": null,
                                                                "id": 130,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "lValueRequested": false,
                                                                "nodeType": "UnaryOperation",
                                                                "operator": "--",
                                                                "prefix": false,
                                                                "src": "1259:16:0",
                                                                "subExpression": {
                                                                    "argumentTypes": null,
                                                                    "id": 129,
                                                                    "name": "numRegistrants",
                                                                    "nodeType": "Identifier",
                                                                    "overloadedDeclarations": [],
                                                                    "referencedDeclaration": 9,
                                                                    "src": "1259:14:0",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_uint256",
                                                                        "typeString": "uint256"
                                                                    }
                                                                },
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_uint256",
                                                                    "typeString": "uint256"
                                                                }
                                                            },
                                                            "id": 131,
                                                            "nodeType": "ExpressionStatement",
                                                            "src": "1259:16:0"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "expression": null,
                                    "functionReturnParameters": 91,
                                    "id": 136,
                                    "nodeType": "Return",
                                    "src": "1309:7:0"
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 138,
                        "implemented": true,
                        "isConstructor": false,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "refundTicket",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 90,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 87,
                                    "name": "recipient",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 138,
                                    "src": "878:17:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 86,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "878:7:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 89,
                                    "name": "amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 138,
                                    "src": "897:11:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 88,
                                        "name": "uint",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "897:4:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "877:32:0"
                        },
                        "payable": false,
                        "returnParameters": {
                            "id": 91,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "917:0:0"
                        },
                        "scope": 153,
                        "src": "856:466:0",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "public"
                    },
                    {
                        "body": {
                            "id": 151,
                            "nodeType": "Block",
                            "src": "1354:155:0",
                            "statements": [
                                {
                                    "condition": {
                                        "argumentTypes": null,
                                        "commonType": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        },
                                        "id": 144,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftExpression": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 141,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "1368:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 142,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "sender",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "1368:10:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "nodeType": "BinaryOperation",
                                        "operator": "==",
                                        "rightExpression": {
                                            "argumentTypes": null,
                                            "id": 143,
                                            "name": "organizer",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 3,
                                            "src": "1382:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "src": "1368:23:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "falseBody": null,
                                    "id": 150,
                                    "nodeType": "IfStatement",
                                    "src": "1364:139:0",
                                    "trueBody": {
                                        "id": 149,
                                        "nodeType": "Block",
                                        "src": "1393:110:0",
                                        "statements": [
                                            {
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "arguments": [
                                                        {
                                                            "argumentTypes": null,
                                                            "id": 146,
                                                            "name": "organizer",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 3,
                                                            "src": "1482:9:0",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        }
                                                    ],
                                                    "expression": {
                                                        "argumentTypes": [
                                                            {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        ],
                                                        "id": 145,
                                                        "name": "selfdestruct",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 233,
                                                        "src": "1469:12:0",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_function_selfdestruct_nonpayable$_t_address_$returns$__$",
                                                            "typeString": "function (address)"
                                                        }
                                                    },
                                                    "id": 147,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "functionCall",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "1469:23:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_tuple$__$",
                                                        "typeString": "tuple()"
                                                    }
                                                },
                                                "id": 148,
                                                "nodeType": "ExpressionStatement",
                                                "src": "1469:23:0"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 152,
                        "implemented": true,
                        "isConstructor": false,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "destroy",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 139,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1344:2:0"
                        },
                        "payable": false,
                        "returnParameters": {
                            "id": 140,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1354:0:0"
                        },
                        "scope": 153,
                        "src": "1328:181:0",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "public"
                    }
                ],
                "scope": 154,
                "src": "26:1485:0"
            }
        ],
        "src": "0:1512:0"
    },
    "legacyAST": {
        "absolutePath": "/Users/cyril/Desktop/conference/contracts/Conference.sol",
        "exportedSymbols": {
            "Conference": [
                153
            ]
        },
        "id": 154,
        "nodeType": "SourceUnit",
        "nodes": [
            {
                "id": 1,
                "literals": [
                    "solidity",
                    "^",
                    "0.4",
                    ".24"
                ],
                "nodeType": "PragmaDirective",
                "src": "0:24:0"
            },
            {
                "baseContracts": [],
                "contractDependencies": [],
                "contractKind": "contract",
                "documentation": null,
                "fullyImplemented": true,
                "id": 153,
                "linearizedBaseContracts": [
                    153
                ],
                "name": "Conference",
                "nodeType": "ContractDefinition",
                "nodes": [
                    {
                        "constant": false,
                        "id": 3,
                        "name": "organizer",
                        "nodeType": "VariableDeclaration",
                        "scope": 153,
                        "src": "114:24:0",
                        "stateVariable": true,
                        "storageLocation": "default",
                        "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                        },
                        "typeName": {
                            "id": 2,
                            "name": "address",
                            "nodeType": "ElementaryTypeName",
                            "src": "114:7:0",
                            "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                            }
                        },
                        "value": null,
                        "visibility": "public"
                    },
                    {
                        "constant": false,
                        "id": 7,
                        "name": "registrantsPaid",
                        "nodeType": "VariableDeclaration",
                        "scope": 153,
                        "src": "144:47:0",
                        "stateVariable": true,
                        "storageLocation": "default",
                        "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                            "typeString": "mapping(address => uint256)"
                        },
                        "typeName": {
                            "id": 6,
                            "keyType": {
                                "id": 4,
                                "name": "address",
                                "nodeType": "ElementaryTypeName",
                                "src": "152:7:0",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                }
                            },
                            "nodeType": "Mapping",
                            "src": "144:24:0",
                            "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                "typeString": "mapping(address => uint256)"
                            },
                            "valueType": {
                                "id": 5,
                                "name": "uint",
                                "nodeType": "ElementaryTypeName",
                                "src": "163:4:0",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                }
                            }
                        },
                        "value": null,
                        "visibility": "public"
                    },
                    {
                        "constant": false,
                        "id": 9,
                        "name": "numRegistrants",
                        "nodeType": "VariableDeclaration",
                        "scope": 153,
                        "src": "197:26:0",
                        "stateVariable": true,
                        "storageLocation": "default",
                        "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                        },
                        "typeName": {
                            "id": 8,
                            "name": "uint",
                            "nodeType": "ElementaryTypeName",
                            "src": "197:4:0",
                            "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                            }
                        },
                        "value": null,
                        "visibility": "public"
                    },
                    {
                        "constant": false,
                        "id": 11,
                        "name": "quota",
                        "nodeType": "VariableDeclaration",
                        "scope": 153,
                        "src": "229:17:0",
                        "stateVariable": true,
                        "storageLocation": "default",
                        "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                        },
                        "typeName": {
                            "id": 10,
                            "name": "uint",
                            "nodeType": "ElementaryTypeName",
                            "src": "229:4:0",
                            "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                            }
                        },
                        "value": null,
                        "visibility": "public"
                    },
                    {
                        "anonymous": false,
                        "documentation": null,
                        "id": 17,
                        "name": "Deposit",
                        "nodeType": "EventDefinition",
                        "parameters": {
                            "id": 16,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 13,
                                    "indexed": false,
                                    "name": "_from",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 17,
                                    "src": "267:13:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 12,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "267:7:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 15,
                                    "indexed": false,
                                    "name": "_amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 17,
                                    "src": "282:12:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 14,
                                        "name": "uint",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "282:4:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "266:29:0"
                        },
                        "src": "253:43:0"
                    },
                    {
                        "anonymous": false,
                        "documentation": null,
                        "id": 23,
                        "name": "Refund",
                        "nodeType": "EventDefinition",
                        "parameters": {
                            "id": 22,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 19,
                                    "indexed": false,
                                    "name": "_to",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 23,
                                    "src": "342:11:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 18,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "342:7:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 21,
                                    "indexed": false,
                                    "name": "_amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 23,
                                    "src": "355:12:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 20,
                                        "name": "uint",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "355:4:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "341:27:0"
                        },
                        "src": "329:40:0"
                    },
                    {
                        "body": {
                            "id": 39,
                            "nodeType": "Block",
                            "src": "423:88:0",
                            "statements": [
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 29,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "id": 26,
                                            "name": "organizer",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 3,
                                            "src": "433:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 27,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "445:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 28,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "sender",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "445:10:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "src": "433:22:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "id": 30,
                                    "nodeType": "ExpressionStatement",
                                    "src": "433:22:0"
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 33,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "id": 31,
                                            "name": "quota",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 11,
                                            "src": "465:5:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "hexValue": "313030",
                                            "id": 32,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "number",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "473:3:0",
                                            "subdenomination": null,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_rational_100_by_1",
                                                "typeString": "int_const 100"
                                            },
                                            "value": "100"
                                        },
                                        "src": "465:11:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 34,
                                    "nodeType": "ExpressionStatement",
                                    "src": "465:11:0"
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 37,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "id": 35,
                                            "name": "numRegistrants",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 9,
                                            "src": "486:14:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "hexValue": "30",
                                            "id": 36,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "number",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "503:1:0",
                                            "subdenomination": null,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_rational_0_by_1",
                                                "typeString": "int_const 0"
                                            },
                                            "value": "0"
                                        },
                                        "src": "486:18:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 38,
                                    "nodeType": "ExpressionStatement",
                                    "src": "486:18:0"
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 40,
                        "implemented": true,
                        "isConstructor": true,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 24,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "414:2:0"
                        },
                        "payable": false,
                        "returnParameters": {
                            "id": 25,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "423:0:0"
                        },
                        "scope": 153,
                        "src": "403:108:0",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "public"
                    },
                    {
                        "body": {
                            "id": 67,
                            "nodeType": "Block",
                            "src": "553:168:0",
                            "statements": [
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "arguments": [
                                            {
                                                "argumentTypes": null,
                                                "commonType": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "id": 46,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "leftExpression": {
                                                    "argumentTypes": null,
                                                    "id": 44,
                                                    "name": "numRegistrants",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 9,
                                                    "src": "571:14:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "nodeType": "BinaryOperation",
                                                "operator": "<",
                                                "rightExpression": {
                                                    "argumentTypes": null,
                                                    "id": 45,
                                                    "name": "quota",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 11,
                                                    "src": "588:5:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "src": "571:22:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_bool",
                                                    "typeString": "bool"
                                                }
                                            }
                                        ],
                                        "expression": {
                                            "argumentTypes": [
                                                {
                                                    "typeIdentifier": "t_bool",
                                                    "typeString": "bool"
                                                }
                                            ],
                                            "id": 43,
                                            "name": "require",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [
                                                228,
                                                229
                                            ],
                                            "referencedDeclaration": 228,
                                            "src": "563:7:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                                                "typeString": "function (bool) pure"
                                            }
                                        },
                                        "id": 47,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "kind": "functionCall",
                                        "lValueRequested": false,
                                        "names": [],
                                        "nodeType": "FunctionCall",
                                        "src": "563:31:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_tuple$__$",
                                            "typeString": "tuple()"
                                        }
                                    },
                                    "id": 48,
                                    "nodeType": "ExpressionStatement",
                                    "src": "563:31:0"
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 55,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "baseExpression": {
                                                "argumentTypes": null,
                                                "id": 49,
                                                "name": "registrantsPaid",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 7,
                                                "src": "604:15:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                                    "typeString": "mapping(address => uint256)"
                                                }
                                            },
                                            "id": 52,
                                            "indexExpression": {
                                                "argumentTypes": null,
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "id": 50,
                                                    "name": "msg",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 225,
                                                    "src": "620:3:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_magic_message",
                                                        "typeString": "msg"
                                                    }
                                                },
                                                "id": 51,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "sender",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": null,
                                                "src": "620:10:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            "isConstant": false,
                                            "isLValue": true,
                                            "isPure": false,
                                            "lValueRequested": true,
                                            "nodeType": "IndexAccess",
                                            "src": "604:27:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 53,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "634:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 54,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "value",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "634:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "src": "604:39:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 56,
                                    "nodeType": "ExpressionStatement",
                                    "src": "604:39:0"
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 58,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "nodeType": "UnaryOperation",
                                        "operator": "++",
                                        "prefix": false,
                                        "src": "653:16:0",
                                        "subExpression": {
                                            "argumentTypes": null,
                                            "id": 57,
                                            "name": "numRegistrants",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 9,
                                            "src": "653:14:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 59,
                                    "nodeType": "ExpressionStatement",
                                    "src": "653:16:0"
                                },
                                {
                                    "eventCall": {
                                        "argumentTypes": null,
                                        "arguments": [
                                            {
                                                "argumentTypes": null,
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "id": 61,
                                                    "name": "msg",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 225,
                                                    "src": "692:3:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_magic_message",
                                                        "typeString": "msg"
                                                    }
                                                },
                                                "id": 62,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "sender",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": null,
                                                "src": "692:10:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            {
                                                "argumentTypes": null,
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "id": 63,
                                                    "name": "msg",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 225,
                                                    "src": "704:3:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_magic_message",
                                                        "typeString": "msg"
                                                    }
                                                },
                                                "id": 64,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "value",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": null,
                                                "src": "704:9:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                }
                                            }
                                        ],
                                        "expression": {
                                            "argumentTypes": [
                                                {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                },
                                                {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                }
                                            ],
                                            "id": 60,
                                            "name": "Deposit",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 17,
                                            "src": "684:7:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_uint256_$returns$__$",
                                                "typeString": "function (address,uint256)"
                                            }
                                        },
                                        "id": 65,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "kind": "functionCall",
                                        "lValueRequested": false,
                                        "names": [],
                                        "nodeType": "FunctionCall",
                                        "src": "684:30:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_tuple$__$",
                                            "typeString": "tuple()"
                                        }
                                    },
                                    "id": 66,
                                    "nodeType": "EmitStatement",
                                    "src": "679:35:0"
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 68,
                        "implemented": true,
                        "isConstructor": false,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "buyTicket",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 41,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "535:2:0"
                        },
                        "payable": true,
                        "returnParameters": {
                            "id": 42,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "553:0:0"
                        },
                        "scope": 153,
                        "src": "517:204:0",
                        "stateMutability": "payable",
                        "superFunction": null,
                        "visibility": "public"
                    },
                    {
                        "body": {
                            "id": 84,
                            "nodeType": "Block",
                            "src": "770:80:0",
                            "statements": [
                                {
                                    "condition": {
                                        "argumentTypes": null,
                                        "commonType": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        },
                                        "id": 76,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftExpression": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 73,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "784:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 74,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "sender",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "784:10:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "nodeType": "BinaryOperation",
                                        "operator": "!=",
                                        "rightExpression": {
                                            "argumentTypes": null,
                                            "id": 75,
                                            "name": "organizer",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 3,
                                            "src": "798:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "src": "784:23:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "falseBody": null,
                                    "id": 79,
                                    "nodeType": "IfStatement",
                                    "src": "780:38:0",
                                    "trueBody": {
                                        "id": 78,
                                        "nodeType": "Block",
                                        "src": "809:9:0",
                                        "statements": [
                                            {
                                                "expression": null,
                                                "functionReturnParameters": 72,
                                                "id": 77,
                                                "nodeType": "Return",
                                                "src": "810:7:0"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "expression": {
                                        "argumentTypes": null,
                                        "id": 82,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftHandSide": {
                                            "argumentTypes": null,
                                            "id": 80,
                                            "name": "quota",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 11,
                                            "src": "827:5:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "Assignment",
                                        "operator": "=",
                                        "rightHandSide": {
                                            "argumentTypes": null,
                                            "id": 81,
                                            "name": "newquota",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 70,
                                            "src": "835:8:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "src": "827:16:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "id": 83,
                                    "nodeType": "ExpressionStatement",
                                    "src": "827:16:0"
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 85,
                        "implemented": true,
                        "isConstructor": false,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "changeQuota",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 71,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 70,
                                    "name": "newquota",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 85,
                                    "src": "748:13:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 69,
                                        "name": "uint",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "748:4:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "747:15:0"
                        },
                        "payable": false,
                        "returnParameters": {
                            "id": 72,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "770:0:0"
                        },
                        "scope": 153,
                        "src": "727:123:0",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "public"
                    },
                    {
                        "body": {
                            "id": 137,
                            "nodeType": "Block",
                            "src": "917:405:0",
                            "statements": [
                                {
                                    "condition": {
                                        "argumentTypes": null,
                                        "commonType": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        },
                                        "id": 95,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftExpression": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 92,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "931:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 93,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "sender",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "931:10:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "nodeType": "BinaryOperation",
                                        "operator": "!=",
                                        "rightExpression": {
                                            "argumentTypes": null,
                                            "id": 94,
                                            "name": "organizer",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 3,
                                            "src": "945:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "src": "931:23:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "falseBody": null,
                                    "id": 98,
                                    "nodeType": "IfStatement",
                                    "src": "927:38:0",
                                    "trueBody": {
                                        "id": 97,
                                        "nodeType": "Block",
                                        "src": "956:9:0",
                                        "statements": [
                                            {
                                                "expression": null,
                                                "functionReturnParameters": 91,
                                                "id": 96,
                                                "nodeType": "Return",
                                                "src": "957:7:0"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "condition": {
                                        "argumentTypes": null,
                                        "commonType": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "id": 103,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftExpression": {
                                            "argumentTypes": null,
                                            "baseExpression": {
                                                "argumentTypes": null,
                                                "id": 99,
                                                "name": "registrantsPaid",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 7,
                                                "src": "978:15:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                                    "typeString": "mapping(address => uint256)"
                                                }
                                            },
                                            "id": 101,
                                            "indexExpression": {
                                                "argumentTypes": null,
                                                "id": 100,
                                                "name": "recipient",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 87,
                                                "src": "994:9:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            "isConstant": false,
                                            "isLValue": true,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "nodeType": "IndexAccess",
                                            "src": "978:26:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "BinaryOperation",
                                        "operator": "==",
                                        "rightExpression": {
                                            "argumentTypes": null,
                                            "id": 102,
                                            "name": "amount",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 89,
                                            "src": "1008:6:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "src": "978:36:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "falseBody": null,
                                    "id": 135,
                                    "nodeType": "IfStatement",
                                    "src": "974:326:0",
                                    "trueBody": {
                                        "id": 134,
                                        "nodeType": "Block",
                                        "src": "1016:284:0",
                                        "statements": [
                                            {
                                                "assignments": [
                                                    105
                                                ],
                                                "declarations": [
                                                    {
                                                        "constant": false,
                                                        "id": 105,
                                                        "name": "myAddress",
                                                        "nodeType": "VariableDeclaration",
                                                        "scope": 138,
                                                        "src": "1030:17:0",
                                                        "stateVariable": false,
                                                        "storageLocation": "default",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_address",
                                                            "typeString": "address"
                                                        },
                                                        "typeName": {
                                                            "id": 104,
                                                            "name": "address",
                                                            "nodeType": "ElementaryTypeName",
                                                            "src": "1030:7:0",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        },
                                                        "value": null,
                                                        "visibility": "internal"
                                                    }
                                                ],
                                                "id": 107,
                                                "initialValue": {
                                                    "argumentTypes": null,
                                                    "id": 106,
                                                    "name": "this",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 238,
                                                    "src": "1050:4:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_Conference_$153",
                                                        "typeString": "contract Conference"
                                                    }
                                                },
                                                "nodeType": "VariableDeclarationStatement",
                                                "src": "1030:24:0"
                                            },
                                            {
                                                "condition": {
                                                    "argumentTypes": null,
                                                    "commonType": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    "id": 111,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "lValueRequested": false,
                                                    "leftExpression": {
                                                        "argumentTypes": null,
                                                        "expression": {
                                                            "argumentTypes": null,
                                                            "id": 108,
                                                            "name": "myAddress",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 105,
                                                            "src": "1072:9:0",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        },
                                                        "id": 109,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": false,
                                                        "lValueRequested": false,
                                                        "memberName": "balance",
                                                        "nodeType": "MemberAccess",
                                                        "referencedDeclaration": null,
                                                        "src": "1072:17:0",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "nodeType": "BinaryOperation",
                                                    "operator": ">=",
                                                    "rightExpression": {
                                                        "argumentTypes": null,
                                                        "id": 110,
                                                        "name": "amount",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 89,
                                                        "src": "1093:6:0",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "src": "1072:27:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_bool",
                                                        "typeString": "bool"
                                                    }
                                                },
                                                "falseBody": null,
                                                "id": 133,
                                                "nodeType": "IfStatement",
                                                "src": "1068:222:0",
                                                "trueBody": {
                                                    "id": 132,
                                                    "nodeType": "Block",
                                                    "src": "1101:189:0",
                                                    "statements": [
                                                        {
                                                            "expression": {
                                                                "argumentTypes": null,
                                                                "arguments": [
                                                                    {
                                                                        "argumentTypes": null,
                                                                        "id": 115,
                                                                        "name": "amount",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 89,
                                                                        "src": "1138:6:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_uint256",
                                                                            "typeString": "uint256"
                                                                        }
                                                                    }
                                                                ],
                                                                "expression": {
                                                                    "argumentTypes": [
                                                                        {
                                                                            "typeIdentifier": "t_uint256",
                                                                            "typeString": "uint256"
                                                                        }
                                                                    ],
                                                                    "expression": {
                                                                        "argumentTypes": null,
                                                                        "id": 112,
                                                                        "name": "recipient",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 87,
                                                                        "src": "1119:9:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_address",
                                                                            "typeString": "address"
                                                                        }
                                                                    },
                                                                    "id": 114,
                                                                    "isConstant": false,
                                                                    "isLValue": false,
                                                                    "isPure": false,
                                                                    "lValueRequested": false,
                                                                    "memberName": "transfer",
                                                                    "nodeType": "MemberAccess",
                                                                    "referencedDeclaration": null,
                                                                    "src": "1119:18:0",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
                                                                        "typeString": "function (uint256)"
                                                                    }
                                                                },
                                                                "id": 116,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "kind": "functionCall",
                                                                "lValueRequested": false,
                                                                "names": [],
                                                                "nodeType": "FunctionCall",
                                                                "src": "1119:26:0",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_tuple$__$",
                                                                    "typeString": "tuple()"
                                                                }
                                                            },
                                                            "id": 117,
                                                            "nodeType": "ExpressionStatement",
                                                            "src": "1119:26:0"
                                                        },
                                                        {
                                                            "eventCall": {
                                                                "argumentTypes": null,
                                                                "arguments": [
                                                                    {
                                                                        "argumentTypes": null,
                                                                        "id": 119,
                                                                        "name": "recipient",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 87,
                                                                        "src": "1175:9:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_address",
                                                                            "typeString": "address"
                                                                        }
                                                                    },
                                                                    {
                                                                        "argumentTypes": null,
                                                                        "id": 120,
                                                                        "name": "amount",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 89,
                                                                        "src": "1186:6:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_uint256",
                                                                            "typeString": "uint256"
                                                                        }
                                                                    }
                                                                ],
                                                                "expression": {
                                                                    "argumentTypes": [
                                                                        {
                                                                            "typeIdentifier": "t_address",
                                                                            "typeString": "address"
                                                                        },
                                                                        {
                                                                            "typeIdentifier": "t_uint256",
                                                                            "typeString": "uint256"
                                                                        }
                                                                    ],
                                                                    "id": 118,
                                                                    "name": "Refund",
                                                                    "nodeType": "Identifier",
                                                                    "overloadedDeclarations": [],
                                                                    "referencedDeclaration": 23,
                                                                    "src": "1168:6:0",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_uint256_$returns$__$",
                                                                        "typeString": "function (address,uint256)"
                                                                    }
                                                                },
                                                                "id": 121,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "kind": "functionCall",
                                                                "lValueRequested": false,
                                                                "names": [],
                                                                "nodeType": "FunctionCall",
                                                                "src": "1168:25:0",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_tuple$__$",
                                                                    "typeString": "tuple()"
                                                                }
                                                            },
                                                            "id": 122,
                                                            "nodeType": "EmitStatement",
                                                            "src": "1163:30:0"
                                                        },
                                                        {
                                                            "expression": {
                                                                "argumentTypes": null,
                                                                "id": 127,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "lValueRequested": false,
                                                                "leftHandSide": {
                                                                    "argumentTypes": null,
                                                                    "baseExpression": {
                                                                        "argumentTypes": null,
                                                                        "id": 123,
                                                                        "name": "registrantsPaid",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 7,
                                                                        "src": "1211:15:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                                                            "typeString": "mapping(address => uint256)"
                                                                        }
                                                                    },
                                                                    "id": 125,
                                                                    "indexExpression": {
                                                                        "argumentTypes": null,
                                                                        "id": 124,
                                                                        "name": "recipient",
                                                                        "nodeType": "Identifier",
                                                                        "overloadedDeclarations": [],
                                                                        "referencedDeclaration": 87,
                                                                        "src": "1227:9:0",
                                                                        "typeDescriptions": {
                                                                            "typeIdentifier": "t_address",
                                                                            "typeString": "address"
                                                                        }
                                                                    },
                                                                    "isConstant": false,
                                                                    "isLValue": true,
                                                                    "isPure": false,
                                                                    "lValueRequested": true,
                                                                    "nodeType": "IndexAccess",
                                                                    "src": "1211:26:0",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_uint256",
                                                                        "typeString": "uint256"
                                                                    }
                                                                },
                                                                "nodeType": "Assignment",
                                                                "operator": "=",
                                                                "rightHandSide": {
                                                                    "argumentTypes": null,
                                                                    "hexValue": "30",
                                                                    "id": 126,
                                                                    "isConstant": false,
                                                                    "isLValue": false,
                                                                    "isPure": true,
                                                                    "kind": "number",
                                                                    "lValueRequested": false,
                                                                    "nodeType": "Literal",
                                                                    "src": "1240:1:0",
                                                                    "subdenomination": null,
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_rational_0_by_1",
                                                                        "typeString": "int_const 0"
                                                                    },
                                                                    "value": "0"
                                                                },
                                                                "src": "1211:30:0",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_uint256",
                                                                    "typeString": "uint256"
                                                                }
                                                            },
                                                            "id": 128,
                                                            "nodeType": "ExpressionStatement",
                                                            "src": "1211:30:0"
                                                        },
                                                        {
                                                            "expression": {
                                                                "argumentTypes": null,
                                                                "id": 130,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": false,
                                                                "lValueRequested": false,
                                                                "nodeType": "UnaryOperation",
                                                                "operator": "--",
                                                                "prefix": false,
                                                                "src": "1259:16:0",
                                                                "subExpression": {
                                                                    "argumentTypes": null,
                                                                    "id": 129,
                                                                    "name": "numRegistrants",
                                                                    "nodeType": "Identifier",
                                                                    "overloadedDeclarations": [],
                                                                    "referencedDeclaration": 9,
                                                                    "src": "1259:14:0",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_uint256",
                                                                        "typeString": "uint256"
                                                                    }
                                                                },
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_uint256",
                                                                    "typeString": "uint256"
                                                                }
                                                            },
                                                            "id": 131,
                                                            "nodeType": "ExpressionStatement",
                                                            "src": "1259:16:0"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "expression": null,
                                    "functionReturnParameters": 91,
                                    "id": 136,
                                    "nodeType": "Return",
                                    "src": "1309:7:0"
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 138,
                        "implemented": true,
                        "isConstructor": false,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "refundTicket",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 90,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 87,
                                    "name": "recipient",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 138,
                                    "src": "878:17:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 86,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "878:7:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 89,
                                    "name": "amount",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 138,
                                    "src": "897:11:0",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 88,
                                        "name": "uint",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "897:4:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "value": null,
                                    "visibility": "internal"
                                }
                            ],
                            "src": "877:32:0"
                        },
                        "payable": false,
                        "returnParameters": {
                            "id": 91,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "917:0:0"
                        },
                        "scope": 153,
                        "src": "856:466:0",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "public"
                    },
                    {
                        "body": {
                            "id": 151,
                            "nodeType": "Block",
                            "src": "1354:155:0",
                            "statements": [
                                {
                                    "condition": {
                                        "argumentTypes": null,
                                        "commonType": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        },
                                        "id": 144,
                                        "isConstant": false,
                                        "isLValue": false,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "leftExpression": {
                                            "argumentTypes": null,
                                            "expression": {
                                                "argumentTypes": null,
                                                "id": 141,
                                                "name": "msg",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 225,
                                                "src": "1368:3:0",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_magic_message",
                                                    "typeString": "msg"
                                                }
                                            },
                                            "id": 142,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "memberName": "sender",
                                            "nodeType": "MemberAccess",
                                            "referencedDeclaration": null,
                                            "src": "1368:10:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "nodeType": "BinaryOperation",
                                        "operator": "==",
                                        "rightExpression": {
                                            "argumentTypes": null,
                                            "id": 143,
                                            "name": "organizer",
                                            "nodeType": "Identifier",
                                            "overloadedDeclarations": [],
                                            "referencedDeclaration": 3,
                                            "src": "1382:9:0",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "src": "1368:23:0",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        }
                                    },
                                    "falseBody": null,
                                    "id": 150,
                                    "nodeType": "IfStatement",
                                    "src": "1364:139:0",
                                    "trueBody": {
                                        "id": 149,
                                        "nodeType": "Block",
                                        "src": "1393:110:0",
                                        "statements": [
                                            {
                                                "expression": {
                                                    "argumentTypes": null,
                                                    "arguments": [
                                                        {
                                                            "argumentTypes": null,
                                                            "id": 146,
                                                            "name": "organizer",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 3,
                                                            "src": "1482:9:0",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        }
                                                    ],
                                                    "expression": {
                                                        "argumentTypes": [
                                                            {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        ],
                                                        "id": 145,
                                                        "name": "selfdestruct",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 233,
                                                        "src": "1469:12:0",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_function_selfdestruct_nonpayable$_t_address_$returns$__$",
                                                            "typeString": "function (address)"
                                                        }
                                                    },
                                                    "id": 147,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "functionCall",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "1469:23:0",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_tuple$__$",
                                                        "typeString": "tuple()"
                                                    }
                                                },
                                                "id": 148,
                                                "nodeType": "ExpressionStatement",
                                                "src": "1469:23:0"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "documentation": null,
                        "id": 152,
                        "implemented": true,
                        "isConstructor": false,
                        "isDeclaredConst": false,
                        "modifiers": [],
                        "name": "destroy",
                        "nodeType": "FunctionDefinition",
                        "parameters": {
                            "id": 139,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1344:2:0"
                        },
                        "payable": false,
                        "returnParameters": {
                            "id": 140,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1354:0:0"
                        },
                        "scope": 153,
                        "src": "1328:181:0",
                        "stateMutability": "nonpayable",
                        "superFunction": null,
                        "visibility": "public"
                    }
                ],
                "scope": 154,
                "src": "26:1485:0"
            }
        ],
        "src": "0:1512:0"
    },
    "compiler": {
        "name": "solc",
        "version": "0.4.24+commit.e67f0147.Emscripten.clang"
    },
    "networks": {
        "1536716179260": {
            "events": {},
            "links": {},
            "address": "0xc2906874f9776b08c7e4f0b125618e3d0414b685",
            "transactionHash": "0x48e446de83b803d6cc2463daf6dbd1e1cc634892d391e5ff7d257089f117cb87"
        },
        "1536807403736": {
            "events": {},
            "links": {},
            "address": "0x7d1d61c7a30f3fdb7abc35cffb842034292767f9",
            "transactionHash": "0x48e446de83b803d6cc2463daf6dbd1e1cc634892d391e5ff7d257089f117cb87"
        }
    },
    "schemaVersion": "2.0.1",
    "updatedAt": "2018-09-13T07:10:23.093Z"
});

// Initialize
function initializeConference() {
    Conference.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
    Conference.new({from: account, gas: 3141592}).then(
        function (conf) {
            myConferenceInstance = conf;
            $("#confAddress").html(myConferenceInstance.address);
            checkValues();
        });
}

// Check Values
function checkValues() {
    myConferenceInstance.quota.call().then(
        function (quota) {
            $("input#confQuota").val(quota);
            return myConferenceInstance.organizer.call();
        }).then(
        function (organizer) {
            $("input#confOrganizer").val(organizer);
            return myConferenceInstance.numRegistrants.call();
        }).then(
        function (num) {
            $("#numRegistrants").html(num.toNumber());
            return myConferenceInstance.organizer.call();
        });
}

// Change Quota
function changeQuota(val) {
    myConferenceInstance.changeQuota(val, {from: accounts[0]}).then(
        function () {
            return myConferenceInstance.quota.call();
        }).then(
        function (quota) {
            if (quota == val) {
                var msgResult;
                msgResult = "Change successful";
            } else {
                msgResult = "Change failed";
            }
            $("#changeQuotaResult").html(msgResult);
        });
}

// buyTicket
function buyTicket(buyerAddress, ticketPrice) {

    myConferenceInstance.buyTicket({from: buyerAddress, value: ticketPrice}).then(
        function () {
            return myConferenceInstance.numRegistrants.call();
        }).then(
        function (num) {
            $("#numRegistrants").html(num.toNumber());
            return myConferenceInstance.registrantsPaid.call(buyerAddress);
        }).then(
        function (valuePaid) {
            var msgResult;
            if (valuePaid.toNumber() == ticketPrice) {
                msgResult = "Purchase successful";
            } else {
                msgResult = "Purchase failed";
            }
            $("#buyTicketResult").html(msgResult);
        });
}

// refundTicket
function refundTicket(buyerAddress, ticketPrice) {

    var msgResult;

    myConferenceInstance.registrantsPaid.call(buyerAddress).then(
        function (result) {
            if (result.toNumber() == 0) {
                $("#refundTicketResult").html("Buyer is not registered - no refund!");
            } else {
                myConferenceInstance.refundTicket(buyerAddress,
                    ticketPrice, {from: accounts[0]}).then(
                    function () {
                        return myConferenceInstance.numRegistrants.call();
                    }).then(
                    function (num) {
                        $("#numRegistrants").html(num.toNumber());
                        return myConferenceInstance.registrantsPaid.call(buyerAddress);
                    }).then(
                    function (valuePaid) {
                        if (valuePaid.toNumber() == 0) {
                            msgResult = "Refund successful";
                        } else {
                            msgResult = "Refund failed";
                        }
                        $("#refundTicketResult").html(msgResult);
                    });
            }
        });
}


window.onload = function () {

    web3.eth.getAccounts(function (err, accs) {
        if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
        }
        if (accs.length == 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }
        accounts = accs;
        // console.log(accounts);
        account = accounts[0];
        initializeConference();
    });

    // Wire up the UI elements
    $("#changeQuota").click(function () {
        var val = $("#confQuota").val();
        changeQuota(val);
    });

    $("#buyTicket").click(function () {
        var val = $("#ticketPrice").val();
        var buyerAddress = $("#buyerAddress").val();
        buyTicket(buyerAddress, web3.toWei(val));
    });

    $("#refundTicket").click(function () {
        var val = $("#ticketPrice1").val();
        var buyerAddress = $("#refBuyerAddress").val();
        refundTicket(buyerAddress, web3.toWei(val));
    });


    // Set value of wallet to accounts[1]
    $("#buyerAddress").val(accounts[1]);
    $("#refBuyerAddress").val(accounts[1]);

};
