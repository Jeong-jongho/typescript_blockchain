import * as CryptoJs from 'crypto-js'

// Block class 선언
class Block {
    public index: number
    public hash: string
    public previousHash: string
    public data: string
    public timestamp: number

    // static method 선언 (Hash 값 계산)
    static calculateBlockHash = (index: number, previousHash: string, data: string, timestamp: number) : string => {
        return CryptoJs.SHA256(index + previousHash + data + timestamp).toString()
    }

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number   
    ) {
        this.index = index,
        this.hash = hash,
        this.previousHash = previousHash,
        this.data = data,
        this.timestamp = timestamp
    }
}

const genesisBlock: Block = new Block(0, "abcdefgh", '', 'First Block', 202201171649)

const blockchain: Block[] = [genesisBlock]

const getBlockChain = (): Block[] => blockchain

const getLatestBlock = (): Block => blockchain[blockchain.length - 1]

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data: string): Block => {
    const newIndex = getLatestBlock().index + 1
    const previousHash = getLatestBlock().hash
    const newTimeStamp = getNewTimeStamp()
    const newHash = Block.calculateBlockHash(newIndex, previousHash, data, newTimeStamp)

    const newBlock = new Block(newIndex, newHash, previousHash, data, newTimeStamp)
    
    blockchain.push(newBlock)

    return newBlock
}

console.log(createNewBlock("Second Block"), createNewBlock("Last Block"))