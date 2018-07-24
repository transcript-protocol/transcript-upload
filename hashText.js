/*
Written by Maria Galebach and Anna Cuddeback
Property of Emblem
7/14/18
*/

//derive private key from signature and check it against address
emblemUtil.determineSigner = (transaction, signature) => {
    const sigAddress = creditProtocolUtil.signatureToAddress(transaction, signature)
    if (transaction.creditorAddress === sigAddress) {
        return 'creditor'
    } else if (transaction.debtorAddress === sigAddress) {
        return 'debtor'
    } else {
        return null;
    }
}

emblemUtil.verifySignature = (transaction, signature) => {
    const sigAddress = creditProtocolUtil.signatureToAddress(transaction, signature)
    return transaction.creditorAddress === sigAddress || transaction.debtorAddress === sigAddress
}

emblemUtil.signatureToAddress = (transaction, signature) => {
    const { v, r, s } = creditProtocolUtil.decomposeSignature(signature)
    let hash = Buffer.from(transaction.hash)
    const msgHash = ethUtil.hashPersonalMessage(hash)
    const addressBuffer = ethUtil.pubToAddress(ethUtil.ecrecover(msgHash, v, r, s))
    return hexAddress = addressBuffer.toString('hex')
}

emblemUtil.decomposeSignature = (signature) => {
    //strip leading '0x', r is first 64 bytes, s is next 64 bytes, v is last 2 bytes
    const signatureBuffer = hexToBuffer(signature)
    const r = signatureBuffer.slice(0, 32)
    const s = signatureBuffer.slice(32, 64)
    const v = signatureBuffer.readUIntBE(64, 1)
    return { v, r, s }
}

function hexToBuffer(value) {
    if (value.substr(0, 2) === '0x') {
        value = value.substr(2)
    }

    return Buffer.from(value, 'hex')
}

module.exports = emblemUtil